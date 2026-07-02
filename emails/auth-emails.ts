import { getAppBaseUrl } from "@/lib/app-url";
import {
  sendEmail,
  type SendEmailResult,
} from "@/server/services/email.service";

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
        Open the link, then click <strong>Verify my email</strong> on the page.
      </p>
      <p style="color: #666; font-size: 14px; margin-top: 16px;">
        Or copy and paste this link into your browser:<br />
        <a href="${verifyUrl}" style="color: #fc4c02; word-break: break-all;">${verifyUrl}</a>
      </p>
      <p style="color: #666; font-size: 14px; margin-top: 16px;">
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
}): Promise<SendEmailResult> {
  const baseUrl = getAppBaseUrl();
  const verifyUrl = `${baseUrl}/verify-email?token=${token}`;

  return sendEmail({
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
  const baseUrl = getAppBaseUrl();
  const resetUrl = `${baseUrl}/reset-password?token=${token}`;

  await sendEmail({
    to: email,
    subject: "Reset your PaceX password",
    html: passwordResetEmailHtml({ name, resetUrl }),
    text: `Reset your PaceX password: ${resetUrl}`,
  });
}
