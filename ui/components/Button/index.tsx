import type { JSX } from "react";

import type { ButtonProps } from "./types";

import { ButtonStyled } from "./styles";

/**
 * Button - Interactive button component
 *
 * Minimalist rounded rectangle design with black borders
 * Supports sizing and polymorphic rendering
 *
 * Examples:
 * <Button variant="primary">Primary Action</Button>
 * <Button variant="secondary" size="small">Secondary</Button>
 * <Button as="a" href="/link">Link Button</Button>
 */
export function Button({
  as,
  children,
  css,
  disabled,
  size = "normal",
  variant = "primary",
  ...props
}: ButtonProps): JSX.Element {
  return (
    <ButtonStyled
      as={as}
      css={css}
      disabled={disabled}
      size={size}
      variant={variant}
      {...props}>
      {children}
    </ButtonStyled>
  );
}
