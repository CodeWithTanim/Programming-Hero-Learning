"use client";

import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { uploadImageToImgBB } from "@/lib/image-upload";
import { Studio } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { 
  Building2, 
  Upload, 
  Check, 
  MapPin, 
  DollarSign, 
  Users, 
  Layers, 
  Lock,
  ArrowLeft,
  ImageIcon
} from "lucide-react";

const standardAmenities = [
  "Cyclorama Wall",
  "Green Screen",
  "Soundproof Isolation",
  "Continuous Lighting Kit",
  "Profoto Strobes",
  "Natural Daylight",
  "High-Speed Wi-Fi",
  "Dressing Room & Vanity",
  "Air Conditioning & HVAC",
  "4K Reference Monitors",
  "Neve / Analog Console",
  "Shure SM7B Microphones",
  "Roll-up Load-in Bay Doors",
  "Pottery Wheels & Kilns",
  "Lounge & Craft Services",
  "Private Parking Lot",
];

const studioCategories = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Art Workshop",
];

export default function EditStudioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const studioId = resolvedParams.id;
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Photo Studio");
  const [hourlyRate, setHourlyRate] = useState<number | string>("");
  const [securityDeposit, setSecurityDeposit] = useState<number | string>("");
  const [maxCapacity, setMaxCapacity] = useState<number | string>(10);
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [overview, setOverview] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerName, setOwnerName] = useState("");

  // Protected route check
  useEffect(() => {
    if (!isPending && !user) {
      toast.error("Please sign in to edit listings.");
      router.push(`/login?callbackUrl=/studios/edit/${studioId}`);
    }
  }, [isPending, user, router, studioId]);

  // Fetch existing studio data to pre-fill the form
  useEffect(() => {
    async function fetchStudioData() {
      try {
        setLoading(true);
        const serverUrl = (process.env.NEXT_PUBLIC_SERVER_API || "http://localhost:8000").replace(/\/+$/, "");
        const res = await fetch(`${serverUrl}/api/studios/${studioId}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Could not find requested studio for editing.");
        }

        const data: Studio = await res.json();
        setTitle(data.title || "");
        setCategory(data.category || "Photo Studio");
        setHourlyRate(data.hourlyRate || "");
        setSecurityDeposit(data.securityDeposit || 0);
        setMaxCapacity(data.maxCapacity || 10);
        setLocation(data.location || "");
        setImageUrl(data.imageUrl || "");
        setOverview(data.overview || "");
        setSelectedAmenities(data.amenities || []);
        setOwnerEmail(data.ownerEmail || "");
        setOwnerName(data.ownerName || "");
      } catch (err: any) {
        console.error("Fetch studio edit error:", err);
        toast.error("Failed to load studio details.");
      } finally {
        setLoading(false);
      }
    }

    if (studioId) {
      fetchStudioData();
    }
  }, [studioId]);

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    toast.loading("Uploading photo...", { id: "edit-img" });

    try {
      const uploadedUrl = await uploadImageToImgBB(file);
      setImageUrl(uploadedUrl);
      toast.success("Photo uploaded successfully!", { id: "edit-img" });
    } catch (err) {
      toast.error("Upload failed. Please enter URL manually.", { id: "edit-img" });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !category || !hourlyRate || !location) {
      toast.error("Please fill in all mandatory fields.");
      return;
    }

    setSubmitting(true);
    try {
      const serverUrl = (process.env.NEXT_PUBLIC_SERVER_API || "http://localhost:8000").replace(/\/+$/, "");

      const updatedPayload = {
        title,
        category,
        hourlyRate: Number(hourlyRate),
        securityDeposit: Number(securityDeposit || 0),
        maxCapacity: Number(maxCapacity || 10),
        location,
        imageUrl,
        gallery: [imageUrl],
        amenities: selectedAmenities,
        overview,
      };

      const token = typeof window !== "undefined" ? localStorage.getItem("studiospace_token") : null;
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      if (user?.email) {
        headers["x-user-email"] = user.email;
      }

      // Per specification: "On submit, update MongoDB via PUT/PATCH and show a success toast before redirecting to /my-listings."
      const res = await fetch(`${serverUrl}/api/studios/${studioId}`, {
        method: "PATCH",
        headers,
        credentials: "include", // Protected by verifyJWT
        body: JSON.stringify(updatedPayload),
      });

      if (res.status === 401) {
        toast.error("Session expired or unauthorized. Please re-login.");
        router.push("/login?callbackUrl=/my-listings");
        return;
      }

      const contentType = res.headers.get("content-type");
      let data: any = {};
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        console.error("Non-JSON response from server:", text);
        if (!res.ok) {
          throw new Error(`Server returned status ${res.status}. Please ensure the backend server is running.`);
        }
      }

      if (!res.ok) {
        throw new Error(data.message || "Failed to update studio.");
      }

      toast.success("Studio Updated Successfully!", {
        description: `Changes to "${title}" have been saved.`,
      });

      router.push("/my-listings");
    } catch (err: any) {
      console.error("Update studio error:", err);
      toast.error(err.message || "Failed to update studio.");
    } finally {
      setSubmitting(false);
    }
  };

  if (isPending || loading) {
    return (
      <div className="min-h-screen bg-muted/20 py-10 sm:py-14 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-pulse">
          {/* Back Link & Header Skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-32 rounded-md" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-36 rounded-full" />
              <Skeleton className="h-8 w-64 rounded-xl" />
              <Skeleton className="h-4 w-96 max-w-full rounded-md" />
            </div>
          </div>

          {/* Form Card Skeleton */}
          <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
            {/* Section 1: Workspace Specifications */}
            <div className="space-y-5">
              <div className="border-b border-border/60 pb-3">
                <Skeleton className="h-6 w-52 rounded-md" />
              </div>

              {/* Title input */}
              <div className="space-y-1.5">
                <Skeleton className="h-3.5 w-28 rounded-md" />
                <Skeleton className="h-11 w-full rounded-xl" />
              </div>

              {/* Category & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Skeleton className="h-3.5 w-28 rounded-md" />
                  <Skeleton className="h-11 w-full rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <Skeleton className="h-3.5 w-32 rounded-md" />
                  <Skeleton className="h-11 w-full rounded-xl" />
                </div>
              </div>

              {/* Pricing & Capacity */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <Skeleton className="h-3.5 w-24 rounded-md" />
                  <Skeleton className="h-11 w-full rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <Skeleton className="h-3.5 w-28 rounded-md" />
                  <Skeleton className="h-11 w-full rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <Skeleton className="h-3.5 w-32 rounded-md" />
                  <Skeleton className="h-11 w-full rounded-xl" />
                </div>
              </div>
            </div>

            {/* Section 2: Cover Photography */}
            <div className="space-y-5">
              <div className="border-b border-border/60 pb-3">
                <Skeleton className="h-6 w-44 rounded-md" />
              </div>

              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Skeleton className="h-11 flex-1 rounded-xl" />
                  <Skeleton className="h-11 w-36 rounded-xl shrink-0" />
                </div>
                <Skeleton className="aspect-[16/9] max-w-sm rounded-2xl" />
              </div>
            </div>

            {/* Section 3: Amenities & Gear */}
            <div className="space-y-4">
              <div className="border-b border-border/60 pb-3">
                <Skeleton className="h-6 w-48 rounded-md" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {Array.from({ length: 16 }).map((_, idx) => (
                  <Skeleton key={idx} className="h-11 w-full rounded-xl" />
                ))}
              </div>
            </div>

            {/* Section 4: Detailed Overview */}
            <div className="space-y-2">
              <Skeleton className="h-3.5 w-36 rounded-md" />
              <Skeleton className="h-32 w-full rounded-2xl" />
            </div>

            {/* Section 5: Host Info */}
            <div className="p-5 rounded-2xl bg-muted/40 border border-border/60 space-y-3">
              <Skeleton className="h-4 w-44 rounded-md" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Skeleton className="h-3 w-20 rounded-md" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-3 w-20 rounded-md" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-border/60">
              <Skeleton className="h-10 w-24 rounded-xl" />
              <Skeleton className="h-10 w-44 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 py-10 sm:py-14 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Link & Header */}
        <div className="space-y-3">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="rounded-xl text-muted-foreground hover:text-foreground cursor-pointer -ml-2"
          >
            <Link href="/my-listings" className="flex items-center gap-1.5">
              <ArrowLeft className="size-4" />
              <span>Back to My Listings</span>
            </Link>
          </Button>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-orange-500">
              <span className="size-2 rounded-full bg-orange-500" />
              Listing Management
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Update Studio Space
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Revise pricing, amenities, high-res photography, or description details.
            </p>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
          {/* Section: Basic Information */}
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-border/60 pb-3">
              <Building2 className="size-5 text-orange-500" />
              Workspace Specifications
            </h2>

            <div className="space-y-1.5">
              <label htmlFor="title" className="text-xs font-semibold text-foreground">
                Studio Space Title *
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-background rounded-xl border-border h-11 text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label htmlFor="category" className="text-xs font-semibold text-foreground">
                  Studio Category *
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-background border border-border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer"
                  required
                >
                  {studioCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="location" className="text-xs font-semibold text-foreground">
                  Location / Address *
                </label>
                <div className="relative">
                  <MapPin className="size-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 bg-background rounded-xl border-border h-11 text-sm"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label htmlFor="hourlyRate" className="text-xs font-semibold text-foreground">
                  Hourly Rate ($) *
                </label>
                <div className="relative">
                  <DollarSign className="size-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <Input
                    id="hourlyRate"
                    type="number"
                    min="1"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className="pl-10 bg-background rounded-xl border-border h-11 text-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="securityDeposit" className="text-xs font-semibold text-foreground">
                  Security Deposit ($)
                </label>
                <div className="relative">
                  <DollarSign className="size-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <Input
                    id="securityDeposit"
                    type="number"
                    min="0"
                    value={securityDeposit}
                    onChange={(e) => setSecurityDeposit(e.target.value)}
                    className="pl-10 bg-background rounded-xl border-border h-11 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="maxCapacity" className="text-xs font-semibold text-foreground">
                  Max Capacity (Guests) *
                </label>
                <div className="relative">
                  <Users className="size-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <Input
                    id="maxCapacity"
                    type="number"
                    min="1"
                    value={maxCapacity}
                    onChange={(e) => setMaxCapacity(e.target.value)}
                    className="pl-10 bg-background rounded-xl border-border h-11 text-sm"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Imagery */}
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-border/60 pb-3">
              <ImageIcon className="size-5 text-orange-500" />
              Cover Photography
            </h2>

            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="url"
                  placeholder="Image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="bg-background rounded-xl border-border h-11 text-sm flex-1"
                />

                <label className="relative inline-flex items-center justify-center gap-2 px-4 h-11 rounded-xl bg-muted border border-border text-foreground hover:bg-muted/80 text-xs font-semibold cursor-pointer shrink-0 transition-all">
                  <Upload className="size-4 text-orange-500" />
                  <span>{uploadingImage ? "Uploading..." : "Replace via ImgBB"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={uploadingImage}
                    className="sr-only"
                  />
                </label>
              </div>

              {imageUrl && (
                <div className="relative aspect-[16/9] max-w-sm rounded-2xl overflow-hidden border border-border bg-muted mt-2 shadow-xs">
                  <img src={imageUrl} alt="Studio Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          {/* Section: Amenities */}
          <div className="space-y-4">
            <div className="border-b border-border/60 pb-3">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Layers className="size-5 text-orange-500" />
                Amenities & Gear List
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {standardAmenities.map((amenity) => {
                const isSelected = selectedAmenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => handleAmenityToggle(amenity)}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-medium text-left transition-all cursor-pointer ${
                      isSelected
                        ? "bg-orange-500/10 border-orange-500/40 text-orange-600 dark:text-orange-400 font-semibold"
                        : "bg-background border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                    }`}
                  >
                    <div className={`size-4 rounded-[4px] border flex items-center justify-center shrink-0 ${
                      isSelected ? "bg-orange-500 border-orange-500 text-white" : "border-muted-foreground/40"
                    }`}>
                      {isSelected && <Check className="size-3 stroke-[3]" />}
                    </div>
                    <span className="truncate">{amenity}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: Overview */}
          <div className="space-y-2">
            <label htmlFor="overview" className="text-xs font-semibold text-foreground">
              Detailed Overview & Rules *
            </label>
            <Textarea
              id="overview"
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              className="bg-background rounded-2xl border-border text-sm min-h-[120px] p-4"
              required
            />
          </div>

          {/* Read-Only Host Info */}
          <div className="space-y-3 p-5 rounded-2xl bg-muted/40 border border-border/60">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <Lock className="size-3.5" />
              <span>Read-Only Host Information</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] text-muted-foreground block mb-1">Host Name</label>
                <Input
                  value={ownerName || "Host"}
                  disabled
                  readOnly
                  className="bg-muted border-border/60 text-xs text-muted-foreground cursor-not-allowed"
                />
              </div>
              <div>
                <label className="text-[11px] text-muted-foreground block mb-1">Host Email</label>
                <Input
                  value={ownerEmail}
                  disabled
                  readOnly
                  className="bg-muted border-border/60 text-xs text-muted-foreground cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-border/60">
            <Button
              type="button"
              variant="outline"
              asChild
              className="w-full sm:w-auto rounded-xl border-border"
            >
              <Link href="/my-listings">Cancel</Link>
            </Button>

            <Button
              type="submit"
              disabled={submitting || uploadingImage}
              className="w-full sm:w-auto rounded-xl px-8 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-md shadow-orange-500/20 cursor-pointer"
            >
              {submitting ? "Saving Changes..." : "Save Updated Studio"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

