"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { AlertTriangle, CheckCircle2 } from "lucide-react"

import { DashboardPageHeader } from "@/app/components/DashboardPageHeader"
import { JobForm } from "@/app/components/JobForm"
import { JobPreviewCard } from "@/app/components/JobPreviewCard"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { createJob, getJobs } from "@/lib/api/jobs"
import { useSession } from "@/lib/auth-client"
import type { JobFormData } from "@/types/job"
import {
  getDefaultJobFormData,
  RECRUITER_PLAN_MAX_ACTIVE_JOBS,
} from "@/types/job"

export default function NewJobPage() {
  const router = useRouter()
  const { data: session } = useSession()

  const [formData, setFormData] = React.useState<JobFormData>(() =>
    getDefaultJobFormData(session?.user?.name)
  )
  const [activeJobsCount, setActiveJobsCount] = React.useState<number | null>(
    null
  )
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submittedData, setSubmittedData] = React.useState<Record<
    string,
    unknown
  > | null>(null)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  // Populate company name once user session is loaded
  React.useEffect(() => {
    if (session?.user?.name) {
      setFormData((prev) => {
        if (!prev.company) {
          return { ...prev, company: `${session.user.name}'s Company` }
        }
        return prev
      })
    }
  }, [session?.user?.name])

  // Check active jobs count to enforce plan limits
  React.useEffect(() => {
    if (!session?.user?.email) return
    getJobs(session.user.email)
      .then((jobs) => {
        const active = jobs.filter((j) => j.status === "Active").length
        setActiveJobsCount(active)
      })
      .catch((err) => {
        console.error("Failed to check active job count:", err)
      })
  }, [session?.user?.email])

  const isLimitReached =
    activeJobsCount !== null &&
    activeJobsCount >= RECRUITER_PLAN_MAX_ACTIVE_JOBS

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isLimitReached) {
      toast.error("Plan limit reached", {
        description: `You already have ${activeJobsCount} active job posts (maximum is ${RECRUITER_PLAN_MAX_ACTIVE_JOBS}). Please close or delete a job first.`,
      })
      return
    }

    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const createdJob = await createJob({
        ...formData,
        postedBy: session?.user?.email || "recruiter",
        postedByName: session?.user?.name || "Recruiter",
      })

      toast.success("Job post created successfully", {
        description: `"${formData.title}" has been published.`,
      })

      // Update local count so quota check immediately reflects new job
      setActiveJobsCount((prev) => (prev !== null ? prev + 1 : 1))

      // Reset form fields
      setFormData(getDefaultJobFormData(session?.user?.name))
      setSubmittedData({ ...formData, ...createdJob })

      // Redirect to recruiter jobs dashboard
      router.push("/dashboard/recruiter/jobs")
      router.refresh()
    } catch (err) {
      console.error("Failed to create job on backend:", err)
      const msg =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while creating the job post."
      setErrorMessage(msg)
      toast.error("Failed to create job", {
        description: msg,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8">
      {/* Top Header */}
      <DashboardPageHeader
        title="Create Job Post"
        description="Modify position specifications, compensation range, and candidate requirements for this listing."
        backButton={{
          label: "Manage Jobs",
          href: "/dashboard/recruiter/jobs",
        }}
      />

      {/* Plan Limit Warning Banner */}
      {isLimitReached && (
        <div className="flex flex-col items-start justify-between gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-300 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <AlertTriangle className="size-5 shrink-0 text-amber-400" />
            <div>
              <p className="font-semibold text-amber-200">
                Active Job Limit Reached ({activeJobsCount} /{" "}
                {RECRUITER_PLAN_MAX_ACTIVE_JOBS})
              </p>
              <p className="text-xs text-amber-300/80">
                Your Growth Plan allows a maximum of{" "}
                {RECRUITER_PLAN_MAX_ACTIVE_JOBS} active job posts. You cannot
                post a new active job until you close or delete an existing one.
              </p>
            </div>
          </div>
          <Button
            size="sm"
            onClick={() => router.push("/dashboard/recruiter/jobs")}
            className="h-7 shrink-0 bg-amber-600 text-xs text-white hover:bg-amber-500"
          >
            Manage Existing Jobs
          </Button>
        </div>
      )}

      {/* Error Notification */}
      {errorMessage && (
        <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-xs text-destructive">
          {errorMessage}
        </div>
      )}

      {/* Success Notification */}
      {submittedData && (
        <div className="flex items-start justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-400">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="size-5 shrink-0 text-emerald-400" />
            <div>
              <p className="font-semibold text-emerald-300">
                Job post created successfully!
              </p>
              <p className="text-xs text-emerald-400/80">
                &ldquo;{String(submittedData.title)}&rdquo; has been registered
                and is now ready for applicants.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isLimitReached && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSubmittedData(null)
                  setFormData(getDefaultJobFormData(session?.user?.name))
                }}
                className="h-7 border-emerald-500/30 bg-emerald-950/30 text-xs text-emerald-300 hover:bg-emerald-900/40"
              >
                Post Another
              </Button>
            )}
            <Button
              size="sm"
              onClick={() => router.push("/dashboard/recruiter/jobs")}
              className="h-7 bg-emerald-600 text-xs text-white hover:bg-emerald-500"
            >
              View Jobs
            </Button>
          </div>
        </div>
      )}

      {/* Main Content Layout: Form 60% + Live Preview 40% */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Reusable Form Component (60%) */}
        <div className="space-y-6 lg:col-span-7 xl:col-span-8">
          <JobForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            mode="create"
            isLimitReached={isLimitReached}
            onCancel={() => router.push("/dashboard/recruiter/jobs")}
          />
        </div>

        {/* Right Column: Reusable Live Preview Card (40%) */}
        <div className="space-y-4 lg:col-span-5 xl:col-span-4">
          <JobPreviewCard
            data={formData}
            subtitleNote="* Live preview dynamically updates as you type your form data."
          />
        </div>
      </div>
    </div>
  )
}
