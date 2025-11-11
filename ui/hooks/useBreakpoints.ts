import { useState, useEffect } from "react";

import { breakpoints } from "../styles/theme";

export type BreakpointSize = "small" | "medium" | "large";

// Convert breakpoint values to numbers for comparison
const breakpointValues = {
  large: parseInt(breakpoints.large), // 1200
  medium: parseInt(breakpoints.medium), // 1024
  small: parseInt(breakpoints.small), // 768
};

/**
 * Get the current breakpoint based on window width
 */
function getCurrentBreakpoint(width: number): BreakpointSize {
  if (width < breakpointValues.small) {
    return "small";
  } else if (width < breakpointValues.medium) {
    return "medium";
  } else {
    return "large";
  }
}

/**
 * Single hook to handle all breakpoint functionality
 * Returns: current state + helper methods for all breakpoint checks
 */
export function useBreakpoints(): {
  current: BreakpointSize;
  down: (size: BreakpointSize) => boolean;
  is: (size: BreakpointSize) => boolean;
  isLarge: boolean;
  isMedium: boolean;
  isSmall: boolean;
  up: (size: BreakpointSize) => boolean;
} {
  // Initialize with 'large' to avoid SSR mismatch
  const [current, setCurrent] = useState<BreakpointSize>("large");

  useEffect(() => {
    // Set initial breakpoint
    const updateBreakpoint = (): void => {
      if (typeof window !== "undefined") {
        const newBreakpoint = getCurrentBreakpoint(window.innerWidth);

        setCurrent(newBreakpoint);
      }
    };

    // Set initial value
    updateBreakpoint();

    // Listen for window resize
    window.addEventListener("resize", updateBreakpoint);

    return (): void => {
      window.removeEventListener("resize", updateBreakpoint);
    };
  }, []);

  // Helper methods that use the current state
  const is = (size: BreakpointSize): boolean => current === size;

  const up = (size: BreakpointSize): boolean => {
    const currentValue = breakpointValues[current];
    const targetValue = breakpointValues[size];

    return currentValue >= targetValue;
  };

  const down = (size: BreakpointSize): boolean => {
    const currentValue = breakpointValues[current];
    const targetValue = breakpointValues[size];

    return currentValue < targetValue;
  };

  return {
    // Current state
    current,
    down, // breakpoints.down('large')
    // Helper methods
    is, // breakpoints.is('small')
    isLarge: current === "large",

    isMedium: current === "medium",
    isSmall: current === "small",
    up, // breakpoints.up('medium')
  };
}
