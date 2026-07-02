import type { Metadata } from "next";

import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "Forgot password",
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <ForgotPasswordForm />
    </div>
  );
}
