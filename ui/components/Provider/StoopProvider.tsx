"use client";

import { createContext, useContext, useEffect, useState, type JSX, type ReactNode } from "react";

import type { ThemeName, Theme } from "../../styles/types";

import { themes, lightTheme } from "../../styles/theme";
import { injectCriticalCSS } from "./CriticalStyles";
import { injectGlobalStyles } from "./GlobalStyles";
import { useHydration } from "./useHydration";

// Provider configuration
export interface StoopProviderConfig {
  /** Whether to inject global styles and CSS reset */
  injectGlobalStyles?: boolean;
  /** Whether to inject critical CSS immediately to prevent layout shift.
   * Default: false (SSR-first - inject critical CSS server-side for best performance) */
  injectCriticalCSS?: boolean;
  /** Custom CSS to inject */
  customCSS?: string;
  /** Initial theme (defaults to 'light'). Should match theme used in server-side critical CSS */
  theme?: ThemeName;
  /** Whether to show a loading state during hydration */
  showLoadingState?: boolean;
}

// Context for Stoop UI configuration and theming
interface StoopContextValue extends StoopProviderConfig {
  currentTheme: Theme;
  themeName: ThemeName;
  toggleTheme: () => void;
  setTheme: (theme: ThemeName) => void;
  isHydrated: boolean;
}

const StoopContext = createContext<StoopContextValue>({
  currentTheme: lightTheme,
  injectCriticalCSS: false, // SSR by default
  injectGlobalStyles: true,
  isHydrated: false,
  setTheme: () => {},
  showLoadingState: false,
  theme: "light",
  themeName: "light",
  toggleTheme: () => {},
});

// Provider props
export interface StoopProviderProps {
  children: ReactNode;
  config?: StoopProviderConfig;
}

// Only inject critical CSS immediately if not using SSR approach
if (typeof window !== "undefined") {
  // This will be overridden by the provider config
}

/**
 * Stoop UI Provider - Works with both Next.js App Router and Pages Router
 * Prevents hydration errors and layout shift with SSR
 *
 * For best performance:
 * 1. Inject getCriticalCSS() server-side (_document.tsx or layout.tsx)
 * 2. Use this provider with the same initial theme
 */
export function StoopProvider({
  children,
  config = {
    injectCriticalCSS: false, // SSR by default - inject in _document.tsx
    injectGlobalStyles: true,
    showLoadingState: false,
    theme: "light"
  },
}: StoopProviderProps): JSX.Element {
  // Track hydration state
  const isHydrated = useHydration();

  // SSR-safe theme management: prevent hydration mismatch
  const [clientTheme, setClientTheme] = useState<ThemeName>(config.theme || "light");

  // Server + hydration: use config theme. Post-hydration: use client theme (from localStorage)
  const themeName = isHydrated ? clientTheme : (config.theme || "light");
  const currentTheme = themes[themeName];

  // Load stored theme after hydration to prevent SSR mismatch
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem("stoop-theme") as ThemeName;

      if (storedTheme && themes[storedTheme]) {
        setClientTheme(storedTheme);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const toggleTheme = (): void => {
    const newTheme = clientTheme === "light" ? "dark" : "light";

    setClientTheme(newTheme);

    // Persist to localStorage
    try {
      localStorage.setItem("stoop-theme", newTheme);
    } catch {
      // Ignore storage errors
    }
  };

  const setTheme = (theme: ThemeName): void => {
    setClientTheme(theme);

    // Persist to localStorage
    try {
      localStorage.setItem("stoop-theme", theme);
    } catch {
      // Ignore storage errors
    }
  };

  const contextValue: StoopContextValue = {
    ...config,
    currentTheme,
    isHydrated,
    setTheme,
    themeName,
    toggleTheme,
  };

  // Inject critical CSS immediately on client-side
  useEffect(() => {
    if (config.injectCriticalCSS !== false) {
      injectCriticalCSS();
    }
  }, [config.injectCriticalCSS]);

  useEffect(() => {
    // Only inject full styles after hydration to prevent layout shift
    if (isHydrated && config.injectGlobalStyles !== false) {
      injectGlobalStyles(currentTheme);
    }

    // Inject custom CSS if provided
    if (isHydrated && config.customCSS) {
      const style = document.createElement("style");

      style.id = "stoop-custom-styles";
      style.textContent = config.customCSS;
      document.head.appendChild(style);

      // Cleanup function
      return (): void => {
        const existingStyle = document.getElementById("stoop-custom-styles");

        if (existingStyle) {
          existingStyle.remove();
        }
      };
    }
  }, [config.injectGlobalStyles, config.customCSS, currentTheme, isHydrated]);

  // Add theme class to document body for CSS targeting
  useEffect(() => {
    if (isHydrated) {
      document.body.setAttribute("data-theme", themeName);

      // Remove loading class once styled
      document.body.classList.remove("stoop-loading");
      document.body.classList.add("stoop-ready");

      return (): void => {
        document.body.removeAttribute("data-theme");
        document.body.classList.remove("stoop-ready");
      };
    }
  }, [themeName, isHydrated]);

  // Optionally show loading state during hydration
  if (config.showLoadingState && !isHydrated) {
    return (
      <div className="stoop-loading" style={{
        alignItems: 'center',
        backgroundColor: 'white',
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        left: 0,
        position: 'fixed',
        right: 0,
        top: 0,
        zIndex: 9999
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  return <StoopContext.Provider value={contextValue}>{children}</StoopContext.Provider>;
}

/**
 * Hook to access Stoop UI configuration
 */
export function useStoopConfig(): StoopContextValue {
  const context = useContext(StoopContext);

  if (!context) {
    throw new Error("useStoopConfig must be used within a StoopProvider");
  }

  return context;
}

/**
 * Hook to access current theme and theme controls
 */
export function useTheme(): {
  theme: Theme;
  themeName: ThemeName;
  toggleTheme: () => void;
  setTheme: (theme: ThemeName) => void;
} {
  const context = useContext(StoopContext);

  if (!context) {
    throw new Error("useTheme must be used within a StoopProvider");
  }

  return {
    setTheme: context.setTheme,
    theme: context.currentTheme,
    themeName: context.themeName,
    toggleTheme: context.toggleTheme,
  };
}

// Export the context for advanced use cases
export { StoopContext };
