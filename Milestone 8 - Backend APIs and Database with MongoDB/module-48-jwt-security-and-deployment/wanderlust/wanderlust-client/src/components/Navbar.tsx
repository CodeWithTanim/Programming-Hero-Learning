"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Menu, X, LogOut, Bookmark } from "lucide-react";
import { NavLink } from "@/components/types";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Destinations", href: "/destinations" },
  { name: "My Bookings", href: "/my-bookings" },
  // { name: "Admin", href: "/admin" },
];

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      window.location.href = "/login";
    } catch (error) {
      console.error("Sign out error:", error);
      window.location.href = "/login";
    }
  };

  return (
    <header className="w-full bg-white border-b border-neutral-100 sticky top-0 z-50">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-[56px] flex items-center justify-between relative">
        {/* Left Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[15px] lg:text-[16px] leading-6 font-medium transition-colors hover:text-[#15a1bf] ${isActive ? "text-[#15a1bf]" : "text-[#0c0b0b]"
                  }`}
              >
                <span
                  className={
                    isActive
                      ? "border-b-[2px] border-[#15a1bf] pb-[2px]"
                      : ""
                  }
                >
                  {link.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Center Blue Wanderlast Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
          <Link href="/" className="inline-block transition-opacity hover:opacity-95">
            <Image
              src="/assets/Wanderlast-blue.png"
              alt="Wanderlast"
              width={162}
              height={24}
              priority
              className="h-6 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Right Navigation / Auth Links (Desktop) */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {user ? (
            <Popover>
              <PopoverTrigger className="cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#15a1bf] focus-visible:ring-offset-2 transition-transform active:scale-95 flex items-center">
                <Avatar className="size-9 border border-neutral-200 hover:border-[#15a1bf] transition-colors">
                  <AvatarImage
                    referrerPolicy="no-referrer"
                    src={user.image || undefined}
                    alt={user.name || "User profile"}
                  />
                  <AvatarFallback className="bg-[#15a1bf] text-white font-medium text-xs">
                    {user.name ? user.name.charAt(0).toUpperCase() : <User className="size-4" />}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                sideOffset={8}
                className="w-68 p-4 bg-white border border-[#eeeeee] shadow-[0_4px_24px_rgba(0,0,0,0.08)] rounded-none"
              >
                {/* User Info Header */}
                <div className="flex items-center gap-3 pb-3 border-b border-[#eeeeee]">
                  <Avatar className="size-10 border border-neutral-200 shrink-0">
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={user.image || undefined}
                      alt={user.name || "User"}
                    />
                    <AvatarFallback className="bg-[#15a1bf] text-white font-medium text-sm">
                      {user.name ? user.name.charAt(0).toUpperCase() : <User className="size-5" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold text-[#0c0b0b] truncate">
                      {user.name || "Traveler"}
                    </span>
                    <span className="text-xs text-[#6c696d] truncate">
                      {user.email || ""}
                    </span>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col py-1.5 space-y-0.5">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2.5 px-2.5 py-2 text-sm text-[#0c0b0b] hover:bg-neutral-50 hover:text-[#15a1bf] transition-colors"
                  >
                    <User className="size-4 text-[#6c696d]" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    href="/my-bookings"
                    className="flex items-center gap-2.5 px-2.5 py-2 text-sm text-[#0c0b0b] hover:bg-neutral-50 hover:text-[#15a1bf] transition-colors"
                  >
                    <Bookmark className="size-4 text-[#6c696d]" />
                    <span>My Bookings</span>
                  </Link>
                </div>

                {/* Sign Out Button */}
                <div className="pt-2 border-t border-[#eeeeee]">
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
                  >
                    <LogOut className="size-4 text-red-600" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="flex items-center gap-6 lg:gap-8 text-[15px] lg:text-[16px] leading-6 font-medium text-[#0c0b0b]">
              <Link
                href="/login"
                className={`hover:text-[#15a1bf] transition-colors ${pathname === "/login"
                  ? "text-[#15a1bf] border-b-[2px] border-[#15a1bf] pb-[2px]"
                  : "text-[#0c0b0b]"
                  }`}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className={`hover:text-[#15a1bf] transition-colors ${pathname === "/signup"
                  ? "text-[#15a1bf] border-b-[2px] border-[#15a1bf] pb-[2px]"
                  : "text-[#0c0b0b]"
                  }`}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden ml-auto flex items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="p-1.5 text-[#0c0b0b] hover:text-[#15a1bf] focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white px-6 py-4 space-y-4 shadow-lg border-t border-neutral-100">
          <div className="flex flex-col space-y-3 border-b border-neutral-100 pb-4">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-[15px] font-medium transition-colors ${isActive
                    ? "text-[#15a1bf] font-semibold"
                    : "text-[#0c0b0b] hover:text-[#15a1bf]"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {user ? (
            <div className="flex flex-col space-y-3 pt-2">
              <div className="flex items-center gap-3 py-1">
                <Avatar className="size-9 border border-neutral-200 shrink-0">
                  <AvatarImage
                    referrerPolicy="no-referrer"
                    src={user.image || undefined}
                    alt={user.name || "User"}
                  />
                  <AvatarFallback className="bg-[#15a1bf] text-white font-medium text-sm">
                    {user.name ? user.name.charAt(0).toUpperCase() : <User className="size-4" />}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-[#0c0b0b] truncate">{user.name}</span>
                  <span className="text-xs text-[#6c696d] truncate">{user.email}</span>
                </div>
              </div>
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-[15px] font-medium text-[#0c0b0b] hover:text-[#15a1bf] transition-colors"
              >
                <User className="w-4 h-4 text-[#6c696d]" />
                <span>Profile</span>
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="flex items-center gap-2 text-[15px] font-medium text-red-600 hover:text-red-700 transition-colors text-left pt-1 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-3 pt-1">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-[15px] font-medium transition-colors ${pathname === "/login" ? "text-[#15a1bf]" : "text-[#0c0b0b] hover:text-[#15a1bf]"
                  }`}
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-[15px] font-medium transition-colors ${pathname === "/signup" ? "text-[#15a1bf]" : "text-[#0c0b0b] hover:text-[#15a1bf]"
                  }`}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
