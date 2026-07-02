export type EmailPayload = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

export type SendEmailResult = {
  delivered: boolean;
  devLink?: string;
};

/**
 * Email delivery abstraction.
 * Wire RESEND_API_KEY (or another provider) in production.
 */
export async function sendEmail(payload: EmailPayload): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    if (process.env.NODE_ENV === "development") {
      const preview = payload.text ?? payload.html.slice(0, 200);
      console.info("[email:dev]", {
        to: payload.to,
        subject: payload.subject,
        preview,
      });
      const linkMatch = preview.match(/https?:\/\/[^\s]+/);
      return { delivered: false, devLink: linkMatch?.[0] };
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
      from: process.env.EMAIL_FROM ?? "PaceX <onboarding@resend.dev>",
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error("[email] Resend failed:", response.status, body);

    let message = "Failed to send email";
    try {
      const parsed = JSON.parse(body) as { message?: string };
      if (parsed.message) {
        message = parsed.message;
      }
    } catch {
      // Keep generic message when response is not JSON.
    }

    throw new Error(message);
  }

  return { delivered: true };
}
