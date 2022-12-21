import { CSS } from "@stitches/react";
import { ReactNode } from "react";

import { styled, theme } from "../stitches.config";

interface TagProps {
  children: ReactNode;
  css?: CSS;
  type?: "card" | "button" | "tag";
  inline?: keyof typeof theme.space | number;
  minimal?: boolean;
}

const TagStyled = styled("div", {
  variants: {
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
        color: "inherit",
        cursor: "pointer",
        display: "inline-block",

        padding: "$1 $2",
        userSelect: "none",
      },
      card: {
        display: "block",
        padding: "$2",
      },
      tag: {
        backgroundColor: "$tag",
        borderRadius: "0.42rem",
        display: "inline-block",
        padding: "$1 $2",
        width: "fit-content",
      },
    },
  },
});

export function Tag({ children, ...props }: TagProps): JSX.Element {
  return (
    <TagStyled
      type={props.type || "tag"}
      minimal={props.minimal || false}
      css={{
        marginLeft: props.inline ? `$${props.inline}` : 0,
        marginRight: props.inline ? `$${props.inline}` : 0,
        ...props.css,
      }}>
      {children}
    </TagStyled>
  );
}
