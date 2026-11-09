"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="size-9 rounded-full" aria-label="Toggle theme">
        <Moon className="size-4 opacity-50 text-muted-foreground" />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-9 rounded-full cursor-pointer hover:bg-muted text-foreground transition-all"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="size-[1.15rem] text-amber-400 transition-transform rotate-0 scale-100" />
      ) : (
        <Moon className="size-[1.15rem] text-slate-700 transition-transform rotate-0 scale-100" />
      )}
    </Button>
  );
}

