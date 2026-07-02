import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";

import { verifyEmailAction } from "@/actions/auth.actions";
import { AuthCard } from "@/components/auth/auth-card";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "Verify email",
};

type VerifyEmailPageProps = {
  searchParams: Promise<{ token?: string }>;
};

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const { token } = await searchParams;
  const result = token
    ? await verifyEmailAction(token)
    : { success: false, message: "Invalid verification link." };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <AuthCard
        title={result.success ? "Email verified" : "Verification failed"}
        description={
          result.success
            ? "Your account is ready to use"
            : "We could not verify your email"
        }
        footer={
          <Link href="/login" className="font-medium text-primary hover:underline">
            Continue to sign in
          </Link>
        }
      >
        <div className="flex flex-col items-center gap-4 text-center">
          {result.success ? (
            <CheckCircle2 className="size-12 text-primary" />
          ) : (
            <XCircle className="size-12 text-destructive" />
          )}
          <p className="text-sm text-muted-foreground">{result.message}</p>
        </div>
      </AuthCard>
    </div>
  );
}
