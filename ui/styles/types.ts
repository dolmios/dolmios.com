// Core styling system types
import type { ComponentPropsWithoutRef, ElementType, JSX } from "react";

import { styled } from "./compiler";

// CSS properties and values
export type CSSPropertyValue = string | number;

// Responsive/nested CSS object
export interface CSSObject {
  // Regular CSS properties
  [property: string]: CSSPropertyValue | CSSObject | undefined;

  // Direct breakpoint support
  small?: CSSObject;
  medium?: CSSObject;
  large?: CSSObject;
}

// Variant configuration
export interface VariantConfig {
  [variantName: string]: {
    [variantValue: string]: CSSObject;
  };
}

// Props for variant selection
export interface VariantProps {
  [variantName: string]: string | boolean | undefined;
}

// Valid HTML elements for styling
type HTMLElements = keyof JSX.IntrinsicElements;

// Base props that all styled components accept
export interface StyledBaseProps {
  /** Custom CSS styles */
  css?: CSSObject;
  /** Override the underlying HTML element */
  as?: ElementType;
}

// Enhanced polymorphic component type
export type StyledComponent = ReturnType<typeof styled>;

// Polymorphic component props helper for building components
export type PolymorphicComponentProps<T extends HTMLElements> = ComponentPropsWithoutRef<T> &
  StyledBaseProps;

// Design token types
export type ColorToken = keyof typeof import("./theme").colors;
export type SpacingToken = keyof typeof import("./theme").spacing;
export type BorderRadiusToken = keyof typeof import("./theme").borderRadius;
export type BreakpointToken = keyof typeof import("./theme").breakpoints;
export type TypographyToken = keyof typeof import("./theme").typography;
export type FontToken = keyof typeof import("./theme").fonts;
export type TransitionToken = keyof typeof import("./theme").transitions;
export type OpacityToken = keyof typeof import("./theme").opacities;
export type ZIndexToken = keyof typeof import("./theme").zIndices;

// Theme types
export type ThemeName = "light" | "dark";
export type Theme = {
  colors: {
    background: string;
    border: string;
    brand: string;
    fill: string;
    hover: string;
    overlay: string;
    selected: string;
    text: string;
  };
  spacing: typeof import("./theme").spacing;
  fontSizes: typeof import("./theme").fontSizes;
  lineHeights: typeof import("./theme").lineHeights;
  typography: typeof import("./theme").typography;
  fonts: typeof import("./theme").fonts;
  transitions: typeof import("./theme").transitions;
  opacities: typeof import("./theme").opacities;
  zIndices: typeof import("./theme").zIndices;
  borderRadius: typeof import("./theme").borderRadius;
  breakpoints: typeof import("./theme").breakpoints;
  media: typeof import("./theme").media;
  shadows: typeof import("./theme").shadows;
};
export type ThemeColors = {
  background: string;
  border: string;
  brand: string;
  fill: string;
  hover: string;
  overlay: string;
  selected: string;
  text: string;
};
