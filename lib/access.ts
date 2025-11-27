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
