import { styled } from "../../styles";

export const CardStyled = styled("div", {
  backgroundColor: "$surface",
  border: "1px solid $border",
  borderRadius: "$default",
  color: "$text",
  display: "flex",
  flexDirection: "column",
  margin: 0,
  padding: "$large",
  position: "relative",
  transition: "$default",
  width: "100%",
});
