"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

const modes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "system", label: "System", icon: Monitor },
  { value: "dark", label: "Dark", icon: Moon },
] as const;

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const activeTheme = theme ?? "system";
  const activeIndex = Math.max(
    modes.findIndex((mode) => mode.value === activeTheme),
    0,
  );

  return (
    <div
      className="relative grid grid-cols-3 rounded-full border border-border bg-background p-1 shadow-sm"
      role="radiogroup"
      aria-label="Theme"
    >
      <span
        aria-hidden="true"
        className="absolute top-1 left-1 size-8 rounded-full bg-muted transition-transform duration-200 ease-out"
        style={{ transform: `translateX(${activeIndex * 2}rem)` }}
      />

      {modes.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          role="radio"
          aria-label={label}
          aria-checked={activeTheme === value}
          onClick={() => setTheme(value)}
          className={cn(
            "relative z-10 flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors",
            activeTheme === value && "text-foreground",
          )}
        >
          <Icon className="size-4" aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
