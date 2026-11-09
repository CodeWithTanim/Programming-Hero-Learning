"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Trash2, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { DestinationFormData } from "@/components/types";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const initialFormState: DestinationFormData = {
    destinationName: "",
    country: "",
    category: "Beach",
    price: "",
    duration: "",
    departureDate: "",
    imageUrl: "",
    description: "",
};

export default function AddDestinationPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<DestinationFormData>(initialFormState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCancel = () => {
        setFormData(initialFormState);
        router.back();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const token = await getTokenFromClient();

        try {
            const endpoint =
                process.env.NEXT_PUBLIC_ADD_DESTINATION_SERVER ||
                (process.env.NEXT_PUBLIC_SERVER_URL
                    ? `${process.env.NEXT_PUBLIC_SERVER_URL}/add-destination`
                    : (process.env.ADD_DESTINATION_SERVER || "http://localhost:8000/add-destination"));

            const response = await fetch(endpoint, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json", 
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Server response:", data);
                setSuccessMessage(true);
                setTimeout(() => {
                    setSuccessMessage(false);
                    setFormData(initialFormState);
                }, 2000);
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
        <div className="w-full min-h-[calc(100vh-160px)] bg-white py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[800px] mx-auto">
                {/* Page Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#0c0b0b] font-serif tracking-tight mb-8 sm:mb-10">
                    Add New Travel Package
                </h1>

                {/* Success Alert Banner */}
                {successMessage && (
                    <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <p className="text-sm font-medium">
                            Travel package added successfully!
                        </p>
                    </div>
                )}

                {/* Form Container Card */}
                <Card className="bg-white border border-[#eeeeee] shadow-[0_4px_6px_rgba(0,0,0,0.08)] p-6 sm:p-10 rounded-none ring-0">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* 1. Destination Name */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="destinationName"
                                className="text-sm font-medium text-[#0c0b0b]"
                            >
                                Destination Name
                            </Label>
                            <Input
                                id="destinationName"
                                name="destinationName"
                                type="text"
                                required
                                value={formData.destinationName}
                                onChange={handleChange}
                                placeholder="Bali Paradise"
                                className="h-12 bg-[#f8fafc] border border-[#eeeeee] rounded-none px-4 text-sm text-[#0c0b0b] placeholder:text-[#94a3b8] focus-visible:border-[#15a1bf] focus-visible:ring-1 focus-visible:ring-[#15a1bf]"
                            />
                        </div>

                        {/* 2. Country & Category (2 Columns) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <Label
                                    htmlFor="country"
                                    className="text-sm font-medium text-[#0c0b0b]"
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
                                    className="h-12 bg-[#f8fafc] border border-[#eeeeee] rounded-none px-4 text-sm text-[#0c0b0b] placeholder:text-[#94a3b8] focus-visible:border-[#15a1bf] focus-visible:ring-1 focus-visible:ring-[#15a1bf]"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="category"
                                    className="text-sm font-medium text-[#0c0b0b]"
                                >
                                    Category
                                </Label>
                                <NativeSelect
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full h-12"
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <Label
                                    htmlFor="price"
                                    className="text-sm font-medium text-[#0c0b0b]"
                                >
                                    Price (USD)
                                </Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    min="0"
                                    step="any"
                                    required
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="e.g., 1299"
                                    className="h-12 bg-[#f8fafc] border border-[#eeeeee] rounded-none px-4 text-sm text-[#0c0b0b] placeholder:text-[#94a3b8] focus-visible:border-[#15a1bf] focus-visible:ring-1 focus-visible:ring-[#15a1bf]"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="duration"
                                    className="text-sm font-medium text-[#0c0b0b]"
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
                                    className="h-12 bg-[#f8fafc] border border-[#eeeeee] rounded-none px-4 text-sm text-[#0c0b0b] placeholder:text-[#94a3b8] focus-visible:border-[#15a1bf] focus-visible:ring-1 focus-visible:ring-[#15a1bf]"
                                />
                            </div>
                        </div>

                        {/* 4. Departure Date */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="departureDate"
                                className="text-sm font-medium text-[#0c0b0b]"
                            >
                                Departure Date
                            </Label>
                            <Input
                                id="departureDate"
                                name="departureDate"
                                type="date"
                                required
                                value={formData.departureDate}
                                onChange={handleChange}
                                placeholder="mm/dd/yyyy"
                                className="h-12 bg-[#f8fafc] border border-[#eeeeee] rounded-none px-4 text-sm text-[#0c0b0b] placeholder:text-[#94a3b8] focus-visible:border-[#15a1bf] focus-visible:ring-1 focus-visible:ring-[#15a1bf]"
                            />
                        </div>

                        {/* 5. Image URL */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="imageUrl"
                                className="text-sm font-medium text-[#0c0b0b]"
                            >
                                Image URL
                            </Label>
                            <Input
                                id="imageUrl"
                                name="imageUrl"
                                type="url"
                                required
                                value={formData.imageUrl}
                                onChange={handleChange}
                                placeholder="https://example.com/image.jpg"
                                className="h-12 bg-[#f8fafc] border border-[#eeeeee] rounded-none px-4 text-sm text-[#0c0b0b] placeholder:text-[#94a3b8] focus-visible:border-[#15a1bf] focus-visible:ring-1 focus-visible:ring-[#15a1bf]"
                            />
                        </div>

                        {/* 6. Description */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="description"
                                className="text-sm font-medium text-[#0c0b0b]"
                            >
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                name="description"
                                required
                                rows={5}
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the travel experience..."
                                className="min-h-[140px] bg-[#f8fafc] border border-[#eeeeee] rounded-none px-4 py-3 text-sm text-[#0c0b0b] placeholder:text-[#94a3b8] focus-visible:border-[#15a1bf] focus-visible:ring-1 focus-visible:ring-[#15a1bf]"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-6 flex flex-wrap items-center justify-end gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCancel}
                                className="h-12 px-6 rounded-none border border-[#ef4444] text-[#ef4444] bg-white hover:bg-red-50 hover:text-red-600 transition-colors inline-flex items-center gap-2 text-sm font-medium"
                            >
                                <Trash2 className="w-4 h-4 stroke-[1.75]" />
                                <span>Cancel</span>
                            </Button>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="h-12 px-6 rounded-none bg-[#15a1bf] hover:bg-[#128ca6] text-white transition-colors inline-flex items-center gap-2 text-sm font-medium shadow-sm"
                            >
                                <Save className="w-4 h-4 stroke-[1.75]" />
                                <span>{isSubmitting ? "Adding..." : "Add Travel Package"}</span>
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
}
