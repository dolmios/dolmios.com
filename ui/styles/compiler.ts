import {
  ComponentPropsWithoutRef,
  ElementRef,
  JSX,
  useMemo,
  forwardRef,
  createElement,
  useContext,
  createContext,
  type Context,
} from "react";

import type { CSSObject, VariantConfig, VariantProps, StyledBaseProps, Theme } from "./types";

import { media, lightTheme } from "./theme";

// Global styles cache and utilities
const stylesCache = new Set<string>();
const EMPTY_CSS: CSSObject = Object.freeze({});

// Import the context after it's defined
let ThemeContext: Context<any> | null = null; // eslint-disable-line @typescript-eslint/no-explicit-any

// Dynamic import to avoid circular dependency
function getThemeContext(): Context<any> | null { // eslint-disable-line @typescript-eslint/no-explicit-any
  if (!ThemeContext) {
    try {
      // Lazy import the provider context
      const provider = require("../components/Provider/StoopProvider");

      ThemeContext = provider.StoopContext;

      return ThemeContext;
    } catch {
      // Fallback if provider is not available
      return null;
    }
  }

  return ThemeContext;
}

// Valid HTML elements for styling
type HTMLElements = keyof JSX.IntrinsicElements;

// Simple hash function to generate unique class names
function hash(str: string): string {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);

    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  return Math.abs(hash).toString(36);
}

// Convert camelCase to kebab-case for CSS properties
function toKebabCase(str: string): string {
  return str.replace(/([A-Z])/g, "-$1").toLowerCase();
}

/**
 * Resolve a single theme token to its actual value
 * Supports multiple syntaxes:
 * - "theme.colors.background" -> currentTheme.colors.background
 * - "$colors.background" -> currentTheme.colors.background
 * - "$background" -> currentTheme.colors.background (shorthand)
 * - "$medium" -> currentTheme.spacing.medium (shorthand)
 */
function resolveSingleToken(token: string, currentTheme: Theme): string {
  // Handle theme.category.token syntax
  if (token.startsWith("theme.")) {
    if (token.startsWith("theme.colors.")) {
      const colorKey = token.replace("theme.colors.", "") as keyof Theme["colors"];

      return currentTheme.colors[colorKey] || token;
    }

    if (token.startsWith("theme.spacing.")) {
      const spacingKey = token.replace("theme.spacing.", "") as keyof Theme["spacing"];

      return currentTheme.spacing[spacingKey] || token;
    }

    if (token.startsWith("theme.borderRadius.")) {
      const borderRadiusKey = token.replace("theme.borderRadius.", "") as keyof Theme["borderRadius"];

      return currentTheme.borderRadius[borderRadiusKey] || token;
    }

    return token;
  }

  // Handle $category.token syntax
  if (token.startsWith("$")) {
    const tokenName = token.slice(1); // Remove $

    if (tokenName.startsWith("colors.")) {
      const colorKey = tokenName.replace("colors.", "") as keyof Theme["colors"];

      return currentTheme.colors[colorKey] || token;
    }

    if (tokenName.startsWith("spacing.")) {
      const spacingKey = tokenName.replace("spacing.", "") as keyof Theme["spacing"];

      return currentTheme.spacing[spacingKey] || token;
    }

    if (tokenName.startsWith("zIndices.")) {
      const zIndexKey = tokenName.replace("zIndices.", "") as keyof Theme["zIndices"];

      return currentTheme.zIndices[zIndexKey]?.toString() || token;
    }

    // Handle shorthand tokens - check colors first, then spacing, then borderRadius, then zIndices
    if (tokenName in currentTheme.colors) {
      return currentTheme.colors[tokenName as keyof Theme["colors"]];
    }

    if (tokenName in currentTheme.spacing) {
      return currentTheme.spacing[tokenName as keyof Theme["spacing"]];
    }

    if (tokenName in currentTheme.borderRadius) {
      return currentTheme.borderRadius[tokenName as keyof Theme["borderRadius"]];
    }

    if (tokenName in currentTheme.zIndices) {
      return currentTheme.zIndices[tokenName as keyof Theme["zIndices"]].toString();
    }
  }

  return token;
}

/**
 * Resolve theme tokens to actual values - handles multiple tokens in one string
 * Supports compound values like "$small $medium" or "1px solid $border"
 * Uses regex to find and replace all tokens within the string
 */
function resolveThemeValue(themeRef: string, currentTheme: Theme): string {
  // Handle simple cases where the entire string is one token
  if (!themeRef.includes(" ") && (themeRef.startsWith("theme.") || themeRef.startsWith("$"))) {
    return resolveSingleToken(themeRef, currentTheme);
  }

  // Handle compound strings with multiple tokens
  // Find all $token patterns and theme.category.token patterns
  return themeRef.replace(
    /(\$[a-zA-Z][a-zA-Z0-9]*(?:\.[a-zA-Z][a-zA-Z0-9]*)?|theme\.[a-zA-Z][a-zA-Z0-9]*\.[a-zA-Z][a-zA-Z0-9]*)/g,
    (match) => {
      return resolveSingleToken(match, currentTheme);
    },
  );
}

/**
 * Replace theme references with actual theme values
 * Supports both theme.colors.background and $colors.background syntax
 * This is where the magic happens - we detect theme tokens and replace with actual values
 */
function replaceThemeTokens(obj: CSSObject, currentTheme: Theme): CSSObject {
  if (!obj || typeof obj !== "object") {
    return obj;
  }

  const result: CSSObject = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === "object" && value !== null) {
      // Recursively process nested objects (media queries, pseudo-classes, etc.)
      result[key] = replaceThemeTokens(value, currentTheme);
    } else if (typeof value === "string" && (value.includes("theme.") || value.includes("$"))) {
      // Replace theme token references
      // Supports: "theme.colors.background", "$colors.background", "$background"
      result[key] = resolveThemeValue(value, currentTheme);
    } else {
      result[key] = value;
    }
  });

  return result;
}

// Convert CSS object to CSS string with proper nesting support
function cssObjectToString(obj: CSSObject, selector = "", depth = 0): string {
  // Prevent infinite recursion
  if (depth > 10) {
     
    console.warn("CSS nesting depth exceeded 10 levels - possible circular reference");

    return "";
  }

  let css = "";
  let nestedRules = "";

  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === "object" && value !== null) {
      // Handle direct breakpoint support (small, medium, large)
      if (key === "small" || key === "medium" || key === "large") {
        const mediaQuery = media[key as keyof typeof media];
        const nestedCss = cssObjectToString(value, selector, depth + 1);

        nestedRules += `${mediaQuery} { ${nestedCss} }`;
      }
      // Handle @ rules (media queries, keyframes, etc.)
      else if (key.startsWith("@")) {
        const nestedCss = cssObjectToString(value, selector, depth + 1);

        nestedRules += `${key} { ${nestedCss} }`;
      }
      // Handle & selector replacement (pseudo-classes, descendant selectors)
      else if (key.includes("&")) {
        const nestedSelector = key.replace(/&/g, selector);
        const nestedCss = cssObjectToString(value, nestedSelector, depth + 1);

        nestedRules += nestedCss;
      }
      // Handle pseudo-classes starting with : (backward compatibility)
      else if (key.startsWith(":")) {
        const nestedSelector = `${selector}${key}`;
        const nestedCss = cssObjectToString(value, nestedSelector, depth + 1);

        nestedRules += nestedCss;
      }
      // Handle descendant selectors (space-separated)
      else if (key.includes(" ") || key.includes(">") || key.includes("+") || key.includes("~")) {
        const nestedSelector = `${selector} ${key}`;
        const nestedCss = cssObjectToString(value, nestedSelector, depth + 1);

        nestedRules += nestedCss;
      }
    } else if (value !== undefined) {
      // Regular CSS property
      const property = toKebabCase(key);

      css += `${property}: ${value}; `;
    }
  });

  const rule = css ? `${selector} { ${css}}` : "";

  return rule + nestedRules;
}

// Inject CSS into document head
function injectCSS(css: string): void {
  if (typeof document === "undefined" || stylesCache.has(css)) {
    return;
  }

  stylesCache.add(css);

  const style = document.createElement("style");

  style.textContent = css;
  document.head.appendChild(style);
}

/**
 * Compile CSS object to class name with caching and injection
 * Usage: const className = css({ color: 'red', fontSize: '14px' })
 */
export function css(styles: CSSObject): string {
  const cssString = cssObjectToString(styles);
  const className = `css-${hash(cssString)}`;
  const fullCSS = cssObjectToString(styles, `.${className}`, 0);

  injectCSS(fullCSS);

  return className;
}

/**
 * Apply variant logic and return CSS class name
 * Internal function used by styled components
 */
function applyVariants(
  variants: VariantConfig,
  props: VariantProps,
  baseStyles: CSSObject = EMPTY_CSS,
): string {
  // Start with base styles
  let mergedStyles: CSSObject = { ...baseStyles };

  // Apply variant styles based on props
  Object.entries(variants).forEach(([variantName, variantOptions]) => {
    const propValue = props[variantName];

    if (propValue && typeof propValue === "string" && variantOptions[propValue]) {
      mergedStyles = {
        ...mergedStyles,
        ...variantOptions[propValue],
      };
    } else if (propValue === true && variantOptions.true) {
      // Handle boolean variants
      mergedStyles = {
        ...mergedStyles,
        ...variantOptions.true,
      };
    } else if (propValue === false && variantOptions.false) {
      mergedStyles = {
        ...mergedStyles,
        ...variantOptions.false,
      };
    }
  });

  return css(mergedStyles);
}

// Extract variant prop names from variant config
type VariantKeys<T extends VariantConfig> = keyof T;

// Generate variant props type from variant config
type VariantPropsFromConfig<T extends VariantConfig> = {
  [K in VariantKeys<T>]?: keyof T[K] | boolean;
};

/**
 * Creates a styled component with polymorphic "as" prop support and variants
 *
 * Usage:
 *   const MyButton = styled('button', { padding: '12px' }, {
 *     variant: { primary: { color: 'blue' }, secondary: { color: 'gray' } }
 *   })
 *   <MyButton variant="primary" as="a" href="/link">Renders as anchor</MyButton>
 */
export function styled<DefaultElement extends HTMLElements, Variants extends VariantConfig = {}>(
  defaultElement: DefaultElement,
  baseStyles: CSSObject = EMPTY_CSS,
  variants?: Variants,
): ReturnType<
  typeof forwardRef<
    ElementRef<DefaultElement>,
    ComponentPropsWithoutRef<DefaultElement> &
      StyledBaseProps &
      (Variants extends {} ? VariantPropsFromConfig<Variants> : {})
  >
> {
  type Props = ComponentPropsWithoutRef<DefaultElement> &
    StyledBaseProps &
    (Variants extends {} ? VariantPropsFromConfig<Variants> : {});

  return forwardRef<ElementRef<DefaultElement>, Props>(function StyledComponent(
    { as, className, css: cssStyles, ...props },
    ref,
  ) {
    // Use the "as" prop or fall back to the default element
    const element = (as || defaultElement) as DefaultElement;

    // Ensure css is always a valid CSSObject
    const cssObject: CSSObject = cssStyles && typeof cssStyles === "object" ? cssStyles : EMPTY_CSS;

    // Always call compilation functions - separate variant props from element props
    const variantProps: VariantProps = {};
    const elementProps: Record<string, unknown> = {};

    if (variants) {
      Object.entries(props).forEach(([key, value]) => {
        if (key in variants) {
          variantProps[key] = value as string | boolean | undefined;
        } else {
          elementProps[key] = value;
        }
      });
    } else {
      Object.assign(elementProps, props);
    }

    // Get current theme from context
    const themeContext = getThemeContext();
    const contextValue = useContext(themeContext || createContext(null));
    const currentTheme = contextValue?.currentTheme || lightTheme;

    // Generate styles using React hooks for caching with theme awareness
    const variantClass = useMemo(() => {
      const themedBaseStyles = replaceThemeTokens(baseStyles, currentTheme);
      const themedVariants = variants
        ? Object.fromEntries(
            Object.entries(variants).map(([key, variantOptions]) => [
              key,
              Object.fromEntries(
                Object.entries(variantOptions).map(([optionKey, optionValue]) => [
                  optionKey,
                  replaceThemeTokens(optionValue, currentTheme),
                ]),
              ),
            ]),
          )
        : undefined;

      return themedVariants
        ? applyVariants(themedVariants, variantProps, themedBaseStyles)
        : css(themedBaseStyles);
    }, [variants, variantProps, baseStyles, currentTheme]);

    const cssClass = useMemo(() => {
      if (cssObject !== EMPTY_CSS) {
        const themedCssObject = replaceThemeTokens(cssObject, currentTheme);

        return css(themedCssObject);
      }

      return "";
    }, [cssObject, currentTheme]);

    // Combine class names
    const finalClassName =
      [variantClass, cssClass, className].filter(Boolean).join(" ") || undefined;

    return createElement(element, {
      ...elementProps,
      className: finalClassName,
      ref,
    });
  });
}

// Enhanced polymorphic component type
export type StyledComponent<T extends HTMLElements> = ReturnType<typeof styled<T>>;

// Polymorphic component props helper for building components
export type PolymorphicComponentProps<T extends HTMLElements> = ComponentPropsWithoutRef<T> &
  StyledBaseProps;
