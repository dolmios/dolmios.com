import type { ComponentPropsWithoutRef, ElementType } from "react";

import type { CSSObject } from "../../styles/types";

/**
 * Text component props
 */
export interface TextProps extends ComponentPropsWithoutRef<"div"> {
  /** HTML element to render as */
  as?: ElementType;
  /** Custom CSS styles */
  css?: CSSObject;
}
