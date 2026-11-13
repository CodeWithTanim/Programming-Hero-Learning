"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { EyeIcon, EyeOffIcon, LockIcon } from "lucide-react"

import logo from "@/app/assets/images/logo.png"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { cn } from "@/lib/utils"

const authInputGroupClassName =
  "h-11 rounded-xl border-white/12 bg-[#141418]! text-white transition-colors has-[[data-slot=input-group-control]:focus-visible]:border-[#5c53fe] has-[[data-slot=input-group-control]:focus-visible]:ring-[#5c53fe]/25"

const authInputClassName = "h-11 text-sm text-white placeholder:text-white/40"

/** Text/email input field with leading icon using shadcn Field and InputGroup. */
export function AuthTextField({
  id,
  name,
  label,
  type = "text",
  icon: Icon,
  value,
  onChange,
  autoComplete,
  placeholder,
  required = true,
  disabled = false,
}: {
  id: string
  name: string
  label: string
  type?: React.HTMLInputTypeAttribute
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  autoComplete: string
  placeholder: string
  required?: boolean
  disabled?: boolean
}) {
  return (
    <Field>
      <FieldLabel htmlFor={id} className="text-sm font-medium text-white/85">
        {label}
      </FieldLabel>
      <InputGroup
        className={cn(authInputGroupClassName, disabled && "opacity-60")}
      >
        <InputGroupAddon align="inline-start" className="pl-3.5 text-white/45">
          <Icon aria-hidden="true" />
        </InputGroupAddon>
        <InputGroupInput
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={authInputClassName}
        />
      </InputGroup>
    </Field>
  )
}

/** Password input with lock icon and visibility toggle using shadcn InputGroup. */
export function PasswordField({
  id,
  name = "password",
  label = "Password",
  value,
  onChange,
  autoComplete,
  placeholder = "Enter your password",
  minLength,
  required = true,
  disabled = false,
}: {
  id: string
  name?: string
  label?: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  autoComplete: string
  placeholder?: string
  minLength?: number
  required?: boolean
  disabled?: boolean
}) {
  const [visible, setVisible] = React.useState(false)

  return (
    <Field>
      <FieldLabel htmlFor={id} className="text-sm font-medium text-white/85">
        {label}
      </FieldLabel>
      <InputGroup
        className={cn(authInputGroupClassName, disabled && "opacity-60")}
      >
        <InputGroupAddon align="inline-start" className="pl-3.5 text-white/45">
          <LockIcon aria-hidden="true" />
        </InputGroupAddon>
        <InputGroupInput
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          placeholder={placeholder}
          minLength={minLength}
          required={required}
          disabled={disabled}
          className={authInputClassName}
        />
        <InputGroupAddon align="inline-end" className="pr-2">
          <InputGroupButton
            size="icon-sm"
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
            disabled={disabled}
            onClick={() => setVisible((prev) => !prev)}
            className="rounded-lg text-white/50 hover:bg-white/10 hover:text-white"
          >
            {visible ? (
              <EyeOffIcon aria-hidden="true" />
            ) : (
              <EyeIcon aria-hidden="true" />
            )}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}

/** Primary submit button for auth forms. */
export function AuthSubmitButton({
  children,
  disabled,
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      type="submit"
      disabled={disabled}
      className={cn(
        "mt-2 h-11 w-full rounded-xl border border-[#090a15]/10 bg-[#5c53fe]! text-sm font-medium text-white! shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_4px_16px_rgba(92,83,254,0.35)] hover:bg-[#4e45f5]! disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
}

/** Shared dark auth page shell with HireLoop logo, card layout, and Sign In / Sign Up toggle. */
export function AuthShell({
  mode,
  title,
  description,
  children,
}: {
  mode: "sign-in" | "sign-up"
  title: string
  description: string
  children: React.ReactNode
}) {
  const isSignIn = mode === "sign-in"

  return (
    <main className="relative -mt-[76px] flex min-h-dvh w-full items-center justify-center overflow-hidden bg-[#010103] px-4 pt-[108px] pb-12 text-white sm:-mt-[84px] sm:px-6 sm:pt-[124px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 h-[440px] bg-[radial-gradient(ellipse_85%_55%_at_50%_-12%,rgba(255,255,255,0.09)_0%,rgba(255,255,255,0.025)_48%,transparent_80%)]" />
        <div className="absolute top-1/2 left-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(92,83,254,0.14)_0%,transparent_68%)]" />
      </div>

      <Card className="relative z-10 w-full max-w-[440px] gap-0 overflow-hidden rounded-2xl border border-white/12 bg-transparent! bg-[linear-gradient(180deg,#121215_0%,#09090b_100%)] p-0! text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_80px_rgba(0,0,0,0.75)] ring-0 backdrop-blur-md">
        <div className="px-6 pt-7 pb-6 sm:px-8 sm:pt-8 sm:pb-7">
          <div className="flex flex-col items-center text-center">
            <Link
              href="/"
              aria-label="hireloop home"
              className="inline-flex items-center rounded-lg focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <Image
                src={logo}
                alt="hireloop"
                loading="eager"
                className="h-8 w-auto"
              />
            </Link>

            <h1 className="mt-5 text-2xl font-bold tracking-[-0.02em] text-white sm:text-[26px]">
              {title}
            </h1>
            <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-white/60">
              {description}
            </p>
          </div>

          <div className="mt-6">{children}</div>
        </div>

        <div className="border-t border-white/10 bg-white/[0.02] px-6 py-4 text-center text-sm text-white/60 sm:px-8">
          {isSignIn ? (
            <p>
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="font-medium text-[#746cff] transition-colors hover:text-[#928bff]"
              >
                Sign Up
              </Link>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-[#746cff] transition-colors hover:text-[#928bff]"
              >
                Sign In
              </Link>
            </p>
          )}
        </div>
      </Card>
    </main>
  )
}
