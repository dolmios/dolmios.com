import { CSS, CSSProperties } from "@stitches/react";
import { ReactNode } from "react";

import { styled, theme } from "../stitches.config";

export interface TextProps {
  align?: CSSProperties["textAlign"];
  children: ReactNode;
  css?: CSS;
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "small";
  top?: keyof typeof theme.space | number;
  bottom?: keyof typeof theme.space | number;
  inline?: keyof typeof theme.space | number;
}

export const TextStyled = styled("p", {
  "&:last-child": {
    marginBottom: 0,
  },
});

export function Text({ children, ...props }: TextProps): JSX.Element {
  return (
    <TextStyled
      as={props.as || "p"}
      css={{
        marginBottom: props.bottom ? `$${props.bottom}` : 0,
        marginLeft: props.inline ? `$${props.inline}` : 0,
        marginTop: props.top ? `$${props.top}` : 0,
        textAlign: props.align || "initial",
        ...props.css,
      }}>
      {children}
    </TextStyled>
  );
}
