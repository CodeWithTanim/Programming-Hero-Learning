"use client"

import * as React from "react"
import {
  Briefcase,
  CheckCircle2,
  Edit3,
  Globe,
  MapPin,
  Trash2,
  Users,
  XCircle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { JobStatusBadge } from "@/app/components/JobStatusBadge"
import type { JobListing } from "@/types/job"

export interface JobTableRowProps {
  job: JobListing
  onToggleStatus: (job: JobListing) => void
  onDelete: (job: JobListing) => void
  onEdit: (job: JobListing) => void
}

export function JobTableRow({
  job,
  onToggleStatus,
  onDelete,
  onEdit,
}: JobTableRowProps) {
  const jobId = job._id || job.id
  const isJobActive = job.status === "Active"

  // Format compensation
  let compText = "Negotiable"
  if (job.minSalary && job.maxSalary) {
    const min = Number(job.minSalary).toLocaleString()
    const max = Number(job.maxSalary).toLocaleString()
    compText = `$${min} - $${max} ${job.salaryPeriod ? `/ ${job.salaryPeriod.replace("per ", "")}` : ""}`
  } else if (job.minSalary) {
    compText = `From $${Number(job.minSalary).toLocaleString()}`
  }

  // Format posted date
  let postedDateText = "Recently"
  if (job.createdAt) {
    try {
      const date = new Date(job.createdAt)
      postedDateText = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    } catch {
      postedDateText = "Recently"
    }
  }

  return (
    <TableRow
      key={jobId}
      className="border-sidebar-border transition-colors hover:bg-sidebar-accent/50"
    >
      {/* Job Title & Department */}
      <TableCell className="py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-sidebar-border bg-background text-[#5c53fe]">
            <Briefcase className="size-4" />
          </div>
          <div className="space-y-0.5">
            <span className="line-clamp-1 font-semibold text-foreground">
              {job.title}
            </span>
            <span className="text-xs text-muted-foreground">
              {job.category}
            </span>
          </div>
        </div>
      </TableCell>

      {/* Company & Location */}
      <TableCell className="py-3.5">
        <div className="space-y-0.5">
          <div className="font-medium text-foreground">{job.company}</div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            {job.isRemote ? (
              <Globe className="size-3 text-[#5c53fe]" />
            ) : (
              <MapPin className="size-3 text-muted-foreground" />
            )}
            <span className="truncate">{job.location}</span>
          </div>
        </div>
      </TableCell>

      {/* Job Type */}
      <TableCell className="py-3.5">
        <Badge
          variant="outline"
          className="border-sidebar-border text-[11px] font-medium text-foreground"
        >
          {job.type}
        </Badge>
      </TableCell>

      {/* Compensation */}
      <TableCell className="py-3.5 text-xs font-medium text-foreground">
        {compText}
      </TableCell>

      {/* Applicants */}
      <TableCell className="py-3.5">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-sidebar-border bg-background/60 px-2.5 py-1 text-xs font-medium text-foreground">
          <Users className="size-3 text-[#5c53fe]" />
          <span>{job.applicantsCount || 0} Candidates</span>
        </div>
      </TableCell>

      {/* Status */}
      <TableCell className="py-3.5">
        <JobStatusBadge status={job.status} />
      </TableCell>

      {/* Deadline */}
      <TableCell className="py-3.5">
        <div className="space-y-0.5 text-xs">
          <div className="font-medium text-foreground">
            {job.deadline || "Open"}
          </div>
          <div className="text-[11px] text-muted-foreground">
            Posted: {postedDateText}
          </div>
        </div>
      </TableCell>

      {/* Actions */}
      <TableCell className="py-3.5 text-right">
        <div className="flex items-center justify-end gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(job)}
            title="Update Job Post"
            className="h-8 px-2 text-xs text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
          >
            <Edit3 className="size-3.5" />
            <span className="hidden lg:inline">Update</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleStatus(job)}
            title={isJobActive ? "Close Listing" : "Reopen Active Listing"}
            className="h-8 px-2 text-xs text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
          >
            {isJobActive ? (
              <XCircle className="size-3.5 text-amber-400" />
            ) : (
              <CheckCircle2 className="size-3.5 text-emerald-400" />
            )}
            <span className="hidden lg:inline">
              {isJobActive ? "Close" : "Reopen"}
            </span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(job)}
            title="Delete Job"
            className="h-8 px-2 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
