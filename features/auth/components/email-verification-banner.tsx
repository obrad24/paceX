"use client";

import { Mail } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

import { resendVerificationEmailAction } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/features/auth/components/logout-button";

type EmailVerificationBannerProps = {
  email: string;
};

export function EmailVerificationBanner({ email }: EmailVerificationBannerProps) {
  const [isPending, startTransition] = useTransition();

  function handleResend() {
    startTransition(async () => {
      const result = await resendVerificationEmailAction();

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <div className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-300">
      <p>
        Verify your email address ({email}) to unlock all features. Check your
        inbox for the verification link.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={handleResend}
          disabled={isPending}
        >
          <Mail className="size-4" />
          {isPending ? "Sending..." : "Resend verification email"}
        </Button>
        <LogoutButton variant="ghost" />
      </div>
    </div>
  );
}
