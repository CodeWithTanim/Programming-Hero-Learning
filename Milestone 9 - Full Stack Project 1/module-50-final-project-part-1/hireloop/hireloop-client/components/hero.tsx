"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  BarChart3Icon,
  BriefcaseBusinessIcon,
  MapPinIcon,
  SearchIcon,
  StarIcon,
  UserRoundSearchIcon,
} from "lucide-react"

import globeImg from "@/app/assets/images/globe.png"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
] as const

const heroStats = [
  {
    value: "50K",
    label: "Active Jobs",
    icon: BriefcaseBusinessIcon,
  },
  {
    value: "12K",
    label: "Companies",
    icon: BarChart3Icon,
  },
  {
    value: "2M",
    label: "Job Seekers",
    icon: UserRoundSearchIcon,
  },
  {
    value: "97%",
    label: "Satisfaction Rate",
    icon: StarIcon,
  },
] as const

const skyStars = [
  { cx: "8%", cy: "36%", r: 1, o: 0.45 },
  { cx: "14%", cy: "52%", r: 1.2, o: 0.6 },
  { cx: "19%", cy: "41%", r: 0.9, o: 0.35 },
  { cx: "24%", cy: "58%", r: 1.3, o: 0.5 },
  { cx: "29%", cy: "46%", r: 1, o: 0.4 },
  { cx: "35%", cy: "55%", r: 1.1, o: 0.65 },
  { cx: "42%", cy: "49%", r: 0.9, o: 0.4 },
  { cx: "48%", cy: "53%", r: 1.2, o: 0.55 },
  { cx: "55%", cy: "47%", r: 1, o: 0.45 },
  { cx: "62%", cy: "56%", r: 1.3, o: 0.6 },
  { cx: "68%", cy: "44%", r: 0.9, o: 0.35 },
  { cx: "74%", cy: "52%", r: 1.1, o: 0.55 },
  { cx: "81%", cy: "40%", r: 1.2, o: 0.5 },
  { cx: "87%", cy: "57%", r: 1, o: 0.65 },
  { cx: "93%", cy: "45%", r: 1.1, o: 0.45 },
  { cx: "11%", cy: "66%", r: 1.1, o: 0.5 },
  { cx: "21%", cy: "69%", r: 1.4, o: 0.7 },
  { cx: "32%", cy: "63%", r: 1, o: 0.45 },
  { cx: "71%", cy: "65%", r: 1.2, o: 0.6 },
  { cx: "84%", cy: "68%", r: 1, o: 0.5 },
  { cx: "91%", cy: "62%", r: 1.3, o: 0.65 },
] as const

function BriefcaseBadgeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-4 shrink-0 sm:size-5"
    >
      <defs>
        <linearGradient
          id="hl-case-handle"
          x1="8"
          y1="2"
          x2="16"
          y2="6"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#e6eeff" />
          <stop offset="100%" stopColor="#9aaee8" />
        </linearGradient>
        <linearGradient
          id="hl-case-body"
          x1="2"
          y1="6"
          x2="22"
          y2="21"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#d97b3e" />
          <stop offset="100%" stopColor="#883f2e" />
        </linearGradient>
        <linearGradient id="hl-case-clasp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fee45a" />
          <stop offset="100%" stopColor="#fea613" />
        </linearGradient>
      </defs>
      <path
        d="M8.5 6V4.5C8.5 3.67 9.17 3 10 3h4c.83 0 1.5.67 1.5 1.5V6"
        stroke="url(#hl-case-handle)"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <rect
        x="2"
        y="6"
        width="20"
        height="14.5"
        rx="3.2"
        fill="url(#hl-case-body)"
      />
      <path
        d="M2 10.5c5.8 2.2 14.2 2.2 20 0V8.8A2.8 2.8 0 0 0 19.2 6H4.8A2.8 2.8 0 0 0 2 8.8v1.7Z"
        fill="#e0894c"
        fillOpacity="0.45"
      />
      <rect
        x="6"
        y="10.2"
        width="2.4"
        height="3.2"
        rx="0.9"
        fill="url(#hl-case-clasp)"
      />
      <rect
        x="15.6"
        y="10.2"
        width="2.4"
        height="3.2"
        rx="0.9"
        fill="url(#hl-case-clasp)"
      />
    </svg>
  )
}

/** Full-width homepage hero matching the Figma landing composition. */
export function Hero() {
  const router = useRouter()
  const [query, setQuery] = React.useState("")
  const [location, setLocation] = React.useState("")

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const params = new URLSearchParams()
    const trimmedQuery = query.trim()
    const trimmedLocation = location.trim()

    if (trimmedQuery) {
      params.set("q", trimmedQuery)
    }
    if (trimmedLocation) {
      params.set("location", trimmedLocation)
    }

    const search = params.toString()
    router.push(search ? `/jobs?${search}` : "/jobs")
  }

  return (
    <section className="relative -mt-[76px] w-full overflow-hidden bg-[#010103] pt-[76px] text-white sm:-mt-[84px] sm:pt-[84px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 h-[440px] bg-[radial-gradient(ellipse_95%_55%_at_50%_-12%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.03)_48%,transparent_80%)]" />
        <svg
          className="absolute inset-x-0 top-0 h-[880px] w-full [mask-image:linear-gradient(to_bottom,transparent_0%,black_32%,black_78%,transparent_100%)]"
          aria-hidden="true"
        >
          {skyStars.map((star, index) => (
            <circle
              key={index}
              cx={star.cx}
              cy={star.cy}
              r={star.r}
              fill="#b8b5ff"
              fillOpacity={star.o}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10">
        <div className="mx-auto flex w-full max-w-[784px] flex-col items-center pt-20 text-center sm:pt-28 lg:pt-36">
          <div className="flex items-center">
            <span
              aria-hidden="true"
              className="hidden h-px w-14 bg-gradient-to-r from-transparent to-white/25 sm:block"
            />
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-gradient-to-b from-[#252527]/85 to-[#060608]/95 px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-sm sm:gap-3 sm:px-5 sm:py-2">
              <BriefcaseBadgeIcon />
              <span className="font-mono text-xs tracking-[0.06em] uppercase sm:text-sm">
                <span className="font-bold text-white">50,000+</span>{" "}
                <span className="text-white/50">new jobs this month</span>
              </span>
            </div>
            <span
              aria-hidden="true"
              className="hidden h-px w-14 bg-gradient-to-l from-transparent to-white/25 sm:block"
            />
          </div>

          <div className="mt-6 space-y-3.5 sm:mt-7">
            <h1 className="text-3xl font-bold tracking-[-0.025em] text-white sm:text-5xl lg:text-[56px] lg:leading-[1.12]">
              Find Your Dream Job Today
            </h1>
            <p className="mx-auto max-w-[640px] text-sm leading-[1.6] text-white/60 sm:text-base lg:text-[18px]">
              HireLoop connects top talent with world-class companies. Browse
              thousands of curated opportunities and land your next role —
              faster.
            </p>
          </div>

          <form
            onSubmit={handleSearch}
            className="mt-8 flex w-full max-w-[720px] flex-col gap-2 rounded-2xl border border-white/15 bg-[#0c0c0e]/95 p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.65)] backdrop-blur-md transition focus-within:border-[#5c53fe]/75 focus-within:ring-2 focus-within:ring-[#5c53fe]/25 sm:mt-9 md:flex-row md:items-center md:gap-3 md:py-1.5 md:pr-1.5 md:pl-4"
          >
            <div className="flex flex-1 items-center gap-2.5 px-2.5 md:px-0">
              <SearchIcon
                className="size-4 shrink-0 text-white/55 sm:size-[18px]"
                aria-hidden="true"
              />
              <Input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Job title, skill or company"
                aria-label="Job title, skill or company"
                className="h-10 border-0 bg-transparent px-0 text-sm text-white shadow-none placeholder:text-white/50 focus-visible:border-transparent focus-visible:ring-0 sm:text-sm md:text-sm dark:bg-transparent"
              />
            </div>

            <Separator
              orientation="vertical"
              className="hidden h-5 self-center bg-white/15 md:block"
            />
            <Separator className="bg-white/10 md:hidden" />

            <div className="flex flex-1 items-center gap-2.5 px-2.5 md:px-0">
              <MapPinIcon
                className="size-4 shrink-0 text-white/55 sm:size-[18px]"
                aria-hidden="true"
              />
              <Input
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Location or Remote"
                aria-label="Location or Remote"
                className="h-10 border-0 bg-transparent px-0 text-sm text-white shadow-none placeholder:text-white/50 focus-visible:border-transparent focus-visible:ring-0 sm:text-sm md:text-sm dark:bg-transparent"
              />
            </div>

            <Button
              type="submit"
              aria-label="Search jobs"
              className="h-10 w-full shrink-0 rounded-xl bg-[#5c53fe]! text-white! shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_14px_rgba(92,83,254,0.4)] hover:bg-[#4e45f5]! md:size-11 md:w-11"
            >
              <SearchIcon
                className="size-4 sm:size-[18px]"
                aria-hidden="true"
              />
              <span className="md:sr-only">Search Jobs</span>
            </Button>
          </form>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
            <span className="text-xs text-white/55 sm:text-sm">
              Trending Position
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {trendingPositions.map((role) => (
                <Badge
                  key={role}
                  variant="outline"
                  render={<Link href={`/jobs?q=${encodeURIComponent(role)}`} />}
                  className="h-auto rounded-full border-white/10 bg-[#151517] px-3 py-1 text-xs font-normal text-white/80 transition-colors hover:border-white/25 [a]:hover:bg-[#222226] [a]:hover:text-white"
                >
                  {role}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mt-14 pb-16 sm:mt-16 sm:pb-20 lg:mt-20 lg:pb-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex justify-center"
          >
            <Image
              src={globeImg}
              alt=""
              loading="eager"
              className="h-auto w-[1000px] max-w-none -translate-y-[37%] [mask-image:linear-gradient(to_bottom,transparent_0%,transparent_38%,black_44%,black_90%,transparent_100%)] select-none sm:w-[1300px] lg:w-[1560px] xl:w-[1760px] 2xl:w-full"
            />
          </div>

          <h2 className="mx-auto max-w-[700px] pt-44 text-center text-2xl font-medium tracking-[-0.025em] sm:pt-60 sm:text-3xl lg:pt-72 lg:text-[40px] lg:leading-[1.25]">
            <span className="text-white/65">Assisting over </span>
            <span className="text-white">15,000 job seekers</span>
            <br className="hidden sm:block" />
            <span className="text-white/65"> find their dream positions.</span>
          </h2>

          <div className="mt-10 grid w-full grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {heroStats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-transparent! bg-[linear-gradient(180deg,#010102_35%,#1a1a1d_100%)] py-6 text-white ring-0 backdrop-blur-sm transition-colors hover:border-white/20"
                >
                  <CardContent className="flex h-full flex-col justify-between gap-14 px-6 sm:gap-16">
                    <Icon
                      className="size-6 text-white/85"
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                    <div className="space-y-2">
                      <p className="text-4xl font-semibold tracking-[-0.02em] text-white sm:text-5xl lg:text-[52px] lg:leading-[1.15]">
                        {stat.value}
                      </p>
                      <p className="text-base text-white/70 sm:text-lg">
                        {stat.label}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
