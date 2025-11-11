import { styled } from "../../styles";

export const PopoverTriggerStyled = styled("div", {
  cursor: "pointer",
  display: "inline-block",
  position: "relative",
  width: "fit-content",
});

export const PopoverStyled = styled(
  "div",
  {
    // Default styling
    backgroundColor: "$fill",
    border: `1px solid $border`,
    borderRadius: "$default",
    boxShadow: "$subtle",

    // Scrollable content
    maxHeight: "70vh",
    minWidth: "200px",

    // Animation
    opacity: 1,

    // Focus management
    outline: "none",
    overflowY: "auto",

    position: "fixed",
    transition: "$default",

    // Prevent flash at (0,0) before positioning
    visibility: "hidden",

    zIndex: "$popover",
  },
  {
    variant: {
      default: {
        backgroundColor: "$fill",
        border: `1px solid $border`,
        padding: "$medium",
      },
      minimal: {
        backgroundColor: "$fill",
        border: `1px solid $border`,
        padding: "0",
      },
    },
  },
);
