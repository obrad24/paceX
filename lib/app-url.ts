/**
 * Base URL for links in emails and redirects.
 * Prefer AUTH_URL; fall back to Vercel host in production.
 */
export function getAppBaseUrl(): string {
  if (process.env.AUTH_URL?.trim()) {
    return process.env.AUTH_URL.trim().replace(/\/$/, "");
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}
