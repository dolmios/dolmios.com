import type { Theme } from "../../styles/types";

import { lightTheme } from "../../styles/theme";

/**
 * Generate global CSS styles based on current theme
 */
export function createGlobalStyles(theme: Theme = lightTheme): string {
  const { colors, fonts, fontSizes, lineHeights, transitions, typography } = theme;

  return `
    /* Custom font loading */
    @font-face {
      font-family: 'Standard Book';
      src: url('./fonts/standard-book.woff2') format('woff2');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'Standard Bold';
      src: url('./fonts/standard-bold.woff2') format('woff2');
      font-weight: 700;
      font-style: normal;
      font-display: swap;
    }

    /* CSS Reset */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    /* Base HTML styles with design tokens */
    html {
      font-family: ${fonts.default};
      font-size: ${fontSizes.p};
      line-height: ${lineHeights.default};
      -webkit-text-size-adjust: 100%;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      scroll-behavior: smooth;
    }

    body {
      color: ${colors.text};
      background-color: ${colors.background};
      font-family: ${fonts.default};
      line-height: ${lineHeights.default};
      text-rendering: optimizeLegibility;
      overflow-x: hidden;
      transition: background-color 0.2s ease, color 0.2s ease;
      min-height: 100vh;
    }

    /* Remove default button styles - inherit font from design system */
    button {
      background: none;
      border: none;
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
      cursor: pointer;
      transition: ${transitions.default};
    }

    /* Remove default input styles - inherit font from design system */
    input, textarea, select {
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
      border: none;
      outline: none;
      background: none;
      transition: ${transitions.default};
    }

    /* Remove default list styles */
    ul, ol {
      list-style: none;
    }

    /* Remove default link styles */
    a {
      color: inherit;
      text-decoration: none;
      transition: ${transitions.default};
    }

    /* Consistent focus styles across all interactive elements */
    *:focus-visible {
      outline: 2px solid ${colors.brand};
      outline-offset: 2px;
    }

    /* Brand selection styles */
    ::selection {
      background-color: ${colors.brand};
      color: ${colors.fill};
    }

    /* Scrollbar styles (webkit) */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    ::-webkit-scrollbar-track {
      background: ${colors.surface};
    }

    ::-webkit-scrollbar-thumb {
      background: ${colors.border};
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: ${colors.text};
    }

    /* Base typography scale using design tokens - all sizes inherit from design system */
    h1, h2, h3, h4, h5, h6 {
      font-family: ${fonts.heading};
      font-weight: ${typography.bold};
      line-height: ${lineHeights.small};
      margin: 0; /* Reset margins - components handle their own spacing */
    }

    h1 { font-size: ${fontSizes.h1}; }
    h2 { font-size: ${fontSizes.h2}; }
    h3 { font-size: ${fontSizes.h3}; }
    h4 { font-size: ${fontSizes.h4}; }
    h5 { font-size: ${fontSizes.h5}; }
    h6 { font-size: ${fontSizes.h6}; }

    p {
      font-family: ${fonts.default};
      font-size: ${fontSizes.p};
      line-height: ${lineHeights.relaxed};
      margin: 0; /* Reset margins - components handle their own spacing */
    }

    small {
      font-size: ${fontSizes.small};
      line-height: ${lineHeights.default};
    }

    strong {
      font-family: ${fonts.heading};
      font-weight: ${typography.bold};
    }

    /* Utility classes */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `;
}

/**
 * Inject global styles into the document head with theme support
 * Automatically removes previous styles when theme changes
 */
export function injectGlobalStyles(theme: Theme = lightTheme): void {
  if (typeof document === "undefined") return;

  // Remove existing styles
  const existingStyle = document.getElementById("stoop-global-styles");

  if (existingStyle) {
    existingStyle.remove();
  }

  // Inject new theme-aware styles
  const style = document.createElement("style");

  style.id = "stoop-global-styles";
  style.textContent = createGlobalStyles(theme);
  document.head.appendChild(style);
}
