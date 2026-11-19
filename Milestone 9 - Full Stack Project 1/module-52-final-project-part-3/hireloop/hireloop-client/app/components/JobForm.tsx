"use client"

import * as React from "react"
import { Save, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import type { JobFormData, JobStatus } from "@/types/job"
import { JOB_CATEGORIES, JOB_TYPES, SALARY_PERIODS } from "@/types/job"

export interface JobFormProps {
  formData: JobFormData
  setFormData: React.Dispatch<React.SetStateAction<JobFormData>>
  onSubmit: (e: React.FormEvent) => void
  isSubmitting: boolean
  mode: "create" | "edit"
  onCancel?: () => void
  isLimitReached?: boolean
}

export function JobForm({
  formData,
  setFormData,
  onSubmit,
  isSubmitting,
  mode,
  onCancel,
  isLimitReached = false,
}: JobFormProps) {
  // Generic handler for inputs, textareas, and selects
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle remote toggle
  const handleRemoteToggle = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      isRemote: checked,
      location: checked
        ? "Remote / Worldwide"
        : prev.location === "Remote / Worldwide"
          ? ""
          : prev.location,
    }))
  }

  // Handle employment type button selection
  const handleTypeSelect = (type: string) => {
    setFormData((prev) => ({ ...prev, type }))
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Section 1: Basic Information */}
      <Card className="border-sidebar-border bg-sidebar/50">
        <CardHeader className="border-b border-sidebar-border/60 pb-4">
          <CardTitle className="text-base font-semibold text-foreground">
            1. Basic Information
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            {mode === "create"
              ? "Specify the core job title, company name, and classification."
              : "Update position title, category, and workplace arrangements."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-5">
          {/* Job Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-xs font-medium">
              Job Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Senior Frontend Engineer"
              required
              className="border-sidebar-border bg-background"
            />
          </div>

          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="company" className="text-xs font-medium">
              Company Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. Acme Corp"
              required
              className="border-sidebar-border bg-background"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-xs font-medium">
              Job Category <span className="text-destructive">*</span>
            </Label>
            <NativeSelect
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border-sidebar-border bg-background"
            >
              {JOB_CATEGORIES.map((cat) => (
                <NativeSelectOption key={cat} value={cat}>
                  {cat}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>

          {/* Employment Type Pills */}
          <div className="space-y-2">
            <Label className="text-xs font-medium">
              Employment Type <span className="text-destructive">*</span>
            </Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {JOB_TYPES.map((type) => {
                const isSelected = formData.type === type
                return (
                  <Button
                    key={type}
                    type="button"
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTypeSelect(type)}
                    className={
                      isSelected
                        ? "bg-[#5c53fe] text-xs font-medium text-white hover:bg-[#4b42f0]"
                        : "border-sidebar-border text-xs text-muted-foreground hover:bg-sidebar-accent"
                    }
                  >
                    {type}
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Remote Switch & Location */}
          <div className="grid grid-cols-1 gap-4 pt-1 sm:grid-cols-2 sm:items-end">
            <div className="flex items-center justify-between rounded-lg border border-sidebar-border bg-background/50 p-3">
              <div className="space-y-0.5">
                <Label htmlFor="isRemote" className="text-xs font-medium">
                  Remote Opportunity
                </Label>
                <p className="text-[11px] text-muted-foreground">
                  Can candidates work from anywhere?
                </p>
              </div>
              <Switch
                id="isRemote"
                checked={formData.isRemote}
                onCheckedChange={handleRemoteToggle}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-xs font-medium">
                Location{" "}
                {formData.isRemote ? (
                  "(Optional)"
                ) : (
                  <span className="text-destructive">*</span>
                )}
              </Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder={
                  formData.isRemote
                    ? "Worldwide / Remote"
                    : "e.g. San Francisco, CA or Hybrid"
                }
                required={!formData.isRemote}
                disabled={formData.isRemote}
                className="border-sidebar-border bg-background"
              />
            </div>
          </div>

          {/* Deadline */}
          <div className="space-y-2">
            <Label htmlFor="deadline" className="text-xs font-medium">
              Application Deadline (Optional)
            </Label>
            <Input
              id="deadline"
              name="deadline"
              type="date"
              value={formData.deadline}
              onChange={handleChange}
              className="border-sidebar-border bg-background"
            />
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Compensation & Salary */}
      <Card className="border-sidebar-border bg-sidebar/50">
        <CardHeader className="border-b border-sidebar-border/60 pb-4">
          <CardTitle className="text-base font-semibold text-foreground">
            2. Compensation &amp; Salary Range
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Set target compensation range to attract qualified applicants.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="minSalary" className="text-xs font-medium">
                Minimum Salary ($)
              </Label>
              <Input
                id="minSalary"
                name="minSalary"
                type="number"
                min="0"
                value={formData.minSalary}
                onChange={handleChange}
                placeholder="e.g. 90000"
                className="border-sidebar-border bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxSalary" className="text-xs font-medium">
                Maximum Salary ($)
              </Label>
              <Input
                id="maxSalary"
                name="maxSalary"
                type="number"
                min="0"
                value={formData.maxSalary}
                onChange={handleChange}
                placeholder="e.g. 130000"
                className="border-sidebar-border bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salaryPeriod" className="text-xs font-medium">
                Frequency
              </Label>
              <NativeSelect
                id="salaryPeriod"
                name="salaryPeriod"
                value={formData.salaryPeriod}
                onChange={handleChange}
                className="w-full border-sidebar-border bg-background"
              >
                {SALARY_PERIODS.map((period) => (
                  <NativeSelectOption key={period} value={period}>
                    {period}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Responsibilities & Requirements */}
      <Card className="border-sidebar-border bg-sidebar/50">
        <CardHeader className="border-b border-sidebar-border/60 pb-4">
          <CardTitle className="text-base font-semibold text-foreground">
            3. Responsibilities &amp; Requirements
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            {mode === "create"
              ? "Outline day-to-day candidate responsibilities and required qualifications."
              : "Update candidate expectations, responsibilities, and post status."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-5">
          {/* Status selector (only shown in edit mode) */}
          {mode === "edit" && (
            <div className="space-y-2">
              <Label htmlFor="status" className="text-xs font-medium">
                Job Listing Status
              </Label>
              <NativeSelect
                id="status"
                name="status"
                value={formData.status || "Active"}
                onChange={handleChange}
                className="w-full border-sidebar-border bg-background"
              >
                <NativeSelectOption value="Active">Active</NativeSelectOption>
                <NativeSelectOption value="Closed">Closed</NativeSelectOption>
                <NativeSelectOption value="Expired">Expired</NativeSelectOption>
              </NativeSelect>
            </div>
          )}

          {/* Key Responsibilities */}
          <div className="space-y-2">
            <Label htmlFor="responsibilities" className="text-xs font-medium">
              Key Responsibilities <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="responsibilities"
              name="responsibilities"
              rows={4}
              value={formData.responsibilities}
              onChange={handleChange}
              placeholder="Showcase key responsibilities and duties..."
              required
              className="border-sidebar-border bg-background leading-relaxed"
            />
          </div>

          {/* Qualifications & Requirements */}
          <div className="space-y-2">
            <Label htmlFor="requirements" className="text-xs font-medium">
              Qualifications &amp; Requirements{" "}
              <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="requirements"
              name="requirements"
              rows={4}
              value={formData.requirements}
              onChange={handleChange}
              placeholder="Candidate qualifications and skills..."
              required
              className="border-sidebar-border bg-background leading-relaxed"
            />
          </div>

          {/* Benefits */}
          <div className="space-y-2">
            <Label htmlFor="benefits" className="text-xs font-medium">
              Benefits &amp; Perks (Optional)
            </Label>
            <Textarea
              id="benefits"
              name="benefits"
              rows={2}
              value={formData.benefits}
              onChange={handleChange}
              placeholder="e.g. Competitive health coverage, 401(k) matching, flexible PTO..."
              className="border-sidebar-border bg-background leading-relaxed"
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 border-t border-sidebar-border/60 pt-4 sm:flex-row sm:items-center sm:justify-end">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="w-full border-sidebar-border hover:bg-sidebar-accent sm:w-auto"
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            disabled={isSubmitting || (mode === "create" && isLimitReached)}
            className={`w-full cursor-pointer gap-2 text-white sm:w-auto ${
              mode === "create" && isLimitReached
                ? "bg-amber-600/80 hover:bg-amber-600"
                : "bg-[#5c53fe] hover:bg-[#4b42f0]"
            }`}
          >
            {isSubmitting ? (
              <Spinner className="size-4" />
            ) : mode === "create" ? (
              <Sparkles className="size-4" />
            ) : (
              <Save className="size-4" />
            )}
            <span>
              {isSubmitting
                ? mode === "create"
                  ? "Creating Job..."
                  : "Saving Changes..."
                : mode === "create"
                  ? isLimitReached
                    ? "Plan Limit Reached (10/10)"
                    : "Create Job Post"
                  : "Update Job"}
            </span>
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
