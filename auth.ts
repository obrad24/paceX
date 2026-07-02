import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validations/auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const parsed = loginSchema.safeParse(credentials);

          if (!parsed.success) {
            return null;
          }

          const user = await prisma.user.findUnique({
            where: { email: parsed.data.email.toLowerCase() },
            include: { profile: true },
          });

          if (!user?.password || user.banned) {
            return null;
          }

          const isValid = await bcrypt.compare(
            parsed.data.password,
            user.password,
          );

          if (!isValid) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.profile
              ? `${user.profile.firstName} ${user.profile.lastName}`
              : user.email,
            image: user.profile?.image ?? null,
            role: user.role,
            username: user.profile?.username ?? "",
            emailVerified: user.emailVerified,
          };
        } catch (error) {
          console.error("[auth] authorize failed:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id!;
        token.role = user.role;
        token.username = user.username ?? "";
        token.emailVerified = user.emailVerified ?? null;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && typeof token.id === "string") {
        session.user.id = token.id;
        session.user.role = token.role as Role;
        session.user.username = token.username as string;
        session.user.emailVerified = token.emailVerified as Date | null;
      }

      return session;
    },
  },
});
