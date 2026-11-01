"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Menu, X } from "lucide-react";
import { NavLink, AuthLink } from "@/components/types";

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Destinations", href: "/destinations" },
  { name: "My Bookings", href: "/my-bookings" },
  { name: "Admin", href: "/admin" },
];

const authLinks: AuthLink[] = [
  { name: "Profile", href: "/profile", icon: User },
  { name: "Login", href: "/login" },
  { name: "Sign Up", href: "/signup" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                className={`text-[15px] lg:text-[16px] leading-6 font-medium transition-colors hover:text-[#15a1bf] ${
                  isActive ? "text-[#15a1bf]" : "text-[#0c0b0b]"
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
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-[15px] lg:text-[16px] leading-6 font-medium text-[#0c0b0b]">
          {authLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`inline-flex items-center gap-1.5 hover:text-[#15a1bf] transition-colors ${
                  isActive ? "text-[#15a1bf]" : "text-[#0c0b0b]"
                }`}
              >
                {Icon && (
                  <Icon className="w-4 h-4 text-[#0c0b0b] stroke-[1.8]" />
                )}
                <span
                  className={
                    isActive
                      ? "border-b-[2px] border-[#15a1bf] pb-[2px]"
                      : ""
                  }
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
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
                  className={`text-[15px] font-medium transition-colors ${
                    isActive
                      ? "text-[#15a1bf] font-semibold"
                      : "text-[#0c0b0b] hover:text-[#15a1bf]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col space-y-3 pt-1">
            {authLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`inline-flex items-center gap-2 text-[15px] font-medium transition-colors ${
                    isActive ? "text-[#15a1bf]" : "text-[#0c0b0b] hover:text-[#15a1bf]"
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4 text-current" />}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
