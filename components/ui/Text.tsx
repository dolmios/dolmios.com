import { CSS, CSSProperties } from "@stitches/react";
import { ReactNode } from "react";

import { styled } from "../../stitches.config";

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
    | "ul"
    | "ol"
    | "strong"
    | "code";
  top?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  bottom?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  inline?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  minimal?: boolean;
  onClick?: () => void;
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
        marginBottom: "$4",
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
      onClick={props.onClick}
      as={props.as || "p"}
      inline={props.inline ? "true" : "false"}
      weightVariants={props.minimal ? 0 : weightVariants}
      css={{
        ...(props.top && { paddingTop: `$${props.top}` }),
        ...(props.bottom && { paddingBottom: `$${props.bottom}` }),
        ...(props.inline && {
          "&:last-child": { marginRight: "0 !important" },
          marginRight: `$${props.inline}`,
        }),
        ...(props.align && { textAlign: props.align }),
        ...props.css,
      }}>
      {children}
    </TextStyled>
  );
}