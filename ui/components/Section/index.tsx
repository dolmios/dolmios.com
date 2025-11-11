import type { JSX } from "react";

import type { SectionProps } from "./types";

import { SectionStyled } from "./styles";

/**
 * Section - Page layout wrapper component
 *
 * Full-width wrapper component
 *
 * Examples:
 * <Section>Full-width content</Section>
 * <Section as="main" css={{ padding: "$large" }}>Custom styled section</Section>
 */
export function Section({
  as = "section",
  children,
  css,
  ...props
}: SectionProps): JSX.Element {
  return (
    <SectionStyled as={as} css={css} {...props}>
      {children}
    </SectionStyled>
  );
}
