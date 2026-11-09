"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { User, Mail, Image as ImageIcon, Lock, Aperture, AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

function SignUpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || searchParams.get("redirect") || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Password validation rules (Strictly per assignment specs)
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;
  const isPasswordValid = hasUppercase && hasLowercase && hasMinLength;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validate Password strictly
    if (!hasUppercase) {
      const err = "Password must contain at least one uppercase letter (A-Z).";
      setErrorMessage(err);
      toast.error(err);
      return;
    }
    if (!hasLowercase) {
      const err = "Password must contain at least one lowercase letter (a-z).";
      setErrorMessage(err);
      toast.error(err);
      return;
    }
    if (!hasMinLength) {
      const err = "Password must be at least 6 characters in length.";
      setErrorMessage(err);
      toast.error(err);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      });

      if (error) {
        setErrorMessage(error.message || "Registration failed. Please check your details.");
        toast.error(error.message || "Registration failed");
        setLoading(false);
        return;
      }

      // Sign out to ensure clean unauthenticated state per specification:
      // "If the user registers successfully, then navigate them to their Login page."
      try {
        await authClient.signOut();
        if (typeof window !== "undefined") {
          localStorage.removeItem("studiospace_token");
        }
      } catch (signOutErr) {
        console.error("Sign out after registration notice:", signOutErr);
      }

      toast.success("Account Registered Successfully!", {
        description: `Welcome to StudioSpace! Please log in with your credentials.`,
      });

      // Navigate to Login page with prefilled email per specification
      router.push(`/login?email=${encodeURIComponent(email)}`);
      router.refresh();
    } catch (err: any) {
      console.error("Sign up exception:", err);
      setErrorMessage(err.message || "Failed to register account.");
      toast.error("Registration encountered an error.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      await authClient.signIn.social({
        provider: "google",
        callbackURL: callbackUrl,
      });
    } catch (err: any) {
      console.error("Google sign in error:", err);
      toast.error("Google authentication could not be initiated.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-muted/20 flex flex-col justify-center items-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-md space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="size-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
              <Aperture className="size-6 stroke-[2.2]" />
            </div>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Create StudioSpace Account
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Join thousands of filmmakers, photographers, and audio engineers
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-card border border-border rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
          {/* Form Error Toast/Message */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive text-xs flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="size-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Social Google Login Button */}
          <Button
            type="button"
            variant="outline"
            disabled={googleLoading}
            onClick={handleGoogleLogin}
            className="w-full h-11 rounded-xl border-border hover:bg-muted font-medium flex items-center justify-center gap-2.5 text-foreground cursor-pointer transition-all"
          >
            <svg className="size-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{googleLoading ? "Connecting to Google..." : "Sign up with Google"}</span>
          </Button>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-border w-full" />
            <span className="bg-card px-3 text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
              Or with email credentials
            </span>
            <div className="border-t border-border w-full" />
          </div>

          {/* Credentials Registration Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-xs font-semibold text-foreground">
                Full Name
              </label>
              <div className="relative">
                <User className="size-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <Input
                  id="name"
                  type="text"
                  placeholder="e.g. Jordan Miller"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 h-11 bg-background rounded-xl border-border text-sm"
                  required
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-foreground">
                Email Address
              </label>
              <div className="relative">
                <Mail className="size-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@creatorspace.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 bg-background rounded-xl border-border text-sm"
                  required
                />
              </div>
            </div>

            {/* Photo URL */}
            <div className="space-y-1.5">
              <label htmlFor="photoUrl" className="text-xs font-semibold text-foreground">
                Profile Photo URL
              </label>
              <div className="relative">
                <ImageIcon className="size-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <Input
                  id="photoUrl"
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="pl-10 h-11 bg-background rounded-xl border-border text-sm"
                />
              </div>
              <p className="text-[11px] text-muted-foreground">
                Leave empty for a standard creator studio portrait.
              </p>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-xs font-semibold text-foreground">
                Account Password
              </label>
              <div className="relative">
                <Lock className="size-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-11 bg-background rounded-xl border-border text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>

              {/* Password Requirement Checklist */}
              {password.length > 0 && (
                <div className="p-3 bg-muted/40 border border-border/60 rounded-xl space-y-1.5 text-xs mt-2">
                  <div className={`flex items-center gap-1.5 ${hasUppercase ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-muted-foreground"}`}>
                    <CheckCircle2 className={`size-3.5 ${hasUppercase ? "text-emerald-500" : "text-muted-foreground/50"}`} />
                    <span>At least one uppercase letter (A-Z)</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${hasLowercase ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-muted-foreground"}`}>
                    <CheckCircle2 className={`size-3.5 ${hasLowercase ? "text-emerald-500" : "text-muted-foreground/50"}`} />
                    <span>At least one lowercase letter (a-z)</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${hasMinLength ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-muted-foreground"}`}>
                    <CheckCircle2 className={`size-3.5 ${hasMinLength ? "text-emerald-500" : "text-muted-foreground/50"}`} />
                    <span>Minimum 6 characters</span>
                  </div>
                </div>
              )}
            </div>

            {/* Register Button */}
            <Button
              type="submit"
              disabled={loading || (password.length > 0 && !isPasswordValid)}
              className="w-full h-11 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-md shadow-orange-500/20 cursor-pointer transition-all"
            >
              {loading ? "Creating Account..." : "Register Account"}
            </Button>
          </form>

          {/* Switch to Login */}
          <div className="text-center pt-2 border-t border-border/60">
            <p className="text-xs text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-orange-500 font-semibold hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading registration...</div>}>
      <SignUpContent />
    </Suspense>
  );
}
