'use client';

import React, { type ReactNode, type JSX, type CSSProperties } from "react";
import { usePhone } from "@/hooks";
import { useCSS } from "@/hooks/useCSS";
import styles from "./Block.module.css";

interface BlockProps {
  align?: CSSProperties["alignItems"];
  as?: "div" | "main" | "section" | "article" | "aside" | "header" | "footer" | "nav";
  bottom?: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode | JSX.Element;
  className?: string;
  collapse?: number;
  css?: CSSProperties;
  direction?: "row" | "column";
  gap?: 1 | 2 | 3 | 4 | 5 | 6;
  justify?: CSSProperties["justifyContent"];
  minimal?: boolean;
  onClick?: () => void;
  textAlign?: CSSProperties["textAlign"];
  top?: 1 | 2 | 3 | 4 | 5 | 6;
  width?: number;
  wrap?: boolean;
}

export function Block({ 
  align,
  as = "div",
  bottom,
  children,
  className,
  collapse,
  css,
  direction,
  gap,
  justify,
  minimal = false,
  onClick,
  textAlign,
  top,
  width,
  wrap
}: BlockProps): JSX.Element {
  // Use the phone hook to determine if we're on a phone
  const isPhone = usePhone();

  // Build className
  const classNames = [
    styles.block,
    direction === "row" && styles.row,
    direction === "column" && styles.column,
    wrap && styles.wrap,
    minimal && styles.minimal,
    as === "main" && styles.main,
    className
  ].filter(Boolean).join(" ");

  // Build styles using useCSS
  const combinedStyles = useCSS({
    ...(gap && { gap: `var(--space-${gap})` }),
    ...(top && { marginTop: `var(--space-${top})` }),
    ...(bottom && { marginBottom: `var(--space-${bottom})` }),
    ...(textAlign && { textAlign }),
    ...(align && { alignItems: align }),
    ...(justify && { justifyContent: justify }),
    ...(direction === "column" && width && {
      width: (isPhone && collapse) ? `${collapse}%` : `${width}%`
    }),
    ...css
  });

  // Create the element with the appropriate tag
  const Element = as as keyof JSX.IntrinsicElements;

  return (
    <Element 
      className={classNames} 
      style={combinedStyles}
      onClick={onClick}
    >
      {children}
    </Element>
  );
} 