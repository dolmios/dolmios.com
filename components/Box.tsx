import { type CSS } from "@stitches/react";
import { ReactNode, type JSX } from "react";

import { styled } from "../stitches.config";

interface BoxProps {
  border?: boolean;
  children: ReactNode;
  css?: CSS;
  fullWidth?: boolean;
  onClick?: () => void;
  padding?: 1 | 2 | 3 | 4 | 5;
  shadow?: boolean;
}

const BoxStyled = styled("div", {
  background: "rgba(255, 255, 255, 0.12)",

  borderRadius: "$1",
  position: "relative",
  width: "100%",
  variants: {
    border: {
      true: {
       border: "1px solid $border",
      },
    },
    fullWidth: {
      true: {
        width: "100%",
      },
    },
    padding: {
      1: {
        padding: "$1",
      },
      2: {
        padding: "$2",
      },
      3: {
        padding: "$3",
      },
      4: {
        padding: "$4",
      },
      5: {
        padding: "$5",
      },
    },
    shadow: {
      true: {
        boxShadow: "$1",
      },
    },
  },
});

export function Box({ children, ...props }: BoxProps): JSX.Element {
  return (
    <BoxStyled
      border={props.border || false}
      css={props.css}
      fullWidth={props.fullWidth || false}
      padding={props.padding || 3}
      shadow={props.shadow || false}
      onClick={props.onClick}>
      {children}
    </BoxStyled>
  );
} 