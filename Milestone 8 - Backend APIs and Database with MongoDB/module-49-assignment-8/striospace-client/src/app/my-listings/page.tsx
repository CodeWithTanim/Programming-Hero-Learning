"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Studio } from "@/types";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { 
  Building2, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  MapPin, 
  DollarSign, 
  AlertTriangle,
  Layers
} from "lucide-react";

export default function MyListingsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [studioToDelete, setStudioToDelete] = useState<Studio | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Protected route check
  useEffect(() => {
    if (!isPending && !user) {
      toast.error("Please sign in to view your studio listings.");
      router.push("/login?callbackUrl=/my-listings");
    }
  }, [isPending, user, router]);

  // Fetch user-owned studios
  const loadMyStudios = async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      const serverUrl = (process.env.NEXT_PUBLIC_SERVER_API || "http://localhost:8000").replace(/\/+$/, "");
      const res = await fetch(`${serverUrl}/api/my-studios/${encodeURIComponent(user.email)}`, {
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        setStudios(data);
      }
    } catch (err) {
      console.error("Error loading user listings:", err);
      toast.error("Failed to load your studio listings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      loadMyStudios();
    }
  }, [user?.email]);

  const handleDeleteStudio = async () => {
    if (!studioToDelete) return;

    setIsDeleting(true);
    try {
      const serverUrl = (process.env.NEXT_PUBLIC_SERVER_API || "http://localhost:8000").replace(/\/+$/, "");
      const token = typeof window !== "undefined" ? localStorage.getItem("studiospace_token") : null;
      const headers: Record<string, string> = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      if (user?.email) {
        headers["x-user-email"] = user.email;
      }

      const res = await fetch(`${serverUrl}/api/studios/${studioToDelete._id}`, {
        method: "DELETE",
        headers,
        credentials: "include", // Protected by verifyJWT (Challenge 1)
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
        throw new Error(data.message || "Failed to delete studio listing.");
      }

      toast.success("Studio Deleted Successfully", {
        description: `"${studioToDelete.title}" has been permanently removed.`,
      });

      setStudios((prev) => prev.filter((s) => s._id !== studioToDelete._id));
      setStudioToDelete(null);
    } catch (err: any) {
      console.error("Delete studio error:", err);
      toast.error(err.message || "Failed to delete studio.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isPending) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-96 w-full rounded-2xl" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/20 py-10 sm:py-14 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header with Add Studio Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-orange-500">
              <Layers className="size-3.5" />
              Host Management Portal
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              My Studio Listings
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage your published creative production spaces, rates, specs, and availability.
            </p>
          </div>

          <Button
            size="lg"
            className="rounded-xl px-5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-md shadow-orange-500/20 cursor-pointer shrink-0"
            asChild
          >
            <Link href="/add-studio">
              <PlusCircle className="size-4 mr-2" />
              Add New Studio
            </Link>
          </Button>
        </div>

        {/* Listings Content */}
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton key={idx} className="h-32 w-full rounded-2xl" />
            ))}
          </div>
        ) : studios.length > 0 ? (
          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-lg">
            {/* Table layout for larger screens */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/60 text-muted-foreground border-b border-border text-xs uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="px-6 py-4">Studio Workspace</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Hourly Rate</th>
                    <th className="px-6 py-4">Capacity</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {studios.map((studio) => (
                    <tr key={studio._id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={studio.imageUrl}
                            alt={studio.title}
                            className="size-14 rounded-xl object-cover bg-muted shrink-0"
                          />
                          <div>
                            <Link
                              href={`/studios/${studio._id}`}
                              className="font-semibold text-foreground hover:text-orange-500 transition-colors line-clamp-1"
                            >
                              {studio.title}
                            </Link>
                            <span className="text-xs text-muted-foreground">
                              Deposit: ${studio.securityDeposit || 0}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className="font-medium text-xs">
                          {studio.category}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 font-bold text-foreground">
                        ${studio.hourlyRate}/hr
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        Up to {studio.maxCapacity || 10}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground text-xs max-w-[200px] truncate">
                        {studio.location}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="size-8 p-0 rounded-lg text-muted-foreground hover:text-foreground"
                            title="View public details"
                          >
                            <Link href={`/studios/${studio._id}`}>
                              <ExternalLink className="size-4" />
                            </Link>
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="h-8 px-2.5 rounded-lg text-xs font-medium cursor-pointer"
                            title="Update listing details"
                          >
                            <Link href={`/studios/edit/${studio._id}`}>
                              <Edit3 className="size-3.5 mr-1 text-blue-500" />
                              Update
                            </Link>
                          </Button>

                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setStudioToDelete(studio)}
                            className="h-8 px-2.5 rounded-lg text-xs font-medium cursor-pointer"
                            title="Delete this studio"
                          >
                            <Trash2 className="size-3.5 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Card layout for mobile screens */}
            <div className="md:hidden divide-y divide-border/60">
              {studios.map((studio) => (
                <div key={studio._id} className="p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={studio.imageUrl}
                      alt={studio.title}
                      className="size-16 rounded-xl object-cover bg-muted shrink-0"
                    />
                    <div className="space-y-1">
                      <Badge variant="outline" className="text-[10px]">
                        {studio.category}
                      </Badge>
                      <h3 className="font-semibold text-sm text-foreground line-clamp-1">
                        {studio.title}
                      </h3>
                      <p className="text-xs font-bold text-orange-500">
                        ${studio.hourlyRate}/hr
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-border/40">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="flex-1 rounded-xl text-xs"
                    >
                      <Link href={`/studios/edit/${studio._id}`}>
                        <Edit3 className="size-3.5 mr-1 text-blue-500" />
                        Update
                      </Link>
                    </Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setStudioToDelete(studio)}
                      className="flex-1 rounded-xl text-xs"
                    >
                      <Trash2 className="size-3.5 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 px-4 bg-card rounded-3xl border border-border max-w-xl mx-auto space-y-4 shadow-sm">
            <div className="size-16 rounded-2xl bg-orange-500/10 text-orange-500 mx-auto flex items-center justify-center">
              <Building2 className="size-8 stroke-[1.8]" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              No Studio Listings Yet
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
              You haven&apos;t listed any creative workspaces under your account. Publish your first photo cyclorama or audio suite today!
            </p>
            <div className="pt-2">
              <Button
                asChild
                className="rounded-xl px-6 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold cursor-pointer shadow-md shadow-orange-500/20"
              >
                <Link href="/add-studio">
                  <PlusCircle className="size-4 mr-1.5" />
                  Add Your First Studio
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal (AlertDialog) */}
      <AlertDialog open={!!studioToDelete} onOpenChange={(open) => !open && setStudioToDelete(null)}>
        <AlertDialogContent className="rounded-2xl bg-card border-border p-6 shadow-2xl">
          <AlertDialogHeader className="space-y-2">
            <div className="size-12 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center">
              <AlertTriangle className="size-6" />
            </div>
            <AlertDialogTitle className="text-xl font-bold text-foreground">
              Confirm Studio Deletion
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Are you sure you want to delete <span className="font-semibold text-foreground">&quot;{studioToDelete?.title}&quot;</span>? This will permanently remove the space from the MongoDB collection and cancel future public discovery.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-0 pt-4">
            <AlertDialogCancel
              disabled={isDeleting}
              className="rounded-xl border-border cursor-pointer"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isDeleting}
              onClick={handleDeleteStudio}
              className="rounded-xl bg-destructive hover:bg-destructive/90 text-white font-semibold cursor-pointer"
            >
              {isDeleting ? "Deleting..." : "Permanently Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

