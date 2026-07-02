"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

import { signIn } from "@/auth";
import { sendVerificationEmail } from "@/emails/auth-emails";
import { prisma } from "@/lib/prisma";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "@/lib/validations/auth";
import {
  createPasswordResetToken,
  createVerificationToken,
  deletePasswordResetToken,
  verifyEmailToken,
  verifyPasswordResetToken,
} from "@/server/services/token.service";
import { sendPasswordResetEmail } from "@/emails/auth-emails";

export type ActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

function fieldErrors(error: {
  flatten: () => { fieldErrors: Record<string, string[]> };
}) {
  return error.flatten().fieldErrors;
}

export async function registerAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const raw = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    country: formData.get("country") || undefined,
    city: formData.get("city") || undefined,
  };

  const parsed = registerSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: fieldErrors(parsed.error),
    };
  }

  const email = parsed.data.email.toLowerCase();
  const username = parsed.data.username.toLowerCase();

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return {
      success: false,
      message: "An account with this email already exists.",
      errors: { email: ["Email is already registered"] },
    };
  }

  const existingUsername = await prisma.profile.findUnique({
    where: { username },
  });
  if (existingUsername) {
    return {
      success: false,
      message: "This username is already taken.",
      errors: { username: ["Username is already taken"] },
    };
  }

  const hashedPassword = await bcrypt.hash(parsed.data.password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      profile: {
        create: {
          firstName: parsed.data.firstName,
          lastName: parsed.data.lastName,
          username,
          country: parsed.data.country,
          city: parsed.data.city,
        },
      },
    },
    include: { profile: true },
  });

  const token = await createVerificationToken(email);

  try {
    await sendVerificationEmail({
      email,
      name: parsed.data.firstName,
      token,
    });
  } catch {
    // Registration succeeds even if email delivery fails in dev.
  }

  return {
    success: true,
    message: `Welcome to PaceX, ${user.profile?.firstName}! Check your email to verify your account, then sign in.`,
  };
}

export async function loginAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = loginSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid credentials.",
      errors: fieldErrors(parsed.error),
    };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email.toLowerCase(),
      password: parsed.data.password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof AuthError) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }

  return { success: true, message: "Signed in successfully." };
}

export async function forgotPasswordAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = forgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Please enter a valid email address.",
      errors: fieldErrors(parsed.error),
    };
  }

  const email = parsed.data.email.toLowerCase();
  const user = await prisma.user.findUnique({
    where: { email },
    include: { profile: true },
  });

  if (user) {
    const token = await createPasswordResetToken(email);

    try {
      await sendPasswordResetEmail({
        email,
        name: user.profile?.firstName ?? "Runner",
        token,
      });
    } catch {
      // Avoid leaking whether email exists.
    }
  }

  return {
    success: true,
    message:
      "If an account exists for that email, we sent password reset instructions.",
  };
}

export async function resetPasswordAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const token = formData.get("token");

  if (typeof token !== "string" || !token) {
    return {
      success: false,
      message: "Invalid or missing reset token.",
    };
  }

  const parsed = resetPasswordSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: fieldErrors(parsed.error),
    };
  }

  const record = await verifyPasswordResetToken(token);

  if (!record) {
    return {
      success: false,
      message: "This reset link is invalid or has expired.",
    };
  }

  const hashedPassword = await bcrypt.hash(parsed.data.password, 12);

  await prisma.user.update({
    where: { email: record.email },
    data: { password: hashedPassword },
  });

  await deletePasswordResetToken(token);

  return {
    success: true,
    message: "Password updated. You can now sign in with your new password.",
  };
}

export async function verifyEmailAction(token: string): Promise<ActionState> {
  if (!token) {
    return {
      success: false,
      message: "Invalid verification link.",
    };
  }

  const user = await verifyEmailToken(token);

  if (!user) {
    return {
      success: false,
      message: "This verification link is invalid or has expired.",
    };
  }

  return {
    success: true,
    message: "Email verified successfully. You can now sign in.",
  };
}

export async function logoutAction() {
  const { signOut } = await import("@/auth");
  await signOut({ redirectTo: "/" });
}
