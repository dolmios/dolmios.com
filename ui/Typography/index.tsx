import React, { type ReactNode, type JSX, type CSSProperties } from "react";
import { useCSS, type CSS } from "@/hooks/useCSS";
import styles from "./Typography.module.css";

export interface TypographyProps {
  align?: CSSProperties["textAlign"];
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "small" | "li" | "ul" | "ol" | "strong" | "code";
  bottom?: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
  className?: string;
  inline?: 1 | 2 | 3 | 4 | 5 | 6;
  onClick?: () => void;
  css?: CSS;
  top?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function Typography({ 
  as: Component = "p",
  children,
  className,
  inline,
  onClick,
  css,
  ...props
}: TypographyProps): JSX.Element {
  // Build the combined className
  const classNames = [
    styles.typography,
    styles[Component],
    inline && styles.inline,
    props.top && styles[`top${props.top}`],
    props.bottom && styles[`bottom${props.bottom}`],
    className
  ].filter(Boolean).join(" ");

  // Consolidate inline styles using useCSS
  const combinedStyles = useCSS({
    ...(props.align && { textAlign: props.align }),
    ...(inline && { marginRight: `$${inline}` }),
    ...css
  });

  return (
    <Component 
      className={classNames} 
      style={combinedStyles}
      onClick={onClick}
    >
      {children}
    </Component>
  );
} 