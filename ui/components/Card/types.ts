import type { ComponentPropsWithoutRef, JSX } from "react";

import type { CSSObject } from "../../styles/types";

export interface CardProps extends ComponentPropsWithoutRef<"div"> {
  /** HTML element to render as */
  as?: keyof JSX.IntrinsicElements;
  /** Custom CSS styles */
  css?: CSSObject;
}
