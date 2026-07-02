import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "Reset password",
};

type ResetPasswordPageProps = {
  searchParams: Promise<{ token?: string }>;
};

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const { token } = await searchParams;

  if (!token) {
    redirect("/forgot-password");
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <ResetPasswordForm token={token} />
    </div>
  );
}
