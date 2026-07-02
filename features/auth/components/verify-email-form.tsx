"use client";

import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import { useState, useTransition } from "react";

import { verifyEmailAction, type ActionState } from "@/actions/auth.actions";
import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";

type VerifyEmailFormProps = {
  token: string;
};

export function VerifyEmailForm({ token }: VerifyEmailFormProps) {
  const [result, setResult] = useState<ActionState | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleVerify() {
    startTransition(async () => {
      const response = await verifyEmailAction(token);
      setResult(response);
    });
  }

  if (result) {
    return (
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
    );
  }

  return (
    <AuthCard
      title="Verify your email"
      description="Confirm your PaceX account"
      footer={
        <Link href="/login" className="font-medium text-primary hover:underline">
          Back to sign in
        </Link>
      }
    >
      <div className="space-y-4 text-center">
        <p className="text-sm text-muted-foreground">
          Click the button below to verify your email address. This extra step
          prevents email apps from using your link before you do.
        </p>
        <Button
          type="button"
          className="w-full"
          onClick={handleVerify}
          disabled={isPending}
        >
          {isPending ? "Verifying..." : "Verify my email"}
        </Button>
      </div>
    </AuthCard>
  );
}
