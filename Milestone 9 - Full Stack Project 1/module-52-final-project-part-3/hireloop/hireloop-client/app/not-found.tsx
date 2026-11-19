"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Briefcase,
  Compass,
  Home,
  LayoutDashboard,
  MoveRight,
  Search,
  Sparkles,
} from "lucide-react"

import globeImg from "@/app/assets/images/globe.png"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const ambientStars = [
  { cx: "8%", cy: "18%", r: 1, o: 0.45 },
  { cx: "18%", cy: "26%", r: 1.3, o: 0.65 },
  { cx: "28%", cy: "12%", r: 0.9, o: 0.4 },
  { cx: "42%", cy: "22%", r: 1.2, o: 0.55 },
  { cx: "58%", cy: "14%", r: 1, o: 0.6 },
  { cx: "72%", cy: "24%", r: 1.4, o: 0.7 },
  { cx: "84%", cy: "16%", r: 0.9, o: 0.35 },
  { cx: "92%", cy: "28%", r: 1.2, o: 0.5 },
  { cx: "12%", cy: "48%", r: 1.1, o: 0.4 },
  { cx: "88%", cy: "46%", r: 1.3, o: 0.65 },
  { cx: "22%", cy: "62%", r: 0.8, o: 0.35 },
  { cx: "78%", cy: "64%", r: 1, o: 0.45 },
] as const

const quickLinks = [
  {
    title: "Browse Active Jobs",
    description: "Explore open engineering, design, and product listings.",
    href: "/jobs",
    icon: Briefcase,
    badge: "50K+ Jobs",
  },
  {
    title: "Go to Dashboard",
    description: "View applications, saved positions, and recruiter tools.",
    href: "/dashboard",
    icon: LayoutDashboard,
    badge: "Personalized",
  },
  {
    title: "Explore Companies",
    description: "Discover top hiring organizations across the globe.",
    href: "/company",
    icon: Compass,
    badge: "12K+ Teams",
  },
] as const

export default function NotFound() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = React.useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/jobs?q=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push("/jobs")
    }
  }

  return (
    <div className="relative flex min-h-[calc(100vh-5rem)] w-full flex-col items-center justify-center overflow-hidden bg-[#010103] px-4 py-16 text-foreground selection:bg-[#5c53fe]/30 selection:text-white md:py-24">
      {/* Background Starry Nebula & Atmospheric Glows */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full"
      >
        {ambientStars.map((s, idx) => (
          <circle
            key={idx}
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            fill="#e6eeff"
            opacity={s.o}
          />
        ))}
      </svg>

      {/* Central Indigo Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5c53fe]/15 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[140px]"
      />

      {/* Subtle globe backdrop illustration aligned at bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 w-[700px] max-w-full -translate-x-1/2 opacity-25"
      >
        <Image
          src={globeImg}
          alt=""
          priority
          className="h-auto w-full object-cover"
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        {/* Status Badge */}
        <Badge
          variant="outline"
          className="mb-6 gap-2 border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-rose-500" />
          </span>
          <span className="tracking-wide">ERROR 404 &bull; PAGE NOT FOUND</span>
        </Badge>

        {/* Large Decorative 404 Headline */}
        <div className="relative my-2 select-none">
          <span className="bg-gradient-to-b from-white via-white/80 to-[#5c53fe]/60 bg-clip-text text-7xl font-extrabold tracking-tight text-transparent sm:text-8xl md:text-9xl">
            404
          </span>
          <div className="absolute -top-3 -right-6 flex size-9 items-center justify-center rounded-full border border-white/10 bg-[#16161c] text-[#5c53fe] shadow-lg shadow-[#5c53fe]/20">
            <Sparkles className="size-4 animate-pulse" />
          </div>
        </div>

        {/* Heading & Subtitle */}
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
          Lost in the Loop?
        </h1>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
          The page or job position you are looking for does not exist, has been
          relocated, or is no longer available in the database.
        </p>

        {/* Job Search Input Bar */}
        <form
          onSubmit={handleSearch}
          className="mt-8 flex w-full max-w-md items-center gap-2 rounded-xl border border-white/15 bg-[#141418]/90 p-1.5 shadow-2xl backdrop-blur-xl transition-all focus-within:border-[#5c53fe] focus-within:ring-2 focus-within:ring-[#5c53fe]/25"
        >
          <div className="flex flex-1 items-center gap-2.5 px-3">
            <Search className="size-4 text-white/50" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jobs, titles, or skills..."
              className="h-9 border-none bg-transparent p-0 text-sm text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:outline-none"
            />
          </div>
          <Button
            type="submit"
            size="sm"
            className="h-9 cursor-pointer bg-[#5c53fe] px-4 text-xs font-semibold text-white shadow-md hover:bg-[#4b42f0]"
          >
            Search
          </Button>
        </form>

        {/* Action Button Row */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="h-9 gap-1.5 border-white/15 bg-white/5 px-4 text-xs text-white/90 hover:bg-white/10"
          >
            <ArrowLeft className="size-3.5" />
            <span>Go Back</span>
          </Button>

          <Link
            href="/"
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-[#5c53fe] px-5 text-xs font-medium text-white shadow-lg shadow-[#5c53fe]/25 transition-colors hover:bg-[#4b42f0]"
          >
            <Home className="size-3.5" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-4 text-xs font-medium text-white/90 transition-colors hover:bg-white/10"
          >
            <LayoutDashboard className="size-3.5" />
            <span>Dashboard</span>
          </Link>
        </div>

        {/* Quick Discovery Cards */}
        <div className="mt-12 w-full">
          <p className="mb-4 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Popular Destinations
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {quickLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="group text-left"
              >
                <Card className="h-full border-white/10 bg-[#141418]/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#5c53fe]/50 hover:bg-[#1a1a22]/80 hover:shadow-lg hover:shadow-[#5c53fe]/10">
                  <CardContent className="flex flex-col justify-between p-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex size-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#5c53fe] group-hover:border-[#5c53fe]/40 group-hover:bg-[#5c53fe]/10">
                          <link.icon className="size-4" />
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-white/5 text-[10px] text-muted-foreground group-hover:text-white"
                        >
                          {link.badge}
                        </Badge>
                      </div>

                      <h2 className="mt-3 text-xs font-semibold text-white group-hover:text-[#5c53fe]">
                        {link.title}
                      </h2>
                      <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
                        {link.description}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center gap-1 text-[11px] font-medium text-[#5c53fe] opacity-80 group-hover:opacity-100">
                      <span>Explore</span>
                      <MoveRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
