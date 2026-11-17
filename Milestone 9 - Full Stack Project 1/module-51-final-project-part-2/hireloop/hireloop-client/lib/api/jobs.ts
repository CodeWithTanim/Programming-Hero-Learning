import type { JobFormData, JobListing } from "@/types/job"

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.name = "ApiError"
    this.status = status
  }
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new ApiError(
      errorData.error || `Request failed with status ${res.status}`,
      res.status
    )
  }
  return res.json()
}

/**
 * Fetch all jobs, optionally filtered by the recruiter's email
 */
export async function getJobs(email?: string): Promise<JobListing[]> {
  const url = email
    ? `${API_BASE_URL}/jobs?email=${encodeURIComponent(email)}`
    : `${API_BASE_URL}/jobs`

  const data = await handleResponse<JobListing[]>(
    await fetch(url, { method: "GET" })
  )

  if (!Array.isArray(data)) return []

  // If email was provided, strictly ensure jobs belong to that recruiter
  const filtered = email ? data.filter((item) => item.postedBy === email) : data

  return filtered.map((item) => ({
    ...item,
    id: item._id || item.id,
    applicantsCount: item.applicantsCount || 0,
    status: item.status || "Active",
  }))
}

/**
 * Fetch a single job by ID
 */
export async function getJobById(id: string): Promise<JobListing> {
  return handleResponse<JobListing>(
    await fetch(`${API_BASE_URL}/jobs/${id}`, { method: "GET" })
  )
}

/**
 * Create a new job listing
 */
export async function createJob(
  payload: JobFormData & {
    postedBy?: string
    postedByName?: string
    createdAt?: string
  }
): Promise<JobListing> {
  const formattedPayload = {
    ...payload,
    title: payload.title.trim(),
    company: payload.company.trim(),
    location: payload.isRemote
      ? "Remote / Worldwide"
      : payload.location.trim() || "Remote",
    minSalary: payload.minSalary ? Number(payload.minSalary) : 0,
    maxSalary: payload.maxSalary ? Number(payload.maxSalary) : 0,
    responsibilities: payload.responsibilities.trim(),
    requirements: payload.requirements.trim(),
    benefits: payload.benefits.trim(),
    status: payload.status || "Active",
    createdAt: payload.createdAt || new Date().toISOString(),
  }

  return handleResponse<JobListing>(
    await fetch(`${API_BASE_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formattedPayload),
    })
  )
}

/**
 * Update an existing job by ID
 */
export async function updateJob(
  id: string,
  payload: Partial<JobListing>
): Promise<{ acknowledged: boolean; modifiedCount: number }> {
  return handleResponse<{ acknowledged: boolean; modifiedCount: number }>(
    await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
  )
}

/**
 * Permanently delete a job by ID
 */
export async function deleteJob(
  id: string
): Promise<{ acknowledged: boolean; deletedCount: number }> {
  return handleResponse<{ acknowledged: boolean; deletedCount: number }>(
    await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: "DELETE",
    })
  )
}
