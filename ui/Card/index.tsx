import React, { type ReactNode, type JSX, type CSSProperties } from "react";
import Image from "next/image";
import { useCSS, type CSS } from "@/hooks/useCSS";
import { Typography } from "@/ui";
import styles from "./Card.module.css";

interface CardImage {
  url: string;
  alt: string;
  width?: number | string;
  height?: number | string;
}

interface CardProps {
  border?: boolean;
  children: ReactNode;
  className?: string;
  header?: string;
  hover?: boolean;
  onClick?: () => void;
  small?: boolean;
  shadow?: boolean;
  css?: CSS;
  fill?: boolean;
  image?: CardImage;
}

export function Card({ 
  border = false,
  children,
  className,
  header,
  hover = false,
  onClick,
  small = false,
  shadow = false,
  css,
  fill = false,
  image
}: CardProps): JSX.Element {
  // Build className based on props
  const classNames = [
    styles.card,
    fill && styles.fill,
    border && styles.border,
    shadow && styles.shadow,
    hover && styles.hover,
    small && styles.small,
    className
  ].filter(Boolean).join(" ");

  // Process CSS using useCSS
  const combinedStyles = useCSS(css || {});

  return (
    <div
      className={classNames}
      style={{ ...combinedStyles }}
      onClick={onClick}
    >
      {image && (
        <div style={{ width: "100%", position: "relative", height: image.height || 250 }}>
          <Image
            src={image.url}
            alt={image.alt}
            fill
            priority
            style={{ objectFit: "cover", opacity: 0.7 }}
          />
        </div>
      )}
      {header && (
        <div className={styles.cardHeader}>
          <Typography as="h2">{header}</Typography>
        </div>
      )}
      <div className={styles.cardContent}>
        {children}
      </div>
    </div>
  );
} 