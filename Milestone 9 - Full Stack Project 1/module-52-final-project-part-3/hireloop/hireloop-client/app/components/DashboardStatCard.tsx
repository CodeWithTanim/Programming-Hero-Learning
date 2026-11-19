"use client"

import * as React from "react"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

export interface DashboardStatCardProps {
  title: string
  value: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  isLoading?: boolean
  highlight?: boolean
  className?: string
  valueClassName?: string
  descriptionClassName?: string
}

export function DashboardStatCard({
  title,
  value,
  description,
  icon,
  isLoading = false,
  highlight = false,
  className,
  valueClassName,
  descriptionClassName,
}: DashboardStatCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between rounded-xl border border-sidebar-border bg-sidebar p-5 shadow-xs transition-colors",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>

      <div className="mt-2">
        {isLoading ? (
          <div className="flex h-9 items-center">
            <Spinner className="size-5 text-[#5c53fe]" />
          </div>
        ) : (
          <p
            className={cn(
              "text-3xl font-semibold tracking-tight text-foreground",
              highlight && "text-[#5c53fe]",
              valueClassName
            )}
          >
            {value}
          </p>
        )}
      </div>

      {description && (
        <p
          className={cn(
            "mt-1 text-xs text-muted-foreground/80",
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
