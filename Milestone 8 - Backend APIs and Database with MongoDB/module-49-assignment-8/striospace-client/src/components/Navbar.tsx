"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Aperture, 
  Menu, 
  X, 
  PlusCircle, 
  Layers, 
  CalendarCheck, 
  LogOut, 
  Heart,
  LayoutDashboard,
  User as UserIcon 
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const isManualScrollRef = React.useRef(false);
  const manualScrollTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Auto-sync JWT token whenever a user is authenticated (including Google Social Login)
  React.useEffect(() => {
    if (!user?.email) return;

    const syncJwt = async () => {
      try {
        const serverUrl = (process.env.NEXT_PUBLIC_SERVER_API || "http://localhost:8000").replace(/\/+$/, "");
        const res = await fetch(`${serverUrl}/api/jwt`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email: user.email, name: user.name || "Creator" }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.token) {
            localStorage.setItem("studiospace_token", data.token);
          }
        }
      } catch (err) {
        console.error("JWT sync error:", err);
      }
    };

    syncJwt();
  }, [user?.email, user?.name]);

  const navLinks = [
    { name: "Home", href: "/", id: "home" },
    { name: "Explore Studios", href: "/studios", id: "studios" },
    { name: "How It Works", href: "/#how-it-works", id: "how-it-works" },
    { name: "About Us", href: "/#about-us", id: "about-us" },
  ];

  // Section scroll spy and hash observer when on homepage
  React.useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const checkHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "how-it-works" || hash === "about-us") {
        setActiveSection(hash);
        return true;
      }
      return false;
    };

    const handleScroll = () => {
      if (isManualScrollRef.current) return;

      const scrollY = window.scrollY;

      // When near the top of the home page, highlight "home"
      if (scrollY < 200) {
        setActiveSection("home");
        return;
      }

      const howItWorksEl = document.getElementById("how-it-works");
      const aboutUsEl = document.getElementById("about-us");

      // Check if user reached near the bottom of the page
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      if (isAtBottom && aboutUsEl) {
        setActiveSection("about-us");
        return;
      }

      const triggerPoint = scrollY + 280;

      if (aboutUsEl && triggerPoint >= aboutUsEl.offsetTop) {
        setActiveSection("about-us");
      } else if (howItWorksEl && triggerPoint >= howItWorksEl.offsetTop) {
        setActiveSection("how-it-works");
      } else {
        setActiveSection("home");
      }
    };

    const hasHash = checkHash();
    if (!hasHash) {
      handleScroll();
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", checkHash);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", checkHash);
      if (manualScrollTimeoutRef.current) clearTimeout(manualScrollTimeoutRef.current);
    };
  }, [pathname]);

  const isLinkActive = (link: (typeof navLinks)[0]) => {
    if (link.id === "studios") {
      return pathname === "/studios" || pathname.startsWith("/studios/");
    }
    if (pathname !== "/") {
      return false;
    }
    return activeSection === link.id;
  };

  const handleNavClick = (link: (typeof navLinks)[0], e: React.MouseEvent) => {
    if (link.id === "studios") {
      return;
    }

    if (pathname === "/") {
      e.preventDefault();
      setActiveSection(link.id);
      isManualScrollRef.current = true;
      if (manualScrollTimeoutRef.current) clearTimeout(manualScrollTimeoutRef.current);
      manualScrollTimeoutRef.current = setTimeout(() => {
        isManualScrollRef.current = false;
      }, 1000);

      if (link.id === "home") {
        window.history.pushState(null, "", "/");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.history.pushState(null, "", link.href);
        const el = document.getElementById(link.id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  const handleSignOut = async () => {
    try {
      const serverUrl = (process.env.NEXT_PUBLIC_SERVER_API || "http://localhost:8000").replace(/\/+$/, "");
      try {
        await fetch(`${serverUrl}/api/logout`, {
          method: "POST",
          credentials: "include",
        });
      } catch (err) {
        console.error("Backend logout error:", err);
      }

      if (typeof window !== "undefined") {
        localStorage.removeItem("studiospace_token");
      }
      await authClient.signOut();
      toast.success("Signed out successfully. See you soon!");
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Error signing out. Redirecting to login...");
      router.push("/login");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link 
          href="/" 
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              setActiveSection("home");
              window.history.pushState(null, "", "/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
        >
          <div className="size-9 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform duration-200">
            <Aperture className="size-5 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
              Studio<span className="text-orange-500">Space</span>
            </span>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground -mt-1 hidden sm:inline-block">
              Creator Studios
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = isLinkActive(link);

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(link, e)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-primary/10 text-primary font-semibold shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons & Auth */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle (Challenge 3) */}
          <ThemeToggle />

          {/* Auth State */}
          {isPending ? (
            <div className="size-8 rounded-full bg-muted animate-pulse" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer outline-none rounded-full ring-2 ring-primary/20 hover:ring-primary/50 transition-all p-0.5">
                <Avatar className="size-8 sm:size-9 border border-border">
                  <AvatarImage src={user.image || undefined} alt={user.name || "User Avatar"} />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs uppercase">
                    {user.name ? user.name.slice(0, 2) : "CR"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-foreground hidden lg:inline-block max-w-[120px] truncate">
                  {user.name}
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-1.5 shadow-xl border border-border bg-popover text-popover-foreground">
                <div className="px-2.5 py-2 border-b border-border/60 mb-1">
                  <p className="text-sm font-semibold truncate text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
                
                <DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/dashboard")}>
                  <LayoutDashboard className="mr-2 size-4 text-orange-500" />
                  <span>Dashboard</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/add-studio")}>
                  <PlusCircle className="mr-2 size-4 text-emerald-500" />
                  <span>Add New Studio</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/my-listings")}>
                  <Layers className="mr-2 size-4 text-blue-500" />
                  <span>My Studio Listings</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/my-bookings")}>
                  <CalendarCheck className="mr-2 size-4 text-purple-500" />
                  <span>My Bookings</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/wishlist")}>
                  <Heart className="mr-2 size-4 text-rose-500" />
                  <span>Saved Wishlist</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                
                <DropdownMenuItem 
                  className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 size-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-sm font-medium cursor-pointer"
                onClick={() => router.push("/login")}
              >
                Sign In
              </Button>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium shadow-md shadow-orange-500/20 cursor-pointer"
                onClick={() => router.push("/signup")}
              >
                Register
              </Button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background px-4 pt-2 pb-5 space-y-2">
          {navLinks.map((link) => {
            const isActive = isLinkActive(link);

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleNavClick(link, e);
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {user && (
            <div className="pt-3 border-t border-border space-y-1">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md"
              >
                <LayoutDashboard className="size-4 text-orange-500" />
                Dashboard
              </Link>
              <Link
                href="/my-listings"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md"
              >
                <Layers className="size-4 text-blue-500" />
                My Studio Listings
              </Link>
              <Link
                href="/add-studio"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md"
              >
                <PlusCircle className="size-4 text-emerald-500" />
                Add New Studio
              </Link>
              <Link
                href="/my-bookings"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md"
              >
                <CalendarCheck className="size-4 text-purple-500" />
                My Bookings
              </Link>
              <Link
                href="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md"
              >
                <Heart className="size-4 text-rose-500" />
                Saved Wishlist
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleSignOut();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-md text-left"
              >
                <LogOut className="size-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

