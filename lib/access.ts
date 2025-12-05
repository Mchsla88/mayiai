import { prisma } from '@/lib/db';
import { hash } from 'bcryptjs';
import { sendWelcomeEmail, sendAccessGrantedEmail } from '@/lib/email';
import crypto from 'crypto';

// Helper to generate random password
function generatePassword(length = 12) {
  return crypto.randomBytes(length).toString('hex').slice(0, length);
}

export async function grantAccess(email: string, trainingId: string, payuOrderId: string) {
  console.log('==========================================');
  console.log('[GRANT ACCESS] Starting access grant process');
  console.log(`[GRANT ACCESS] Email: ${email}, TrainingId: ${trainingId}, OrderId: ${payuOrderId}`);
  console.log('==========================================');
  
  try {
    // Normalize email to lowercase to prevent duplicates
    const normalizedEmail = email.toLowerCase().trim();
    console.log(`[GRANT ACCESS] Normalized email: ${normalizedEmail}`);
    
    // 1. Check if user exists (case-insensitive search)
    let user = await prisma.user.findFirst({
      where: { 
        email: {
          equals: normalizedEmail,
          mode: 'insensitive'
        }
      },
    });

    console.log('[GRANT ACCESS] User lookup result:', user ? { id: user.id, email: user.email } : 'NOT FOUND');

    let isNewUser = false;
    let password = '';

    // 2. Create user if not exists
    if (!user) {
      isNewUser = true;
      password = generatePassword();
      console.log(`[GRANT ACCESS] Creating new user with password (length: ${password.length})`);
      
      const hashedPassword = await hash(password, 10);

      user = await prisma.user.create({
        data: {
          email: normalizedEmail, // Always store lowercase
          password: hashedPassword,
          name: normalizedEmail.split('@')[0], // Default name from email
        },
      });
      console.log(`[GRANT ACCESS] ✅ New user created: ${user.id}`);
    } else {
      console.log(`[GRANT ACCESS] User already exists, will send access granted email`);
    }

    // 3. Calculate expiration date (12 months from now)
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);

    // 4. Grant Access (Create or Update UserTraining)
    console.log(`[GRANT ACCESS] Upserting UserTraining for user ${user.id}, training ${trainingId}`);
    await prisma.userTraining.upsert({
      where: {
        userId_trainingId: {
          userId: user.id,
          trainingId: trainingId,
        },
      },
      update: {
        isActive: true,
        expiresAt: expiresAt, // Extend access if already exists
      },
      create: {
        userId: user.id,
        trainingId: trainingId,
        isActive: true,
        expiresAt: expiresAt,
      },
    });
    console.log('[GRANT ACCESS] ✅ UserTraining upserted successfully');

    // 5. Update Order with userId
    console.log(`[GRANT ACCESS] Updating order ${payuOrderId} with userId ${user.id}`);
    await prisma.order.update({
      where: { payuOrderId },
      data: { userId: user.id },
    });
    console.log('[GRANT ACCESS] ✅ Order updated with userId');

    // 6. Send Email
    const training = await prisma.training.findUnique({ where: { id: trainingId } });
    const trainingName = training?.title || 'Szkolenie';
    console.log(`[GRANT ACCESS] Training name: ${trainingName}`);

    if (isNewUser) {
      console.log(`[GRANT ACCESS] 📧 Sending WELCOME email to ${email} (new user)`);
      await sendWelcomeEmail(email, password, trainingName);
      console.log('[GRANT ACCESS] ✅ Welcome email sent');
    } else {
      console.log(`[GRANT ACCESS] 📧 Sending ACCESS GRANTED email to ${email} (existing user)`);
      await sendAccessGrantedEmail(email, trainingName);
      console.log('[GRANT ACCESS] ✅ Access granted email sent');
    }

    console.log('[GRANT ACCESS] ✅ Process completed successfully');
    console.log('==========================================');
    return { success: true, isNewUser };

  } catch (error) {
    console.error('[GRANT ACCESS] ❌ Error:', error);
    throw error;
  }
}

// ============ User Training Access Helpers ============

export interface UserTrainingAccess {
  id: string
  slug: string
  title: string
  shortDescription: string
  imageUrl: string | null
  source: 'granted' | 'purchased'
  expiresAt?: Date
}

/**
 * Get all trainings a user has access to
 * Sources: UserTraining (admin granted) + Order (user purchased)
 * Admins have access to ALL trainings automatically
 */
export async function getUserTrainings(userId: string): Promise<UserTrainingAccess[]> {
  // Check if user is admin
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { isAdmin: true }
  })

  // If admin, return ALL active trainings
  if (user?.isAdmin) {
    const allTrainings = await prisma.training.findMany({
      where: { isActive: true },
      select: {
        id: true,
        slug: true,
        title: true,
        shortDescription: true,
        imageUrl: true
      }
    })

    return allTrainings.map(training => ({
      ...training,
      source: 'granted' as const
    }))
  }

  // Non-admin users: continue with existing logic
  const trainings: UserTrainingAccess[] = []

  // Get admin-granted trainings from UserTraining
  const userTrainings = await prisma.userTraining.findMany({
    where: {
      userId,
      isActive: true,
      expiresAt: {
        gte: new Date() // Not expired
      }
    },
    include: {
      training: {
        select: {
          id: true,
          slug: true,
          title: true,
          shortDescription: true,
          imageUrl: true
        }
      }
    }
  })

  trainings.push(...userTrainings.map(ut => ({
    ...ut.training,
    source: 'granted' as const,
    expiresAt: ut.expiresAt
  })))

  // Get purchased trainings from Order
  const completedOrders = await prisma.order.findMany({
    where: {
      userId,
      status: 'COMPLETED',
      trainingId: {
        not: null
      }
    },
    include: {
      training: {
        select: {
          id: true,
          slug: true,
          title: true,
          shortDescription: true,
          imageUrl: true
        }
      }
    },
    distinct: ['trainingId'] // Unique trainings only
  })

  trainings.push(...completedOrders
    .filter(order => order.training) // Filter out null trainings
    .map(order => ({
      ...order.training!,
      source: 'purchased' as const
    })))

  // Remove duplicates (same training from both sources)
  const uniqueTrainings = trainings.reduce((acc, training) => {
    if (!acc.find(t => t.id === training.id)) {
      acc.push(training)
    }
    return acc
  }, [] as UserTrainingAccess[])

  return uniqueTrainings
}

/**
 * Check if user has access to a specific training by slug
 * Admins always have access
 */
export async function checkUserAccess(userId: string, trainingSlug: string): Promise<boolean> {
  // Check if user is admin
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { isAdmin: true }
  })

  // Admins always have access
  if (user?.isAdmin) return true

  // Get training ID from slug
  const training = await prisma.training.findUnique({
    where: { slug: trainingSlug },
    select: { id: true }
  })

  if (!training) return false

  // Check UserTraining
  const userTraining = await prisma.userTraining.findFirst({
    where: {
      userId,
      trainingId: training.id,
      isActive: true,
      expiresAt: {
        gte: new Date()
      }
    }
  })

  if (userTraining) return true

  // Check completed orders
  const completedOrder = await prisma.order.findFirst({
    where: {
      userId,
      trainingId: training.id,
      status: 'COMPLETED'
    }
  })

  return !!completedOrder
}
