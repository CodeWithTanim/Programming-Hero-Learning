"use client"

import React from "react"
import { SignOutButton } from "@/components/sign-out-button"
import { useSession } from "@/lib/auth-client"

export default function AdminDashboardPage() {
  const { data: session } = useSession()

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-4 border-b border-sidebar-border pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Welcome back{session?.user?.name ? `, ${session.user.name}` : ""}!
            Manage users, companies, jobs, and platform operations.
          </p>
        </div>
        <SignOutButton
          variant="outline"
          label="Sign Out"
          className="border-sidebar-border hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-sidebar-border bg-sidebar p-5 shadow-xs">
          <h3 className="text-sm font-medium text-muted-foreground">
            Total Users
          </h3>
          <p className="mt-2 text-3xl font-semibold text-foreground">0</p>
          <p className="mt-1 text-xs text-muted-foreground/80">
            Registered platform users
          </p>
        </div>
        <div className="rounded-xl border border-sidebar-border bg-sidebar p-5 shadow-xs">
          <h3 className="text-sm font-medium text-muted-foreground">
            Companies
          </h3>
          <p className="mt-2 text-3xl font-semibold text-foreground">0</p>
          <p className="mt-1 text-xs text-muted-foreground/80">
            Registered companies
          </p>
        </div>
        <div className="rounded-xl border border-sidebar-border bg-sidebar p-5 shadow-xs">
          <h3 className="text-sm font-medium text-muted-foreground">
            Active Jobs
          </h3>
          <p className="mt-2 text-3xl font-semibold text-foreground">0</p>
          <p className="mt-1 text-xs text-muted-foreground/80">
            Jobs across categories
          </p>
        </div>
        <div className="rounded-xl border border-sidebar-border bg-sidebar p-5 shadow-xs">
          <h3 className="text-sm font-medium text-muted-foreground">
            System Health
          </h3>
          <p className="mt-2 text-3xl font-semibold text-primary">Good</p>
          <p className="mt-1 text-xs text-muted-foreground/80">
            All services operational
          </p>
        </div>
      </div>
    </div>
  )
}
