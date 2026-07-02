"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { resetPasswordAction, type ActionState } from "@/actions/auth.actions";
import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: ActionState = {
  success: false,
  message: "",
};

type ResetPasswordFormProps = {
  token: string;
};

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [state, formAction, isPending] = useActionState(
    resetPasswordAction,
    initialState,
  );

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  if (state.success) {
    return (
      <AuthCard
        title="Password updated"
        description="Your password has been reset"
        footer={
          <Link href="/login" className="font-medium text-primary hover:underline">
            Sign in with your new password
          </Link>
        }
      >
        <p className="text-center text-sm text-muted-foreground">{state.message}</p>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Reset password"
      description="Choose a new password for your account"
      footer={
        <Link href="/login" className="font-medium text-primary hover:underline">
          Back to sign in
        </Link>
      }
    >
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="token" value={token} />

        <div className="space-y-2">
          <Label htmlFor="password">New password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            required
            aria-invalid={!!state.errors?.password}
          />
          {state.errors?.password ? (
            <p className="text-sm text-destructive">{state.errors.password[0]}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            required
            aria-invalid={!!state.errors?.confirmPassword}
          />
          {state.errors?.confirmPassword ? (
            <p className="text-sm text-destructive">{state.errors.confirmPassword[0]}</p>
          ) : null}
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Updating..." : "Update password"}
        </Button>
      </form>
    </AuthCard>
  );
}
