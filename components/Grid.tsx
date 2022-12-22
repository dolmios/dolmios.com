import { CSS, CSSProperties } from "@stitches/react";
import { ReactNode } from "react";

import { styled, theme } from "../stitches.config";

interface GridProps {
  align?: CSSProperties["textAlign"];
  children: ReactNode | JSX.Element;
  flex?: "stretch" | "center" | "flex-start" | "flex-end" | "baseline" | "initial" | "inherit";
  width?: number;
  collapse?: number;
  direction?: "row" | "column";
  as?: "div" | "section" | "main" | "header" | "footer" | "aside" | "nav";
  top?: keyof typeof theme.space | number;
  bottom?: keyof typeof theme.space | number;
  css?: CSS;
  minimal?: boolean;
}

const GridStyled = styled("div", {
  position: "relative",
  variants: {
    direction: {
      column: {
        "@media (max-width: 900px)": {
          paddingLeft: "$5",
          paddingRight: "$5",
        },
        display: "flex",
        flexDirection: "column",
        flexFlow: "column nowrap",
        paddingLeft: "$5",
        paddingRight: "$5",
        width: "100%",
      },
      default: {},
      row: {
        display: "flex",
        flexDirection: "row",
        flexFlow: "row wrap",
      },
    },
  },
});

export function Grid({ children, ...props }: GridProps): JSX.Element {
  return (
    <GridStyled
      as={props.as || "div"}
      direction={props.direction || "default"}
      css={{
        "@media (max-width: 900px)": {
          width: `${props.collapse || props.width || 100}% !important`,
        },
        alignItems: props.flex || "initial",
        justifyContent: props.flex || "initial",
        marginBottom: props.bottom ? `$${props.bottom}` : 0,
        marginTop: props.top ? `$${props.top}` : 0,
        textAlign: props.align || "left",
        width: props.direction === "column" ? `${props.width || 100}%` : "auto",
        ...(props.minimal && {
          padding: "0 !important",
        }),
        ...props.css,
      }}>
      {children}
    </GridStyled>
  );
}
