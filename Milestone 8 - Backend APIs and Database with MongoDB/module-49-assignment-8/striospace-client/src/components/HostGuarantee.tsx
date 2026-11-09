"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, UserCheck, Wrench, Headphones, Check, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const assurances = [
  {
    title: "Comprehensive Liability Protection",
    description: "Every qualifying booking includes up to $1,000,000 in host property and guest liability protection against accidental damage.",
    icon: ShieldCheck,
    badge: "$1M Coverage",
  },
  {
    title: "100% Verified Profiles & Hosts",
    description: "Hosts and creators undergo strict identity verification, space certification, and professional credential checks before listing.",
    icon: UserCheck,
    badge: "Identity Certified",
  },
  {
    title: "Rigorous Equipment Safety & Inspection",
    description: "All lighting grids, electrical tie-ins, heavy grip equipment, and sound facilities are regularly inspected and certified safe for operation.",
    icon: Wrench,
    badge: "OSHA & Gear Safe",
  },
  {
    title: "24/7 Dedicated Concierge & Host Support",
    description: "Our rapid-response creator concierge is always on standby via phone, live chat, or priority dispatch for seamless shoot-day support.",
    icon: Headphones,
    badge: "Always Online",
  },
];

export default function HostGuarantee() {
  return (
    <section id="host-guarantee" className="py-20 bg-background transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-card border border-border/80 p-8 sm:p-12 lg:p-16 shadow-lg overflow-hidden relative">
          {/* Subtle Ambient Backing Glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 size-80 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 size-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          {/* Section Heading */}
          <div className="relative z-10 max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <ShieldCheck className="size-3.5" />
              StudioSpace Trust & Safety
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Host Guarantee & Creator Support
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-3 leading-relaxed">
              We stand firmly behind every shoot, rehearsal, and production session. Our industry-grade assurances keep creative hosts protected and filmmakers confident.
            </p>
          </div>

          {/* 4 Platform Assurances Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {assurances.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-muted/40 border border-border/60 hover:bg-muted/70 transition-colors"
                >
                  <div className="size-12 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                    <Icon className="size-6 stroke-[2]" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-base text-foreground">
                        {item.title}
                      </h3>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Callout banner */}
          <div className="relative z-10 mt-12 pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-orange-500 flex items-center justify-center text-white shrink-0">
                <Building2 className="size-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-foreground">
                  Ready to monetize your empty creative facility?
                </h4>
                <p className="text-xs text-muted-foreground">
                  Hosts earn an average of $3,800/month sharing unbooked shoot hours.
                </p>
              </div>
            </div>

            <Button
              className="rounded-xl px-6 bg-orange-500 hover:bg-orange-600 text-white font-medium shrink-0 cursor-pointer shadow-sm"
              asChild
            >
              <Link href="/add-studio">List Your Creative Space</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

