import { CSS, CSSProperties } from "@stitches/react";
import { ReactNode } from "react";

import { styled } from "../stitches.config";

interface GridProps {
  align?: CSSProperties["textAlign"];
  children: ReactNode | JSX.Element;
  flex?: "stretch" | "center" | "flex-start" | "flex-end" | "baseline" | "initial" | "inherit";
  width?: number;
  collapse?: number;
  direction?: "row" | "column";
  as?: "div" | "section" | "main" | "header" | "footer" | "aside" | "nav";
  top?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  bottom?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  css?: CSS;
  minimal?: boolean;
}

const GridStyled = styled("div", {
  position: "relative",
  variants: {
    direction: {
      column: {
        maxWidth: "100%",
        paddingLeft: "$5",
        paddingRight: "$5",
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
      direction={props.direction || "default"}
      minimal={props.minimal}
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
      }}>
      {children}
    </GridStyled>
  );
}
