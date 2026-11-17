"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { AlertTriangle, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/components/ui/toast"
import { deleteJob } from "@/lib/api/jobs"

export interface DeleteJobTarget {
  id?: string
  _id?: string
  title: string
  company?: string
}

export interface DeleteJobDialogProps {
  /** The job to delete (must include id or _id, and title) */
  job: DeleteJobTarget | null
  /** Controlled open state */
  open?: boolean
  /** Controlled open change callback */
  onOpenChange?: (open: boolean) => void
  /** Callback invoked after successful deletion */
  onDeleted?: (deletedId: string) => void
  /** Alias for onDeleted */
  onSuccess?: (deletedId: string) => void
  /** Optional custom trigger element */
  trigger?: React.ReactNode
  /** If true, render a default trigger button (Trash icon) when no trigger is passed */
  showTrigger?: boolean
  /** API Base URL, defaults to process.env.NEXT_PUBLIC_API_URL or http://localhost:5000 */
  apiUrl?: string
}

export function DeleteJobDialog({
  job,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  onDeleted,
  onSuccess,
  trigger,
  showTrigger = false,
  apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
}: DeleteJobDialogProps) {
  const router = useRouter()
  const [internalOpen, setInternalOpen] = React.useState(false)
  const [isDeleting, setIsDeleting] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen : internalOpen

  const handleOpenChange = (nextOpen: boolean) => {
    if (isDeleting) return // Prevent closing while in the middle of deletion

    if (!nextOpen) {
      setErrorMessage(null)
    }

    if (isControlled) {
      controlledOnOpenChange?.(nextOpen)
    } else {
      setInternalOpen(nextOpen)
    }
  }

  const handleDelete = async () => {
    if (!job) return
    const targetId = job._id || job.id

    if (!targetId) {
      setErrorMessage("Unable to delete: Missing job ID.")
      return
    }

    setIsDeleting(true)
    setErrorMessage(null)

    try {
      await deleteJob(targetId)

      // Show success toast
      toast.success("Job deleted successfully", {
        description: job.title
          ? `"${job.title}" has been deleted.`
          : "The job listing has been permanently deleted.",
      })

      // Notify parent listeners
      onDeleted?.(targetId)
      onSuccess?.(targetId)

      // Refresh route cache & server state
      router.refresh()

      // Close modal
      handleOpenChange(false)
    } catch (err) {
      console.error("Failed to delete job from database:", err)
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while deleting the job."
      setErrorMessage(message)
      toast.error("Failed to delete job", {
        description: message,
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {trigger ? (
        <DialogTrigger render={<span className="inline-flex cursor-pointer" />}>
          {trigger}
        </DialogTrigger>
      ) : showTrigger ? (
        <DialogTrigger
          render={
            <Button
              variant="ghost"
              size="sm"
              title="Delete Job"
              className="h-8 px-2 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
            />
          }
        >
          <Trash2 className="size-3.5" />
        </DialogTrigger>
      ) : null}

      <DialogContent className="border-sidebar-border bg-sidebar sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 text-destructive">
            <div className="flex size-8 items-center justify-center rounded-lg bg-destructive/10">
              <AlertTriangle className="size-4 text-destructive" />
            </div>
            <DialogTitle className="text-foreground">
              Delete Job Post
            </DialogTitle>
          </div>
          <DialogDescription className="pt-2 text-muted-foreground">
            Are you sure you want to permanently delete{" "}
            <span className="font-medium text-foreground">
              &ldquo;{job?.title || "this job"}&rdquo;
            </span>
            {job?.company ? ` at ${job.company}` : ""} from the database? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {errorMessage && (
          <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive">
            {errorMessage}
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            disabled={isDeleting}
            onClick={() => handleOpenChange(false)}
            className="border-sidebar-border"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={isDeleting || !job}
            onClick={handleDelete}
            className="gap-2"
          >
            {isDeleting ? (
              <Spinner className="size-4" />
            ) : (
              <Trash2 className="size-4" />
            )}
            <span>{isDeleting ? "Deleting..." : "Delete Job Post"}</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteJobDialog
