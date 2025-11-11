import type { JSX } from "react";

import type { TextProps } from "./types";

import { TextStyled } from "./styles";

/**
 * Text - Typography component
 *
 * Provides consistent typography with semantic HTML elements
 * Typography handled via css prop for flexibility
 *
 * Examples:
 * <Text as="h1">Page Title</Text>
 * <Text as="p" css={{ fontSize: "1rem", opacity: 0.7 }}>Subtitle</Text>
 */
export function Text({
  as = "p",
  children,
  css,
  ...props
}: TextProps): JSX.Element {
  return (
    <TextStyled
      as={as}
      css={css}
      {...props}>
      {children}
    </TextStyled>
  );
}
