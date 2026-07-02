import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

type ProfilePageProps = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const { username } = await params;
  const profile = await prisma.profile.findUnique({
    where: { username: username.toLowerCase() },
  });

  if (!profile) {
    return { title: "Profile not found" };
  }

  return {
    title: `${profile.firstName} ${profile.lastName}`,
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;

  const profile = await prisma.profile.findUnique({
    where: { username: username.toLowerCase() },
    include: { user: true },
  });

  if (!profile) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {profile.firstName} {profile.lastName}
        </h1>
        <p className="text-muted-foreground">@{profile.username}</p>
      </div>

      <div className="grid gap-4 text-sm text-muted-foreground sm:grid-cols-2">
        {profile.city || profile.country ? (
          <p>
            {[profile.city, profile.country].filter(Boolean).join(", ")}
          </p>
        ) : null}
        {profile.bio ? <p className="sm:col-span-2">{profile.bio}</p> : null}
      </div>

      <p className="text-sm text-muted-foreground">
        Full profile stats and activity history coming in the next features.
      </p>
    </div>
  );
}
