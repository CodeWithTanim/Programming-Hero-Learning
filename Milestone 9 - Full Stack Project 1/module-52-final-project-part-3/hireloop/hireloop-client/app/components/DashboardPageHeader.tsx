"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { BreadcrumbItem } from "@/types"

export interface DashboardPageHeaderProps {
  title: string
  description?: string
  breadcrumbs?: BreadcrumbItem[]
  backButton?: {
    label: string
    href?: string
    onClick?: () => void
  }
  actions?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

export function DashboardPageHeader({
  title,
  description,
  breadcrumbs,
  backButton,
  actions,
  className,
  children,
}: DashboardPageHeaderProps) {
  const router = useRouter()

  const handleBack = () => {
    if (backButton?.onClick) {
      backButton.onClick()
    } else if (backButton?.href) {
      router.push(backButton.href)
    } else {
      router.back()
    }
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-4 border-b border-sidebar-border pb-5 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="space-y-1.5">
        {/* Optional Back Button */}
        {backButton && (
          <div className="pb-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="h-8 gap-1.5 px-2 text-xs text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" />
              <span>{backButton.label}</span>
            </Button>
          </div>
        )}

        {/* Optional Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-muted-foreground"
          >
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1
              return (
                <React.Fragment key={index}>
                  {index > 0 && <span className="opacity-60">&rsaquo;</span>}
                  {item.href && !isLast ? (
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span
                      className={
                        isLast
                          ? "font-medium text-foreground"
                          : "text-muted-foreground"
                      }
                    >
                      {item.label}
                    </span>
                  )}
                </React.Fragment>
              )
            })}
          </nav>
        )}

        {/* Title & Description */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>

        {children}
      </div>

      {/* Action Buttons */}
      {actions && (
        <div className="flex flex-wrap items-center gap-3">{actions}</div>
      )}
    </div>
  )
}
