import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = 'Szkolenia <onboarding@resend.dev>'; // TODO: Update with user's domain

export async function sendWelcomeEmail(email: string, password: string, trainingName: string) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Dostęp do szkolenia: ${trainingName}`,
      html: `
        <h1>Witaj!</h1>
        <p>Dziękujemy za zakup szkolenia <strong>${trainingName}</strong>.</p>
        <p>Twoje konto zostało utworzone. Oto Twoje dane logowania:</p>
        <ul>
          <li><strong>Login:</strong> ${email}</li>
          <li><strong>Hasło:</strong> ${password}</li>
        </ul>
        <p>Możesz zalogować się tutaj: <a href="${process.env.NEXT_PUBLIC_APP_URL}/login">Zaloguj się</a></p>
        <p>Dostęp jest ważny przez 12 miesięcy.</p>
      `,
    });
  } catch (error) {
    console.error('Failed to send welcome email:', error);
  }
}

export async function sendAccessGrantedEmail(email: string, trainingName: string) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Nowy dostęp: ${trainingName}`,
      html: `
        <h1>Witaj ponownie!</h1>
        <p>Dziękujemy za zakup szkolenia <strong>${trainingName}</strong>.</p>
        <p>Dostęp został przypisany do Twojego istniejącego konta.</p>
        <p>Możesz przejść do szkolenia tutaj: <a href="${process.env.NEXT_PUBLIC_APP_URL}/szkolenia">Twoje szkolenia</a></p>
      `,
    });
  } catch (error) {
    console.error('Failed to send access granted email:', error);
  }
}
