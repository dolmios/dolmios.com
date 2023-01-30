import { CSS, CSSProperties } from "@stitches/react";
import { ReactNode } from "react";

import { styled } from "../stitches.config";

interface GridProps {
  align?: CSSProperties["textAlign"];
  as?: "div" | "section" | "main" | "header" | "footer" | "aside" | "nav";
  bottom?: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode | JSX.Element;
  collapse?: number;
  css?: CSS;
  direction?: "row" | "column";
  flex?: "stretch" | "center" | "flex-start" | "flex-end" | "baseline" | "initial" | "inherit";
  minimal?: boolean;
  top?: 1 | 2 | 3 | 4 | 5 | 6;
  width?: number;
}

const GridStyled = styled("div", {
  position: "relative",
  variants: {
    direction: {
      column: {
        maxWidth: "100%",
        paddingLeft: "$4",
        paddingRight: "$4",
        width: "100%",
      },
      default: {},
      row: {
        display: "flex",
        flexDirection: "row",
        flexFlow: "row wrap",
        maxWidth: "100%",
        minWidth: "100%",
        width: "100%",
      },
    },
    minimal: {
      false: {
        padding: "inherit",
      },
      true: {
        padding: "0 !important",
      },
    },
  },
});

export function Grid({ children, ...props }: GridProps): JSX.Element {
  return (
    <GridStyled
      as={props.as || "div"}
      css={{
        ...(props?.direction === "row" &&
          props.flex && {
            alignItems: props.flex,
          }),
        ...(props.top && { marginTop: `$${props.top}` }),
        ...(props.bottom && { marginBottom: `$${props.bottom}` }),
        ...(props.align && {
          textAlign: props.align,
        }),
        ...(props?.direction === "column" &&
          props.width &&
          props.collapse && {
            "@media (max-width: 900px)": {
              width: `${props.collapse}% !important`,
            },
            width: `${props.width}%`,
          }),
        ...props.css,
      }}
      direction={props.direction || "default"}
      minimal={props.minimal}>
      {children}
    </GridStyled>
  );
}
