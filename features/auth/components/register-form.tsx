"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { registerAction, type ActionState } from "@/actions/auth.actions";
import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: ActionState = {
  success: false,
  message: "",
};

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, initialState);

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
        title="Check your email"
        description="We sent you a verification link"
        footer={
          <>
            Already verified?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </>
        }
      >
        <p className="text-center text-sm text-muted-foreground">{state.message}</p>
        <Link
          href="/login"
          className="inline-flex h-8 w-full items-center justify-center rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
        >
          Go to sign in
        </Link>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Join PaceX"
      description="Create your account and start competing"
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form action={formAction} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="Alex"
              autoComplete="given-name"
              required
              aria-invalid={!!state.errors?.firstName}
            />
            {state.errors?.firstName ? (
              <p className="text-sm text-destructive">{state.errors.firstName[0]}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Runner"
              autoComplete="family-name"
              required
              aria-invalid={!!state.errors?.lastName}
            />
            {state.errors?.lastName ? (
              <p className="text-sm text-destructive">{state.errors.lastName[0]}</p>
            ) : null}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            placeholder="alex_runner"
            autoComplete="username"
            required
            aria-invalid={!!state.errors?.username}
          />
          {state.errors?.username ? (
            <p className="text-sm text-destructive">{state.errors.username[0]}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
            aria-invalid={!!state.errors?.email}
          />
          {state.errors?.email ? (
            <p className="text-sm text-destructive">{state.errors.email[0]}</p>
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input id="country" name="country" placeholder="Bosnia and Herzegovina" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" placeholder="Bijeljina" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
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
          {isPending ? "Creating account..." : "Create account"}
        </Button>
        {state.message && !state.success && !state.errors ? (
          <p className="text-center text-sm text-destructive">{state.message}</p>
        ) : null}
      </form>
    </AuthCard>
  );
}
