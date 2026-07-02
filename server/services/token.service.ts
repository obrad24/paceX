import { randomBytes } from "crypto";

import { prisma } from "@/lib/prisma";

const TOKEN_EXPIRY_HOURS = 24;

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

export async function verifyEmailToken(token: string) {
  const record = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!record || record.expires < new Date()) {
    return null;
  }

  const user = await prisma.user.update({
    where: { email: record.identifier },
    data: { emailVerified: new Date() },
    include: { profile: true },
  });

  await prisma.verificationToken.delete({
    where: { token },
  });

  return user;
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
