import { LogOut } from "lucide-react";

import { logoutAction } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";

type LogoutButtonProps = {
  variant?: "default" | "outline" | "ghost";
  className?: string;
};

export function LogoutButton({
  variant = "outline",
  className,
}: LogoutButtonProps) {
  return (
    <form action={logoutAction}>
      <Button type="submit" variant={variant} size="sm" className={className}>
        <LogOut className="size-4" />
        Sign out
      </Button>
    </form>
  );
}
