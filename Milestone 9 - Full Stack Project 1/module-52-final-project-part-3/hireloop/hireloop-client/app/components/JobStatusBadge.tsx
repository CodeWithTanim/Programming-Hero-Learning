import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { JobStatus } from "@/types/job"

export interface JobStatusBadgeProps {
  status: JobStatus | string
  className?: string
}

export function JobStatusBadge({ status, className }: JobStatusBadgeProps) {
  const normalized = (status || "").toLowerCase()

  if (normalized === "active") {
    return (
      <Badge
        className={cn(
          "border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20",
          className
        )}
      >
        Active
      </Badge>
    )
  }

  if (normalized === "closed") {
    return (
      <Badge
        variant="outline"
        className={cn(
          "border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20",
          className
        )}
      >
        Closed
      </Badge>
    )
  }

  if (normalized === "expired") {
    return (
      <Badge
        variant="outline"
        className={cn("border-sidebar-border text-muted-foreground", className)}
      >
        Expired
      </Badge>
    )
  }

  return (
    <Badge
      variant="outline"
      className={cn("border-sidebar-border text-foreground", className)}
    >
      {status || "Draft"}
    </Badge>
  )
}
