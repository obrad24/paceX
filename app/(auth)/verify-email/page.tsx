import type { Metadata } from "next";
import Link from "next/link";
import { XCircle } from "lucide-react";

import { AuthCard } from "@/components/auth/auth-card";
import { SiteHeader } from "@/components/layout/site-header";
import { VerifyEmailForm } from "@/features/auth/components/verify-email-form";
import { normalizeVerificationToken } from "@/server/services/token.service";

export const metadata: Metadata = {
  title: "Verify email",
};

type VerifyEmailPageProps = {
  searchParams: Promise<{ token?: string }>;
};

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const { token: rawToken } = await searchParams;
  const token = rawToken ? normalizeVerificationToken(rawToken) : "";

  return (
    <div className="min-h-screen">
      <SiteHeader />
      {token ? (
        <VerifyEmailForm token={token} />
      ) : (
        <AuthCard
          title="Verification failed"
          description="We could not verify your email"
          footer={
            <Link href="/login" className="font-medium text-primary hover:underline">
              Continue to sign in
            </Link>
          }
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <XCircle className="size-12 text-destructive" />
            <p className="text-sm text-muted-foreground">
              Invalid verification link. Request a new one from your dashboard.
            </p>
          </div>
        </AuthCard>
      )}
    </div>
  );
}
