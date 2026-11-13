"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
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

type Role = "seeker" | "recruiter" | "admin"

const roleOptions: {
  value: Role
  label: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}[] = [
  { value: "seeker", label: "Job Seeker", icon: BriefcaseIcon },
  { value: "recruiter", label: "Recruiter", icon: Building2Icon },
  { value: "admin", label: "Admin", icon: ShieldCheckIcon },
]

export default function SignUpPage() {
  const router = useRouter()
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
        callbackURL: "/",
      })

      if (error) {
        setErrorMessage(
          error.message || "Failed to create account. Please try again."
        )
        setIsLoading(false)
        return
      }

      router.push("/")
      router.refresh()
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
                    disabled={isLoading}
                    onClick={() => handleRoleChange(option.value)}
                    className={cn(
                      "group relative flex flex-col items-center justify-center gap-1.5 rounded-xl border p-3 text-center transition-all focus-visible:ring-2 focus-visible:ring-[#5c53fe] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                      isSelected
                        ? "border-[#5c53fe] bg-[#5c53fe]/15 text-white shadow-[0_0_16px_rgba(92,83,254,0.25)]"
                        : "border-white/10 bg-[#141418] text-white/70 hover:border-white/20 hover:bg-[#18181d] hover:text-white"
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-4 transition-colors",
                        isSelected
                          ? "text-[#7b73ff]"
                          : "text-white/45 group-hover:text-white/70"
                      )}
                    />
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
            icon={UserIcon}
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
            placeholder="Alex Sterling"
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
