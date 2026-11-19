import React from "react"
import { getJobs } from "@/lib/api/jobs"
import type { JobListing } from "@/types/job"
import { BrowseJobsView } from "./BrowseJobsView"

interface BrowseJobsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function BrowseJobsPage({
  searchParams,
}: BrowseJobsPageProps) {
  const search = await searchParams
  const urlSearch = new URLSearchParams()

  if (search) {
    for (const [key, val] of Object.entries(search)) {
      if (typeof val === "string" && val.trim()) {
        urlSearch.set(key, val.trim())
      } else if (
        Array.isArray(val) &&
        val.length > 0 &&
        typeof val[0] === "string"
      ) {
        urlSearch.set(key, val[0].trim())
      }
    }
  }

  const query = urlSearch.toString()
  console.log("Database Search Params Query:", query)

  // Fetch real database data (filtered by query)
  let jobs: JobListing[] = []
  // Fetch all jobs for real database counts in sidebar filters
  let allJobs: JobListing[] = []

  try {
    const [filteredData, allData] = await Promise.all([
      getJobs(undefined, query),
      getJobs(),
    ])
    jobs = filteredData
    allJobs = allData
  } catch (err) {
    console.error("Failed to fetch jobs from database:", err)
    jobs = []
    allJobs = []
  }

  return (
    <React.Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#060608] text-white">
          <div className="flex items-center gap-3 text-sm text-neutral-400">
            <div className="size-4 animate-spin rounded-full border-2 border-[#5c53fe] border-t-transparent" />
            <span>Loading database positions...</span>
          </div>
        </div>
      }
    >
      <BrowseJobsView jobs={jobs} allJobs={allJobs} />
    </React.Suspense>
  )
}

// http://localhost:3000/browse-jobs?jobType=part-time&isRemote=true
