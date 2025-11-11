import { styled } from "../../styles";

export const InputStyled = styled(
  "input",
  {
    // States
    "&::placeholder": {
      color: "#9CA3AF",
      opacity: 0.6,
    },
    "&:disabled": {
      backgroundColor: "$surface",
      cursor: "not-allowed",
      opacity: 0.5,
    },
    "&:focus": {
      borderColor: "$brand",
      boxShadow: "0 0 0 3px rgba(255, 140, 0, 0.1)",
      outline: "none",
    },
    // Reset
    appearance: "none",
    // Styling
    backgroundColor: "$fill",
    border: "1px solid $border",
    borderRadius: "$default",
    boxShadow: "$none",
    color: "$text",
    display: "block",
    fontSize: "1rem",
    fontWeight: "400",
    lineHeight: "1.5",
    minHeight: "44px",
    outline: "none",
    padding: "$small $medium",
    transition: "$fast",
    width: "100%",
  },
  {
    variant: {
      default: {
        backgroundColor: "$fill",
        border: "1px solid $border",
      },
      error: {
        "&:focus": {
          borderColor: "#EF4444",
          boxShadow: "0 0 0 3px rgba(239, 68, 68, 0.1)",
        },
        borderColor: "#EF4444",
      },
    },
  },
);
