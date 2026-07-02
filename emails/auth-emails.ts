import { sendEmail } from "@/server/services/email.service";

export function verificationEmailHtml({
  name,
  verifyUrl,
}: {
  name: string;
  verifyUrl: string;
}) {
  return `
    <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
      <h1 style="color: #fc4c02;">Welcome to PaceX</h1>
      <p>Hi ${name},</p>
      <p>Verify your email address to start competing in running leagues.</p>
      <a href="${verifyUrl}" style="display: inline-block; background: #fc4c02; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
        Verify email
      </a>
      <p style="color: #666; font-size: 14px; margin-top: 24px;">
        If you did not create an account, you can safely ignore this email.
      </p>
    </div>
  `;
}

export function passwordResetEmailHtml({
  name,
  resetUrl,
}: {
  name: string;
  resetUrl: string;
}) {
  return `
    <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
      <h1 style="color: #fc4c02;">Reset your password</h1>
      <p>Hi ${name},</p>
      <p>We received a request to reset your PaceX password.</p>
      <a href="${resetUrl}" style="display: inline-block; background: #fc4c02; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
        Reset password
      </a>
      <p style="color: #666; font-size: 14px; margin-top: 24px;">
        This link expires in 1 hour. If you did not request a reset, ignore this email.
      </p>
    </div>
  `;
}

export async function sendVerificationEmail({
  email,
  name,
  token,
}: {
  email: string;
  name: string;
  token: string;
}) {
  const baseUrl = process.env.AUTH_URL ?? "http://localhost:3000";
  const verifyUrl = `${baseUrl}/verify-email?token=${token}`;

  await sendEmail({
    to: email,
    subject: "Verify your PaceX account",
    html: verificationEmailHtml({ name, verifyUrl }),
    text: `Verify your PaceX account: ${verifyUrl}`,
  });
}

export async function sendPasswordResetEmail({
  email,
  name,
  token,
}: {
  email: string;
  name: string;
  token: string;
}) {
  const baseUrl = process.env.AUTH_URL ?? "http://localhost:3000";
  const resetUrl = `${baseUrl}/reset-password?token=${token}`;

  await sendEmail({
    to: email,
    subject: "Reset your PaceX password",
    html: passwordResetEmailHtml({ name, resetUrl }),
    text: `Reset your PaceX password: ${resetUrl}`,
  });
}
