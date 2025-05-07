import { type CSS } from "@stitches/react";
import { type JSX } from "react";

import { styled } from "../stitches.config";

import { Grid } from "./Grid";
import { Tag } from "./Tag";

interface FooterProps {
  css?: CSS;
}

const FooterContainer = styled("footer", {
  width: "100%",
  padding: "$3 0",
  marginTop: "$5",
  borderTop: "1px solid $border",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  opacity: 0.7,
});

export function Footer({ css }: FooterProps): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer css={css}>
      <Grid css={{ display: "flex", gap: "$2" }}>
        <Tag css={{ background: 'transparent', border: 'none', boxShadow: 'none', color: '$text' }} small>© {currentYear} Jackson Dolman</Tag>
      </Grid>
    </FooterContainer>
  );
} 