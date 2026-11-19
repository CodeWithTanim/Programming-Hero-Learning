"use client"

import React from "react"
import { Activity, Briefcase, Building2, Users } from "lucide-react"

import { DashboardPageHeader } from "@/app/components/DashboardPageHeader"
import { DashboardStatCard } from "@/app/components/DashboardStatCard"
import { SignOutButton } from "@/components/sign-out-button"
import { useSession } from "@/lib/auth-client"

export default function AdminDashboardPage() {
  const { data: session } = useSession()

  return (
    <div className="flex flex-col gap-6 p-6">
      <DashboardPageHeader
        title="Admin Dashboard"
        description={`Welcome back${session?.user?.name ? `, ${session.user.name}` : ""}! Manage users, companies, jobs, and platform operations.`}
        actions={
          <SignOutButton
            variant="outline"
            label="Sign Out"
            className="border-sidebar-border hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          />
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardStatCard
          title="Total Users"
          value={0}
          description="Registered platform users"
          icon={<Users className="size-4" />}
        />
        <DashboardStatCard
          title="Companies"
          value={0}
          description="Registered companies"
          icon={<Building2 className="size-4" />}
        />
        <DashboardStatCard
          title="Active Jobs"
          value={0}
          description="Jobs across categories"
          icon={<Briefcase className="size-4" />}
        />
        <DashboardStatCard
          title="System Health"
          value="Good"
          description="All services operational"
          icon={<Activity className="size-4" />}
          highlight
        />
      </div>
    </div>
  )
}
