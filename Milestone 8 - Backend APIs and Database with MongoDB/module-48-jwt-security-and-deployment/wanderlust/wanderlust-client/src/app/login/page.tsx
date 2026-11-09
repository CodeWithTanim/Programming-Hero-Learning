"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const user = Object.fromEntries(form.entries()) as {
      email: string;
      password: string;
    };
    console.log("Sign in form submitted:", user);

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    if (data) {
      redirect("/");
    }
    if (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)] bg-[#fafafa] flex flex-col justify-center items-center py-12 px-4 sm:px-6">
      {/* Header outside/above the card */}
      <div className="text-center mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl text-[#0c0b0b] font-normal tracking-tight">
          Welcome Back
        </h1>
        <p className="text-sm sm:text-base text-[#6c696d] font-normal mt-2">
          Resume your adventure with Wanderlust
        </p>
      </div>

      {/* Main Sign In Card */}
      <div className="w-full max-w-[480px] bg-white border border-[#e5e7eb] shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-8 sm:p-10">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Address */}
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#1e293b]"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#94a3b8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[1.75]" />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full h-11 pl-10 pr-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-none text-sm text-[#0c0b0b] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#15a1bf] focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#1e293b]"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#94a3b8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[1.75]" />
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full h-11 pl-10 pr-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-none text-sm text-[#0c0b0b] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#15a1bf] focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Remember Me & Forgot Password Row */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="w-4 h-4 rounded-none border-[#cbd5e1] text-[#15a1bf] focus:ring-[#15a1bf] accent-[#15a1bf] cursor-pointer"
              />
              <span className="text-sm text-[#475569]">Remember me</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-[#15a1bf] hover:underline transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full h-11 !mt-6 bg-[#15a1bf] hover:bg-[#128ca6] text-white text-sm font-semibold tracking-wide transition-colors cursor-pointer"
          >
            Sign In
          </button>
        </form>

        {/* Footer Link */}
        <div className="pt-6 text-center">
          <p className="text-sm text-[#6c696d]">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#15a1bf] font-medium hover:underline transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

