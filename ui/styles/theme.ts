// Stoop UI Theme - Design tokens and theming system

// Light theme colors - Medusa-inspired minimalist palette
const lightColors = {
  background: "#FFFFFF",
  border: "#E5E7EB",
  brand: "rgb(255, 140, 0)",
  fill: "#FFFFFF",
  hover: "#F3F4F6",
  overlay: "rgba(0, 0, 0, 0.5)",
  selected: "#F3F4F6",
  surface: "#F9FAFB",
  text: "#111827",
} as const;

// Dark theme colors
const darkColors = {
  ...lightColors,

} as const;

// Default export for backwards compatibility (light theme)
export const colors = lightColors;

export const breakpoints = {
  large: "1200px", // desktop
  medium: "1024px", // tablet
  small: "768px", // mobile
} as const;

export const spacing = {
  huge: "64px",
  large: "32px",
  larger: "48px",
  massive: "96px",
  medium: "20px",
  small: "12px",
  smaller: "8px",
} as const;

// Font stacks - integrating our custom fonts
export const fonts = {
  default: "'Standard Book', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
  heading: "'Standard Bold', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
} as const;

// Font sizes - responsive using clamp for better scaling
export const fontSizes = {
  h1: "clamp(2rem, 1.75rem + 1vw, 3rem)", // 32-48px
  h2: "clamp(1.75rem, 1.5rem + 0.75vw, 2.5rem)", // 28-40px
  h3: "clamp(1.5rem, 1.25rem + 0.75vw, 2rem)", // 24-32px
  h4: "clamp(1.25rem, 1.125rem + 0.5vw, 1.5rem)", // 20-24px
  h5: "clamp(1.125rem, 1rem + 0.5vw, 1.25rem)", // 18-20px
  h6: "clamp(1rem, 0.9375rem + 0.25vw, 1.125rem)", // 16-18px
  p: "clamp(0.9375rem, 0.875rem + 0.25vw, 1rem)", // 15-16px
  small: "clamp(0.8125rem, 0.75rem + 0.25vw, 0.875rem)", // 13-14px
} as const;

// Line heights
export const lineHeights = {
  default: "1.4",
  relaxed: "1.6",
  small: "1.2",
} as const;

// Font weights and other typography utilities
export const typography = {
  bold: "700",
  medium: "500",
  normalWeight: "400",
  semibold: "600",
} as const;

// Transitions - simple and consistent
export const transitions = {
  default: "all 0.2s ease",
  fast: "all 0.15s ease",
} as const;

// Opacities - for muted states and overlays
export const opacities = {
  disabled: "0.5",
  muted: "0.7",
} as const;

// Z-indices - layering system
export const zIndices = {
  base: 1,
  dropdown: 10,
  modal: 40,
  popover: 30,
  toast: 50,
  tooltip: 20,
} as const;

export const borderRadius = {
  default: "8px", // standard radius for all components
  large: "12px", // for larger components like modals
} as const;

// Box shadows - simple elevation system
export const shadows = {
  none: "none",
  subtle: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
} as const;

// Media query helpers
export const media = {
  large: `@media (min-width: ${breakpoints.medium})`,
  medium: `@media (min-width: ${breakpoints.small}) and (max-width: ${breakpoints.medium})`,
  small: `@media (max-width: ${breakpoints.small})`,
} as const;

// Theme definitions
export const lightTheme = {
  borderRadius,
  breakpoints,
  colors: lightColors,
  fonts,
  fontSizes,
  lineHeights,
  media,
  opacities,
  shadows,
  spacing,
  transitions,
  typography,
  zIndices,
} as const;

export const darkTheme = {
  borderRadius,
  breakpoints,
  colors: darkColors,
  fonts,
  fontSizes,
  lineHeights,
  media,
  opacities,
  shadows,
  spacing,
  transitions,
  typography,
  zIndices,
} as const;

export const themes = {
  dark: darkTheme,
  light: lightTheme,
} as const;

// Type exports for TypeScript
export type ColorToken = keyof typeof colors;
export type SpacingToken = keyof typeof spacing;
export type BorderRadiusToken = keyof typeof borderRadius;
export type BreakpointToken = keyof typeof breakpoints;
export type FontSizeToken = keyof typeof fontSizes;
export type LineHeightToken = keyof typeof lineHeights;
export type TypographyToken = keyof typeof typography;
export type FontToken = keyof typeof fonts;
export type TransitionToken = keyof typeof transitions;
export type OpacityToken = keyof typeof opacities;
export type ZIndexToken = keyof typeof zIndices;
export type ShadowToken = keyof typeof shadows;

// Theme token generator - returns theme paths as strings for the compiler to resolve
function createThemeTokens<T extends Record<string, unknown>>(category: string, tokens: T): T {
  const result = {} as T;

  for (const key in tokens) {
    // Return theme path strings instead of actual values
    (result as T)[key] = `theme.${category}.${key}` as T[Extract<keyof T, string>];
  }

  return result;
}

// Export theme object with token strings
export const theme = {
  borderRadius,
  breakpoints,
  colors: createThemeTokens("colors", lightColors),
  fonts,
  fontSizes,
  lineHeights,
  media,
  opacities,
  shadows,
  spacing: createThemeTokens("spacing", spacing),
  transitions,
  // Static exports for non-themeable tokens
  typography,
  zIndices,
};
