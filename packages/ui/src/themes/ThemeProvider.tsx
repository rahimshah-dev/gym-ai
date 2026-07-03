import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { semanticColors, spacing, radius, type SemanticColorTokens } from "@gymai/design-tokens";

type ThemeMode = "dark" | "light";

interface ThemeContextValue {
  mode: ThemeMode;
  colors: SemanticColorTokens;
  spacing: typeof spacing;
  radius: typeof radius;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

// Mirrors apps/web-demo/index.html's manual dark/light toggle (default dark,
// per docs/01-product/prd/gymai-coach-prd.md non-functional requirements).
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("dark");

  const value = useMemo<ThemeContextValue>(
    () => ({ mode, colors: semanticColors(mode), spacing, radius, setMode }),
    [mode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
