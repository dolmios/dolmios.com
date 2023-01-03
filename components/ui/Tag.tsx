import { CSS } from "@stitches/react";
import { ReactNode } from "react";

import { styled } from "../../stitches.config";

interface TagProps {
  bold?: boolean;
  children: ReactNode;
  css?: CSS;
  inline?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  minimal?: boolean;
  onClick?: () => void;
}

const TagStyled = styled("div", {
  "*": {
    display: "inline-block",
    verticalAlign: "middle",
  },
  background: "$tag",
  border: "1px solid $border",
  borderRadius: "$1",
  display: "inline-block",
  padding: "$1 $4",
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
      css={{
        ...(props.inline && { marginRight: `$${props.inline}` }),
        ...props.css,
      }}
      minimal={props.minimal || false}
      onClick={props.onClick}>
      {children}
    </TagStyled>
  );
}
