import type { Metadata } from "next";

import { RegisterForm } from "@/features/auth/components/register-form";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "Create account",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <RegisterForm />
    </div>
  );
}
