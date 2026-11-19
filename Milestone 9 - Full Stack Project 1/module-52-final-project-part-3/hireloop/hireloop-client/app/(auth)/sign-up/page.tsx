"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  BriefcaseIcon,
  Building2Icon,
  MailIcon,
  ShieldCheckIcon,
  UserIcon,
} from "lucide-react"

import {
  AuthShell,
  AuthSubmitButton,
  AuthTextField,
  PasswordField,
} from "@/components/auth-shell"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import type { Role } from "@/types"

const roleOptions: {
  value: Role
  label: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}[] = [
  { value: "seeker", label: "Job Seeker", icon: BriefcaseIcon },
  { value: "recruiter", label: "Recruiter", icon: Building2Icon },
  { value: "admin", label: "Admin", icon: ShieldCheckIcon },
]

function SignUpForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl =
    searchParams.get("callbackUrl") ||
    searchParams.get("callbackURL") ||
    searchParams.get("redirect") ||
    "/"

  const [formData, setFormData] = React.useState<{
    name: string
    email: string
    password: string
    role: Role
  }>({
    name: "",
    email: "",
    password: "",
    role: "seeker",
  })
  const [isLoading, setIsLoading] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleRoleChange(role: Role) {
    setFormData((prev) => ({ ...prev, role }))
  }

  async function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setErrorMessage(null)

    try {
      const { data, error } = await authClient.signUp.email({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role,
        callbackURL: callbackUrl,
      })

      if (error) {
        setErrorMessage(
          error.message || "Failed to create account. Please try again."
        )
        setIsLoading(false)
        return
      }

      window.location.href = callbackUrl
      void data
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "An unexpected error occurred."
      )
      setIsLoading(false)
    }
  }

  return (
    <AuthShell
      mode="sign-up"
      title="Create your account"
      description="Join HireLoop to browse curated roles and apply faster."
      callbackUrl={callbackUrl}
    >
      <form onSubmit={handleSignUp}>
        <FieldGroup>
          {errorMessage && (
            <div
              role="alert"
              className="rounded-xl border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-xs font-medium text-destructive"
            >
              {errorMessage}
            </div>
          )}

          <Field>
            <FieldLabel className="text-sm font-medium text-white/85">
              I am joining as
            </FieldLabel>
            <div
              role="radiogroup"
              aria-label="Select your account role"
              className="grid grid-cols-3 gap-2"
            >
              {roleOptions.map((option) => {
                const isSelected = formData.role === option.value
                const Icon = option.icon
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => handleRoleChange(option.value)}
                    disabled={isLoading}
                    className={cn(
                      "flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border p-3 text-center transition-all duration-150 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                      isSelected
                        ? "border-[#5c53fe] bg-[#5c53fe]/15 text-white shadow-[0_0_20px_rgba(92,83,254,0.35)]"
                        : "border-white/10 bg-white/[0.03] text-white/70 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                    )}
                  >
                    <Icon className="size-4 shrink-0" aria-hidden="true" />
                    <span className="text-xs leading-none font-medium">
                      {option.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </Field>

          <AuthTextField
            id="sign-up-name"
            name="name"
            label="Full Name"
            type="text"
            icon={UserIcon}
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
            placeholder="Alex Morgan"
            disabled={isLoading}
          />

          <AuthTextField
            id="sign-up-email"
            name="email"
            label="Email"
            type="email"
            icon={MailIcon}
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            placeholder="you@example.com"
            disabled={isLoading}
          />

          <PasswordField
            id="sign-up-password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            placeholder="Create a password (min. 8 characters)"
            minLength={8}
            disabled={isLoading}
          />

          <AuthSubmitButton disabled={isLoading}>
            {isLoading ? (
              <span className="inline-flex items-center justify-center gap-2">
                <Spinner className="size-4" />
                <span>Creating Account...</span>
              </span>
            ) : (
              "Create Account"
            )}
          </AuthSubmitButton>
        </FieldGroup>
      </form>
    </AuthShell>
  )
}

export default function SignUpPage() {
  return (
    <React.Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <Spinner className="size-6 text-[#5c53fe]" />
        </div>
      }
    >
      <SignUpForm />
    </React.Suspense>
  )
}
