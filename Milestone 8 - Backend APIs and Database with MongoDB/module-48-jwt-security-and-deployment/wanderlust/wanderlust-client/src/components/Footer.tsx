"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Destinations", href: "/destinations" },
  { name: "My Bookings", href: "/my-bookings" },
  { name: "My Profile", href: "/profile" },
];

const supportLinks = [
  { name: "Help Center", href: "/help" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setEmail("");
    }
  };

  return (
    <footer className="w-full bg-[#0c0b0b] text-white pt-16 sm:pt-20 lg:pt-28 pb-8 px-4 sm:px-8 lg:px-[80px]">
      <div className="max-w-7xl mx-auto flex flex-col gap-12 sm:gap-14 lg:gap-16">
        {/* Brand Header */}
        <div className="space-y-3">
          <Link href="/" className="inline-block">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-serif">
              Wanderlast
            </h2>
          </Link>
          <p className="text-neutral-400 text-sm sm:text-base lg:text-lg font-light max-w-xl leading-relaxed">
            Your gateway to extraordinary travel experiences around the world.
          </p>
        </div>

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* 1. Newsletter */}
          <div className="space-y-4">
            <h3 className="text-white text-xs sm:text-sm font-semibold tracking-wider uppercase">
              NEWSLETTER
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              Subscribe for exclusive travel deals and inspiration.
            </p>

            <form onSubmit={handleSubmit} className="w-full max-w-[320px]">
              <div className="bg-[#373737] flex items-center justify-between px-4 py-3 rounded-none focus-within:ring-1 focus-within:ring-neutral-400 transition-all">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  required
                  className="bg-transparent border-none outline-none text-white placeholder-neutral-400 flex-1 text-sm pr-2"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="text-white hover:text-white/80 transition-colors p-0.5"
                >
                  <ArrowUpRight className="w-4 h-4 stroke-[2]" />
                </button>
              </div>
            </form>
          </div>

          {/* 2. Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white text-xs sm:text-sm font-semibold tracking-wider uppercase">
              QUICK LINKS
            </h3>
            <ul className="space-y-3 text-sm sm:text-base text-neutral-400">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Support */}
          <div className="space-y-4">
            <h3 className="text-white text-xs sm:text-sm font-semibold tracking-wider uppercase">
              SUPPORT
            </h3>
            <ul className="space-y-3 text-sm sm:text-base text-neutral-400">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Contact Us */}
          <div className="space-y-4">
            <h3 className="text-white text-xs sm:text-sm font-semibold tracking-wider uppercase">
              CONTACT US
            </h3>
            <ul className="space-y-3 text-sm sm:text-base text-neutral-400">
              <li>
                <a
                  href="tel:7869011622"
                  className="hover:text-white transition-colors"
                >
                  786 901 1622
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@wandarland.com"
                  className="hover:text-white transition-colors break-all"
                >
                  info@wandarland.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="pt-6 sm:pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-neutral-400">
          <p>© 2026 Wanderlust. All rights reserved.</p>

          <div className="flex items-center gap-5 text-white">
            {/* X / Twitter */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="text-white hover:text-neutral-400 transition-colors"
            >
              <svg
                className="w-4 h-4 sm:w-[18px] sm:h-[18px] fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white hover:text-neutral-400 transition-colors"
            >
              <svg
                className="w-4 h-4 sm:w-[18px] sm:h-[18px] fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 0 0 1.66-1.66 1.66 1.66 0 0 0-3.32 0 1.65 1.65 0 0 0 1.66 1.66m1.39 9.74v-8.37H5.07v8.37h2.78z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white hover:text-neutral-400 transition-colors"
            >
              <svg
                className="w-4 h-4 sm:w-[18px] sm:h-[18px] fill-none stroke-current stroke-2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

