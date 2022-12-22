import { CSS } from "@stitches/react";
import { ReactNode } from "react";

import { styled, theme } from "../stitches.config";

interface TagProps {
  children: ReactNode;
  css?: CSS;
  type?: "card" | "button" | "tag";
  inline?: keyof typeof theme.space | number;
  minimal?: boolean;
  bold?: boolean;
}

const TagStyled = styled("div", {
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
    type: {
      button: {
        "&:focus": {
          outline: "none",
        },
        "&:hover": {
          backgroundColor: "$tagHover",
        },
        appearance: "none",
        backgroundColor: "$tag",
        border: "none",
        color: "#000",
        cursor: "pointer",
        display: "inline-block",

        padding: "$1 $2",
        userSelect: "none",
      },
      card: {
        border: "1px solid $border",
        display: "block",
        padding: "$3",
      },
      tag: {
        "*": {
          display: "inline-block",
          verticalAlign: "middle",
        },
        backgroundColor: "$tag",
        borderRadius: "$1",
        color: "#000",
        display: "inline-block",
        padding: "$2 $3",
      },
    },
  },
});

export function Tag({ children, ...props }: TagProps): JSX.Element {
  return (
    <TagStyled
      bold={props.bold || false}
      type={props.type || "tag"}
      minimal={props.minimal || false}
      css={{
        ...(props.inline && { marginRight: `$${props.inline}` }),
        ...props.css,
      }}>
      {children}
    </TagStyled>
  );
}
