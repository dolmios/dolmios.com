// Critical CSS that should be loaded immediately to prevent layout shift
// This includes essential typography, resets, and base component styles

/**
 * Minimal critical CSS that prevents layout shift during hydration
 * This should be injected server-side or as early as possible
 */
export const criticalCSS = `
  /* CSS Reset to prevent layout shift */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Base typography to prevent text reflow */
  html {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    font-size: 1rem;
    line-height: 1.4;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: inherit;
    line-height: inherit;
    text-rendering: optimizeLegibility;
    overflow-x: hidden;
  }

  /* Essential button reset to prevent layout shift */
  button {
    background: none;
    border: none;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    cursor: pointer;
  }

  /* Essential input reset */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    border: none;
    outline: none;
    background: none;
  }

  /* Remove default list styles */
  ul, ol {
    list-style: none;
  }

  /* Remove default link styles */
  a {
    color: inherit;
    text-decoration: none;
  }

  /* Prevent invisible text during font load */
  .font-loading {
    font-display: swap;
  }

  /* Hide content until styled to prevent layout shift */
  .stoop-loading {
    visibility: hidden;
  }

  .stoop-ready {
    visibility: visible;
  }
`;

/**
 * Inject critical CSS immediately - can be called server-side
 */
export function injectCriticalCSS(): void {
  if (typeof document === "undefined") return;

  // Check if already injected
  if (document.getElementById("stoop-critical-styles")) return;

  const style = document.createElement("style");

  style.id = "stoop-critical-styles";
  style.textContent = criticalCSS;
  
  // Insert at the beginning of head for highest priority
  const {head} = document;

  head.insertBefore(style, head.firstChild);
}

/**
 * Server-side critical CSS extraction for Next.js
 * Use this in _document.tsx or app.tsx
 */
export function getCriticalCSS(): string {
  return criticalCSS;
}
