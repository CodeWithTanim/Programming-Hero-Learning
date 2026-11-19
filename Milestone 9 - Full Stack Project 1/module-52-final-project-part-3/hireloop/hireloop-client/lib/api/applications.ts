import { API_BASE_URL, ApiError } from "./jobs"
import type {
  CreateApplicationPayload,
  JobApplication,
} from "@/types/application"

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
 * Submit a job application for the current user
 */
export async function applyForJob(
  payload: CreateApplicationPayload
): Promise<{ success: boolean; insertedId?: string; message?: string }> {
  const res = await fetch(`${API_BASE_URL}/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  return handleResponse(res)
}

/**
 * Fetch all applications submitted by a user (by applicant email)
 */
export async function getUserApplications(
  email: string
): Promise<JobApplication[]> {
  if (!email) return []
  const res = await fetch(
    `${API_BASE_URL}/applications?email=${encodeURIComponent(email)}`,
    {
      method: "GET",
      cache: "no-store",
    }
  )
  const data = await handleResponse<JobApplication[]>(res)
  if (!Array.isArray(data)) return []
  return data.map((item) => ({
    ...item,
    id: item._id || item.id,
  }))
}

/**
 * Check if a user has already applied for a specific job
 */
export async function checkHasApplied(
  jobId: string,
  email: string
): Promise<boolean> {
  if (!jobId || !email) return false
  try {
    const res = await fetch(
      `${API_BASE_URL}/applications/check?jobId=${encodeURIComponent(jobId)}&email=${encodeURIComponent(email)}`,
      {
        method: "GET",
        cache: "no-store",
      }
    )
    const data = await handleResponse<{ hasApplied: boolean }>(res)
    return Boolean(data.hasApplied)
  } catch {
    return false
  }
}
