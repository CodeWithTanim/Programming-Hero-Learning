import React from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getJobById } from "@/lib/api/jobs"
import { JobDetailsClient } from "./JobDetailsClient"

interface JobDetailsPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: JobDetailsPageProps): Promise<Metadata> {
  const { id } = await params
  try {
    const job = await getJobById(id)
    if (!job || !job.title) {
      return {
        title: "Job Details | HireLoop",
      }
    }
    return {
      title: `${job.title} at ${job.company} | HireLoop`,
      description: `Apply for ${job.title} at ${job.company}. Find full job details, responsibilities, requirements and benefits on HireLoop.`,
    }
  } catch {
    return {
      title: "Job Details | HireLoop",
    }
  }
}

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const { id } = await params

  try {
    const job = await getJobById(id)

    if (!job || !job.title) {
      notFound()
    }

    return (
      <React.Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-[#060608] text-white">
            <div className="flex items-center gap-3 text-sm text-neutral-400">
              <div className="size-4 animate-spin rounded-full border-2 border-[#5c53fe] border-t-transparent" />
              <span>Loading job details...</span>
            </div>
          </div>
        }
      >
        <JobDetailsClient job={job} />
      </React.Suspense>
    )
  } catch (error) {
    console.error(`Failed to load job details for id "${id}":`, error)
    notFound()
  }
}
