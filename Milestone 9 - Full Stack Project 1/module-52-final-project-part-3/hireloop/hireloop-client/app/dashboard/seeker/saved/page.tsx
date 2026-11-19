"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Banknote,
  Bell,
  Bookmark,
  Building2,
  ChevronDown,
  Clock,
  FileText,
  MapPin,
  Plus,
  Search,
  Sparkles,
  Timer,
  UploadCloud,
  XCircle,
} from "lucide-react"
import { toast } from "@/components/ui/toast"

import { getUserApplications } from "@/lib/api/applications"
import { getJobsByIds } from "@/lib/api/jobs"
import { useSession } from "@/lib/auth-client"
import type { JobListing } from "@/types/job"

/**
 * Pixel-matched Company Logo matching Figma designs
 * (Cube for TechFlow/general, Triangle for Vercel, Bloom for Linear, Infinity for Meta, Leaf for Spotify)
 */
function CompanyBrandLogo({
  company,
  title,
}: {
  company?: string
  title?: string
}) {
  const comp = (company || "").toLowerCase()
  const tit = (title || "").toLowerCase()

  if (comp.includes("vercel") || tit.includes("frontend")) {
    return (
      <svg
        className="size-5 text-white"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2L2 22h20L12 2z" />
      </svg>
    )
  }

  if (comp.includes("meta") || tit.includes("full stack")) {
    return (
      <svg
        className="size-5 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
      >
        <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.067-8-12.356-8-5.096 0-5.096 8 0 8 5.289 0 7.26-8 12.356-8z" />
      </svg>
    )
  }

  if (
    comp.includes("linear") ||
    tit.includes("ux") ||
    tit.includes("research")
  ) {
    return (
      <svg
        className="size-5 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="2.5" />
        <circle cx="12" cy="5" r="1.5" />
        <circle cx="12" cy="19" r="1.5" />
        <circle cx="5" cy="12" r="1.5" />
        <circle cx="19" cy="12" r="1.5" />
        <circle cx="7" cy="7" r="1.5" />
        <circle cx="17" cy="17" r="1.5" />
        <circle cx="7" cy="17" r="1.5" />
        <circle cx="17" cy="7" r="1.5" />
      </svg>
    )
  }

  if (
    comp.includes("spotify") ||
    tit.includes("design system") ||
    tit.includes("lead")
  ) {
    return (
      <svg
        className="size-5 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 20h10" />
        <path d="M10 20c0-4.4 2-8 5-11-2-1-4-1-6 0-3 1.5-4 5.5-3 9" />
        <path d="M14 20c0-2.8-.7-5.5-2-8-1-1.8-2.6-3-4.5-3.5" />
      </svg>
    )
  }

  // Default 3D Cube Icon (matches TechFlow in Figma)
  return (
    <svg
      className="size-5 text-white"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  )
}

export default function SeekerSavedJobsPage() {
  const router = useRouter()
  const { data: session } = useSession()

  const [savedJobIds, setSavedJobIds] = React.useState<string[]>([])
  const [savedMeta, setSavedMeta] = React.useState<
    Record<string, { savedAt: string }>
  >({})
  const [jobs, setJobs] = React.useState<JobListing[]>([])
  const [appliedJobIds, setAppliedJobIds] = React.useState<Set<string>>(
    () => new Set()
  )
  const [isLoading, setIsLoading] = React.useState(true)

  // Filters & Controls
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("all")
  const [sortBy, setSortBy] = React.useState<
    "recent" | "deadline" | "salary" | "title"
  >("recent")
  const [visibleCount, setVisibleCount] = React.useState(5)

  // Resume upload state
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)
  const [uploadedResume, setUploadedResume] = React.useState<string | null>(
    null
  )

  // 1. Load bookmarked IDs and metadata from localStorage
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("hireloop_saved_jobs")
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          setSavedJobIds(parsed)
        }
      }

      const metaStored = localStorage.getItem("hireloop_saved_jobs_meta")
      if (metaStored) {
        const parsedMeta = JSON.parse(metaStored)
        if (typeof parsedMeta === "object" && parsedMeta !== null) {
          setSavedMeta(parsedMeta)
        }
      }

      const resumeStored = localStorage.getItem("hireloop_seeker_resume")
      if (resumeStored) {
        setUploadedResume(resumeStored)
      }
    } catch (e) {
      console.error("Failed to read localStorage:", e)
    }
  }, [])

  // 2. Fetch full job listings from MongoDB for the bookmarked IDs
  React.useEffect(() => {
    if (savedJobIds.length === 0) {
      setJobs([])
      setIsLoading(false)
      return
    }

    let isMounted = true
    setIsLoading(true)

    getJobsByIds(savedJobIds)
      .then((data) => {
        if (isMounted) {
          setJobs(data)
        }
      })
      .catch((err) => {
        console.error("Failed to fetch saved jobs:", err)
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [savedJobIds])

  // 3. Check user applications to identify already applied jobs
  React.useEffect(() => {
    if (!session?.user?.email) return

    let isMounted = true
    getUserApplications(session.user.email)
      .then((apps) => {
        if (isMounted) {
          const applied = new Set<string>()
          apps.forEach((app) => {
            if (app.jobId) applied.add(app.jobId)
          })
          setAppliedJobIds(applied)
        }
      })
      .catch(() => {})

    return () => {
      isMounted = false
    }
  }, [session?.user?.email])

  // Unsave a job
  const handleUnsave = (id?: string, title?: string) => {
    if (!id) return
    const nextIds = savedJobIds.filter((item) => item !== id)
    setSavedJobIds(nextIds)
    setJobs((prev) => prev.filter((j) => (j._id || j.id) !== id))

    try {
      localStorage.setItem("hireloop_saved_jobs", JSON.stringify(nextIds))
      const nextMeta = { ...savedMeta }
      delete nextMeta[id]
      localStorage.setItem("hireloop_saved_jobs_meta", JSON.stringify(nextMeta))
      setSavedMeta(nextMeta)
    } catch {}

    toast.info("Removed from Saved Jobs", {
      description: `"${title || "Job"}" has been removed from your saved list.`,
    })
  }

  // Handle Resume File Upload
  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadedResume(file.name)
    try {
      localStorage.setItem("hireloop_seeker_resume", file.name)
    } catch {}

    toast.success("Resume Uploaded Successfully", {
      description: `"${file.name}" is now saved to your profile for 1-click applications.`,
    })
  }

  // Calculate relative saved time
  const getSavedTimeAgo = (jobId?: string) => {
    if (!jobId) return "Saved recently"
    const metaDate = savedMeta[jobId]?.savedAt
    const targetDate = metaDate ? new Date(metaDate) : new Date()

    const now = new Date()
    const diffMs = now.getTime() - targetDate.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffHours < 1) return "Saved just now"
    if (diffHours < 24)
      return `Saved ${diffHours} hour${diffHours > 1 ? "s" : ""} ago`
    if (diffDays === 1) return "Saved yesterday"
    if (diffDays < 30) return `Saved ${diffDays} days ago`
    return `Saved on ${targetDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })}`
  }

  // Calculate deadline status
  const getDeadlineStatus = (job: JobListing) => {
    const status = (job.status || "Active").toLowerCase()
    if (status === "closed") {
      return { isClosed: true, label: "Closed yesterday" }
    }

    if (!job.deadline) return null
    const deadlineDate = new Date(job.deadline)
    if (isNaN(deadlineDate.getTime())) return null

    const now = new Date()
    const diffMs = deadlineDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays < 0) {
      return { isClosed: true, label: "Closed yesterday" }
    }
    if (diffDays <= 3) {
      return {
        isClosingSoon: true,
        label: `Closes in ${diffDays} day${diffDays === 1 ? "" : "s"}`,
      }
    }
    if (diffDays <= 7) {
      return { isClosingSoon: true, label: `Closes in ${diffDays} days` }
    }
    return {
      isClosingSoon: false,
      label: `Closes ${deadlineDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })}`,
    }
  }

  // Format salary
  const formatSalary = (min?: number | string, max?: number | string) => {
    if (!min && !max) return "Competitive Salary"
    const formatNum = (val: number) => {
      if (val >= 1000) return `$${Math.round(val / 1000)}k`
      return `$${val}`
    }

    const minNum = min ? Number(min) : undefined
    const maxNum = max ? Number(max) : undefined

    if (minNum && maxNum) {
      return `${formatNum(minNum)} - ${formatNum(maxNum)}`
    }
    if (minNum) return `From ${formatNum(minNum)}`
    if (maxNum) return `Up to ${formatNum(maxNum)}`
    return "Competitive Salary"
  }

  // Dynamic Categories calculation from real saved jobs
  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = {}
    jobs.forEach((job) => {
      const cat = job.category || "Other"
      // Clean up category labels e.g. "Engineering & Tech" -> "Engineering"
      const shortCat = cat.split("&")[0].trim()
      counts[shortCat] = (counts[shortCat] || 0) + 1
    })
    return counts
  }, [jobs])

  // Count closing soon jobs (within 7 days)
  const closingSoonCount = React.useMemo(() => {
    return jobs.filter((job) => {
      const deadline = getDeadlineStatus(job)
      return deadline?.isClosingSoon
    }).length
  }, [jobs])

  // Filter and Sort Jobs
  const filteredAndSortedJobs = React.useMemo(() => {
    let result = [...jobs]

    // 1. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(q) ||
          job.company.toLowerCase().includes(q) ||
          (job.location && job.location.toLowerCase().includes(q)) ||
          (job.category && job.category.toLowerCase().includes(q)) ||
          (job.requirements && job.requirements.toLowerCase().includes(q))
      )
    }

    // 2. Category Filter
    if (selectedCategory !== "all") {
      result = result.filter((job) => {
        const cat = (job.category || "").split("&")[0].trim().toLowerCase()
        return cat === selectedCategory.toLowerCase()
      })
    }

    // 3. Sort Order
    result.sort((a, b) => {
      const aId = a._id || a.id || ""
      const bId = b._id || b.id || ""

      if (sortBy === "recent") {
        const aTime = savedMeta[aId]?.savedAt
          ? new Date(savedMeta[aId].savedAt).getTime()
          : 0
        const bTime = savedMeta[bId]?.savedAt
          ? new Date(savedMeta[bId].savedAt).getTime()
          : 0
        return bTime - aTime
      }

      if (sortBy === "deadline") {
        const aDate = a.deadline ? new Date(a.deadline).getTime() : Infinity
        const bDate = b.deadline ? new Date(b.deadline).getTime() : Infinity
        return aDate - bDate
      }

      if (sortBy === "salary") {
        const aSalary = a.maxSalary ? Number(a.maxSalary) : 0
        const bSalary = b.maxSalary ? Number(b.maxSalary) : 0
        return bSalary - aSalary
      }

      if (sortBy === "title") {
        return a.title.localeCompare(b.title)
      }

      return 0
    })

    return result
  }, [jobs, searchQuery, selectedCategory, sortBy, savedMeta])

  // Paginated slice
  const displayedJobs = filteredAndSortedJobs.slice(0, visibleCount)
  const hasMore = visibleCount < filteredAndSortedJobs.length

  return (
    <div className="relative min-h-[calc(100vh-3rem)] space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Hidden File Input for Resume Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleResumeChange}
        accept=".pdf,.doc,.docx"
        className="hidden"
      />

      {/* 1. Top Header Bar: Search, Notification Bell, Upload Resume */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search input with matching Figma styling */}
        <div className="relative w-full sm:w-80 md:w-96">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search jobs, companies, or skills..."
            className="h-10 w-full rounded-xl border border-white/10 bg-[#0d0d12] pr-4 pl-10 text-xs text-white placeholder-neutral-500 transition-colors focus:border-[#5c53fe] focus:outline-none"
          />
        </div>

        {/* Right Action Icons: Notification Bell & Upload Resume */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Notification Bell */}
          <button
            type="button"
            onClick={() => {
              if (closingSoonCount > 0) {
                toast.info("Saved Jobs Update", {
                  description: `You have ${closingSoonCount} bookmarked position${closingSoonCount > 1 ? "s" : ""} closing within 7 days.`,
                })
              } else {
                toast.info("Notifications", {
                  description:
                    "You are all caught up with your saved opportunities.",
                })
              }
            }}
            title="Notifications"
            className="relative flex size-10 items-center justify-center rounded-xl border border-white/10 bg-[#0d0d12] text-neutral-300 transition-colors hover:border-white/20 hover:text-white"
          >
            <Bell className="size-4.5" />
            {closingSoonCount > 0 && (
              <span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-[#5c53fe]" />
            )}
          </button>

          {/* Upload Resume Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-[#0d0d12] px-4 text-xs font-semibold text-white transition-all hover:border-white/20 hover:bg-[#16161f]"
          >
            <Plus className="size-3.5 text-neutral-300" />
            <span>{uploadedResume ? "Update Resume" : "Upload Resume"}</span>
          </button>
        </div>
      </div>

      {/* 2. Page Header: Title + Subtitle and 2 Bento Stat Cards */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: Title & Subtitle */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Saved Jobs
          </h1>
          <p className="mt-1 text-xs text-neutral-400 sm:text-sm">
            Manage and track your bookmarked opportunities.
          </p>
        </div>

        {/* Right: 2 Bento Stat Cards matching Figma */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:w-auto">
          {/* Card 1: Total Saved */}
          <div className="flex min-w-[150px] items-center gap-3.5 rounded-2xl border border-white/5 bg-[#0d0d12] p-4 transition-colors hover:border-white/10 sm:min-w-[180px]">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-[#16161f] text-white">
              <Bookmark className="size-5 fill-current" />
            </div>
            <div>
              <span className="block text-[11px] font-medium text-neutral-400">
                Total Saved
              </span>
              <span className="text-2xl font-bold tracking-tight text-white">
                {isLoading ? "..." : jobs.length}
              </span>
            </div>
          </div>

          {/* Card 2: Closing Soon */}
          <div className="flex min-w-[150px] items-center gap-3.5 rounded-2xl border border-white/5 bg-[#0d0d12] p-4 transition-colors hover:border-white/10 sm:min-w-[180px]">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-[#16161f] text-amber-500">
              <Timer className="size-5" />
            </div>
            <div>
              <span className="block text-[11px] font-medium text-neutral-400">
                Closing Soon
              </span>
              <span className="text-2xl font-bold tracking-tight text-white">
                {isLoading ? "..." : closingSoonCount}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Filter and Sort Toolbar matching Figma */}
      <div className="flex flex-col gap-4 border-b border-white/5 pb-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {/* All Saved */}
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
              selectedCategory === "all"
                ? "border border-white/10 bg-[#16161f] text-white shadow-xs"
                : "border border-transparent text-neutral-400 hover:bg-[#16161f]/60 hover:text-white"
            }`}
          >
            All Saved
          </button>

          {/* Dynamic Categories */}
          {Object.entries(categoryCounts).map(([cat, count]) => {
            const isSelected =
              selectedCategory.toLowerCase() === cat.toLowerCase()
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  isSelected
                    ? "border border-white/10 bg-[#16161f] text-white shadow-xs"
                    : "border border-transparent text-neutral-400 hover:bg-[#16161f]/60 hover:text-white"
                }`}
              >
                {cat} ({count})
              </button>
            )
          })}
        </div>

        {/* Right: Sort By Selector */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs text-neutral-400">Sort by:</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as "recent" | "deadline" | "salary" | "title"
                )
              }
              aria-label="Sort saved jobs"
              className="h-8.5 appearance-none rounded-xl border border-white/10 bg-[#0d0d12] pr-8 pl-3 text-xs font-medium text-white transition-colors hover:border-white/20 focus:border-[#5c53fe] focus:outline-none"
            >
              <option value="recent">Recently Saved</option>
              <option value="deadline">Closing Soonest</option>
              <option value="salary">Highest Salary</option>
              <option value="title">Title (A-Z)</option>
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2 text-neutral-400" />
          </div>
        </div>
      </div>

      {/* 4. Saved Job Card List */}
      <div>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="size-6 animate-spin rounded-full border-2 border-[#5c53fe] border-t-transparent" />
            <p className="mt-3 text-xs text-neutral-400">
              Loading your bookmarked positions...
            </p>
          </div>
        ) : jobs.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#0d0d12] p-12 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-[#16161f] text-neutral-400">
              <Bookmark className="size-6" />
            </div>
            <h3 className="mt-4 text-base font-bold text-white">
              No saved jobs yet
            </h3>
            <p className="mt-1.5 max-w-sm text-xs text-neutral-400">
              Browse through our open positions and click the bookmark icon on
              any job card to save it for later review and fast application.
            </p>
            <Link
              href="/browse-jobs"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-bold text-black transition-colors hover:bg-neutral-200"
            >
              <Sparkles className="size-3.5" />
              <span>Browse Available Jobs</span>
            </Link>
          </div>
        ) : filteredAndSortedJobs.length === 0 ? (
          /* Filter Empty State */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-[#0d0d12] p-10 text-center">
            <Search className="size-8 text-neutral-500" />
            <h3 className="mt-3 text-sm font-semibold text-white">
              No matching saved jobs found
            </h3>
            <p className="mt-1 text-xs text-neutral-400">
              Try adjusting your search terms or selecting another category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
              }}
              className="mt-4 rounded-xl border border-white/10 bg-[#16161f] px-3.5 py-1.5 text-xs font-medium text-white hover:bg-[#20202a]"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          /* Saved Jobs List */
          <div className="space-y-3">
            {displayedJobs.map((job) => {
              const jobId = job._id || job.id || ""
              const hasApplied = appliedJobIds.has(jobId)
              const deadline = getDeadlineStatus(job)
              const isClosed = deadline?.isClosed
              const isClosingSoon = deadline?.isClosingSoon
              const savedTimeAgo = getSavedTimeAgo(jobId)
              const salaryString = formatSalary(job.minSalary, job.maxSalary)
              const locationString = job.location
                ? `${job.location}${job.isRemote ? " (Remote)" : ""}`
                : job.isRemote
                  ? "Remote"
                  : "On-site"

              return (
                <div
                  key={jobId}
                  className="group relative rounded-2xl border border-white/5 bg-[#0d0d12] p-5 transition-all duration-200 hover:border-white/15 hover:bg-[#101017] sm:p-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    {/* Left: Company Logo + Job Details */}
                    <div className="flex items-start gap-4">
                      {/* Logo Square with matching Figma icons */}
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#16161f] text-white shadow-xs">
                        <CompanyBrandLogo
                          company={job.company}
                          title={job.title}
                        />
                      </div>

                      {/* Info & Badges */}
                      <div className="space-y-2">
                        {/* Title and Company Badge */}
                        <div className="flex flex-wrap items-center gap-2.5">
                          <Link
                            href={`/browse-jobs/${jobId}`}
                            className="text-base font-bold text-white transition-colors hover:text-[#5c53fe]"
                          >
                            {job.title}
                          </Link>
                          <span className="rounded-md border border-white/10 bg-[#16161f] px-2 py-0.5 text-[10px] font-bold tracking-wider text-neutral-300 uppercase">
                            {job.company}
                          </span>
                        </div>

                        {/* Location and Salary Badges */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/5 bg-[#16161f] px-2.5 py-1 text-xs text-neutral-300">
                            <MapPin className="size-3 text-neutral-400" />
                            <span>{locationString}</span>
                          </span>
                          <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/5 bg-[#16161f] px-2.5 py-1 text-xs text-neutral-300">
                            <Banknote className="size-3 text-neutral-400" />
                            <span>{salaryString}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Timestamp, Status, and Actions */}
                    <div className="flex flex-row items-center justify-between gap-3 border-t border-white/5 pt-3 sm:flex-col sm:items-end sm:justify-center sm:border-t-0 sm:pt-0">
                      {/* Saved Time and Deadline text */}
                      <div className="space-y-0.5 sm:text-right">
                        <div className="flex items-center gap-1.5 text-xs text-neutral-400 sm:justify-end">
                          <Clock className="size-3" />
                          <span>{savedTimeAgo}</span>
                        </div>
                        {deadline && (
                          <div
                            className={`flex items-center gap-1 text-xs font-medium sm:justify-end ${
                              isClosed
                                ? "text-rose-400"
                                : isClosingSoon
                                  ? "text-amber-400"
                                  : "text-neutral-500"
                            }`}
                          >
                            {isClosed && <XCircle className="size-3" />}
                            <span>{deadline.label}</span>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons: Bookmark Toggle & Apply */}
                      <div className="flex items-center gap-2">
                        {/* Bookmark Button */}
                        <button
                          type="button"
                          onClick={() => handleUnsave(jobId, job.title)}
                          title="Remove from saved jobs"
                          className="flex size-9 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-[#16161f] text-white transition-colors hover:border-rose-500/20 hover:bg-rose-500/10 hover:text-rose-400"
                        >
                          <Bookmark className="size-4 fill-current" />
                        </button>

                        {/* Apply / Status Button */}
                        {isClosed ? (
                          <button
                            type="button"
                            onClick={() => handleUnsave(jobId, job.title)}
                            className="rounded-xl border border-white/10 bg-transparent px-3.5 py-2 text-xs font-medium text-neutral-400 transition-colors hover:border-white/20 hover:text-white"
                          >
                            Remove from List
                          </button>
                        ) : hasApplied ? (
                          <button
                            disabled
                            className="cursor-default rounded-xl border border-white/10 bg-[#16161f] px-4 py-2 text-xs font-semibold text-neutral-400"
                          >
                            Applied
                          </button>
                        ) : (
                          <Link
                            href={`/browse-jobs/${jobId}`}
                            className="rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black shadow-sm transition-colors hover:bg-neutral-200"
                          >
                            Apply Now
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* 5. Load More Button centered at bottom */}
        {hasMore && !isLoading && (
          <div className="flex justify-center pt-6 pb-2">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 5)}
              className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-neutral-400 transition-colors hover:text-white"
            >
              <span>Load More</span>
              <ChevronDown className="size-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
