import { randomBytes } from "crypto";

import { prisma } from "@/lib/prisma";

const TOKEN_EXPIRY_HOURS = 24;

export function normalizeVerificationToken(token: string): string {
  return decodeURIComponent(token).trim().replace(/\s+/g, "");
}

export async function createVerificationToken(email: string) {
  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + TOKEN_EXPIRY_HOURS * 60 * 60 * 1000);

  await prisma.verificationToken.deleteMany({
    where: { identifier: email },
  });

  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  });

  return token;
}

export type VerifyEmailResult = {
  user: Awaited<ReturnType<typeof prisma.user.findUnique>> & {
    profile: Awaited<ReturnType<typeof prisma.profile.findUnique>>;
  };
  alreadyVerified: boolean;
};

export async function verifyEmailToken(
  rawToken: string,
): Promise<VerifyEmailResult | null> {
  const token = normalizeVerificationToken(rawToken);

  if (!token) {
    return null;
  }

  const record = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!record) {
    return null;
  }

  if (record.expires < new Date()) {
    await prisma.verificationToken.delete({ where: { token } }).catch(() => {});
    return null;
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: record.identifier },
    include: { profile: true },
  });

  if (!existingUser) {
    return null;
  }

  if (existingUser.emailVerified) {
    await prisma.verificationToken.delete({ where: { token } }).catch(() => {});
    return { user: existingUser, alreadyVerified: true };
  }

  const user = await prisma.user.update({
    where: { email: record.identifier },
    data: { emailVerified: new Date() },
    include: { profile: true },
  });

  await prisma.verificationToken.delete({
    where: { token },
  });

  return { user, alreadyVerified: false };
}

export async function createPasswordResetToken(email: string) {
  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 60 * 60 * 1000);

  await prisma.passwordResetToken.deleteMany({
    where: { email },
  });

  await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return token;
}

export async function verifyPasswordResetToken(token: string) {
  const record = await prisma.passwordResetToken.findUnique({
    where: { token },
  });

  if (!record || record.expires < new Date()) {
    return null;
  }

  return record;
}

export async function deletePasswordResetToken(token: string) {
  await prisma.passwordResetToken.delete({
    where: { token },
  });
}
