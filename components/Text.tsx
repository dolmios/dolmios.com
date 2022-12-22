import { CSS, CSSProperties } from "@stitches/react";
import { ReactNode } from "react";

import { styled, theme } from "../stitches.config";

export interface TextProps {
  align?: CSSProperties["textAlign"];
  children: ReactNode;
  css?: CSS;
  as?:
    | "p"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "span"
    | "small"
    | "li"
    | "a"
    | "ul"
    | "ol"
    | "strong"
    | "code";
  top?: keyof typeof theme.space | number;
  bottom?: keyof typeof theme.space | number;
  inline?: keyof typeof theme.space | number;
  minimal?: boolean;
}

export const TextStyled = styled("p", {
  "&:last-child": {
    marginBottom: 0,
  },
  variants: {
    inline: {
      false: {
        display: "block",
      },
      true: {
        display: "inline-block",
        marginBottom: "0 !important",
        verticalAlign: "middle",
      },
    },
    weightVariants: {
      0: {
        marginBottom: 0,
      },
      a: {
        "&:last-child": {
          marginBottom: 0,
        },
        fontWeight: "bold",
        marginBottom: "$4",
      },
      b: {
        "&:last-child": {
          marginBottom: 0,
        },
        fontWeight: "bold",
        marginBottom: "$3",
      },
      c: {
        "&:last-child": {
          marginBottom: 0,
        },
        fontWeight: "normal",
        marginBottom: "$2",
      },
    },
  },
});

export function Text({ children, ...props }: TextProps): JSX.Element {
  const aFonts = ["h1", "h2", "h3", "h4"];
  const bFonts = ["h5", "h6"];
  const cFonts = ["p"];

  const weightVariants = aFonts.includes(props.as || "p")
    ? "a"
    : bFonts.includes(props.as || "p")
    ? "b"
    : cFonts.includes(props.as || "p")
    ? "c"
    : 0;

  return (
    <TextStyled
      as={props.as || "p"}
      inline={props.inline ? "true" : "false"}
      weightVariants={props.minimal ? 0 : weightVariants}
      css={{
        paddingBottom: props.bottom ? `$${props.bottom}` : 0,
        paddingRight: props.inline ? `$${props.inline}` : "inherit",
        paddingTop: props.top ? `$${props.top}` : 0,
        textAlign: props.align || "left",
        ...props.css,
      }}>
      {children}
    </TextStyled>
  );
}
