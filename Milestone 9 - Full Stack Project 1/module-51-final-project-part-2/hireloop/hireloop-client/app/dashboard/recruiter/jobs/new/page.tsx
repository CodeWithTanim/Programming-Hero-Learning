"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle2 } from "lucide-react"

import { JobForm } from "@/app/components/JobForm"
import { JobPreviewCard } from "@/app/components/JobPreviewCard"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { createJob } from "@/lib/api/jobs"
import { useSession } from "@/lib/auth-client"
import type { JobFormData } from "@/types/job"
import { getDefaultJobFormData } from "@/types/job"

export default function NewJobPage() {
  const router = useRouter()
  const { data: session } = useSession()

  const [formData, setFormData] = React.useState<JobFormData>(() =>
    getDefaultJobFormData(session?.user?.name)
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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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

      // Reset form fields
      setFormData(getDefaultJobFormData(session?.user?.name))
      setSubmittedData({ ...formData, ...createdJob })
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
      <div className="flex flex-col gap-4 border-b border-sidebar-border pb-5">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/dashboard/recruiter/jobs")}
            className="h-8 gap-1.5 px-2.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            <span>Manage Jobs</span>
          </Button>
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Create Job Post
          </h1>
          <p className="text-sm text-muted-foreground">
            Modify position specifications, compensation range, and candidate
            requirements for this listing.
          </p>
        </div>
      </div>

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
