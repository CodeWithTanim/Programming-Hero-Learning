"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import {
  ArrowLeft,
  Banknote,
  BarChart2,
  Bookmark,
  Briefcase,
  CheckCircle2,
  Clock,
  Code2,
  Coins,
  ExternalLink,
  Globe,
  Laptop,
  MapPin,
  Network,
  Palmtree,
  PenTool,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

import { toast } from "@/components/ui/toast"
import { useSession } from "@/lib/auth-client"
import { applyForJob, checkHasApplied } from "@/lib/api/applications"
import type { JobListing } from "@/types/job"

interface JobDetailsClientProps {
  job: JobListing
}

export function JobDetailsClient({ job }: JobDetailsClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session } = useSession()
  const [isBookmarked, setIsBookmarked] = React.useState(false)
  const [isApplied, setIsApplied] = React.useState(false)
  const [isApplying, setIsApplying] = React.useState(false)
  const autoApplyAttemptedRef = React.useRef(false)

  const jobId = job._id || job.id || ""

  const displayLocation = job.isRemote
    ? "Remote (US)"
    : job.location || "San Francisco, CA"

  // Automatically check if the logged in user has already applied for this job
  React.useEffect(() => {
    if (!session?.user?.email || !jobId) return

    let isMounted = true
    checkHasApplied(jobId, session.user.email)
      .then((hasApplied) => {
        if (isMounted && hasApplied) {
          setIsApplied(true)
        }
      })
      .catch(() => {})

    return () => {
      isMounted = false
    }
  }, [jobId, session?.user?.email])

  const handleApply = React.useCallback(async () => {
    if (!session?.user) {
      toast.info("Please sign in to apply", {
        description:
          "You'll be brought right back here to complete your application.",
      })
      const returnUrl = `/browse-jobs/${jobId}?applied=ready`
      router.push(`/sign-in?callbackUrl=${encodeURIComponent(returnUrl)}`)
      return
    }

    const userRole = (session.user.role || "seeker").toLowerCase()
    if (userRole !== "seeker") {
      toast.error("Application Restricted", {
        description: `Only job seekers can apply for jobs. Your current account role is "${session.user.role || userRole}".`,
      })
      return
    }

    if (!session.user.email) {
      toast.error("Account error", {
        description: "Your user account is missing an email address.",
      })
      return
    }

    setIsApplying(true)
    try {
      await applyForJob({
        jobId,
        jobTitle: job.title,
        company: job.company,
        category: job.category,
        type: job.type,
        location: displayLocation,
        applicantEmail: session.user.email,
        applicantName: session.user.name || "Anonymous Applicant",
        applicantId: session.user.id,
        applicantRole: userRole,
      })

      setIsApplied(true)
      toast.success("Application Submitted Successfully!", {
        description: `Your application has been recorded in your account and sent to ${job.company}.`,
      })
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err)
      if (
        errorMsg.toLowerCase().includes("already applied") ||
        (err as { status?: number })?.status === 409
      ) {
        setIsApplied(true)
        toast.info("Already Applied", {
          description:
            "You have already submitted an application for this position.",
        })
      } else {
        toast.error("Application Failed", {
          description:
            errorMsg || "Could not submit application. Please try again.",
        })
      }
    } finally {
      setIsApplying(false)
    }
  }, [session, jobId, job, displayLocation, router])

  // Automatically submit application if user just returned from sign in
  React.useEffect(() => {
    const isReadyToApply = searchParams.get("applied") === "ready"
    if (!isReadyToApply || !session?.user) return

    const userRole = (session.user.role || "seeker").toLowerCase()
    if (userRole !== "seeker") {
      autoApplyAttemptedRef.current = true
      toast.error("Application Restricted", {
        description: `Only job seekers can apply for jobs. Your current account role is "${session.user.role || userRole}".`,
      })
      return
    }

    if (
      session.user.email &&
      !isApplied &&
      !isApplying &&
      !autoApplyAttemptedRef.current
    ) {
      autoApplyAttemptedRef.current = true
      const timer = setTimeout(() => {
        handleApply()
      }, 350)
      return () => clearTimeout(timer)
    }
  }, [searchParams, session, isApplied, isApplying, handleApply])

  // Sync bookmark state from localStorage
  React.useEffect(() => {
    if (!jobId) return
    try {
      const stored = localStorage.getItem("hireloop_saved_jobs")
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.includes(jobId)) {
          setIsBookmarked(true)
        }
      }
    } catch {}
  }, [jobId])

  const handleBookmark = () => {
    setIsBookmarked((prev) => {
      const next = !prev
      try {
        const stored = localStorage.getItem("hireloop_saved_jobs")
        const currentSaved: string[] = stored ? JSON.parse(stored) : []
        let updated: string[] = []
        if (next) {
          updated = Array.from(new Set([...currentSaved, jobId]))
          toast.success("Job Saved", {
            description: `"${job.title}" has been added to your saved jobs.`,
          })
        } else {
          updated = currentSaved.filter((id) => id !== jobId)
          toast.info("Job Removed", {
            description: `"${job.title}" was removed from your saved jobs.`,
          })
        }
        localStorage.setItem("hireloop_saved_jobs", JSON.stringify(updated))
        const metaStored = localStorage.getItem("hireloop_saved_jobs_meta")
        const currentMeta = metaStored ? JSON.parse(metaStored) : {}
        if (next) {
          currentMeta[jobId] = { savedAt: new Date().toISOString() }
        } else {
          delete currentMeta[jobId]
        }
        localStorage.setItem(
          "hireloop_saved_jobs_meta",
          JSON.stringify(currentMeta)
        )
      } catch {}
      return next
    })
  }

  // Format salary ($140k - $180k)
  const formatSalary = (
    min?: number | string,
    max?: number | string,
    period?: string
  ) => {
    const toK = (val: number | string) => {
      const num = Number(val)
      if (isNaN(num)) return String(val)
      if (num >= 1000) {
        return `$${Math.round(num / 1000)}k`
      }
      return `$${num.toLocaleString()}`
    }

    const periodStr =
      period && period !== "per year" ? ` / ${period.replace("per ", "")}` : ""

    if (min && max) {
      return `${toK(min)} - ${toK(max)}${periodStr}`
    }
    if (min) {
      return `From ${toK(min)}${periodStr}`
    }
    if (max) {
      return `Up to ${toK(max)}${periodStr}`
    }
    return "$140k - $180k"
  }

  const salaryDisplay = formatSalary(
    job.minSalary,
    job.maxSalary,
    job.salaryPeriod
  )

  // Resolve company website URL to open in new tab
  const getCompanyWebsite = () => {
    if (job.website && job.website.trim()) {
      const site = job.website.trim()
      return site.startsWith("http://") || site.startsWith("https://")
        ? site
        : `https://${site}`
    }
    const cleanCompany = (job.company || "company")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
    return `https://${cleanCompany || "company"}.com`
  }

  const companyWebsite = getCompanyWebsite()

  // Extract experience from requirements or default to Mid - Senior Level
  const getExperience = () => {
    if (job.requirements) {
      const match = job.requirements.match(/(\d+\+?\s*years?)/i)
      if (match) {
        return match[1].charAt(0).toUpperCase() + match[1].slice(1)
      }
    }
    return "Mid - Senior"
  }

  // Adaptive skill pills
  const getSkillTags = () => {
    const cat = (job.category || "").toLowerCase()
    if (cat.includes("eng") || cat.includes("tech")) {
      return [
        { name: "TypeScript", icon: Code2 },
        { name: "React / Next.js", icon: Network },
        { name: "API Architecture", icon: PenTool },
        { name: "System Design", icon: Code2 },
      ]
    }
    return [
      { name: "Figma Expertise", icon: Code2 },
      { name: "System Thinking", icon: Network },
      { name: "UI/UX Design", icon: PenTool },
      { name: "Basic Frontend", icon: Code2 },
    ]
  }

  // Parse benefits list
  const parseBenefits = (benefitsStr?: string) => {
    const benefitIcons = [ShieldCheck, Coins, Laptop, Palmtree, Sparkles]
    if (!benefitsStr || benefitsStr.trim().length === 0) {
      return [
        { label: "Full Health & Dental", icon: ShieldCheck },
        { label: "Competitive 401k", icon: Coins },
        { label: "Latest Hardware Stipend", icon: Laptop },
        { label: "Unlimited PTO", icon: Palmtree },
      ]
    }

    const items = benefitsStr
      .split(/\n|•|,|\r/)
      .map((item) => item.trim().replace(/^[•\-\*]\s*/, ""))
      .filter((item) => item.length > 0)

    if (items.length === 0) {
      return [
        { label: "Full Health & Dental", icon: ShieldCheck },
        { label: "Competitive 401k", icon: Coins },
        { label: "Latest Hardware Stipend", icon: Laptop },
        { label: "Unlimited PTO", icon: Palmtree },
      ]
    }

    return items.map((label, index) => ({
      label,
      icon: benefitIcons[index % benefitIcons.length],
    }))
  }

  // Parse bullet points helper
  const renderBulletPoints = (text?: string) => {
    if (!text || text.trim().length === 0) {
      return (
        <li className="text-sm text-neutral-400 italic">
          No detailed requirements specified by the employer.
        </li>
      )
    }

    // Split on newlines or bullet points
    const lines = text
      .split(/\n|•|\r/)
      .map((l) => l.trim().replace(/^[•\-\*]\s*/, ""))
      .filter((l) => l.length > 0)

    if (lines.length === 0) {
      return (
        <li className="text-sm text-neutral-400 italic">
          No detailed requirements specified by the employer.
        </li>
      )
    }

    return lines.map((line, index) => (
      <li
        key={index}
        className="flex items-start gap-2 text-sm text-neutral-300"
      >
        <span className="text-neutral-500">•</span>
        <span className="leading-relaxed">{line}</span>
      </li>
    ))
  }

  return (
    <div className="min-h-screen bg-[#060608] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/browse-jobs"
            className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to Browse Jobs</span>
          </Link>
        </div>

        {/* 1. Top Header Card (Matching Figma) */}
        <div className="rounded-2xl border border-white/5 bg-[#0d0d12] p-6 shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            {/* Left: Logo & Job Info */}
            <div className="flex items-center gap-4">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#14141c] text-[#5c53fe] shadow-xs">
                <Briefcase className="size-6 text-white" />
              </div>
              <div className="space-y-1">
                <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl md:text-3xl">
                  {job.title}
                </h1>
                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                  <span className="font-medium text-neutral-300">
                    {job.company}
                  </span>
                  <span className="text-neutral-600">•</span>
                  <span className="inline-flex items-center gap-1 font-medium text-emerald-400">
                    <CheckCircle2 className="size-3.5" />
                    <span>Verified Employer</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Bookmark & Apply Buttons */}
            <div className="flex items-center gap-3 self-start sm:self-center">
              <button
                type="button"
                onClick={handleBookmark}
                aria-label="Save this job"
                className={`flex size-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-[#16161f] transition hover:bg-[#20202a] hover:text-white ${
                  isBookmarked ? "text-[#5c53fe]" : "text-neutral-400"
                }`}
              >
                <Bookmark
                  className="size-4.5"
                  fill={isBookmarked ? "currentColor" : "none"}
                />
              </button>

              <button
                type="button"
                onClick={handleApply}
                disabled={isApplied || isApplying}
                className="h-10 cursor-pointer rounded-xl bg-white px-6 text-sm font-semibold text-black transition-colors hover:bg-neutral-200 disabled:opacity-60"
              >
                {isApplying ? (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-3.5 animate-spin rounded-full border-2 border-black border-t-transparent" />
                    <span>Applying...</span>
                  </span>
                ) : isApplied ? (
                  "Applied ✓"
                ) : session?.user &&
                  (session.user.role || "seeker").toLowerCase() !==
                    "seeker" ? (
                  "Seekers Only"
                ) : (
                  "Apply Now"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 2. Bento Metrics Grid (4 cards in a row matching Figma) */}
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {/* Card 1: SALARY RANGE */}
          <div className="rounded-2xl border border-white/5 bg-[#0d0d12] p-5">
            <div className="flex items-center gap-2 text-neutral-400">
              <Banknote className="size-4" />
              <span className="text-[11px] font-semibold tracking-wider uppercase">
                SALARY RANGE
              </span>
            </div>
            <p className="mt-2 text-sm font-bold text-white sm:text-base">
              {salaryDisplay}
            </p>
          </div>

          {/* Card 2: LOCATION */}
          <div className="rounded-2xl border border-white/5 bg-[#0d0d12] p-5">
            <div className="flex items-center gap-2 text-neutral-400">
              <MapPin className="size-4" />
              <span className="text-[11px] font-semibold tracking-wider uppercase">
                LOCATION
              </span>
            </div>
            <p className="mt-2 text-sm font-bold text-white sm:text-base">
              {displayLocation}
            </p>
          </div>

          {/* Card 3: JOB TYPE */}
          <div className="rounded-2xl border border-white/5 bg-[#0d0d12] p-5">
            <div className="flex items-center gap-2 text-neutral-400">
              <Clock className="size-4" />
              <span className="text-[11px] font-semibold tracking-wider uppercase">
                JOB TYPE
              </span>
            </div>
            <p className="mt-2 text-sm font-bold text-white sm:text-base">
              {job.type || "Full-time"}
            </p>
          </div>

          {/* Card 4: EXPERIENCE */}
          <div className="rounded-2xl border border-white/5 bg-[#0d0d12] p-5">
            <div className="flex items-center gap-2 text-neutral-400">
              <BarChart2 className="size-4" />
              <span className="text-[11px] font-semibold tracking-wider uppercase">
                EXPERIENCE
              </span>
            </div>
            <p className="mt-2 text-sm font-bold text-white sm:text-base">
              {getExperience()}
            </p>
          </div>
        </div>

        {/* 3. Main Two-Column Layout (Job Content + Company Overview) */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column (col-span-2): Detailed Specification Card */}
          <div className="space-y-8 rounded-2xl border border-white/5 bg-[#0d0d12] p-6 sm:p-8 lg:col-span-2">
            {/* Section 1: Job Description */}
            <div>
              <h2 className="text-base font-bold text-white sm:text-lg">
                Job Description
              </h2>
              <div className="mt-3 text-sm leading-relaxed text-neutral-400">
                <p>
                  {job.description ||
                    `At ${job.company}, we are looking for a ${job.title} to join our ${job.category || "team"}. Review the key qualifications below and apply directly through HireLoop.`}
                </p>
              </div>
            </div>

            {/* Section 2: Responsibilities */}
            <div>
              <h2 className="text-base font-bold text-white sm:text-lg">
                Responsibilities
              </h2>
              <ul className="mt-3.5 space-y-2.5">
                {renderBulletPoints(job.responsibilities)}
              </ul>
            </div>

            {/* Section 3: Requirements */}
            <div>
              <h2 className="text-base font-bold text-white sm:text-lg">
                Requirements
              </h2>

              {/* Skills Tags (Matching Category) */}
              <div className="mt-3.5 flex flex-wrap items-center gap-2">
                {getSkillTags().map((skill, idx) => {
                  const Icon = skill.icon
                  return (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#16161f] px-3 py-1.5 text-xs font-medium text-neutral-300"
                    >
                      <Icon className="size-3.5 text-neutral-400" />
                      <span>{skill.name}</span>
                    </span>
                  )
                })}
              </div>

              {/* Requirements Bullets */}
              <ul className="mt-4 space-y-2.5">
                {renderBulletPoints(job.requirements)}
              </ul>
            </div>

            {/* Section 4: Benefits (2x2 Grid Matching Figma) */}
            <div>
              <h2 className="text-base font-bold text-white sm:text-lg">
                Benefits
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {parseBenefits(job.benefits).map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#16161f] text-white">
                        <Icon className="size-5" />
                      </div>
                      <span className="text-sm font-medium text-white">
                        {benefit.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Column (col-span-1): Company Overview Card */}
          <aside className="h-fit rounded-2xl border border-white/5 bg-[#0d0d12] p-6 lg:col-span-1">
            <h2 className="text-base font-bold text-white">Company Overview</h2>

            {/* Office Workstation Image (From Figma) */}
            <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-[#14141c]">
              <Image
                src="/images/company-office.png"
                alt={`${job.company} office`}
                width={384}
                height={200}
                className="h-44 w-full object-cover"
              />
            </div>

            {/* Meta Table Details */}
            <div className="mt-5 space-y-3.5 border-t border-white/5 pt-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 uppercase">SIZE</span>
                <span className="font-medium text-neutral-300">
                  250 - 500 Employees
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-neutral-500 uppercase">INDUSTRY</span>
                <span className="font-medium text-neutral-300">
                  {job.category || "SaaS / Artificial Intelligence"}
                </span>
              </div>
            </div>

            {/* Visit Website Button (Opens company website in a new tab) */}
            <div className="mt-6 border-t border-white/5 pt-5">
              <a
                href={companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-[#16161f] py-2.5 text-xs font-semibold text-neutral-300 transition hover:bg-[#20202b] hover:text-white"
              >
                <span>Visit Website</span>
                <ExternalLink className="size-3.5" />
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
