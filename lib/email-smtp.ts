import nodemailer from 'nodemailer';

// SMTP Configuration - supports Gmail, home.pl, or any SMTP provider
// Gmail: Use App Password (not regular password) from https://myaccount.google.com/apppasswords
// home.pl: Use your mail.mayiai.pl credentials

const smtpConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || '', // email address
    pass: process.env.SMTP_PASS || '', // password or app password
  },
};

const FROM_EMAIL = process.env.SMTP_FROM || 'Szkolenia MayiAI <hello@mayiai.pl>';

// Create transporter
const transporter = nodemailer.createTransport(smtpConfig);

export async function sendWelcomeEmail(email: string, password: string, trainingName: string) {
  console.log('==========================================');
  console.log(`📧 [NODEMAILER] Sending welcome email to ${email}`);
  console.log(`📧 [NODEMAILER] Training: ${trainingName}`);
  console.log(`📧 [NODEMAILER] SMTP Host: ${smtpConfig.host}`);
  console.log(`📧 [NODEMAILER] SMTP User: ${smtpConfig.auth.user ? 'SET' : 'NOT SET'}`);
  console.log('==========================================');

  const loginUrl = `${process.env.NEXTAUTH_URL || 'https://mayiai.pl'}/auth/login`;

  try {
    const info = await transporter.sendMail({
      from: FROM_EMAIL,
      to: email,
      subject: `🎓 Dostęp do szkolenia: ${trainingName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #7c3aed; margin: 0;">🎉 Witaj w MayiAI!</h1>
            </div>
            
            <p style="font-size: 16px; color: #333;">Dziękujemy za zakup szkolenia <strong style="color: #7c3aed;">${trainingName}</strong>.</p>
            
            <p style="font-size: 16px; color: #333;">Twoje konto zostało utworzone. Oto Twoje dane logowania:</p>
            
            <div style="background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); padding: 25px; border-radius: 10px; margin: 25px 0;">
              <p style="margin: 8px 0; color: white; font-size: 16px;">
                <strong>📧 Login:</strong> ${email}
              </p>
              <p style="margin: 8px 0; color: white; font-size: 16px;">
                <strong>🔑 Hasło:</strong> <code style="background: rgba(255,255,255,0.2); padding: 3px 8px; border-radius: 4px;">${password}</code>
              </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${loginUrl}" 
                 style="display: inline-block; background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(124,58,237,0.4);">
                ➡️ Zaloguj się teraz
              </a>
            </div>
            
            <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0;">
              <p style="margin: 0; color: #92400e; font-size: 14px;">
                ⏰ <strong>Ważne:</strong> Twój dostęp jest ważny przez 12 miesięcy od daty zakupu.
              </p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 0;">
              © 2024 MayiAI. Wszystkie prawa zastrzeżone.<br>
              Ta wiadomość została wysłana automatycznie.
            </p>
          </div>
        </body>
        </html>
      `,
      text: `
Witaj w MayiAI!

Dziękujemy za zakup szkolenia "${trainingName}".

Twoje dane logowania:
Login: ${email}
Hasło: ${password}

Zaloguj się: ${loginUrl}

Dostęp jest ważny przez 12 miesięcy.

© 2024 MayiAI
      `.trim(),
    });

    console.log(`✅ [NODEMAILER] Email sent successfully!`);
    console.log(`✅ [NODEMAILER] Message ID: ${info.messageId}`);
    console.log(`✅ [NODEMAILER] Response: ${info.response}`);
    
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error('❌ [NODEMAILER] Error sending email:', error);
    console.error('❌ [NODEMAILER] Error code:', error.code);
    console.error('❌ [NODEMAILER] Error message:', error.message);
    throw error;
  }
}

export async function sendAccessGrantedEmail(email: string, trainingName: string) {
  console.log(`📧 [NODEMAILER] Sending access granted email to ${email} for: ${trainingName}`);

  const trainingsUrl = `${process.env.NEXTAUTH_URL || 'https://mayiai.pl'}/szkolenia`;

  try {
    const info = await transporter.sendMail({
      from: FROM_EMAIL,
      to: email,
      subject: `✅ Nowy dostęp: ${trainingName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
        </head>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: white; padding: 30px; border-radius: 10px;">
            <h1 style="color: #7c3aed;">Witaj ponownie! 👋</h1>
            
            <p>Dziękujemy za zakup szkolenia <strong>${trainingName}</strong>.</p>
            
            <p>Dostęp został przypisany do Twojego istniejącego konta. Możesz zalogować się używając dotychczasowych danych.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${trainingsUrl}" 
                 style="display: inline-block; background-color: #7c3aed; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Przejdź do szkoleń
              </a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            <p style="color: #9ca3af; font-size: 12px; text-align: center;">© 2024 MayiAI</p>
          </div>
        </body>
        </html>
      `,
      text: `
Witaj ponownie!

Dziękujemy za zakup szkolenia "${trainingName}".
Dostęp został przypisany do Twojego konta.

Przejdź do szkoleń: ${trainingsUrl}

© 2024 MayiAI
      `.trim(),
    });

    console.log(`✅ [NODEMAILER] Access granted email sent. ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ [NODEMAILER] Error sending access granted email:', error);
    throw error;
  }
}

// Test SMTP connection
export async function testEmailConnection(): Promise<boolean> {
  try {
    await transporter.verify();
    console.log('✅ [NODEMAILER] SMTP connection verified successfully');
    return true;
  } catch (error) {
    console.error('❌ [NODEMAILER] SMTP connection failed:', error);
    return false;
  }
}
