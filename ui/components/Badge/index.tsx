import type { JSX } from "react";

import type { BadgeProps } from "./types";

import { spacing } from "../../styles/theme";
import { BadgeStyled } from "./styles";

/**
 * Badge - Display component for labels, status, and categories
 *
 * Solid color design with dark background and light text
 * Can be clickable with hover states
 *
 * Examples:
 * <Badge>New</Badge>
 * <Badge clickable>Interactive</Badge>
 */
export function Badge({ bottom, clickable = false, css, top, variant = "default", ...props }: BadgeProps): JSX.Element {
  // Apply spacing styles
  const spacingStyles = {
    ...(top && { marginTop: spacing[top] }),
    ...(bottom && { marginBottom: spacing[bottom] }),
  };

  return <BadgeStyled clickable={clickable} css={{ ...spacingStyles, ...css }} variant={variant} {...props} />;
}
