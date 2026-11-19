"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Award,
  Bookmark,
  Briefcase,
  Calendar,
  ChevronRight,
  ExternalLink,
  Search,
  Sparkles,
} from "lucide-react"

import { SignOutButton } from "@/components/sign-out-button"
import { getUserApplications } from "@/lib/api/applications"
import { useSession } from "@/lib/auth-client"
import type { JobApplication } from "@/types/application"

/**
 * 1. Exact Refresh / Status Loop Icon from user's Figma screenshot (Row 1 & Row 4)
 */
function ActivityLoopIcon() {
  return (
    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#222228]">
      <svg
        className="size-4.5 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
        <path d="M16 16h5v5" />
      </svg>
    </div>
  )
}

/**
 * 2. Exact Green Megaphone Icon from user's Figma screenshot (Row 2 & Row 5)
 */
function ActivityMegaphoneIcon() {
  return (
    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#222228]">
      <svg
        className="size-4.5 text-[#22c55e]"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M11 5L6 9H2v6h4l5 4V5z" />
        <path
          d="M15.5 8.5a5 5 0 0 1 0 7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M19 5a10 10 0 0 1 0 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

/**
 * 3. Exact White Mail Envelope Icon from user's Figma screenshot (Row 3 & Row 6)
 */
function ActivityMailIcon() {
  return (
    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#222228]">
      <svg
        className="size-4.5 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    </div>
  )
}

export default function SeekerDashboardPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [searchQuery, setSearchQuery] = React.useState("")
  const [applications, setApplications] = React.useState<JobApplication[]>([])
  const [savedJobsCount, setSavedJobsCount] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(true)

  // 1. Fetch real user applications from MongoDB
  React.useEffect(() => {
    if (!session?.user?.email) {
      setIsLoading(false)
      return
    }

    let isMounted = true
    getUserApplications(session.user.email)
      .then((data) => {
        if (isMounted) {
          setApplications(data)
        }
      })
      .catch((err) => {
        console.error("Failed to load user applications:", err)
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [session?.user?.email])

  // 2. Read real saved jobs count from localStorage
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("hireloop_saved_jobs")
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          setSavedJobsCount(parsed.length)
        }
      }
    } catch {}
  }, [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(
        `/browse-jobs?search=${encodeURIComponent(searchQuery.trim())}`
      )
    } else {
      router.push("/browse-jobs")
    }
  }

  // Format relative timestamp from ISO date
  const getRelativeTime = (dateString?: string) => {
    if (!dateString) return "Recently"
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMinutes = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMinutes < 5) return "Just now"
    if (diffMinutes < 60) return `${diffMinutes} minutes ago`
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`
    if (diffDays === 1) return "1 day ago"
    if (diffDays < 30) return `${diffDays} days ago`
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  // Calculate real metrics from database applications
  const totalApplied = applications.length
  const interviewsCount = applications.filter((a) =>
    a.status?.toLowerCase().includes("interview")
  ).length
  const offersCount = applications.filter(
    (a) =>
      a.status?.toLowerCase().includes("offer") ||
      a.status?.toLowerCase().includes("accept")
  ).length

  // Select matching icon from Figma screenshot (Loop, Megaphone, Mail)
  const getActivityIcon = (index: number) => {
    const mod = index % 3
    if (mod === 0) return <ActivityLoopIcon />
    if (mod === 1) return <ActivityMegaphoneIcon />
    return <ActivityMailIcon />
  }

  return (
    <div className="relative min-h-[calc(100vh-3rem)] space-y-6 p-4 sm:p-6 lg:p-8">
      {/* 1. Top Header with Search and Sign Out */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            Welcome back, {session?.user?.name || "Job Seeker"}
          </h1>
          <p className="mt-0.5 text-xs text-neutral-400 sm:text-sm">
            Track your job applications, interviews, and career opportunities in
            real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <form
            onSubmit={handleSearchSubmit}
            className="relative w-full sm:w-72 md:w-80"
          >
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for opportunities..."
              className="h-10 w-full rounded-xl border border-white/10 bg-[#0d0d12] pr-4 pl-9 text-xs text-white placeholder-neutral-500 transition-colors focus:border-[#5c53fe] focus:outline-none"
            />
          </form>

          <SignOutButton
            variant="outline"
            label="Sign Out"
            className="h-10 rounded-xl border-white/10 bg-[#0d0d12] text-xs text-neutral-300 hover:bg-[#16161f] hover:text-white"
          />
        </div>
      </div>

      {/* 2. Stats Overview - 4 Bento Stat Cards (Matching Figma Circular Badges) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Saved Jobs */}
        <Link
          href="/dashboard/seeker/saved"
          className="group block rounded-2xl border border-white/5 bg-[#0d0d12] p-5 transition-all duration-200 hover:border-white/15 hover:bg-[#101017]"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-400">
              Saved Jobs
            </span>
            <div className="flex size-9 items-center justify-center rounded-full bg-[#222228] text-[#5c53fe] transition-transform group-hover:scale-105">
              <Bookmark className="size-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold tracking-tight text-white">
              {savedJobsCount}
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-neutral-400">
              <span>
                {savedJobsCount === 1
                  ? "1 job bookmarked"
                  : `${savedJobsCount} jobs bookmarked`}
              </span>
            </div>
          </div>
        </Link>

        {/* Card 2: Applications Submitted */}
        <div className="group rounded-2xl border border-white/5 bg-[#0d0d12] p-5 transition-all duration-200 hover:border-white/15 hover:bg-[#101017]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-400">
              Applications Submitted
            </span>
            <div className="flex size-9 items-center justify-center rounded-full bg-[#222228] text-emerald-400">
              <Briefcase className="size-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold tracking-tight text-white">
              {isLoading ? "..." : totalApplied}
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-neutral-400">
              <span className="font-medium text-emerald-400">
                {totalApplied === 0
                  ? "No active applications"
                  : `${totalApplied} recorded in account`}
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Interviews Scheduled */}
        <div className="group rounded-2xl border border-white/5 bg-[#0d0d12] p-5 transition-all duration-200 hover:border-white/15 hover:bg-[#101017]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-400">
              Interviews Scheduled
            </span>
            <div className="flex size-9 items-center justify-center rounded-full bg-[#222228] text-sky-400">
              <Calendar className="size-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold tracking-tight text-white">
              {interviewsCount}
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-neutral-400">
              <span>
                {interviewsCount === 0
                  ? "No upcoming interviews"
                  : `${interviewsCount} scheduled`}
              </span>
            </div>
          </div>
        </div>

        {/* Card 4: Offers Received */}
        <div className="group rounded-2xl border border-white/5 bg-[#0d0d12] p-5 transition-all duration-200 hover:border-white/15 hover:bg-[#101017]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-400">
              Offers Received
            </span>
            <div className="flex size-9 items-center justify-center rounded-full bg-[#222228] text-amber-400">
              <Award className="size-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold tracking-tight text-white">
              {offersCount}
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-neutral-400">
              <span>
                {offersCount === 0
                  ? "No formal offers yet"
                  : `${offersCount} formal offer${offersCount > 1 ? "s" : ""}`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Section: Recent Activity (Using Exact Figma Icons) */}
      <div className="rounded-2xl border border-white/5 bg-[#0d0d12] p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div>
            <h2 className="text-base font-bold text-white sm:text-lg">
              Recent Activity
            </h2>
            <p className="text-xs text-neutral-400">
              Latest application updates and tracking from your HireLoop account
            </p>
          </div>
          {applications.length > 0 && (
            <Link
              href="/dashboard/seeker/applications"
              className="inline-flex items-center gap-1 text-xs font-medium text-[#5c53fe] transition-colors hover:text-[#7871ff]"
            >
              <span>View All Applications</span>
              <ChevronRight className="size-3.5" />
            </Link>
          )}
        </div>

        {/* Content Area */}
        <div className="mt-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-12 text-sm text-neutral-400">
              <span className="mr-2 size-4 animate-spin rounded-full border-2 border-[#5c53fe] border-t-transparent" />
              Loading your activity...
            </div>
          ) : applications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ActivityLoopIcon />
              <h3 className="mt-3 text-sm font-semibold text-white">
                No recent activity yet
              </h3>
              <p className="mt-1 max-w-sm text-xs text-neutral-400">
                You haven&apos;t submitted any job applications yet. When you
                apply for positions, your live tracking, reviews, and updates
                will be listed here.
              </p>
              <Link
                href="/browse-jobs"
                className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-neutral-200"
              >
                <Sparkles className="size-3.5" />
                <span>Browse Available Jobs</span>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {applications.map((app, index) => (
                <div
                  key={app._id || app.id}
                  className="flex flex-col gap-3 py-4 first:pt-2 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-3.5">
                    {/* Exact Circular Icon from user's Figma screenshot */}
                    {getActivityIcon(index)}

                    <div className="space-y-1">
                      <p className="text-sm font-medium text-white">
                        Application for{" "}
                        <span className="font-semibold text-white">
                          {app.jobTitle}
                        </span>{" "}
                        at{" "}
                        <span className="font-semibold text-neutral-200">
                          {app.company}
                        </span>
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400">
                        <span>{getRelativeTime(app.appliedAt)}</span>
                        <span>•</span>
                        <span>Status:</span>
                        <span className="inline-flex items-center rounded-md border border-white/10 bg-[#16161f] px-2 py-0.5 text-[11px] font-semibold text-white">
                          {app.status || "Applied"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/browse-jobs/${app.jobId}`}
                    className="inline-flex shrink-0 items-center justify-center gap-1.5 self-start rounded-xl border border-white/10 bg-[#16161f] px-3.5 py-2 text-xs font-medium text-neutral-300 transition hover:bg-[#20202a] hover:text-white sm:self-center"
                  >
                    <span>View Job</span>
                    <ExternalLink className="size-3" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
