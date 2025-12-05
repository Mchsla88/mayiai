import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_123456789');

// Use mayiai.pl domain for production emails
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Szkolenia MayiAI <hello@mayiai.pl>';

export async function sendWelcomeEmail(email: string, password: string, trainingName: string) {
  console.log(`📧 Sending welcome email to ${email} for training: ${trainingName}`);
  
  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Dostęp do szkolenia: ${trainingName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #7c3aed;">Witaj!</h1>
          <p>Dziękujemy za zakup szkolenia <strong>${trainingName}</strong>.</p>
          <p>Twoje konto zostało utworzone. Oto Twoje dane logowania:</p>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Login:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong>Hasło:</strong> ${password}</p>
          </div>
          <a href="${process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL}/auth/login" 
             style="display: inline-block; background-color: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">
            Zaloguj się
          </a>
          <p>Dostęp jest ważny przez 12 miesięcy.</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          <p style="color: #9ca3af; font-size: 12px;">© 2024 MayiAI. Wszystkie prawa zastrzeżone.</p>
        </div>
      `,
    });
    console.log(`✅ Welcome email sent successfully to ${email}`, result);
    return result;
  } catch (error) {
    console.error(`❌ Failed to send welcome email to ${email}:`, error);
    throw error;
  }
}

export async function sendAccessGrantedEmail(email: string, trainingName: string) {
  console.log(`📧 Sending access granted email to ${email} for training: ${trainingName}`);
  
  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Nowy dostęp: ${trainingName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #7c3aed;">Witaj ponownie!</h1>
          <p>Dziękujemy za zakup szkolenia <strong>${trainingName}</strong>.</p>
          <p>Dostęp został przypisany do Twojego istniejącego konta.</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL}/szkolenia" 
             style="display: inline-block; background-color: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">
            Przejdź do szkoleń
          </a>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          <p style="color: #9ca3af; font-size: 12px;">© 2024 MayiAI. Wszystkie prawa zastrzeżone.</p>
        </div>
      `,
    });
    console.log(`✅ Access granted email sent successfully to ${email}`, result);
    return result;
  } catch (error) {
    console.error(`❌ Failed to send access granted email to ${email}:`, error);
    throw error;
  }
}

export async function sendWelcomeEmailAdmin(email: string, password: string, userName: string) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: '🎉 Twoje konto zostało utworzone - Twoje Szkolenia',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed;">Witaj ${userName}!</h2>
          
          <p>Administrator utworzył dla Ciebie konto na platformie <strong>Twoje Szkolenia</strong>.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Twoje dane do logowania:</h3>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong>Hasło:</strong> ${password}</p>
          </div>
          
          <p style="background-color: #fef3c7; padding: 12px; border-left: 4px solid #f59e0b; border-radius: 4px;">
            ⚠️ <strong>Ważne:</strong> Ze względów bezpieczeństwa zalecamy zmianę hasła po pierwszym logowaniu.
          </p>
          
          <a href="${process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || 'https://twoje-szkolenia.abacusai.app'}/auth/login" 
             style="display: inline-block; background-color: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">
            Zaloguj się teraz
          </a>
          
          <p style="color: #6b7280; margin-top: 30px;">
            Możesz zmienić hasło w ustawieniach konta po zalogowaniu.
          </p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <p style="color: #9ca3af; font-size: 12px;">
            Otrzymujesz tę wiadomość, ponieważ administrator utworzył dla Ciebie konto na platformie Twoje Szkolenia.<br>
            © 2024 Twoje Szkolenia. Wszystkie prawa zastrzeżone.
          </p>
        </div>
      `,
    });
    
    console.log(`✅ Welcome email (admin) sent to ${email}`);
  } catch (error) {
    console.error('❌ Error sending welcome email (admin):', error);
    throw error;
  }
}
