import { type CSS } from "@stitches/react";
import { ReactNode } from "react";

import { styled } from "../stitches.config";

interface TagProps {
  bold?: boolean;
  children: ReactNode;
  css?: CSS;
  inline?: 1 | 2 | 3 | 4 | 5;
  link?: boolean;
  minimal?: boolean;
  onClick?: () => void;
  overflow?: boolean;
  small?: boolean;
}

const TagStyled = styled("div", {
  border: "1px solid $border",
  borderRadius: "$1",
  boxShadow: "$1",
  display: "inline-block",
  lineHeight: 1.4,
  userSelect: "contain",
  maxWidth: "100%",
  alignItems: "center",

  "*": {
    display: "inline-block",
    verticalAlign: "middle",
    lineHeight: "normal",
  },
  background: "$text",
  color: "$background",
  transition: "background 0.5s, color 0.2s",
  variants: {
    bold: {
      true: {
        fontWeight: "bold",
      },
    },
    minimal: {
      true: {
        padding: 0,
      },
    },
    small: {
      false: {
        padding: "0 $3",
        fontSize: "1.1rem",
      },
      true: {
        padding: "0 $2",
        fontSize: "0.9rem",
      },
    },
    link: {
      true: {
        cursor: "pointer",
        "&:hover": {
          background: "$background",
          color: "$text",
        },
      },
    },
    overflow: {
      true: {
        whiteSpace: "nowrap",
        overflowY: "hidden",
        overflowX: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      },
    },
  },
});

export function Tag({ children, ...props }: TagProps): JSX.Element {
  return (
    <TagStyled
      bold={props.bold || false}
      css={{
        ...(props.inline && { marginRight: `$${props.inline}` }),
        ...props.css,
      }}
      link={props.link || false}
      minimal={props.minimal || false}
      overflow={props.overflow || false}
      small={props.small || false}
      onClick={props.onClick}>
      {children}
    </TagStyled>
  );
}
