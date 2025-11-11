import { JSX } from "react";

import type { StackProps } from "./types";

import { spacing } from "../../styles/theme";
import { StackStyled } from "./styles";

/**
 * Stack - Minimalist layout component
 *
 * Handles flexbox layouts with simplified API
 * Can be used as any HTML element via 'as' prop
 *
 * Examples:
 * <Stack direction="row" gap="large" justify="between">  // Horizontal layout
 * <Stack align="center" textAlign="center">             // Vertical centered
 * <Stack as="section" direction="row">                  // Semantic HTML
 */
export function Stack({
  align,
  as = "div",
  children,
  css,
  direction = "column",
  gap,
  inline = false,
  justify,
  textAlign,
  ...props
}: StackProps): JSX.Element {
  // Build gap style
  const gapStyle = gap ? { gap: spacing[gap] } : {};

  return (
    <StackStyled
      align={align}
      as={as}
      css={{ ...gapStyle, ...css }}
      direction={direction}
      inline={inline}
      justify={justify}
      textAlign={textAlign}
      {...props}>
      {children}
    </StackStyled>
  );
}
