import { CSS } from "@stitches/react";
import { ReactNode } from "react";

import { styled, theme } from "../stitches.config";

interface TagProps {
  children: ReactNode;
  css?: CSS;
  inline?: keyof typeof theme.space | number;
  minimal?: boolean;
  bold?: boolean;
}

const TagStyled = styled("div", {
  "*": {
    display: "inline-block",
    verticalAlign: "middle",
  },
  backgroundColor: "$tag",
  borderRadius: "$1",
  color: "#000",
  display: "inline-block",
  padding: "$1 $2",
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
  },
});

export function Tag({ children, ...props }: TagProps): JSX.Element {
  return (
    <TagStyled
      bold={props.bold || false}
      minimal={props.minimal || false}
      css={{
        ...(props.inline && { marginRight: `$${props.inline}` }),
        ...props.css,
      }}>
      {children}
    </TagStyled>
  );
}
