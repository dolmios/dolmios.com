import type { ComponentPropsWithoutRef, ElementType } from "react";

import type { SpacingToken } from "../../styles/theme";
import type { CSSObject } from "../../styles/types";

/**
 * Stack component props - minimalist layout component
 */
export interface StackProps extends ComponentPropsWithoutRef<"div"> {
  /** Override the HTML element */
  as?: ElementType;

  // Layout Direction & Display
  /** Direction of the stack */
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  /** Render as inline-flex instead of flex */
  inline?: boolean;

  // Spacing
  /** Gap between items */
  gap?: SpacingToken;

  // Flex Container Properties
  /** Alignment of items along cross-axis */
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  /** Justification along main axis */
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";

  // Text Alignment (for content inside)
  /** Text alignment */
  textAlign?: "left" | "center" | "right" | "justify";

  /** Custom CSS */
  css?: CSSObject;
}
