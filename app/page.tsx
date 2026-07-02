import Link from "next/link";
import { ArrowRight, Medal, Trophy, Users } from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-border/60">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.72_0.19_45/0.12),transparent_55%)]" />
          <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-4 inline-flex items-center rounded-full border border-border/60 bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                Built for competitive runners
              </p>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                Run together.
                <span className="block text-primary">Compete everywhere.</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
                PaceX turns your Strava runs into league rankings — from your city to
                the world. Create private leagues, climb leaderboards, and stay
                motivated with your crew.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/register"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
                >
                  Start for free
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-background px-5 text-sm font-medium transition-colors hover:bg-muted"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={<Trophy className="size-5 text-primary" />}
              title="Running leagues"
              description="Create public or private leagues with invite codes. Rankings update automatically after every sync."
            />
            <FeatureCard
              icon={<Users className="size-5 text-primary" />}
              title="Location leagues"
              description="Join country, region, and city leagues automatically based on your profile location."
            />
            <FeatureCard
              icon={<Medal className="size-5 text-primary" />}
              title="Achievements"
              description="Earn badges for milestones — from your first run to marathon distance and beyond."
            />
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} PaceX. Built for runners who love competition.
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-primary/10">
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}
