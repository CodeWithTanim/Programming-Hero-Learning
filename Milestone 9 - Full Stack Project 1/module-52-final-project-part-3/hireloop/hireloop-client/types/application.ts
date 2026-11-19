export type ApplicationStatus =
  | "Applied"
  | "Review"
  | "Under Review"
  | "Shortlisted"
  | "Interview"
  | "Interviewing"
  | "Offered"
  | "Accepted"
  | "Rejected"

export interface JobApplication {
  _id?: string
  id?: string
  jobId: string
  jobTitle: string
  company: string
  category?: string
  type?: string
  location?: string
  applicantEmail: string
  applicantName: string
  applicantId?: string
  applicantRole?: string
  status: ApplicationStatus
  appliedAt: string
}

export interface CreateApplicationPayload {
  jobId: string
  jobTitle: string
  company: string
  category?: string
  type?: string
  location?: string
  applicantEmail: string
  applicantName: string
  applicantId?: string
  applicantRole?: string
  status?: ApplicationStatus
}
