"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteDestinationDialogProps } from "@/components/types";

export default function DeleteDestinationDialog({
    id,
    destinationName = "Bali Paradise",
}: DeleteDestinationDialogProps) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const res = await fetch(`http://localhost:8000/destination/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setOpen(false);
                router.push("/destinations");
                router.refresh();
            } else {
                console.error("Failed to delete, status:", res.status);
            }
        } catch (err) {
            console.error("Failed to delete destination:", err);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {/* Cancel Button Trigger matching page action bar */}
            <DialogTrigger className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium border border-[#ef4444] text-[#ef4444] hover:bg-red-50 transition-colors cursor-pointer bg-white">
                <Trash2 className="w-4 h-4 text-[#ef4444]" />
                <span>Cancel</span>
            </DialogTrigger>

            {/* Confirmation Modal matching Penpot specifications */}
            <DialogContent className="sm:max-w-[580px] max-w-[95vw] bg-white rounded-none p-6 sm:p-10 border border-[#eeeeee] shadow-2xl">
                <DialogHeader className="space-y-4 text-left">
                    {/* Warning Icon & Title Row */}
                    <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-full bg-[#fde8e8] flex items-center justify-center shrink-0">
                            <AlertTriangle className="w-6 h-6 text-[#ef4444] stroke-[2]" />
                        </div>
                        <DialogTitle className="text-2xl sm:text-[26px] font-serif font-normal text-[#0c0b0b] tracking-tight">
                            Delete Travel Package
                        </DialogTitle>
                    </div>

                    {/* Warning Description */}
                    <DialogDescription className="text-sm text-[#6c696d] leading-relaxed pt-1 font-normal">
                        Are you sure you want to delete{" "}
                        <strong className="text-[#0c0b0b] font-semibold">
                            &quot;{destinationName}&quot;
                        </strong>
                        ? This action cannot be undone and will permanently remove this
                        travel package from the system.
                    </DialogDescription>
                </DialogHeader>

                {/* Modal Action Buttons */}
                <div className="pt-6 sm:pt-8 flex items-center justify-end gap-3 sm:gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpen(false)}
                        className="h-11 px-6 rounded-none border border-neutral-300 text-[#0c0b0b] bg-white hover:bg-neutral-50 transition-colors text-sm font-medium cursor-pointer"
                    >
                        Cancel
                    </Button>

                    <Button
                        type="button"
                        disabled={isDeleting}
                        onClick={handleDelete}
                        className="h-11 px-6 rounded-none bg-[#ef4444] hover:bg-red-600 text-white transition-colors inline-flex items-center gap-2 text-sm font-medium shadow-sm cursor-pointer"
                    >
                        <Trash2 className="w-4 h-4 text-white stroke-[1.8]" />
                        <span>{isDeleting ? "Deleting..." : "Delete Package"}</span>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
