import { styled } from "../../styles";

export const TextareaStyled = styled(
  "textarea",
  {
    // Placeholder
    "&::placeholder": {
      color: "#9CA3AF",
      opacity: 0.6,
    },
    // Disabled state
    "&:disabled": {
      backgroundColor: "$surface",
      color: "$text",
      cursor: "not-allowed",
      opacity: 0.5,
    },
    // Focus states
    "&:focus": {
      borderColor: "$brand",
      boxShadow: "0 0 0 3px rgba(255, 140, 0, 0.1)",
      outline: "none",
    },
    // Reset
    appearance: "none",
    background: "none",
    // Default styling
    backgroundColor: "$fill",
    border: `1px solid $border`,
    borderRadius: "$default",
    boxShadow: "$none",
    color: "$text",
    // Layout
    display: "block",
    // Typography
    fontFamily: "inherit",
    fontSize: "1rem",
    lineHeight: "1.5",
    margin: 0,
    minHeight: "120px",
    outline: "none",
    padding: `$medium`,
    // Default resize behavior
    resize: "vertical",
    transition: "$fast",
    width: "100%",
  },
  {
    variant: {
      default: {
        backgroundColor: "$fill",
        border: `1px solid $border`,
      },
      minimal: {
        backgroundColor: "transparent",
        border: "1px solid transparent",
        borderBottom: `1px solid $border`,
      },
    },
  },
);
