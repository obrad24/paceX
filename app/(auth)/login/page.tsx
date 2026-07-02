import type { Metadata } from "next";

import { LoginForm } from "@/features/auth/components/login-form";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <LoginForm />
    </div>
  );
}
