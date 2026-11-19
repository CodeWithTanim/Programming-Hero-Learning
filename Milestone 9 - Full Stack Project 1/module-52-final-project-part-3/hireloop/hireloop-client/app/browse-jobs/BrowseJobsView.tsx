"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Banknote,
  Bookmark,
  Briefcase,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flame,
  Globe,
  MapPin,
  Search,
  Sparkles,
  Zap,
} from "lucide-react"

import { toast } from "@/components/ui/toast"
import type { JobListing } from "@/types/job"

interface BrowseJobsViewProps {
  jobs: JobListing[]
  allJobs: JobListing[]
}

const JOB_TYPE_OPTIONS = [
  "Full-time",
  "Contract",
  "Freelance",
  "Part-time",
  "Internship",
] as const

export function BrowseJobsView({ jobs, allJobs }: BrowseJobsViewProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentSearch =
    searchParams.get("search") || searchParams.get("q") || ""
  const currentJobType =
    searchParams.get("jobType") || searchParams.get("type") || ""
  const currentIsRemote = searchParams.get("isRemote") === "true"
  const currentSort = searchParams.get("sort") || "recent"
  const currentPage = Number(searchParams.get("page")) || 1

  const [searchTerm, setSearchTerm] = React.useState(currentSearch)
  const [bookmarkedIds, setBookmarkedIds] = React.useState<Set<string>>(
    () => new Set()
  )

  // Load saved bookmarks from localStorage
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("hireloop_saved_jobs")
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          setBookmarkedIds(new Set(parsed))
        }
      }
    } catch {}
  }, [])

  // Keep local search input synced with URL
  React.useEffect(() => {
    setSearchTerm(currentSearch)
  }, [currentSearch])

  // Count jobs per type in database for realistic sidebar counts
  const jobCounts = React.useMemo(() => {
    const counts: Record<string, number> = {}
    for (const type of JOB_TYPE_OPTIONS) {
      counts[type] = allJobs.filter(
        (j) => j.type?.toLowerCase() === type.toLowerCase()
      ).length
    }
    return counts
  }, [allJobs])

  // Helper to push URL updates
  const updateQuery = React.useCallback(
    (updates: Record<string, string | null | undefined>) => {
      const params = new URLSearchParams(searchParams.toString())

      for (const [key, value] of Object.entries(updates)) {
        if (!value || value === "all") {
          params.delete(key)
        } else {
          params.set(key, value)
        }
      }

      // Reset to page 1 on filter changes
      if (!("page" in updates)) {
        params.delete("page")
      }

      const queryString = params.toString()
      router.push(queryString ? `/browse-jobs?${queryString}` : "/browse-jobs")
    },
    [router, searchParams]
  )

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateQuery({
      search: searchTerm.trim() || null,
      q: null,
    })
  }

  const handleJobTypeToggle = (type: string) => {
    const isCurrentlySelected =
      currentJobType.toLowerCase() === type.toLowerCase()
    updateQuery({
      jobType: isCurrentlySelected ? null : type.toLowerCase(),
      type: null,
    })
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateQuery({ sort: e.target.value })
  }

  const toggleBookmark = (id: string, title: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
        toast.info("Removed from saved jobs", {
          description: `"${title}" has been removed from your bookmarks.`,
        })
      } else {
        next.add(id)
        toast.success("Job saved", {
          description: `"${title}" has been added to your bookmarks.`,
        })
      }
      try {
        localStorage.setItem(
          "hireloop_saved_jobs",
          JSON.stringify(Array.from(next))
        )
        const metaStored = localStorage.getItem("hireloop_saved_jobs_meta")
        const currentMeta = metaStored ? JSON.parse(metaStored) : {}
        if (next.has(id)) {
          currentMeta[id] = { savedAt: new Date().toISOString() }
        } else {
          delete currentMeta[id]
        }
        localStorage.setItem(
          "hireloop_saved_jobs_meta",
          JSON.stringify(currentMeta)
        )
      } catch {}
      return next
    })
  }

  const handleApply = (job: JobListing) => {
    toast.success("Application started", {
      description: `Opening application for ${job.title} at ${job.company}.`,
    })
  }

  // Format salary exactly like the Figma design ($140k - $180k)
  const formatSalary = (
    min?: number | string,
    max?: number | string,
    period?: string
  ) => {
    if (!min && !max) return "$140k - $180k"

    const toK = (val: number | string) => {
      const num = Number(val)
      if (isNaN(num)) return String(val)
      if (num >= 1000) {
        return `$${Math.round(num / 1000)}k`
      }
      return `$${num.toLocaleString()}`
    }

    const periodStr =
      period && period !== "per year" ? ` / ${period.replace("per ", "")}` : ""

    if (min && max) {
      return `${toK(min)} - ${toK(max)}${periodStr}`
    }
    if (min) {
      return `From ${toK(min)}${periodStr}`
    }
    if (max) {
      return `Up to ${toK(max)}${periodStr}`
    }
    return "$140k - $180k"
  }

  // Pagination calculations
  const ITEMS_PER_PAGE = 8
  const totalPages = Math.max(1, Math.ceil(jobs.length / ITEMS_PER_PAGE))
  const paginatedJobs = jobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <div className="min-h-screen bg-[#060608] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Top Search Bar (Matching Figma) */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex w-full flex-col gap-3 sm:flex-row sm:items-center"
        >
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by job title, keywords..."
              className="h-12 w-full rounded-xl border border-white/10 bg-[#0d0d12] pr-4 pl-11 text-sm text-white transition placeholder:text-neutral-500 focus:border-white/20 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="h-12 cursor-pointer rounded-xl bg-white px-7 text-sm font-semibold text-black transition-colors hover:bg-neutral-200"
          >
            Search Jobs
          </button>
        </form>

        {/* Two-Column Grid: Sidebar Filters + Main Jobs Listing */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Left Column: Sidebar Filters */}
          <aside className="lg:col-span-1">
            <div className="sticky top-6 rounded-2xl border border-white/5 bg-[#0d0d12] p-5">
              <h2 className="text-base font-bold text-white">Filters</h2>

              {/* Job Type Section */}
              <div className="mt-5">
                <h3 className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                  Job Type
                </h3>
                <div className="mt-3 space-y-1.5">
                  {JOB_TYPE_OPTIONS.map((type) => {
                    const isChecked =
                      currentJobType.toLowerCase() === type.toLowerCase()
                    const count = jobCounts[type] || 0

                    return (
                      <label
                        key={type}
                        onClick={() => handleJobTypeToggle(type)}
                        className="flex cursor-pointer items-center justify-between py-1.5 text-sm transition-colors hover:text-white"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex size-4.5 items-center justify-center rounded border transition-colors ${
                              isChecked
                                ? "border-white bg-white text-black"
                                : "border-white/20 bg-[#16161f]"
                            }`}
                          >
                            {isChecked && (
                              <svg
                                className="size-3 stroke-current stroke-[3]"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </div>
                          <span
                            className={
                              isChecked
                                ? "font-medium text-white"
                                : "text-neutral-300"
                            }
                          >
                            {type}
                          </span>
                        </div>
                        <span className="text-xs text-neutral-500">
                          {count > 0 ? `${count}` : "0"}
                        </span>
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* Remote Flexibility Option */}
              <div className="mt-6 border-t border-white/5 pt-5">
                <label
                  onClick={() =>
                    updateQuery({ isRemote: currentIsRemote ? null : "true" })
                  }
                  className="flex cursor-pointer items-center justify-between py-1.5 text-sm transition-colors hover:text-white"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex size-4.5 items-center justify-center rounded border transition-colors ${
                        currentIsRemote
                          ? "border-emerald-400 bg-emerald-400 text-black"
                          : "border-white/20 bg-[#16161f]"
                      }`}
                    >
                      {currentIsRemote && (
                        <svg
                          className="size-3 stroke-current stroke-[3]"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <span
                      className={
                        currentIsRemote
                          ? "font-medium text-white"
                          : "text-neutral-300"
                      }
                    >
                      Remote Only
                    </span>
                  </div>
                  <Globe
                    className={`size-3.5 ${
                      currentIsRemote ? "text-emerald-400" : "text-neutral-500"
                    }`}
                  />
                </label>
              </div>

              {/* Clear All Filters Button */}
              {(currentSearch || currentJobType || currentIsRemote) && (
                <div className="mt-6 border-t border-white/5 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm("")
                      router.push("/browse-jobs")
                    }}
                    className="w-full rounded-xl border border-white/10 bg-[#16161f] py-2 text-xs font-medium text-neutral-300 transition-colors hover:bg-[#22222d] hover:text-white"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </aside>

          {/* Right Column: Main Jobs Section */}
          <main className="lg:col-span-3">
            {/* Top Info Bar */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                Found {jobs.length.toLocaleString()} Professional Jobs
              </h1>

              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-400">Sort by:</span>
                <div className="relative">
                  <select
                    value={currentSort}
                    onChange={handleSortChange}
                    className="h-8 cursor-pointer appearance-none rounded-lg border border-white/10 bg-[#0d0d12] pr-8 pl-3 text-xs text-white transition focus:border-white/20 focus:outline-none"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="highest-salary">Highest Salary</option>
                    <option value="relevant">Most Relevant</option>
                    <option value="oldest">Oldest</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2 text-neutral-400" />
                </div>
              </div>
            </div>

            {/* Job Cards Stack (Figma Article Layout) */}
            <div className="mt-6 space-y-4">
              {jobs.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#0d0d12] p-12 text-center">
                  <Briefcase className="size-10 text-neutral-600" />
                  <h3 className="mt-4 text-base font-semibold text-white">
                    No job postings found in database
                  </h3>
                  <p className="mt-1 max-w-sm text-xs text-neutral-400">
                    No active positions matched your selected criteria. Try
                    clearing filters or searching with different keywords.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm("")
                      router.push("/browse-jobs")
                    }}
                    className="mt-5 rounded-xl bg-white px-5 py-2.5 text-xs font-semibold text-black transition hover:bg-neutral-200"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                paginatedJobs.map((job) => {
                  const jobId = job._id || job.id || ""
                  const isSaved = bookmarkedIds.has(jobId)
                  const salaryText = formatSalary(
                    job.minSalary,
                    job.maxSalary,
                    job.salaryPeriod
                  )

                  const displayLocation = job.isRemote
                    ? `${job.location || "San Francisco, CA"} (Remote)`
                    : job.location || "On-site"

                  return (
                    <article
                      key={jobId}
                      className="group relative rounded-2xl border border-white/5 bg-[#0d0d12] p-5 transition-all duration-200 hover:border-white/15 hover:bg-[#101017]"
                    >
                      {/* Bookmark Icon Button in Top Right */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          toggleBookmark(jobId, job.title)
                        }}
                        aria-label={`Bookmark ${job.title}`}
                        className={`absolute top-5 right-5 z-20 flex size-8 cursor-pointer items-center justify-center rounded-lg transition-colors ${
                          isSaved
                            ? "text-[#5c53fe]"
                            : "text-neutral-500 hover:text-white"
                        }`}
                      >
                        <Bookmark
                          className="size-4.5"
                          fill={isSaved ? "currentColor" : "none"}
                        />
                      </button>

                      <Link
                        href={`/browse-jobs/${jobId}`}
                        className="block cursor-pointer focus:outline-none"
                      >
                        <div className="flex items-start gap-4 pr-10">
                          {/* Company Logo Square */}
                          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#14141c] text-[#5c53fe] shadow-xs transition-colors group-hover:border-[#5c53fe]/30">
                            <Briefcase className="size-5" />
                          </div>

                          {/* Middle Content Area */}
                          <div className="flex-1 space-y-1">
                            <h2 className="text-base font-bold text-white transition-colors group-hover:text-[#5c53fe]">
                              {job.title}
                            </h2>

                            <p className="flex flex-wrap items-center gap-1.5 text-xs text-neutral-400">
                              <span className="font-medium text-neutral-300">
                                {job.company}
                              </span>
                              <span>•</span>
                              <span>{displayLocation}</span>
                            </p>

                            {/* Badges Row (Exact Figma Specs) */}
                            <div className="mt-3.5 flex flex-wrap items-center gap-2 pt-1">
                              {/* Salary Badge */}
                              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#16161f] px-2.5 py-1 text-xs font-medium text-neutral-300">
                                <Banknote className="size-3.5 text-neutral-400" />
                                <span>{salaryText}</span>
                              </span>

                              {/* Job Type Badge */}
                              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#16161f] px-2.5 py-1 text-xs font-medium text-neutral-300">
                                <Clock className="size-3.5 text-neutral-400" />
                                <span>{job.type || "Full-time"}</span>
                              </span>

                              {/* Easy Apply / Work Mode Badge */}
                              {job.isRemote ? (
                                <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
                                  <Zap className="size-3 text-emerald-400" />
                                  <span>Easy Apply</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#5c53fe]/20 bg-[#5c53fe]/10 px-2.5 py-1 text-xs font-medium text-[#a59eff]">
                                  <Sparkles className="size-3 text-[#a59eff]" />
                                  <span>Hybrid</span>
                                </span>
                              )}

                              {/* Category or Senior Badge if applicable */}
                              {job.category && (
                                <span className="hidden items-center gap-1 rounded-lg border border-white/5 bg-[#14141a] px-2 py-1 text-[11px] text-neutral-400 sm:inline-flex">
                                  {job.category}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </article>
                  )
                })
              )}
            </div>

            {/* Pagination Controls (Matching Figma `< [1] 2 3 ... 42 >`) */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() =>
                    updateQuery({ page: String(Math.max(1, currentPage - 1)) })
                  }
                  className="flex size-8 items-center justify-center rounded-lg border border-white/10 bg-[#0d0d12] text-xs text-neutral-400 transition hover:bg-white/5 hover:text-white disabled:pointer-events-none disabled:opacity-40"
                >
                  <ChevronLeft className="size-4" />
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1
                  const isActive = pageNum === currentPage
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => updateQuery({ page: String(pageNum) })}
                      className={`flex size-8 items-center justify-center rounded-lg text-xs font-semibold transition ${
                        isActive
                          ? "bg-white text-black"
                          : "border border-white/10 bg-[#0d0d12] text-neutral-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}

                {totalPages > 5 && (
                  <>
                    <span className="px-1 text-xs text-neutral-500">...</span>
                    <button
                      type="button"
                      onClick={() => updateQuery({ page: String(totalPages) })}
                      className={`flex size-8 items-center justify-center rounded-lg text-xs font-semibold transition ${
                        totalPages === currentPage
                          ? "bg-white text-black"
                          : "border border-white/10 bg-[#0d0d12] text-neutral-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {totalPages}
                    </button>
                  </>
                )}

                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() =>
                    updateQuery({
                      page: String(Math.min(totalPages, currentPage + 1)),
                    })
                  }
                  className="flex size-8 items-center justify-center rounded-lg border border-white/10 bg-[#0d0d12] text-xs text-neutral-400 transition hover:bg-white/5 hover:text-white disabled:pointer-events-none disabled:opacity-40"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
