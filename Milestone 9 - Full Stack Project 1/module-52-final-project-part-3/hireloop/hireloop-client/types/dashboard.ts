import type React from "react"
import type { LucideIcon } from "lucide-react"

export interface DashboardMenuItem {
  name: string
  url: string
  icon: LucideIcon
}

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface DashboardStatItem {
  title: string
  value: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  highlight?: boolean
}
