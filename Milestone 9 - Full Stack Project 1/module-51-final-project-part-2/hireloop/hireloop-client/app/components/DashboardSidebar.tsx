"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { LucideIcon } from "lucide-react"
import {
  Bookmark,
  Briefcase,
  Building2,
  CreditCard,
  FileText,
  LayoutDashboard,
  Plus,
  Receipt,
  Settings,
  Users,
} from "lucide-react"

import logo from "@/app/assets/images/logo.png"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SignOutButton } from "@/components/sign-out-button"
import { useSession } from "@/lib/auth-client"

export type DashboardRole = "seeker" | "recruiter" | "admin"

export interface DashboardMenuItem {
  name: string
  url: string
  icon: LucideIcon
}

export const menuItemsByRole: Record<DashboardRole, DashboardMenuItem[]> = {
  seeker: [
    {
      name: "Dashboard",
      url: "/dashboard/seeker",
      icon: LayoutDashboard,
    },
    {
      name: "Jobs",
      url: "/dashboard/seeker/jobs",
      icon: Briefcase,
    },
    {
      name: "Saved Jobs",
      url: "/dashboard/seeker/saved",
      icon: Bookmark,
    },
    {
      name: "Applications",
      url: "/dashboard/seeker/applications",
      icon: FileText,
    },
    {
      name: "Billing",
      url: "/dashboard/seeker/billing",
      icon: CreditCard,
    },
    {
      name: "Settings",
      url: "/dashboard/seeker/settings",
      icon: Settings,
    },
  ],
  recruiter: [
    {
      name: "Dashboard",
      url: "/dashboard/recruiter",
      icon: LayoutDashboard,
    },
    {
      name: "Add Jobs",
      url: "/dashboard/recruiter/jobs/new",
      icon: Plus,
    },
    {
      name: "Manage Jobs",
      url: "/dashboard/recruiter/jobs",
      icon: Briefcase,
    },
    {
      name: "Applications",
      url: "/dashboard/recruiter/applications",
      icon: FileText,
    },
    {
      name: "Settings",
      url: "/dashboard/recruiter/settings",
      icon: Settings,
    },
  ],
  admin: [
    {
      name: "Dashboard",
      url: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Users",
      url: "/dashboard/admin/users",
      icon: Users,
    },
    {
      name: "Companies",
      url: "/dashboard/admin/companies",
      icon: Building2,
    },
    {
      name: "Jobs",
      url: "/dashboard/admin/jobs",
      icon: Briefcase,
    },
    {
      name: "Payments",
      url: "/dashboard/admin/payments",
      icon: Receipt,
    },
    {
      name: "Settings",
      url: "/dashboard/admin/settings",
      icon: Settings,
    },
  ],
}

export function DashboardSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  // Detect role from the current dashboard route first (e.g. /dashboard/admin -> admin),
  // then fall back to the authenticated user's session role, defaulting to "seeker"
  const pathRole: DashboardRole | null = pathname.startsWith("/dashboard/admin")
    ? "admin"
    : pathname.startsWith("/dashboard/recruiter")
      ? "recruiter"
      : pathname.startsWith("/dashboard/seeker")
        ? "seeker"
        : null

  const sessionRole = (session?.user?.role || "").toLowerCase()
  const normalizedSessionRole: DashboardRole =
    sessionRole === "admin"
      ? "admin"
      : sessionRole === "recruiter" || sessionRole === "recuiter"
        ? "recruiter"
        : "seeker"

  const role: DashboardRole = pathRole ?? normalizedSessionRole
  const menuItems = menuItemsByRole[role] ?? menuItemsByRole.seeker

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 focus-visible:outline-none"
        >
          <Image src={logo} alt="HireLoop" className="h-7 w-auto" />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold tracking-wider text-sidebar-foreground/60 uppercase">
            {role === "admin"
              ? "Admin Panel"
              : role === "recruiter"
                ? "Recruiter Portal"
                : "Seeker Menu"}
          </SidebarGroupLabel>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  isActive={pathname === item.url}
                  render={<Link href={item.url} />}
                >
                  <item.icon />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-0.5 px-2 py-1 text-xs text-sidebar-foreground/80">
            <span className="truncate font-medium text-sidebar-foreground capitalize">
              {session?.user?.name || `${role} View`}
            </span>
            {session?.user?.email && (
              <span className="truncate text-[11px] text-sidebar-foreground/60">
                {session.user.email}
              </span>
            )}
          </div>
          <SignOutButton
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-xs text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
