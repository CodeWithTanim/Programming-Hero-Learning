"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

export interface SignOutButtonProps extends React.ComponentProps<
  typeof Button
> {
  showIcon?: boolean
  label?: string
}

export function SignOutButton({
  showIcon = true,
  label = "Sign Out",
  className,
  variant = "outline",
  size = "default",
  ...props
}: SignOutButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSignOut = async () => {
    try {
      setIsLoading(true)
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.replace("/sign-in")
            router.refresh()
          },
        },
      })
    } catch (error) {
      console.error("Sign out error:", error)
      router.replace("/sign-in")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      disabled={isLoading}
      onClick={handleSignOut}
      className={cn("cursor-pointer gap-2", className)}
      {...props}
    >
      {isLoading ? (
        <Spinner className="size-4" />
      ) : showIcon ? (
        <LogOut className="size-4" />
      ) : null}
      <span>{isLoading ? "Signing out..." : label}</span>
    </Button>
  )
}
