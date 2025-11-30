import { prisma } from '@/lib/db';
import { hash } from 'bcryptjs';
import { sendWelcomeEmail, sendAccessGrantedEmail } from '@/lib/email';
import crypto from 'crypto';

// Helper to generate random password
function generatePassword(length = 12) {
  return crypto.randomBytes(length).toString('hex').slice(0, length);
}

export async function grantAccess(email: string, trainingId: string, payuOrderId: string) {
  try {
    // 1. Check if user exists
    let user = await prisma.user.findUnique({
      where: { email },
    });

    let isNewUser = false;
    let password = '';

    // 2. Create user if not exists
    if (!user) {
      isNewUser = true;
      password = generatePassword();
      const hashedPassword = await hash(password, 10);

      user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: email.split('@')[0], // Default name from email
        },
      });
    }

    // 3. Calculate expiration date (12 months from now)
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);

    // 4. Grant Access (Create or Update UserTraining)
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

    // 5. Update Order with userId
    await prisma.order.update({
      where: { payuOrderId },
      data: { userId: user.id },
    });

    // 6. Send Email
    const training = await prisma.training.findUnique({ where: { id: trainingId } });
    const trainingName = training?.title || 'Szkolenie';

    if (isNewUser) {
      await sendWelcomeEmail(email, password, trainingName);
    } else {
      await sendAccessGrantedEmail(email, trainingName);
    }

    return { success: true, isNewUser };

  } catch (error) {
    console.error('Error granting access:', error);
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
 */
export async function getUserTrainings(userId: string): Promise<UserTrainingAccess[]> {
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
 */
export async function checkUserAccess(userId: string, trainingSlug: string): Promise<boolean> {
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
