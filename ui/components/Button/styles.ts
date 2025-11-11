import { styled } from "../../styles";

export const ButtonStyled = styled(
  "button",
  {
    // Disabled state
    "&:disabled": {
      cursor: "not-allowed",
      opacity: "0.5",
    },
    // Focus state with subtle brand accent
    "&:focus-visible": {
      outline: "2px solid $brand",
      outlineOffset: "2px",
    },
    alignItems: "center",
    // Reset
    appearance: "none",
    // Border styling
    border: "1px solid $border",
    borderRadius: "$default",
    // Layout
    display: "inline-flex",
    gap: "$small",
    // Typography
    fontWeight: "500",
    justifyContent: "center",
    // Interaction
    outline: "none",
    position: "relative",
    textDecoration: "none",
    transition: "$default",
    whiteSpace: "nowrap",
  },
  {
    size: {
      normal: {
        fontSize: "1rem",
        minHeight: "44px",
        padding: "$small $large",
      },
      small: {
        fontSize: "0.875rem",
        minHeight: "36px",
        padding: "$small $medium",
      },
    },
    variant: {
      minimal: {
        "&:hover:not(:disabled)": {
          backgroundColor: "$hover",
        },
        backgroundColor: "transparent",
        border: "1px solid $border",
        color: "$text",
      },
      primary: {
        "&:hover:not(:disabled)": {
          opacity: 0.9,
        },
        backgroundColor: "$text",
        border: "1px solid $text",
        color: "$background",
      },
      secondary: {
        "&:hover:not(:disabled)": {
          backgroundColor: "$hover",
        },
        backgroundColor: "$surface",
        border: "1px solid $border",
        color: "$text",
      },
    },
  },
);
