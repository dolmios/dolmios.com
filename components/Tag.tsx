import { CSS } from "@stitches/react";
import { ReactNode } from "react";

import { styled } from "../stitches.config";

interface TagProps {
  bold?: boolean;
  children: ReactNode;
  css?: CSS;
  inline?: 1 | 2 | 3 | 4 | 5;
  minimal?: boolean;
  onClick?: () => void;
  overflow?: boolean;
}

const TagStyled = styled("div", {
  border: "1px solid $border",
  borderRadius: "$1",
  boxShadow: "$1",
  display: "inline-block",
  fontSize: "0.9rem",
  lineHeight: 1.4,
  padding: "0 $3",
  userSelect: "contain",
  maxWidth: "100%",
  alignItems: "center",

  "*": {
    display: "inline-block",
    verticalAlign: "middle",
    lineHeight: "normal",
  },
  background: "$tag",
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
      minimal={props.minimal || false}
      overflow={props.overflow || false}
      onClick={props.onClick}>
      {children}
    </TagStyled>
  );
}
