import { CSS } from "@stitches/react";
import { ReactNode } from "react";

import { styled } from "../stitches.config";

interface TagProps {
  children: ReactNode;
  css?: CSS;
  inline?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  minimal?: boolean;
  bold?: boolean;
  onClick?: () => void;
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
      onClick={props.onClick}
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
