"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { MailIcon } from "lucide-react"

import {
  AuthShell,
  AuthSubmitButton,
  AuthTextField,
  PasswordField,
} from "@/components/auth-shell"
import { FieldGroup } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { authClient } from "@/lib/auth-client"

function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl =
    searchParams.get("callbackUrl") ||
    searchParams.get("callbackURL") ||
    searchParams.get("redirect") ||
    "/"

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setErrorMessage(null)

    try {
      const { data, error } = await authClient.signIn.email({
        email: formData.email.trim(),
        password: formData.password,
        rememberMe: true,
        callbackURL: callbackUrl,
      })

      if (error) {
        setErrorMessage(
          error.message || "Invalid email or password. Please try again."
        )
        setIsLoading(false)
        return
      }

      // Hard redirect to callbackUrl ensures fresh SSR session and cookies on destination page
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
      mode="sign-in"
      title="Welcome back"
      description="Sign in to your HireLoop account to continue."
      callbackUrl={callbackUrl}
    >
      <form onSubmit={handleSignIn}>
        <FieldGroup>
          {errorMessage && (
            <div
              role="alert"
              className="rounded-xl border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-xs font-medium text-destructive"
            >
              {errorMessage}
            </div>
          )}

          <AuthTextField
            id="sign-in-email"
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
            id="sign-in-password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            disabled={isLoading}
          />

          <AuthSubmitButton disabled={isLoading}>
            {isLoading ? (
              <span className="inline-flex items-center justify-center gap-2">
                <Spinner className="size-4" />
                <span>Signing In...</span>
              </span>
            ) : (
              "Sign In"
            )}
          </AuthSubmitButton>
        </FieldGroup>
      </form>
    </AuthShell>
  )
}

export default function SignInPage() {
  return (
    <React.Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <Spinner className="size-6 text-[#5c53fe]" />
        </div>
      }
    >
      <SignInForm />
    </React.Suspense>
  )
}
