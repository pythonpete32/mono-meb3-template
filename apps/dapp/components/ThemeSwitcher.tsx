"use client";
import * as React from "react";

import { Button } from "@ui/components/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  return (
    <>
      <Button
        variant="neutral"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <Sun className="h-5 w-5 m500:h-4 m500:w-4 hidden dark:inline stroke-darkText" />
        <Moon className="h-5 w-5 m500:h-4 m500:w-4 inline dark:hidden stroke-text" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </>
  );
}
