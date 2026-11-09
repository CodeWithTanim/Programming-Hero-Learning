"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Mail, Image as ImageIcon, Lock } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function SignUpPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        imageUrl: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const user = Object.fromEntries(form.entries()) as { name: string, image: string, email: string, password: string };
        console.log("Sign up form submitted:", user);

        const { data, error } = await authClient.signUp.email({
            ...user
        })
        if (data) {
            redirect('/')
        }
        if (error) {
            console.log(error)
        }
    };

    return (
        <div className="min-h-[calc(100vh-56px)] bg-[#fafafa] flex flex-col justify-center items-center py-12 px-4 sm:px-6">
            {/* Header outside/above the card */}
            <div className="text-center mb-8">
                <h1 className="font-serif text-3xl sm:text-4xl text-[#0c0b0b] font-normal tracking-tight">
                    Create Account
                </h1>
                <p className="text-sm sm:text-base text-[#6c696d] font-normal mt-2">
                    Start your adventure with Wanderlust
                </p>
            </div>

            {/* Main Signup Card */}
            <div className="w-full max-w-[480px] bg-white border border-[#e5e7eb] shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-8 sm:p-10">
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-[#1e293b]"
                        >
                            Full Name
                        </label>
                        <div className="relative">
                            <User className="w-4 h-4 text-[#94a3b8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[1.75]" />
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full h-11 pl-10 pr-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-none text-sm text-[#0c0b0b] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#15a1bf] focus:bg-white transition-colors"
                            />
                        </div>
                    </div>

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

                    {/* User Image URL */}
                    <div className="space-y-1.5">
                        <label
                            htmlFor="imageUrl"
                            className="block text-sm font-medium text-[#1e293b]"
                        >
                            Image URL
                        </label>
                        <div className="relative">
                            <ImageIcon className="w-4 h-4 text-[#94a3b8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[1.75]" />
                            <input
                                id="imageUrl"
                                name="imageUrl"
                                type="url"
                                placeholder="Enter your image URL"
                                value={formData.imageUrl}
                                onChange={handleChange}
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
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full h-11 pl-10 pr-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-none text-sm text-[#0c0b0b] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#15a1bf] focus:bg-white transition-colors"
                            />
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-1.5">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-[#1e293b]"
                        >
                            Confirm Password
                        </label>
                        <div className="relative">
                            <Lock className="w-4 h-4 text-[#94a3b8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[1.75]" />
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full h-11 pl-10 pr-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-none text-sm text-[#0c0b0b] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#15a1bf] focus:bg-white transition-colors"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full h-11 !mt-6 bg-[#15a1bf] hover:bg-[#128ca6] text-white text-sm font-semibold tracking-wide transition-colors cursor-pointer"
                    >
                        Create Account
                    </button>
                </form>

                {/* Footer Link */}
                <div className="pt-6 text-center">
                    <p className="text-sm text-[#6c696d]">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-[#15a1bf] font-medium hover:underline transition-colors"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
