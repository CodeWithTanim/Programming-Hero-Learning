"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"

import logo from "@/app/assets/images/logo.png"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { authClient, useSession } from "@/lib/auth-client"

const navLinks = [
  { href: "/jobs", label: "Browse Jobs" },
  { href: "/company", label: "Company" },
  { href: "/pricing", label: "Pricing" },
] as const

function BrandLogo({
  className,
  onNavigate,
}: {
  className?: string
  onNavigate?: () => void
}) {
  return (
    <Link
      href="/"
      aria-label="hireloop home"
      onClick={onNavigate}
      className={cn(
        "flex shrink-0 items-center rounded-lg focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
        className
      )}
    >
      <Image
        src={logo}
        alt="hireloop"
        loading="eager"
        className="h-7 w-auto sm:h-8"
      />
    </Link>
  )
}

function AuthActions({
  layout = "row",
  onNavigate,
}: {
  layout?: "row" | "column"
  onNavigate?: () => void
}) {
  const isColumn = layout === "column"
  const { data: session } = useSession()

  return (
    <div
      className={cn(
        "flex",
        isColumn ? "flex-col gap-2.5 px-4" : "items-center gap-2 lg:gap-3"
      )}
    >
      {session?.user ? (
        <div
          className={cn(
            "flex items-center",
            isColumn ? "w-full flex-col items-start gap-2" : "gap-3"
          )}
        >
          <span className="text-sm font-medium text-[#EDEDEF]">
            Welcome, {session.user.name || "User"}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              await authClient.signOut()
              onNavigate?.()
            }}
            className="h-8 rounded-xl border-white/15 bg-white/5 text-xs text-white/80 hover:bg-white/10 hover:text-white"
          >
            Sign Out
          </Button>
        </div>
      ) : (
        <>
          <Link
            href="/sign-in"
            onClick={onNavigate}
            className={cn(
              "inline-flex h-10 items-center justify-center rounded-xl text-sm font-medium whitespace-nowrap text-[#5c53fe] transition-colors outline-none hover:bg-[#5c53fe]/10 hover:text-[#4e45f5] focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px dark:text-[#746cff] dark:hover:bg-[#5c53fe]/15 dark:hover:text-[#928bff]",
              isColumn ? "border border-border/80 px-4" : "px-3.5"
            )}
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            onClick={onNavigate}
            className="inline-flex h-10 items-center justify-center rounded-xl border border-[#090a15]/10 bg-[#5c53fe] px-5 text-sm font-medium whitespace-nowrap text-white shadow-[inset_0_3px_10px_rgba(255,255,255,0.2),0_4px_16px_rgba(92,83,254,0.32)] transition-all outline-none hover:bg-[#5047f5] hover:shadow-[inset_0_3px_10px_rgba(255,255,255,0.26),0_6px_20px_rgba(92,83,254,0.42)] focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px"
          >
            Get Started
          </Link>
        </>
      )}
    </div>
  )
}

/** Responsive floating navbar with desktop navigation menu and mobile drawer. */
export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)
  const closeMenu = () => setOpen(false)

  const { data: session } = useSession()
  console.log("User in Navbar", session)
  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-3 sm:px-6 sm:pt-4">
      <div className="mx-auto flex h-16 max-w-[1800px] items-center justify-between rounded-2xl border border-border/70 bg-card/90 px-4 shadow-sm backdrop-blur-md sm:h-[68px] sm:px-6 dark:border-white/[0.08] dark:bg-[#222222]/85 dark:shadow-[0_12px_32px_rgba(0,0,0,0.45)]">
        <BrandLogo />

        <div className="hidden items-center gap-2 md:flex lg:gap-4">
          <NavigationMenu aria-label="Primary navigation">
            <NavigationMenuList className="gap-1 lg:gap-2">
              {navLinks.map((item) => {
                const isActive = pathname === item.href
                return (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink
                      active={isActive}
                      render={<Link href={item.href} />}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/85 transition-colors hover:text-foreground data-active:text-foreground"
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              })}
            </NavigationMenuList>
          </NavigationMenu>

          <Separator
            orientation="vertical"
            className="mx-1.5 h-5 self-center bg-border/80 dark:bg-[#a8a8a8]/40"
          />

          <AuthActions layout="row" />
        </div>

        <div className="flex items-center md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open navigation menu"
                  className="rounded-xl"
                />
              }
            >
              <MenuIcon className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[340px]">
              <SheetHeader className="border-b border-border/60 pb-4">
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Browse HireLoop pages or sign in to your account.
                </SheetDescription>
                <BrandLogo className="w-fit" onNavigate={closeMenu} />
              </SheetHeader>

              <nav
                aria-label="Mobile navigation"
                className="flex flex-col gap-1 px-4"
              >
                {navLinks.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      className={cn(
                        "flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </nav>

              <div className="px-4">
                <Separator />
              </div>

              <AuthActions layout="column" onNavigate={closeMenu} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
