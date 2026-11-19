"use client"

import React from "react"
import Link from "next/link"
import {
  Bell,
  Bot,
  Briefcase,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Cloud,
  Code2,
  Compass,
  Cpu,
  Database,
  Download,
  ExternalLink,
  Mail,
  MapPin,
  Search,
  Sparkles,
  User,
  X,
  XCircle,
} from "lucide-react"
import { toast } from "@/components/ui/toast"

import { getUserApplications } from "@/lib/api/applications"
import { useSession } from "@/lib/auth-client"
import type { ApplicationStatus, JobApplication } from "@/types/application"

/**
 * Pixel-matched role icons matching Figma application rows
 */
function ApplicationRoleIcon({
  title,
  category,
  status,
}: {
  title: string
  category?: string
  status?: string
}) {
  const t = (title || "").toLowerCase()
  const c = (category || "").toLowerCase()
  const s = (status || "").toLowerCase()

  if (s === "rejected") {
    return (
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-400">
        <Cloud className="size-4.5" />
      </div>
    )
  }

  if (t.includes("design") || c.includes("design")) {
    return (
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-[#16161f] text-neutral-300">
        <Compass className="size-4.5" />
      </div>
    )
  }

  if (t.includes("data") || c.includes("data") || t.includes("lead")) {
    return (
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-[#16161f] text-neutral-300">
        <Database className="size-4.5" />
      </div>
    )
  }

  if (
    t.includes("ai") ||
    t.includes("research") ||
    t.includes("ml") ||
    t.includes("engineer")
  ) {
    return (
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-[#16161f] text-neutral-300">
        <Bot className="size-4.5" />
      </div>
    )
  }

  // Default frontend / engineering code brackets <>
  return (
    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-[#16161f] text-neutral-300">
      <Code2 className="size-4.5" />
    </div>
  )
}

/**
 * Pixel-matched application status pill badge matching Figma
 */
function ApplicationStatusBadge({ status }: { status?: string }) {
  const s = (status || "Applied").toLowerCase()

  if (s === "review" || s === "under review") {
    return (
      <span className="inline-flex items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-0.5 text-xs font-medium text-amber-400">
        Review
      </span>
    )
  }

  if (s === "shortlisted") {
    return (
      <span className="inline-flex items-center rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-0.5 text-xs font-medium text-sky-400">
        Shortlisted
      </span>
    )
  }

  if (s === "interview" || s === "interviewing") {
    return (
      <span className="inline-flex items-center rounded-full border border-[#5c53fe]/25 bg-[#5c53fe]/10 px-3 py-0.5 text-xs font-medium text-[#7871ff]">
        Interview
      </span>
    )
  }

  if (s === "offered" || s === "accepted") {
    return (
      <span className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-0.5 text-xs font-medium text-emerald-400">
        Offered
      </span>
    )
  }

  if (s === "rejected") {
    return (
      <span className="inline-flex items-center rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-0.5 text-xs font-medium text-rose-400">
        Rejected
      </span>
    )
  }

  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-[#16161f] px-3 py-0.5 text-xs font-medium text-neutral-300">
      Applied
    </span>
  )
}

export default function SeekerApplicationsPage() {
  const { data: session } = useSession()

  const [applications, setApplications] = React.useState<JobApplication[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  // Filters & Controls
  const [searchQuery, setSearchQuery] = React.useState("")
  const [viewFilter, setViewFilter] = React.useState<"active" | "archived">(
    "active"
  )
  const [currentPage, setCurrentPage] = React.useState(1)
  const itemsPerPage = 5

  // Selected application for detail modal
  const [selectedApp, setSelectedApp] = React.useState<JobApplication | null>(
    null
  )

  // 1. Fetch real applications from MongoDB
  React.useEffect(() => {
    if (!session?.user?.email) {
      setIsLoading(false)
      return
    }

    let isMounted = true
    setIsLoading(true)

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

  // Relative time helper
  const getRelativeTime = (dateString?: string) => {
    if (!dateString) return "Recently"
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffHours < 1) return "Just now"
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`
    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 14) return "1 week ago"
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  // Calculate Real Dashboard Metrics
  const totalApplied = applications.length
  const shortlistedCount = applications.filter((a) => {
    const s = (a.status || "").toLowerCase()
    return s.includes("shortlist") || s.includes("review")
  }).length
  const interviewsCount = applications.filter((a) =>
    (a.status || "").toLowerCase().includes("interview")
  ).length
  const offeredCount = applications.filter((a) => {
    const s = (a.status || "").toLowerCase()
    return s.includes("offer") || s.includes("accept")
  }).length

  const successRate =
    totalApplied > 0
      ? Math.round(((offeredCount + shortlistedCount) / totalApplied) * 100)
      : 0

  // Filter applications by search and active/archived tab
  const filteredApplications = React.useMemo(() => {
    let list = [...applications]

    // Active vs Archived
    if (viewFilter === "active") {
      list = list.filter((a) => {
        const s = (a.status || "").toLowerCase()
        return s !== "rejected"
      })
    } else {
      list = list.filter((a) => {
        const s = (a.status || "").toLowerCase()
        return s === "rejected"
      })
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      list = list.filter(
        (a) =>
          a.jobTitle.toLowerCase().includes(q) ||
          a.company.toLowerCase().includes(q) ||
          (a.location && a.location.toLowerCase().includes(q)) ||
          (a.status && a.status.toLowerCase().includes(q)) ||
          (a.type && a.type.toLowerCase().includes(q))
      )
    }

    return list
  }, [applications, viewFilter, searchQuery])

  // Pagination calculation
  const totalPages = Math.max(
    1,
    Math.ceil(filteredApplications.length / itemsPerPage)
  )
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedApplications = filteredApplications.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  // PDF Export action
  const handleExportPDF = () => {
    if (applications.length === 0) {
      toast.info("No applications to export")
      return
    }
    toast.success("Preparing PDF Report...", {
      description:
        "Opening print dialog to save your application history as PDF.",
    })
    setTimeout(() => {
      window.print()
    }, 400)
  }

  return (
    <div className="relative min-h-[calc(100vh-3rem)] space-y-6 p-4 sm:p-6 lg:p-8">
      {/* 1. Top Header Bar: Search, Notification Bell, Mail, User Avatar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Input */}
        <div className="relative w-full sm:w-80 md:w-96">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            placeholder="Search applications..."
            className="h-10 w-full rounded-xl border border-white/10 bg-[#0d0d12] pr-4 pl-10 text-xs text-white placeholder-neutral-500 transition-colors focus:border-[#5c53fe] focus:outline-none"
          />
        </div>

        {/* Right Icons: Bell, Mail, Avatar */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Bell Icon */}
          <button
            type="button"
            onClick={() =>
              toast.info("Application Alerts", {
                description: `You have ${interviewsCount} upcoming interview${interviewsCount === 1 ? "" : "s"} and ${shortlistedCount} shortlisted position${shortlistedCount === 1 ? "" : "s"}.`,
              })
            }
            title="Notifications"
            className="flex size-9.5 items-center justify-center rounded-xl border border-white/10 bg-[#0d0d12] text-neutral-300 transition-colors hover:border-white/20 hover:text-white"
          >
            <Bell className="size-4" />
          </button>

          {/* Mail Icon */}
          <button
            type="button"
            onClick={() =>
              toast.info("Recruiter Messages", {
                description:
                  "All recruiter messages and interview invitations will appear in your inbox.",
              })
            }
            title="Messages"
            className="flex size-9.5 items-center justify-center rounded-xl border border-white/10 bg-[#0d0d12] text-neutral-300 transition-colors hover:border-white/20 hover:text-white"
          >
            <Mail className="size-4" />
          </button>

          {/* User Profile Avatar */}
          <div className="flex size-9.5 items-center justify-center rounded-xl border border-white/10 bg-[#16161f] text-neutral-300">
            {session?.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="size-full rounded-xl object-cover"
              />
            ) : (
              <User className="size-4.5 text-neutral-400" />
            )}
          </div>
        </div>
      </div>

      {/* 2. Page Header: Title, Subtitle, Segmented Toggle & Export PDF */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            My Applications
          </h1>
          <p className="mt-1 text-xs text-neutral-400 sm:text-sm">
            Track your job applications and interview progress in real-time.
          </p>
        </div>

        {/* Toggle & Export PDF */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Active / Archived Toggle */}
          <div className="flex items-center rounded-xl border border-white/10 bg-[#0d0d12] p-1">
            <button
              type="button"
              onClick={() => {
                setViewFilter("active")
                setCurrentPage(1)
              }}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                viewFilter === "active"
                  ? "border border-white/10 bg-[#16161f] text-white shadow-xs"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Active
            </button>
            <button
              type="button"
              onClick={() => {
                setViewFilter("archived")
                setCurrentPage(1)
              }}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                viewFilter === "archived"
                  ? "border border-white/10 bg-[#16161f] text-white shadow-xs"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Archived
            </button>
          </div>

          {/* Export PDF Button */}
          <button
            type="button"
            onClick={handleExportPDF}
            className="flex h-9.5 items-center gap-2 rounded-xl bg-white px-4 text-xs font-semibold text-black shadow-sm transition-all hover:bg-neutral-200"
          >
            <Download className="size-3.5" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* 3. 4 Bento Stat Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Total Applied */}
        <div className="rounded-2xl border border-white/5 bg-[#0d0d12] p-5 transition-colors hover:border-white/10">
          <span className="text-xs font-medium text-neutral-400">
            Total Applied
          </span>
          <div className="mt-2 text-3xl font-bold tracking-tight text-white">
            {isLoading ? "..." : totalApplied}
          </div>
        </div>

        {/* Card 2: Shortlisted */}
        <div className="rounded-2xl border border-white/5 bg-[#0d0d12] p-5 transition-colors hover:border-white/10">
          <span className="text-xs font-medium text-neutral-400">
            Shortlisted
          </span>
          <div className="mt-2 text-3xl font-bold tracking-tight text-white">
            {isLoading ? "..." : shortlistedCount}
          </div>
        </div>

        {/* Card 3: Interviews */}
        <div className="rounded-2xl border border-white/5 bg-[#0d0d12] p-5 transition-colors hover:border-white/10">
          <span className="text-xs font-medium text-neutral-400">
            Interviews
          </span>
          <div className="mt-2 text-3xl font-bold tracking-tight text-amber-500">
            {isLoading ? "..." : interviewsCount}
          </div>
        </div>

        {/* Card 4: Success Rate */}
        <div className="rounded-2xl border border-white/5 bg-[#0d0d12] p-5 transition-colors hover:border-white/10">
          <span className="text-xs font-medium text-neutral-400">
            Success Rate
          </span>
          <div className="mt-2 text-3xl font-bold tracking-tight text-emerald-400">
            {isLoading ? "..." : `${successRate}%`}
          </div>
        </div>
      </div>

      {/* 4. Applications Data Table */}
      <div className="overflow-hidden rounded-2xl border border-white/5 bg-[#0d0d12] shadow-sm">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="size-6 animate-spin rounded-full border-2 border-[#5c53fe] border-t-transparent" />
            <p className="mt-3 text-xs text-neutral-400">
              Loading your application records...
            </p>
          </div>
        ) : applications.length === 0 ? (
          /* Empty State: No applications submitted yet */
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-[#16161f] text-neutral-400">
              <Briefcase className="size-7" />
            </div>
            <h3 className="mt-4 text-base font-bold text-white">
              No applications submitted yet
            </h3>
            <p className="mt-1.5 max-w-sm text-xs text-neutral-400">
              Explore thousands of verified jobs and apply to roles tailored to
              your skills. Your application status and progress will appear
              here.
            </p>
            <Link
              href="/browse-jobs"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-bold text-black transition-colors hover:bg-neutral-200"
            >
              <Sparkles className="size-3.5" />
              <span>Browse Open Positions</span>
            </Link>
          </div>
        ) : filteredApplications.length === 0 ? (
          /* Empty Filter State */
          <div className="flex flex-col items-center justify-center p-10 text-center">
            <Search className="size-8 text-neutral-500" />
            <h3 className="mt-3 text-sm font-semibold text-white">
              No matching applications found
            </h3>
            <p className="mt-1 text-xs text-neutral-400">
              {viewFilter === "archived"
                ? "You don't have any archived or rejected applications."
                : "No active applications match your search query."}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("")
                setViewFilter("active")
              }}
              className="mt-4 rounded-xl border border-white/10 bg-[#16161f] px-3.5 py-1.5 text-xs font-medium text-white hover:bg-[#20202a]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Data Table */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              {/* Table Header */}
              <thead>
                <tr className="border-b border-white/5 text-[11px] font-medium text-neutral-400">
                  <th className="py-4 pr-4 pl-6">Job Title</th>
                  <th className="px-4 py-4">Company</th>
                  <th className="px-4 py-4">Applied</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="py-4 pr-6 pl-4 text-right">Action</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-white/5">
                {paginatedApplications.map((app) => (
                  <tr
                    key={app._id || app.id}
                    className="group transition-colors hover:bg-[#121219]"
                  >
                    {/* Job Title & Type */}
                    <td className="py-4 pr-4 pl-6">
                      <div className="flex items-center gap-3.5">
                        <ApplicationRoleIcon
                          title={app.jobTitle}
                          category={app.category}
                          status={app.status}
                        />
                        <div>
                          <Link
                            href={`/browse-jobs/${app.jobId}`}
                            className="text-sm font-semibold text-white transition-colors hover:text-[#5c53fe]"
                          >
                            {app.jobTitle}
                          </Link>
                          <div className="mt-0.5 text-xs text-neutral-400">
                            {app.type || "Full-time"} •{" "}
                            {app.location || "Remote"}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Company */}
                    <td className="px-4 py-4 font-medium text-neutral-300">
                      {app.company}
                    </td>

                    {/* Applied Date */}
                    <td className="px-4 py-4 text-neutral-400">
                      {getRelativeTime(app.appliedAt)}
                    </td>

                    {/* Status Badge */}
                    <td className="px-4 py-4">
                      <ApplicationStatusBadge status={app.status} />
                    </td>

                    {/* Action Button: Details */}
                    <td className="py-4 pr-6 pl-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedApp(app)}
                        className="cursor-pointer text-xs font-medium text-neutral-400 transition-colors hover:text-white"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 5. Pagination Footer */}
        {filteredApplications.length > 0 && (
          <div className="flex flex-col gap-3 border-t border-white/5 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Range info */}
            <div className="text-xs text-neutral-400">
              Showing {startIndex + 1}-
              {Math.min(startIndex + itemsPerPage, filteredApplications.length)}{" "}
              of {filteredApplications.length} applications
            </div>

            {/* Controls */}
            {totalPages > 1 && (
              <div className="flex items-center gap-1.5 self-end sm:self-auto">
                {/* Prev */}
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  className="flex size-8 items-center justify-center rounded-lg border border-white/10 bg-[#0d0d12] text-neutral-400 transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-40"
                >
                  <ChevronLeft className="size-4" />
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => {
                    const isActive = pageNum === currentPage
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`flex size-8 items-center justify-center rounded-lg text-xs font-semibold transition-all ${
                          isActive
                            ? "bg-white text-black shadow-xs"
                            : "border border-white/5 bg-[#0d0d12] text-neutral-400 hover:text-white"
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  }
                )}

                {/* Next */}
                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  className="flex size-8 items-center justify-center rounded-lg border border-white/10 bg-[#0d0d12] text-neutral-400 transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-40"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 6. Application Details Modal Dialog */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            onClick={() => setSelectedApp(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Container */}
          <div className="relative z-10 w-full max-w-lg rounded-2xl border border-white/10 bg-[#0d0d12] p-6 shadow-2xl">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/5 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">
                  {selectedApp.jobTitle}
                </h3>
                <p className="mt-0.5 text-xs text-neutral-400">
                  {selectedApp.company} • {selectedApp.location || "Remote"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="flex size-8 cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-[#16161f] text-neutral-400 transition hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="mt-5 space-y-5">
              {/* Current Status Pill & Date */}
              <div className="flex items-center justify-between rounded-xl border border-white/5 bg-[#16161f] p-3.5">
                <div>
                  <span className="block text-[11px] font-medium text-neutral-400">
                    Application Status
                  </span>
                  <div className="mt-1">
                    <ApplicationStatusBadge status={selectedApp.status} />
                  </div>
                </div>
                <div className="text-right">
                  <span className="block text-[11px] font-medium text-neutral-400">
                    Applied On
                  </span>
                  <span className="text-xs font-semibold text-white">
                    {new Date(selectedApp.appliedAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </span>
                </div>
              </div>

              {/* Application Progress Timeline */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold tracking-wider text-neutral-300 uppercase">
                  Hiring Timeline
                </h4>
                <div className="space-y-2.5">
                  {/* Step 1: Applied */}
                  <div className="flex items-center gap-3">
                    <div className="flex size-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                      <CheckCircle2 className="size-3.5" />
                    </div>
                    <div className="flex-1 text-xs">
                      <span className="font-semibold text-white">
                        Application Submitted
                      </span>
                      <p className="text-[11px] text-neutral-400">
                        Received by recruiter at {selectedApp.company}
                      </p>
                    </div>
                  </div>

                  {/* Step 2: Under Review */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex size-6 items-center justify-center rounded-full ${
                        selectedApp.status?.toLowerCase() !== "applied"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-white/10 text-neutral-400"
                      }`}
                    >
                      <Clock className="size-3.5" />
                    </div>
                    <div className="flex-1 text-xs">
                      <span className="font-semibold text-white">
                        Resume Review
                      </span>
                      <p className="text-[11px] text-neutral-400">
                        Hiring team reviews qualifications and experience
                      </p>
                    </div>
                  </div>

                  {/* Step 3: Interview / Final Decision */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex size-6 items-center justify-center rounded-full ${
                        selectedApp.status
                          ?.toLowerCase()
                          .includes("interview") ||
                        selectedApp.status?.toLowerCase().includes("offer")
                          ? "bg-emerald-500/20 text-emerald-400"
                          : selectedApp.status?.toLowerCase() === "rejected"
                            ? "bg-rose-500/20 text-rose-400"
                            : "bg-white/10 text-neutral-400"
                      }`}
                    >
                      {selectedApp.status?.toLowerCase() === "rejected" ? (
                        <XCircle className="size-3.5" />
                      ) : (
                        <CheckCircle2 className="size-3.5" />
                      )}
                    </div>
                    <div className="flex-1 text-xs">
                      <span className="font-semibold text-white">
                        Interview & Decision
                      </span>
                      <p className="text-[11px] text-neutral-400">
                        {selectedApp.status?.toLowerCase() === "rejected"
                          ? "Application not selected for this position"
                          : selectedApp.status?.toLowerCase().includes("offer")
                            ? "Offer extended! Check your email for details"
                            : "Interview coordination or final outcome"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Applicant Info */}
              <div className="rounded-xl border border-white/5 bg-[#16161f] p-3 text-xs">
                <span className="block text-[11px] font-medium text-neutral-400">
                  Applicant Credentials
                </span>
                <p className="mt-1 font-semibold text-white">
                  {selectedApp.applicantName} ({selectedApp.applicantEmail})
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex items-center justify-end gap-3 border-t border-white/5 pt-4">
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="rounded-xl border border-white/10 bg-[#16161f] px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white"
              >
                Close
              </button>
              <Link
                href={`/browse-jobs/${selectedApp.jobId}`}
                className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-neutral-200"
              >
                <span>View Job Posting</span>
                <ExternalLink className="size-3" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
