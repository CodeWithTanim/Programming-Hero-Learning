"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Spinner } from "@/components/ui/spinner"
import { useSession } from "@/lib/auth-client"
import { DashboardSidebar } from "../components/DashboardSidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, isPending } = useSession()

  React.useEffect(() => {
    if (isPending) return

    if (!session?.user) {
      router.replace("/sign-in")
      return
    }

    const userRole = (session.user.role || "seeker").toLowerCase()

    if (pathname.startsWith("/dashboard/seeker") && userRole !== "seeker") {
      const target =
        userRole === "admin" ? "/dashboard/admin" : "/dashboard/recruiter"
      router.replace(target)
      return
    }

    if (
      pathname.startsWith("/dashboard/recruiter") &&
      userRole !== "recruiter" &&
      userRole !== "recuiter"
    ) {
      const target =
        userRole === "admin" ? "/dashboard/admin" : "/dashboard/seeker"
      router.replace(target)
      return
    }

    if (pathname.startsWith("/dashboard/admin") && userRole !== "admin") {
      const target =
        userRole === "recruiter" || userRole === "recuiter"
          ? "/dashboard/recruiter"
          : "/dashboard/seeker"
      router.replace(target)
      return
    }
  }, [session, isPending, pathname, router])

  if (isPending) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-[#010103] text-white">
        <Spinner className="size-8 text-[#5c53fe]" />
      </div>
    )
  }

  if (!session?.user) {
    return null
  }

  const userRole = (session.user.role || "seeker").toLowerCase()
  const isUnauthorized =
    (pathname.startsWith("/dashboard/seeker") && userRole !== "seeker") ||
    (pathname.startsWith("/dashboard/recruiter") &&
      userRole !== "recruiter" &&
      userRole !== "recuiter") ||
    (pathname.startsWith("/dashboard/admin") && userRole !== "admin")

  if (isUnauthorized) {
    return null
  }

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-12 items-center border-b border-sidebar-border px-4">
          <SidebarTrigger />
        </header>
        <div className="flex-1">{children}</div>
      </main>
    </SidebarProvider>
  )
}
