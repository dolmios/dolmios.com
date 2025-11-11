import { styled } from "../../styles";

export const StackStyled = styled(
  "div",
  {
    display: "flex",
  },
  {
    align: {
      baseline: { alignItems: "baseline" },
      center: { alignItems: "center" },
      end: { alignItems: "flex-end" },
      start: { alignItems: "flex-start" },
      stretch: { alignItems: "stretch" },
    },
    direction: {
      column: { flexDirection: "column" },
      "column-reverse": { flexDirection: "column-reverse" },
      row: { flexDirection: "row" },
      "row-reverse": { flexDirection: "row-reverse" },
    },
    inline: {
      false: { display: "flex" },
      true: { display: "inline-flex" },
    },
    justify: {
      around: { justifyContent: "space-around" },
      between: { justifyContent: "space-between" },
      center: { justifyContent: "center" },
      end: { justifyContent: "flex-end" },
      evenly: { justifyContent: "space-evenly" },
      start: { justifyContent: "flex-start" },
    },
    textAlign: {
      center: { textAlign: "center" },
      justify: { textAlign: "justify" },
      left: { textAlign: "left" },
      right: { textAlign: "right" },
    },
  },
);
