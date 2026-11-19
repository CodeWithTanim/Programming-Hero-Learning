"use client"

import React from "react"
import { Briefcase, Clock, Users } from "lucide-react"

import { DashboardPageHeader } from "@/app/components/DashboardPageHeader"
import { DashboardStatCard } from "@/app/components/DashboardStatCard"
import { SignOutButton } from "@/components/sign-out-button"
import { getJobs } from "@/lib/api/jobs"
import { useSession } from "@/lib/auth-client"

export default function RecruiterDashboardPage() {
  const { data: session } = useSession()
  const [activeJobsCount, setActiveJobsCount] = React.useState<number>(0)
  const [totalApplicants, setTotalApplicants] = React.useState<number>(0)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    if (!session?.user?.email) return
    getJobs(session.user.email)
      .then((jobs) => {
        const active = jobs.filter((j) => j.status === "Active").length
        const applicants = jobs.reduce(
          (sum, j) => sum + (j.applicantsCount || 0),
          0
        )
        setActiveJobsCount(active)
        setTotalApplicants(applicants)
      })
      .catch((err) => {
        console.error("Failed to load recruiter stats:", err)
      })
      .finally(() => setIsLoading(false))
  }, [session?.user?.email])

  return (
    <div className="flex flex-col gap-6 p-6">
      <DashboardPageHeader
        title="Recruiter Dashboard"
        description={`Welcome back${session?.user?.name ? `, ${session.user.name}` : ""}! Post jobs, manage listings, and review candidate applications.`}
        actions={
          <SignOutButton
            variant="outline"
            label="Sign Out"
            className="border-sidebar-border hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          />
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardStatCard
          title="Posted Jobs"
          value={activeJobsCount}
          description="Active job listings"
          icon={<Briefcase className="size-4" />}
          isLoading={isLoading}
        />
        <DashboardStatCard
          title="Total Applicants"
          value={totalApplicants}
          description="Candidates applied"
          icon={<Users className="size-4" />}
          isLoading={isLoading}
        />
        <DashboardStatCard
          title="Pending Reviews"
          value={0}
          description="Applications to review"
          icon={<Clock className="size-4" />}
          highlight
        />
      </div>
    </div>
  )
}
