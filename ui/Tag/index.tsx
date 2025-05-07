import React, { type ReactNode, type JSX, type CSSProperties } from "react";
import { useCSS } from "@/hooks/useCSS";
import styles from "./Tag.module.css";

interface TagProps {
  as?: 'div' | 'span' | 'button';
  bold?: boolean;
  children: ReactNode;
  className?: string;
  inline?: 1 | 2 | 3 | 4 | 5;
  link?: boolean;
  minimal?: boolean;
  onClick?: () => void;
  small?: boolean;
  css?: CSSProperties;
}

export function Tag({ 
  as: Component = "span",
  bold = false,
  children,
  className,
  inline,
  link = false,
  minimal = false,
  onClick,
  small = false,
  css
}: TagProps): JSX.Element {
  // Build className based on props
  const classNames = [
    styles.tag,
    bold && styles.bold,
    minimal && styles.minimal,
    small ? styles.small : styles.default,
    link && styles.link,
    className
  ].filter(Boolean).join(" ");

  // Combine styles using useCSS
  const combinedStyles = useCSS({
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