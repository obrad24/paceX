import type { Metadata } from "next";
import { Activity, Bell, MapPin, Trophy } from "lucide-react";

import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmailVerificationBanner } from "@/features/auth/components/email-verification-banner";
import { LogoutButton } from "@/features/auth/components/logout-button";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")[0] ?? "Runner";

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Good to see you, {firstName}
          </h1>
          <p className="mt-1 text-muted-foreground">
            Your running stats and leagues will appear here after Strava sync.
          </p>
          {!session?.user?.emailVerified && session?.user?.email ? (
            <EmailVerificationBanner email={session.user.email} />
          ) : null}
        </div>
        <LogoutButton className="shrink-0" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Today" value="0 km" icon={<Activity className="size-4" />} />
        <StatCard title="This week" value="0 km" icon={<MapPin className="size-4" />} />
        <StatCard title="This month" value="0 km" icon={<Trophy className="size-4" />} />
        <StatCard title="All time" value="0 km" icon={<Activity className="size-4" />} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-border/60 lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent activities</CardTitle>
            <CardDescription>Imported runs from Strava will show here</CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyState
              title="No activities yet"
              description="Connect Strava in the next feature to start syncing your runs."
            />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="size-4 text-primary" />
                My leagues
              </CardTitle>
              <CardDescription>Your active competitions</CardDescription>
            </CardHeader>
            <CardContent>
              <EmptyState
                title="No leagues yet"
                description="Location leagues and custom leagues coming soon."
              />
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="size-4 text-primary" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">You&apos;re all caught up.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="border-border/60">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardDescription>{title}</CardDescription>
        <span className="text-primary">{icon}</span>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-dashed border-border/80 bg-muted/30 px-6 py-10 text-center">
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="h-28 rounded-xl" />
      ))}
    </div>
  );
}
