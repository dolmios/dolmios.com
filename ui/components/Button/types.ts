import type { ComponentPropsWithoutRef } from "react";

import type { CSSObject, StyledBaseProps } from "../../styles/types";

/**
 * Button component props
 */
export interface ButtonProps extends ComponentPropsWithoutRef<"button">, StyledBaseProps {
  /** Button variant */
  variant?: "primary" | "secondary" | "minimal";
  /** Button size */
  size?: "normal" | "small";
  /** Custom CSS styles */
  css?: CSSObject;
  /** href prop for when using as="a" */
  href?: string;
  /** target prop for when using as="a" */
  target?: string;
  /** rel prop for when using as="a" */
  rel?: string;
}
