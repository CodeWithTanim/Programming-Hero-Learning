"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    NativeSelect,
    NativeSelectOption,
} from "@/components/ui/native-select";
import {
    Destination,
    DestinationFormData,
    EditDestinationDialogueProps,
} from "@/components/types";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const initialFormState: DestinationFormData = {
    destinationName: "Bali Paradise",
    country: "Indonesia",
    category: "Beach",
    price: "1299",
    duration: "7 Days/6 Nights",
    departureDate: "05/15/2026",
    imageUrl: "https://example.com/image.jpg",
    description: "Describe the travel experience...",
};

export default function EditDestinationDialogue({
    destination,
}: EditDestinationDialogueProps) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [formData, setFormData] =
        useState<DestinationFormData>(initialFormState);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Sync form data when destination changes or dialog opens
    useEffect(() => {
        if (destination) {
            setFormData({
                destinationName: destination.destinationName || "Bali Paradise",
                country: destination.country || "Indonesia",
                category: destination.category || "Beach",
                price: String(destination.price || "1299"),
                duration: String(destination.duration || "7 Days/6 Nights"),
                departureDate: destination.departureDate || "05/15/2026",
                imageUrl: destination.imageUrl || "",
                description: destination.description || "",
            });
        }
    }, [destination, open]);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const token = await getTokenFromClient();

        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";
        try {
            const endpoint =
                `${serverUrl}/destination/${destination?._id}`;

            const response = await fetch(endpoint, {
                method: "PATCH",
                headers: { 
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Server response:", data);
                setOpen(false);
                router.refresh();
            } else {
                console.error("Server returned status:", response.status);
            }
        } catch (err) {
            console.error("Submission failed:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {/* Edit Button Trigger */}
            <DialogTrigger className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium border border-neutral-300 hover:bg-neutral-50 text-[#0c0b0b] transition-colors cursor-pointer bg-white">
                <Pencil className="w-4 h-4 text-[#0c0b0b]" />
                <span>Edit</span>
            </DialogTrigger>

            {/* Dialog Modal Content without visible scroller */}
            <DialogContent className="sm:max-w-[760px] max-w-[95vw] bg-white rounded-none p-6 sm:p-8 border border-[#eeeeee] shadow-2xl overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <DialogHeader className="space-y-1 text-left mb-4">
                    <DialogTitle className="text-2xl sm:text-[26px] font-serif font-normal text-[#0c0b0b] tracking-tight">
                        Update Travel Package
                    </DialogTitle>
                    <DialogDescription className="text-sm text-[#6c696d] font-light">
                        Make changes to the travel package details below
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                    {/* 1. Destination Name */}
                    <div className="space-y-1.5">
                        <Input
                            id="destinationName"
                            name="destinationName"
                            type="text"
                            required
                            value={formData.destinationName}
                            onChange={handleChange}
                            placeholder="Bali Paradise"
                            className="h-11 bg-[#f8fafc] border border-[#eeeeee] rounded-none px-4 text-sm text-[#0c0b0b] placeholder:text-[#94a3b8] focus-visible:border-[#15a1bf] focus-visible:ring-1 focus-visible:ring-[#15a1bf]"
                        />
                    </div>

                    {/* 2. Country & Category (2 Columns) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label
                                htmlFor="country"
                                className="text-xs sm:text-sm font-medium text-[#0c0b0b]"
                            >
                                Country
                            </Label>
                            <Input
                                id="country"
                                name="country"
                                type="text"
                                required
                                value={formData.country}
                                onChange={handleChange}
                                placeholder="Indonesia"
                                className="h-11 bg-[#f8fafc] border border-[#eeeeee] rounded-none px-4 text-sm text-[#0c0b0b] placeholder:text-[#94a3b8] focus-visible:border-[#15a1bf] focus-visible:ring-1 focus-visible:ring-[#15a1bf]"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label
                                htmlFor="category"
                                className="text-xs sm:text-sm font-medium text-[#0c0b0b]"
                            >
                                Category
                            </Label>
                            <NativeSelect
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full h-11"
                            >
                                <NativeSelectOption value="Beach">Beach</NativeSelectOption>
                                <NativeSelectOption value="Mountain">Mountain</NativeSelectOption>
                                <NativeSelectOption value="Adventure">Adventure</NativeSelectOption>
                                <NativeSelectOption value="Cultural">Cultural</NativeSelectOption>
                                <NativeSelectOption value="City">City</NativeSelectOption>
                                <NativeSelectOption value="Historical">Historical</NativeSelectOption>
                                <NativeSelectOption value="Luxury">Luxury</NativeSelectOption>
                            </NativeSelect>
                        </div>
                    </div>

                    {/* 3. Price (USD) & Duration (2 Columns) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label
                                htmlFor="price"
                                className="text-xs sm:text-sm font-medium text-[#0c0b0b]"
                            >
                                Price (USD)
                            </Label>
                            <Input
                                id="price"
                                name="price"
                                type="text"
                                required
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="e.g., 1299"
                                className="h-11 bg-[#f8fafc] border border-[#eeeeee] rounded-none px-4 text-sm text-[#0c0b0b] placeholder:text-[#94a3b8] focus-visible:border-[#15a1bf] focus-visible:ring-1 focus-visible:ring-[#15a1bf]"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label
                                htmlFor="duration"
                                className="text-xs sm:text-sm font-medium text-[#0c0b0b]"
                            >
                                Duration
                            </Label>
                            <Input
                                id="duration"
                                name="duration"
                                type="text"
                                required
                                value={formData.duration}
                                onChange={handleChange}
                                placeholder="e.g., 7 Days/6 Nights"
                                className="h-11 bg-[#f8fafc] border border-[#eeeeee] rounded-none px-4 text-sm text-[#0c0b0b] placeholder:text-[#94a3b8] focus-visible:border-[#15a1bf] focus-visible:ring-1 focus-visible:ring-[#15a1bf]"
                            />
                        </div>
                    </div>

                    {/* 4. Departure Date */}
                    <div className="space-y-1.5">
                        <Label
                            htmlFor="departureDate"
                            className="text-xs sm:text-sm font-medium text-[#0c0b0b]"
                        >
                            Departure Date
                        </Label>
                        <Input
                            id="departureDate"
                            name="departureDate"
                            type="text"
                            required
                            value={formData.departureDate}
                            onChange={handleChange}
                            placeholder="mm/dd/yyyy"
                            className="h-11 bg-[#f8fafc] border border-[#eeeeee] rounded-none px-4 text-sm text-[#0c0b0b] placeholder:text-[#94a3b8] focus-visible:border-[#15a1bf] focus-visible:ring-1 focus-visible:ring-[#15a1bf]"
                        />
                    </div>

                    {/* 5. Image URL */}
                    <div className="space-y-1.5">
                        <Label
                            htmlFor="imageUrl"
                            className="text-xs sm:text-sm font-medium text-[#0c0b0b]"
                        >
                            Image URL
                        </Label>
                        <Input
                            id="imageUrl"
                            name="imageUrl"
                            type="text"
                            required
                            value={formData.imageUrl}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                            className="h-11 bg-[#f8fafc] border border-[#eeeeee] rounded-none px-4 text-sm text-[#0c0b0b] placeholder:text-[#94a3b8] focus-visible:border-[#15a1bf] focus-visible:ring-1 focus-visible:ring-[#15a1bf]"
                        />
                    </div>

                    {/* 6. Description */}
                    <div className="space-y-1.5">
                        <Label
                            htmlFor="description"
                            className="text-xs sm:text-sm font-medium text-[#0c0b0b]"
                        >
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            name="description"
                            required
                            rows={3}
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe the travel experience..."
                            className="min-h-[88px] bg-[#f8fafc] border border-[#eeeeee] rounded-none px-4 py-2.5 text-sm text-[#0c0b0b] placeholder:text-[#94a3b8] focus-visible:border-[#15a1bf] focus-visible:ring-1 focus-visible:ring-[#15a1bf]"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-3 flex flex-wrap items-center justify-end gap-3 sm:gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancel}
                            className="h-11 px-6 rounded-none border border-[#ef4444] text-[#ef4444] bg-white hover:bg-red-50 hover:text-red-600 transition-colors inline-flex items-center gap-2 text-sm font-medium cursor-pointer"
                        >
                            <Trash2 className="w-4 h-4 text-[#ef4444] stroke-[1.75]" />
                            <span>Cancel</span>
                        </Button>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="h-11 px-6 rounded-none bg-[#15a1bf] hover:bg-[#128ca6] text-white transition-colors inline-flex items-center gap-2 text-sm font-medium shadow-sm cursor-pointer"
                        >
                            <Save className="w-4 h-4 text-white stroke-[1.75]" />
                            <span>{isSubmitting ? "Saving..." : "Save Changes"}</span>
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
