"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Briefcase, Filter, Plus, RefreshCw, Search } from "lucide-react"

import { DashboardPageHeader } from "@/app/components/DashboardPageHeader"
import { DashboardStatCard } from "@/app/components/DashboardStatCard"
import { DeleteJobDialog } from "@/app/components/DeleteJobDialog"
import { JobTableRow } from "@/app/components/JobTableRow"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Spinner } from "@/components/ui/spinner"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "@/components/ui/toast"
import { getJobs, updateJob } from "@/lib/api/jobs"
import { useSession } from "@/lib/auth-client"
import type { JobListing } from "@/types/job"
import { RECRUITER_PLAN_MAX_ACTIVE_JOBS } from "@/types/job"

export default function ManageJobsPage() {
  const router = useRouter()
  const { data: session, isPending: isSessionLoading } = useSession()

  // Real jobs fetched from the database
  const [jobs, setJobs] = React.useState<JobListing[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedStatus, setSelectedStatus] = React.useState<string>("All")
  const [selectedType, setSelectedType] = React.useState<string>("All")

  // Delete modal state
  const [deletingJob, setDeletingJob] = React.useState<JobListing | null>(null)

  // Fetch only this recruiter's real jobs from database
  const fetchJobs = React.useCallback(async () => {
    if (!session?.user?.email) {
      if (!isSessionLoading) {
        setIsLoading(false)
      }
      return
    }

    setIsLoading(true)
    try {
      const realUserJobs = await getJobs(session.user.email)
      setJobs(realUserJobs)
    } catch (err) {
      console.error("Failed to fetch jobs from database:", err)
      setJobs([])
    } finally {
      setIsLoading(false)
    }
  }, [session?.user?.email, isSessionLoading])

  React.useEffect(() => {
    if (session?.user?.email) {
      fetchJobs()
    } else if (!isSessionLoading) {
      setIsLoading(false)
    }
  }, [session?.user?.email, isSessionLoading, fetchJobs])

  // Filter jobs based on search query, status, and job type
  const filteredJobs = React.useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        searchQuery === "" ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus =
        selectedStatus === "All" ||
        job.status.toLowerCase() === selectedStatus.toLowerCase()

      const matchesType =
        selectedType === "All" ||
        job.type.toLowerCase() === selectedType.toLowerCase()

      return matchesSearch && matchesStatus && matchesType
    })
  }, [jobs, searchQuery, selectedStatus, selectedType])

  // Metrics for logged-in recruiter
  const activeCount = jobs.filter((j) => j.status === "Active").length
  const totalApplicants = jobs.reduce(
    (sum, j) => sum + (j.applicantsCount || 0),
    0
  )
  const planLimit = RECRUITER_PLAN_MAX_ACTIVE_JOBS
  const isLimitReached = activeCount >= planLimit
  const availableSlots = Math.max(0, planLimit - activeCount)
  const planUsagePercent = Math.min(
    100,
    Math.round((activeCount / planLimit) * 100)
  )

  // Toggle status between Active and Closed
  const handleToggleStatus = async (job: JobListing) => {
    const nextStatus = job.status === "Active" ? "Closed" : "Active"
    const targetId = job._id || job.id

    // Guard: Prevent reopening if recruiter has already reached the active jobs limit
    if (nextStatus === "Active" && activeCount >= planLimit) {
      toast.error("Plan limit reached", {
        description: `You already have ${activeCount} active job posts (maximum is ${planLimit}). Please close or delete another job first.`,
      })
      return
    }

    // Optimistic UI update
    setJobs((prev) =>
      prev.map((item) => {
        if ((item._id || item.id) === targetId) {
          return { ...item, status: nextStatus }
        }
        return item
      })
    )

    if (targetId) {
      try {
        await updateJob(targetId, { status: nextStatus })
        toast.success(`Job marked as ${nextStatus}`, {
          description: `"${job.title}" is now ${nextStatus.toLowerCase()}.`,
        })
        router.refresh()
      } catch (err) {
        console.warn("Failed to update status on server:", err)
        // Rollback optimistic update on error
        setJobs((prev) =>
          prev.map((item) => {
            if ((item._id || item.id) === targetId) {
              return { ...item, status: job.status }
            }
            return item
          })
        )
        const msg =
          err instanceof Error ? err.message : "Failed to update status"
        toast.error("Failed to update status", { description: msg })
      }
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8">
      {/* Top Breadcrumb & Page Headings */}
      <DashboardPageHeader
        title="Manage Job Posts"
        description="Review your live listings, monitor applicants, and manage jobs created by your account."
        breadcrumbs={[
          { label: "Manage Jobs" },
          { label: "Job Listings & Postings" },
        ]}
        actions={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchJobs}
              disabled={isLoading}
              className="h-9 gap-1.5 border-sidebar-border text-xs text-muted-foreground hover:text-foreground"
            >
              <RefreshCw
                className={`size-3.5 ${isLoading ? "animate-spin" : ""}`}
              />
              <span className="hidden sm:inline">Refresh</span>
            </Button>

            <Button
              size="sm"
              onClick={() => {
                if (isLimitReached) {
                  toast.warning("Active jobs limit reached", {
                    description: `You have reached the maximum of ${planLimit} active jobs. Close or delete an existing job to post a new one.`,
                  })
                  return
                }
                router.push("/dashboard/recruiter/jobs/new")
              }}
              className={`h-9 cursor-pointer gap-1.5 px-3.5 text-xs font-semibold shadow-sm transition-colors ${
                isLimitReached
                  ? "border border-amber-500/40 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30"
                  : "bg-[#5c53fe] text-white hover:bg-[#4b42f0]"
              }`}
            >
              <Plus className="size-4" />
              <span>
                {isLimitReached ? "Limit Reached (10/10)" : "New Job Post"}
              </span>
            </Button>
          </>
        }
      />

      {/* Plan Usage & Summary Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardStatCard
          title="Active Job Posts"
          value={activeCount}
          description="Your active listings in database"
          isLoading={isLoading}
          descriptionClassName="text-emerald-400"
        />

        <DashboardStatCard
          title="Total Candidates"
          value={totalApplicants}
          description="Applied to your job postings"
          isLoading={isLoading}
        />

        <Card
          className={`border-sidebar-border bg-sidebar/50 sm:col-span-2 ${
            isLimitReached ? "border-amber-500/30" : ""
          }`}
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-xs text-muted-foreground">
                Plan Usage (Growth Plan)
              </CardDescription>
              <span
                className={`text-xs font-semibold ${
                  isLimitReached ? "text-amber-400" : "text-foreground"
                }`}
              >
                {activeCount} / {planLimit} Active Posts
              </span>
            </div>
            <CardTitle
              className={`text-base font-semibold ${
                isLimitReached ? "text-amber-400" : "text-foreground"
              }`}
            >
              {isLimitReached
                ? "0 Post Slots Available (Limit Reached)"
                : `${availableSlots} Post Slots Available`}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
            <div className="h-2 w-full overflow-hidden rounded-full bg-sidebar-border">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  isLimitReached ? "bg-amber-500" : "bg-[#5c53fe]"
                }`}
                style={{ width: `${planUsagePercent}%` }}
              />
            </div>
            <p className="text-[11px] text-muted-foreground">
              Logged in as: {session?.user?.email || "Recruiter"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filter Toolbar */}
      <Card className="border-sidebar-border bg-sidebar/50 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your jobs by title, department, company, or location..."
              className="h-9 border-sidebar-border bg-background pl-9 text-xs"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Filter className="size-3.5" />
              <span>Status:</span>
            </div>
            <NativeSelect
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-9 border-sidebar-border bg-background text-xs"
            >
              <NativeSelectOption value="All">All Status</NativeSelectOption>
              <NativeSelectOption value="Active">Active</NativeSelectOption>
              <NativeSelectOption value="Closed">Closed</NativeSelectOption>
              <NativeSelectOption value="Expired">Expired</NativeSelectOption>
            </NativeSelect>

            <NativeSelect
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="h-9 border-sidebar-border bg-background text-xs"
            >
              <NativeSelectOption value="All">All Types</NativeSelectOption>
              <NativeSelectOption value="Full-time">
                Full-time
              </NativeSelectOption>
              <NativeSelectOption value="Part-time">
                Part-time
              </NativeSelectOption>
              <NativeSelectOption value="Contract">Contract</NativeSelectOption>
              <NativeSelectOption value="Internship">
                Internship
              </NativeSelectOption>
            </NativeSelect>

            {(searchQuery ||
              selectedStatus !== "All" ||
              selectedType !== "All") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedStatus("All")
                  setSelectedType("All")
                }}
                className="h-9 text-xs text-muted-foreground hover:text-foreground"
              >
                Reset Filters
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Main Work Surface: Job Postings Table */}
      <Card className="overflow-hidden border-sidebar-border bg-sidebar/50">
        <Table>
          <TableHeader className="border-b border-sidebar-border bg-sidebar">
            <TableRow className="border-sidebar-border hover:bg-transparent">
              <TableHead className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                JOB TITLE &amp; DEPT
              </TableHead>
              <TableHead className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                COMPANY &amp; LOCATION
              </TableHead>
              <TableHead className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                TYPE
              </TableHead>
              <TableHead className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                COMPENSATION
              </TableHead>
              <TableHead className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                APPLICANTS
              </TableHead>
              <TableHead className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                STATUS
              </TableHead>
              <TableHead className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                DEADLINE
              </TableHead>
              <TableHead className="text-right text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                ACTIONS
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="h-44 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Spinner className="size-6 text-[#5c53fe]" />
                    <p className="text-xs text-muted-foreground">
                      Loading your job posts from database...
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredJobs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-44 text-center text-sm text-muted-foreground"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Briefcase className="size-8 text-muted-foreground/40" />
                    <p className="font-medium text-foreground">
                      {jobs.length === 0
                        ? "No job postings in database yet"
                        : "No job postings match your filters"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {jobs.length === 0
                        ? "You haven't posted any jobs under this recruiter account yet."
                        : "Try adjusting your search criteria or reset filters."}
                    </p>
                    {jobs.length === 0 ? (
                      <Button
                        size="sm"
                        onClick={() =>
                          router.push("/dashboard/recruiter/jobs/new")
                        }
                        className="mt-2 h-8 gap-1.5 bg-[#5c53fe] text-xs text-white hover:bg-[#4b42f0]"
                      >
                        <Plus className="size-3.5" />
                        <span>Create Your First Job</span>
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSearchQuery("")
                          setSelectedStatus("All")
                          setSelectedType("All")
                        }}
                        className="mt-2 h-8 border-sidebar-border text-xs"
                      >
                        Reset Filters
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredJobs.map((job) => (
                <JobTableRow
                  key={job._id || job.id}
                  job={job}
                  onEdit={(j) =>
                    router.push(
                      `/dashboard/recruiter/jobs/edit/${j._id || j.id}`
                    )
                  }
                  onToggleStatus={handleToggleStatus}
                  onDelete={(j) => setDeletingJob(j)}
                />
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Delete Confirmation Dialog */}
      <DeleteJobDialog
        job={deletingJob}
        open={Boolean(deletingJob)}
        onOpenChange={(open) => {
          if (!open) setDeletingJob(null)
        }}
        onDeleted={(deletedId) => {
          setJobs((prev) =>
            prev.filter((item) => (item._id || item.id) !== deletedId)
          )
        }}
      />
    </div>
  )
}
