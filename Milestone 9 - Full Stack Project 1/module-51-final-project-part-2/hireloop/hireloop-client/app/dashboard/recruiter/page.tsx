"use client"

import React from "react"
import { SignOutButton } from "@/components/sign-out-button"
import { useSession } from "@/lib/auth-client"

export default function RecruiterDashboardPage() {
  const { data: session } = useSession()

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-4 border-b border-sidebar-border pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Recruiter Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Welcome back{session?.user?.name ? `, ${session.user.name}` : ""}!
            Post jobs, manage listings, and review candidate applications.
          </p>
        </div>
        <SignOutButton
          variant="outline"
          label="Sign Out"
          className="border-sidebar-border hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-sidebar-border bg-sidebar p-5 shadow-xs">
          <h3 className="text-sm font-medium text-muted-foreground">
            Posted Jobs
          </h3>
          <p className="mt-2 text-3xl font-semibold text-foreground">0</p>
          <p className="mt-1 text-xs text-muted-foreground/80">
            Active job listings
          </p>
        </div>
        <div className="rounded-xl border border-sidebar-border bg-sidebar p-5 shadow-xs">
          <h3 className="text-sm font-medium text-muted-foreground">
            Total Applicants
          </h3>
          <p className="mt-2 text-3xl font-semibold text-foreground">0</p>
          <p className="mt-1 text-xs text-muted-foreground/80">
            Candidates applied
          </p>
        </div>
        <div className="rounded-xl border border-sidebar-border bg-sidebar p-5 shadow-xs">
          <h3 className="text-sm font-medium text-muted-foreground">
            Pending Reviews
          </h3>
          <p className="mt-2 text-3xl font-semibold text-primary">0</p>
          <p className="mt-1 text-xs text-muted-foreground/80">
            Applications to review
          </p>
        </div>
      </div>
    </div>
  )
}
