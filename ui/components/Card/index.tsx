import type { JSX } from "react";

import type { CardProps } from "./types";

import { CardStyled } from "./styles";

/**
 * Card - Minimalist container component
 *
 * Basic container for grouping related content
 *
 * Examples:
 * <Card>Basic card content</Card>
 * <Card css={{ backgroundColor: "$surface" }}>Custom styled card</Card>
 */
export function Card({
  as = "div",
  children,
  css,
  ...props
}: CardProps): JSX.Element {
  return (
    <CardStyled
      as={as}
      css={css}
      {...props}>
      {children}
    </CardStyled>
  );
}
