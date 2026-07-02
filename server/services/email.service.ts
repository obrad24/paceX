export type EmailPayload = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

/**
 * Email delivery abstraction.
 * Wire RESEND_API_KEY (or another provider) in production.
 */
export async function sendEmail(payload: EmailPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    if (process.env.NODE_ENV === "development") {
      console.info("[email:dev]", {
        to: payload.to,
        subject: payload.subject,
        preview: payload.text ?? payload.html.slice(0, 200),
      });
      return;
    }

    throw new Error("Email provider is not configured");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM ?? "PaceX <noreply@pacex.app>",
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to send email");
  }
}
