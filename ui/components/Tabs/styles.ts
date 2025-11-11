import { styled } from "../../styles";

export const TabsStyled = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const TabListStyled = styled("div", {
  borderBottom: "1px solid $border",
  display: "flex",
  gap: "$large",
  paddingBottom: "2px",
});

export const TabTriggerStyled = styled(
  "button",
  {
    // Disabled state
    "&:disabled": {
      cursor: "not-allowed",
      opacity: "0.5",
    },
    // Focus state
    "&:focus-visible": {
      outline: "2px solid $brand",
      outlineOffset: "4px",
    },
    alignItems: "center",
    // Reset
    appearance: "none",
    background: "none",
    border: "none",
    borderBottom: "2px solid transparent",
    borderRadius: "0",
    // Layout
    display: "inline-flex",
    // Typography
    fontSize: "1rem",
    fontWeight: "500",
    gap: "$small",
    justifyContent: "center",
    marginBottom: "-2px",
    // Interaction
    outline: "none",
    padding: "$small 0",
    position: "relative",
    textDecoration: "none",
    transition: "$default",
    whiteSpace: "nowrap",
  },
  {
    active: {
      false: {
        "&:hover:not(:disabled)": {
          color: "$text",
          opacity: 0.8,
        },
        borderBottomColor: "transparent",
        color: "$text",
        opacity: 0.6,
      },
      true: {
        "&:hover:not(:disabled)": {
          borderBottomColor: "$text",
        },
        borderBottomColor: "$text",
        color: "$text",
        opacity: 1,
      },
    },
  },
);
