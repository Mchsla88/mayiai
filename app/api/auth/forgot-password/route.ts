import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

// Resend initialized inside handler

function generatePassword(length = 12) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let password = ''
  const randomBytes = crypto.randomBytes(length)
  
  for (let i = 0; i < length; i++) {
    password += chars[randomBytes[i] % chars.length]
  }
  
  return password
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email jest wymagany' },
        { status: 400 }
      )
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    })

    if (!user) {
      // Don't reveal if user exists
      return NextResponse.json(
        { message: 'Jeśli konto istnieje, nowe hasło zostanie wysłane na podany adres email.' },
        { status: 200 }
      )
    }

    // Generate new password
    const newPassword = generatePassword()
    const hashedPassword = await bcrypt.hash(newPassword, 12)

    // Update password in database
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword }
    })

    // Send email with new password
    try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: 'May I AI <onboarding@resend.dev>',
        to: email,
        subject: 'Resetowanie hasła - May I AI Family Expert',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Nowe hasło do Twojego konta</h2>
            <p>Witaj ${user.firstName || 'Użytkowniku'},</p>
            <p>Twoje hasło zostało zresetowane. Nowe hasło to:</p>
            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <strong style="font-size: 18px; color: #1f2937;">${newPassword}</strong>
            </div>
            <p>Ze względów bezpieczeństwa zalecamy zmianę tego hasła po zalogowaniu.</p>
            <p>Możesz zmienić hasło w swoim profilu użytkownika po zalogowaniu.</p>
            <p>Jeśli nie prosiłeś/aś o reset hasła, skontaktuj się z nami natychmiast.</p>
            <br>
            <p>Pozdrawiamy,<br>Zespół May I AI</p>
          </div>
        `
      })
    } catch (emailError) {
      console.error('Error sending reset email:', emailError)
      // Don't reveal error to user, password was already reset
    }

    return NextResponse.json(
      { message: 'Jeśli konto istnieje, nowe hasło zostanie wysłane na podany adres email.' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error in forgot password:', error)
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas resetowania hasła' },
      { status: 500 }
    )
  }
}
