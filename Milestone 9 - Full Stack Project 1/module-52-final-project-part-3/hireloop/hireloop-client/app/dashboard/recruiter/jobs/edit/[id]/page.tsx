"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { CheckCircle2, Trash2 } from "lucide-react"

import { DashboardPageHeader } from "@/app/components/DashboardPageHeader"
import { DeleteJobDialog } from "@/app/components/DeleteJobDialog"
import { JobForm } from "@/app/components/JobForm"
import { JobPreviewCard } from "@/app/components/JobPreviewCard"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/components/ui/toast"
import { getJobById, updateJob } from "@/lib/api/jobs"
import type { JobFormData } from "@/types/job"
import { getDefaultJobFormData } from "@/types/job"

export default function UpdateJobPage() {
  const router = useRouter()
  const params = useParams()
  const jobId = (params?.id as string) || ""

  const [isLoading, setIsLoading] = React.useState(true)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  const [formData, setFormData] = React.useState<JobFormData>(() =>
    getDefaultJobFormData()
  )

  // Fetch job details from database
  React.useEffect(() => {
    if (!jobId) return

    async function loadJobDetails() {
      setIsLoading(true)
      try {
        const job = await getJobById(jobId)
        setFormData({
          title: job.title || "",
          company: job.company || "",
          category: job.category || "Engineering & Tech",
          type: job.type || "Full-time",
          isRemote: Boolean(job.isRemote),
          location: job.location || "",
          deadline: job.deadline || "",
          minSalary: job.minSalary ? String(job.minSalary) : "",
          maxSalary: job.maxSalary ? String(job.maxSalary) : "",
          salaryPeriod: job.salaryPeriod || "per year",
          responsibilities: job.responsibilities || "",
          requirements: job.requirements || "",
          benefits: job.benefits || "",
          status: job.status || "Active",
        })
      } catch (err) {
        console.error("Failed to fetch job details:", err)
        setErrorMessage(
          err instanceof Error
            ? err.message
            : "Could not find this job in the database."
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadJobDetails()
  }, [jobId])

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      await updateJob(jobId, {
        ...formData,
        minSalary: formData.minSalary ? Number(formData.minSalary) : 0,
        maxSalary: formData.maxSalary ? Number(formData.maxSalary) : 0,
      })

      setIsSuccess(true)
      toast.success("Job updated successfully", {
        description: `"${formData.title}" has been updated in the database.`,
      })
      router.refresh()

      setTimeout(() => {
        router.push("/dashboard/recruiter/jobs")
      }, 1500)
    } catch (err) {
      console.error("Failed to update job:", err)
      const msg =
        err instanceof Error ? err.message : "Failed to update job on server"
      setErrorMessage(msg)
      toast.error("Failed to update job", {
        description: msg,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-3">
        <Spinner className="size-8 text-[#5c53fe]" />
        <p className="text-sm text-muted-foreground">
          Loading job post specifications from database...
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8">
      {/* Top Breadcrumb & Page Headings */}
      <DashboardPageHeader
        title="Update Job Post"
        description="Modify position specifications, compensation range, and candidate requirements for this listing."
        backButton={{
          label: "Manage Jobs",
          href: "/dashboard/recruiter/jobs",
        }}
        actions={
          <DeleteJobDialog
            job={{
              id: jobId,
              title: formData.title || "Job Post",
              company: formData.company,
            }}
            trigger={
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8 gap-1.5 border-destructive/30 px-2.5 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="size-3.5" />
                <span>Delete Job</span>
              </Button>
            }
            onDeleted={() => {
              router.push("/dashboard/recruiter/jobs")
            }}
          />
        }
      />

      {/* Success Notification */}
      {isSuccess && (
        <div className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-400">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="size-5 shrink-0 text-emerald-400" />
            <div>
              <p className="font-semibold text-emerald-300">
                Job post updated successfully!
              </p>
              <p className="text-xs text-emerald-400/80">
                Changes have been saved to the database. Redirecting to Manage
                Jobs...
              </p>
            </div>
          </div>
          <Button
            size="sm"
            onClick={() => router.push("/dashboard/recruiter/jobs")}
            className="h-7 bg-emerald-600 text-xs text-white hover:bg-emerald-500"
          >
            Back to Jobs
          </Button>
        </div>
      )}

      {/* Error Notification */}
      {errorMessage && (
        <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-xs text-destructive">
          {errorMessage}
        </div>
      )}

      {/* Main Content Layout: Form 60% + Live Preview 40% */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Reusable Form Configuration (60%) */}
        <div className="space-y-6 lg:col-span-7 xl:col-span-8">
          <JobForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            mode="edit"
            onCancel={() => router.push("/dashboard/recruiter/jobs")}
          />
        </div>

        {/* Right Column: Reusable Live Preview Card (40%) */}
        <div className="space-y-4 lg:col-span-5 xl:col-span-4">
          <JobPreviewCard
            data={formData}
            subtitleNote="* Live preview dynamically updates as you edit position details."
          />
        </div>
      </div>
    </div>
  )
}
