import { type CSSProperties } from "react";

type CSSValue = string | number;

type CSSObject = {
  [key: string]: CSSValue | CSSObject;
};

type ProcessedCSS = {
  [key: string]: string | ProcessedCSS;
};

/**
 * Type for CSS objects that can be passed to components
 * Supports $ prefixed values and nested objects
 */
export type CSS = CSSObject;

/**
 * List of CSS properties that support nesting
 */
const NESTED_PROPERTIES = [
  "animation",
  "background",
  "border",
  "boxShadow",
  "font",
  "margin",
  "padding",
  "textShadow",
  "transform",
  "transition"
];

/**
 * Converts a CSS object with $ prefixed values to use CSS custom properties
 * Example: { gap: "$4" } becomes { gap: "var(--space-4)" }
 */
function convertDollarToVar(value: CSSValue): string {
  if (typeof value === "string" && value.startsWith("$")) {
    // Remove the $ prefix and convert to CSS custom property
    const varName = value.slice(1);
    return `var(--${varName})`;
  }
  return value.toString();
}

/**
 * Processes nested CSS objects while preserving nesting for supported properties
 * Example: 
 * {
 *   "@media (max-width: 768px)": { gap: "$4" },
 *   background: { color: "$background" }
 * }
 */
function processCSSObject(obj: CSSObject): ProcessedCSS {
  const result: ProcessedCSS = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object" && value !== null) {
      if (key.startsWith("@")) {
        // For media queries, keep the nesting and process inner values
        result[key] = processCSSObject(value as CSSObject);
      } else if (NESTED_PROPERTIES.some(prop => key.startsWith(prop))) {
        // For supported nested properties, keep the nesting
        result[key] = processCSSObject(value as CSSObject);
      } else {
        // For other nested objects, flatten them
        const processed = processCSSObject(value as CSSObject);
        Object.assign(result, processed);
      }
    } else {
      // Convert $ prefixed values to CSS custom properties
      result[key] = convertDollarToVar(value as CSSValue);
    }
  }

  return result;
}

/**
 * Hook that processes CSS objects to convert $ prefixed values to CSS custom properties,
 * handles nested objects, and ensures proper TypeScript types
 */
export function useCSS(css: CSS): CSSProperties {
  return processCSSObject(css) as CSSProperties;
} 