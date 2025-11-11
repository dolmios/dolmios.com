import type { ComponentPropsWithoutRef, ElementType } from "react";

import type { CSSObject } from "../../styles/types";

/**
 * Section component props - page layout wrapper
 */
export interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  /** Override the HTML element */
  as?: ElementType;

  /** Custom CSS */
  css?: CSSObject;
}
