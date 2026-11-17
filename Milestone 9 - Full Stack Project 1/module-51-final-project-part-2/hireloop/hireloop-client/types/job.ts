export type JobStatus = "Active" | "Closed" | "Draft" | "Expired"

export const JOB_CATEGORIES = [
  "Engineering & Tech",
  "Design & Creative",
  "Product & Marketing",
  "Sales & Business",
  "Finance & Operations",
  "Customer Support",
] as const

export type JobCategory = (typeof JOB_CATEGORIES)[number]

export const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
] as const

export type JobType = (typeof JOB_TYPES)[number]

export const SALARY_PERIODS = ["per year", "per month", "per hour"] as const

export type SalaryPeriod = (typeof SALARY_PERIODS)[number]

export interface JobListing {
  _id?: string
  id?: string
  title: string
  company: string
  category: string
  type: string
  location: string
  isRemote?: boolean
  minSalary?: number | string
  maxSalary?: number | string
  salaryPeriod?: string
  applicantsCount?: number
  status: JobStatus
  deadline?: string
  responsibilities?: string
  requirements?: string
  benefits?: string
  createdAt?: string
  postedBy?: string
  postedByName?: string
}

export interface JobFormData {
  title: string
  company: string
  category: string
  type: string
  isRemote: boolean
  location: string
  deadline: string
  minSalary: string | number
  maxSalary: string | number
  salaryPeriod: string
  responsibilities: string
  requirements: string
  benefits: string
  status?: JobStatus
}

export function getDefaultJobFormData(companyName?: string): JobFormData {
  return {
    title: "",
    company: companyName ? `${companyName}'s Company` : "",
    category: "Engineering & Tech",
    type: "Full-time",
    isRemote: false,
    location: "",
    deadline: "",
    minSalary: "",
    maxSalary: "",
    salaryPeriod: "per year",
    responsibilities: "",
    requirements: "",
    benefits: "",
    status: "Active",
  }
}
