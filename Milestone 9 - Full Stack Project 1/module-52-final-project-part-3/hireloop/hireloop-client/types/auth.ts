export const USER_ROLES = ["seeker", "recruiter", "admin"] as const

export type UserRole = (typeof USER_ROLES)[number]

/**
 * Backward compatibility aliases
 */
export type Role = UserRole
export type DashboardRole = UserRole

export interface AuthSessionUser {
  id: string
  name: string
  email: string
  role?: UserRole
  image?: string | null
  emailVerified?: boolean
  createdAt?: string | Date
  updatedAt?: string | Date
}
