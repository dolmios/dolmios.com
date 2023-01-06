import { CSS, CSSProperties } from "@stitches/react";
import { ReactNode } from "react";

import { styled } from "../../stitches.config";

export interface TextProps {
  align?: CSSProperties["textAlign"];
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
    | "ul"
    | "ol"
    | "strong"
    | "code";
  bottom?: 1 | 2 | 3 | 4 | 5;
  children: ReactNode;
  css?: CSS;
  inline?: 1 | 2 | 3 | 4 | 5;
  minimal?: boolean;
  onClick?: () => void;
  top?: 1 | 2 | 3 | 4 | 5;
}

export const TextStyled = styled("p", {
  "&:last-child": {
    marginBottom: 0,
  },
  variants: {
    inline: {
      false: {},
      true: {
        "*": {
          verticalAlign: "middle",
        },
        alignSelf: "center",
        display: "inline-block",
        marginBottom: "0 !important",
        verticalAlign: "middle",
      },
    },
    weightVariants: {
      0: {},
      a: {
        "&:last-child": {
          marginBottom: 0,
        },
        fontWeight: "bold",
        marginBottom: "$5",
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
  const aFonts = ["h1", "h2", "h3"];
  const bFonts = ["h4", "h5", "h6"];
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
      css={{
        ...(props.top && { paddingTop: `$${props.top}` }),
        ...(props.bottom && { paddingBottom: `$${props.bottom}` }),
        ...(props.inline && {
          "&:last-child": { marginRight: "0 !important" },
          marginRight: `$${props.inline}`,
        }),
        ...(props.align && { textAlign: props.align }),
        ...props.css,
      }}
      inline={props.inline ? "true" : "false"}
      weightVariants={props.minimal ? 0 : weightVariants}
      onClick={props.onClick}>
      {children}
    </TextStyled>
  );
}
