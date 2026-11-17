import * as React from "react"
import {
  Briefcase,
  Building2,
  Calendar,
  DollarSign,
  MapPin,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { JobFormData, JobListing } from "@/types/job"

export interface JobPreviewCardProps {
  data: Partial<JobFormData | JobListing>
  badgeLabel?: string
  subtitleNote?: string
}

export function JobPreviewCard({
  data,
  badgeLabel = "Candidate View",
  subtitleNote = "* Live preview dynamically updates as you edit position details.",
}: JobPreviewCardProps) {
  const displayLocation = data.isRemote
    ? "Remote / Worldwide"
    : data.location || "Location not specified"

  const hasSalaryRange = data.minSalary && data.maxSalary
  const minNum = data.minSalary ? Number(data.minSalary).toLocaleString() : ""
  const maxNum = data.maxSalary ? Number(data.maxSalary).toLocaleString() : ""
  const period = data.salaryPeriod || "per year"

  const salaryText = hasSalaryRange
    ? `$${minNum} - $${maxNum} ${period}`
    : minNum
      ? `From $${minNum} ${period}`
      : "Compensation negotiable"

  return (
    <div className="space-y-4">
      <div className="sticky top-6 space-y-4">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Live Job Preview
          </span>
          <Badge
            variant="outline"
            className="border-emerald-500/30 bg-emerald-500/10 text-[11px] text-emerald-400"
          >
            {badgeLabel}
          </Badge>
        </div>

        <Card className="border-sidebar-border bg-sidebar/80 shadow-md">
          <CardHeader className="space-y-3 pb-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-sidebar-border bg-background/80 text-[#5c53fe]">
                <Briefcase className="size-5" />
              </div>
              <Badge className="bg-[#5c53fe]/15 text-xs font-medium text-[#5c53fe]">
                {data.type || "Full-time"}
              </Badge>
            </div>

            <div>
              <CardTitle className="line-clamp-1 text-lg font-bold text-foreground">
                {data.title || "Job Title Preview"}
              </CardTitle>
              <CardDescription className="flex items-center gap-1.5 pt-1 text-xs text-muted-foreground">
                <Building2 className="size-3.5" />
                <span>{data.company || "Company Name"}</span>
              </CardDescription>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              <Badge
                variant="outline"
                className="border-sidebar-border text-[11px] text-muted-foreground"
              >
                {data.category || "General"}
              </Badge>
              {data.isRemote ? (
                <Badge
                  variant="outline"
                  className="border-emerald-500/30 bg-emerald-500/10 text-[11px] text-emerald-400"
                >
                  Remote
                </Badge>
              ) : null}
            </div>
          </CardHeader>

          <CardContent className="space-y-3 text-xs text-muted-foreground">
            {/* Meta info block */}
            <div className="flex flex-col gap-2 rounded-lg border border-sidebar-border/60 bg-background/50 p-3">
              <div className="flex items-center gap-2">
                <MapPin className="size-3.5 text-[#5c53fe]" />
                <span className="truncate">{displayLocation}</span>
              </div>

              <div className="flex items-center gap-2">
                <DollarSign className="size-3.5 text-emerald-400" />
                <span>{salaryText}</span>
              </div>

              {data.deadline && (
                <div className="flex items-center gap-2">
                  <Calendar className="size-3.5 text-amber-400" />
                  <span>Deadline: {data.deadline}</span>
                </div>
              )}
            </div>

            {/* Excerpt of responsibilities */}
            {data.responsibilities && (
              <div className="space-y-1">
                <p className="font-medium text-foreground">
                  Responsibilities Preview
                </p>
                <p className="line-clamp-3 text-[11px] leading-relaxed text-muted-foreground">
                  {data.responsibilities}
                </p>
              </div>
            )}

            {/* Excerpt of requirements */}
            {data.requirements && (
              <div className="space-y-1">
                <p className="font-medium text-foreground">
                  Requirements Preview
                </p>
                <p className="line-clamp-3 text-[11px] leading-relaxed text-muted-foreground">
                  {data.requirements}
                </p>
              </div>
            )}
          </CardContent>

          <CardFooter className="border-t border-sidebar-border/60 pt-3">
            <Button
              disabled
              size="sm"
              className="w-full bg-white/10 text-xs text-white/60"
            >
              Apply Now (Candidate Action)
            </Button>
          </CardFooter>
        </Card>

        {subtitleNote && (
          <p className="px-1 text-[11px] text-muted-foreground/70">
            {subtitleNote}
          </p>
        )}
      </div>
    </div>
  )
}
