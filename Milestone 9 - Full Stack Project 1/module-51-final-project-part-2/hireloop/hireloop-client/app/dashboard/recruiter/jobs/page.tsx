"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  DollarSign,
  Edit3,
  Filter,
  Globe,
  MapPin,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  Users,
  XCircle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DeleteJobDialog } from "@/app/components/DeleteJobDialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

export default function ManageJobsPage() {
  const router = useRouter()
  const { data: session, isPending: isSessionLoading } = useSession()

  // Only real jobs fetched from the database - no hardcoded demo data
  const [jobs, setJobs] = React.useState<JobListing[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedStatus, setSelectedStatus] = React.useState<string>("All")
  const [selectedType, setSelectedType] = React.useState<string>("All")

  // Delete modal state
  const [deletingJob, setDeletingJob] = React.useState<JobListing | null>(null)

  // Quick edit modal state
  const [editingJob, setEditingJob] = React.useState<JobListing | null>(null)

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

  // Toggle status between Active and Closed
  const handleToggleStatus = async (job: JobListing) => {
    const nextStatus = job.status === "Active" ? "Closed" : "Active"
    const targetId = job._id || job.id

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
        toast.error("Failed to update status")
      }
    }
  }

  // Save quick edit to database
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingJob) return

    const targetJob = editingJob
    const targetId = targetJob._id || targetJob.id

    setJobs((prev) =>
      prev.map((j) => {
        if ((j._id || j.id) === targetId) {
          return targetJob
        }
        return j
      })
    )
    setEditingJob(null)

    if (targetId) {
      try {
        await updateJob(targetId, {
          title: targetJob.title,
          status: targetJob.status,
          deadline: targetJob.deadline,
        })
        toast.success("Job updated successfully", {
          description: `"${targetJob.title}" has been updated.`,
        })
        router.refresh()
      } catch (err) {
        console.warn("Failed to update job on server:", err)
        toast.error("Failed to update job")
      }
    }
  }

  // Real database metrics for logged-in recruiter
  const activeCount = jobs.filter((j) => j.status === "Active").length
  const totalApplicants = jobs.reduce(
    (sum, j) => sum + (j.applicantsCount || 0),
    0
  )
  const planLimit = 10
  const planUsagePercent = Math.min(
    100,
    Math.round((activeCount / planLimit) * 100)
  )

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8">
      {/* Top Breadcrumb & Page Headings */}
      <div className="flex flex-col gap-4 border-b border-sidebar-border pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Manage Jobs</span>
            <span>&rsaquo;</span>
            <span className="text-foreground">Job Listings &amp; Postings</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Manage Job Posts
          </h1>
          <p className="text-sm text-muted-foreground">
            Review your live listings, monitor applicants, and manage jobs
            created by your account.
          </p>
        </div>

        <div className="flex items-center gap-3">
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
            onClick={() => router.push("/dashboard/recruiter/jobs/new")}
            className="h-9 cursor-pointer gap-1.5 bg-[#5c53fe] px-3.5 text-xs font-semibold text-white shadow-sm hover:bg-[#4b42f0]"
          >
            <Plus className="size-4" />
            <span>New Job Post</span>
          </Button>
        </div>
      </div>

      {/* Plan Usage & Summary Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-sidebar-border bg-sidebar/50">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs text-muted-foreground">
              Active Job Posts
            </CardDescription>
            <CardTitle className="text-2xl font-bold text-foreground">
              {isLoading ? (
                <Spinner className="size-5 text-[#5c53fe]" />
              ) : (
                activeCount
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-emerald-400">
              Your active listings in database
            </p>
          </CardContent>
        </Card>

        <Card className="border-sidebar-border bg-sidebar/50">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs text-muted-foreground">
              Total Candidates
            </CardDescription>
            <CardTitle className="text-2xl font-bold text-foreground">
              {isLoading ? (
                <Spinner className="size-5 text-[#5c53fe]" />
              ) : (
                totalApplicants
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Applied to your job postings
            </p>
          </CardContent>
        </Card>

        <Card className="border-sidebar-border bg-sidebar/50 sm:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-xs text-muted-foreground">
                Plan Usage (Growth Plan)
              </CardDescription>
              <span className="text-xs font-semibold text-foreground">
                {activeCount} / {planLimit} Active Posts
              </span>
            </div>
            <CardTitle className="text-base font-semibold text-foreground">
              {planLimit - activeCount} Post Slots Available
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
            <div className="h-2 w-full overflow-hidden rounded-full bg-sidebar-border">
              <div
                className="h-full rounded-full bg-[#5c53fe] transition-all duration-300"
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

      {/* Main Work Surface: Real Database Job Postings Table */}
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
              filteredJobs.map((job) => {
                const jobId = job._id || job.id
                const isJobActive = job.status === "Active"
                const isExpired = job.status === "Expired"

                // Format compensation
                let compText = "Negotiable"
                if (job.minSalary && job.maxSalary) {
                  const min = Number(job.minSalary).toLocaleString()
                  const max = Number(job.maxSalary).toLocaleString()
                  compText = `$${min} - $${max} ${job.salaryPeriod ? `/ ${job.salaryPeriod.replace("per ", "")}` : ""}`
                } else if (job.minSalary) {
                  compText = `From $${Number(job.minSalary).toLocaleString()}`
                }

                // Format posted date
                let postedDateText = "Recently"
                if (job.createdAt) {
                  try {
                    const date = new Date(job.createdAt)
                    postedDateText = date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  } catch {
                    postedDateText = "Recently"
                  }
                }

                return (
                  <TableRow
                    key={jobId}
                    className="border-sidebar-border transition-colors hover:bg-sidebar-accent/50"
                  >
                    {/* Job Title & Department */}
                    <TableCell className="py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-sidebar-border bg-background text-[#5c53fe]">
                          <Briefcase className="size-4" />
                        </div>
                        <div className="space-y-0.5">
                          <span className="line-clamp-1 font-semibold text-foreground">
                            {job.title}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {job.category}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Company & Location */}
                    <TableCell className="py-3.5">
                      <div className="space-y-0.5">
                        <div className="font-medium text-foreground">
                          {job.company}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          {job.isRemote ? (
                            <Globe className="size-3 text-[#5c53fe]" />
                          ) : (
                            <MapPin className="size-3 text-muted-foreground" />
                          )}
                          <span className="truncate">{job.location}</span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Job Type */}
                    <TableCell className="py-3.5">
                      <Badge
                        variant="outline"
                        className="border-sidebar-border text-[11px] font-medium text-foreground"
                      >
                        {job.type}
                      </Badge>
                    </TableCell>

                    {/* Compensation */}
                    <TableCell className="py-3.5 text-xs font-medium text-foreground">
                      {compText}
                    </TableCell>

                    {/* Applicants */}
                    <TableCell className="py-3.5">
                      <div className="inline-flex items-center gap-1.5 rounded-full border border-sidebar-border bg-background/60 px-2.5 py-1 text-xs font-medium text-foreground">
                        <Users className="size-3 text-[#5c53fe]" />
                        <span>{job.applicantsCount || 0} Candidates</span>
                      </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell className="py-3.5">
                      {isJobActive ? (
                        <Badge className="border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20">
                          Active
                        </Badge>
                      ) : isExpired ? (
                        <Badge
                          variant="outline"
                          className="border-sidebar-border text-muted-foreground"
                        >
                          Expired
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="border-amber-500/30 bg-amber-500/10 text-amber-400"
                        >
                          Closed
                        </Badge>
                      )}
                    </TableCell>

                    {/* Deadline */}
                    <TableCell className="py-3.5">
                      <div className="space-y-0.5 text-xs">
                        <div className="font-medium text-foreground">
                          {job.deadline || "Open"}
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          Posted: {postedDateText}
                        </div>
                      </div>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            router.push(
                              `/dashboard/recruiter/jobs/edit/${jobId}`
                            )
                          }
                          title="Update Job Post"
                          className="h-8 px-2 text-xs text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                        >
                          <Edit3 className="size-3.5" />
                          <span className="hidden lg:inline">Update</span>
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleStatus(job)}
                          title={
                            isJobActive
                              ? "Close Listing"
                              : "Reopen Active Listing"
                          }
                          className="h-8 px-2 text-xs text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                        >
                          {isJobActive ? (
                            <XCircle className="size-3.5 text-amber-400" />
                          ) : (
                            <CheckCircle2 className="size-3.5 text-emerald-400" />
                          )}
                          <span className="hidden lg:inline">
                            {isJobActive ? "Close" : "Reopen"}
                          </span>
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeletingJob(job)}
                          title="Delete Job"
                          className="h-8 px-2 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })
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

      {/* Quick Edit Dialog */}
      <Dialog
        open={Boolean(editingJob)}
        onOpenChange={(open) => !open && setEditingJob(null)}
      >
        <DialogContent className="border-sidebar-border bg-sidebar sm:max-w-lg">
          <form onSubmit={handleSaveEdit}>
            <DialogHeader>
              <DialogTitle className="text-foreground">
                Update Job Post
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Modify title, status, or deadline for this listing in the
                database.
              </DialogDescription>
            </DialogHeader>

            {editingJob && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title" className="text-xs font-medium">
                    Job Title
                  </Label>
                  <Input
                    id="edit-title"
                    value={editingJob.title}
                    onChange={(e) =>
                      setEditingJob({ ...editingJob, title: e.target.value })
                    }
                    className="border-sidebar-border bg-background"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="edit-status"
                      className="text-xs font-medium"
                    >
                      Status
                    </Label>
                    <NativeSelect
                      id="edit-status"
                      value={editingJob.status}
                      onChange={(e) =>
                        setEditingJob({
                          ...editingJob,
                          status: e.target.value as JobListing["status"],
                        })
                      }
                      className="w-full border-sidebar-border bg-background"
                    >
                      <NativeSelectOption value="Active">
                        Active
                      </NativeSelectOption>
                      <NativeSelectOption value="Closed">
                        Closed
                      </NativeSelectOption>
                      <NativeSelectOption value="Expired">
                        Expired
                      </NativeSelectOption>
                    </NativeSelect>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="edit-deadline"
                      className="text-xs font-medium"
                    >
                      Deadline
                    </Label>
                    <Input
                      id="edit-deadline"
                      type="date"
                      value={editingJob.deadline || ""}
                      onChange={(e) =>
                        setEditingJob({
                          ...editingJob,
                          deadline: e.target.value,
                        })
                      }
                      className="border-sidebar-border bg-background"
                    />
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingJob(null)}
                className="border-sidebar-border"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#5c53fe] text-white hover:bg-[#4b42f0]"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
