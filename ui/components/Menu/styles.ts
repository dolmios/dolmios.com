import { styled } from "../../styles";

export const MenuTriggerStyled = styled("div", {
  cursor: "pointer",
  display: "inline-block",
});

export const MenuOverlayStyled = styled("div", {
  alignItems: "center",
  backgroundColor: "$overlay",
  bottom: 0,
  display: "flex",
  justifyContent: "center",
  left: 0,
  position: "fixed",
  right: 0,
  top: 0,
  transition: "opacity 0.2s ease",
  zIndex: "$dropdown",
});

export const MenuStyled = styled(
  "div",
  {
    // Default styling
    backgroundColor: "$fill",
    border: `1px solid $border`,
    borderRadius: "$default",
    boxShadow: "$subtle",
    // Layout
    maxHeight: "70vh",
    maxWidth: "400px",
    minWidth: "250px",
    // Focus management
    outline: "none",
    overflowY: "auto",
    // Animation
    transition: "$default",
  },
  {
    variant: {
      default: {
        backgroundColor: "$fill",
        border: `1px solid $border`,
      },
      elevated: {
        backgroundColor: "$fill",
        border: "none",
        boxShadow: "$subtle",
      },
    },
  },
);

export const MenuItemStyled = styled(
  "div",
  {
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.5,
    },
    "&:focus-visible": {
      backgroundColor: "$hover",
      outline: `2px solid $brand`,
      outlineOffset: "-2px",
    },
    "&:hover": {
      backgroundColor: "$hover",
    },
    alignItems: "center",
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    gap: "$small",
    padding: `$small $medium`,

    textAlign: "left",

    transition: "$default",

    width: "100%",
  },
  {
    variant: {
      danger: {
        "&:hover": {
          backgroundColor: "$hover",
          color: "#EF4444",
        },
        color: "#EF4444",
      },
      default: {
        color: "$text",
      },
    },
  },
);

export const MenuDividerStyled = styled("div", {
  backgroundColor: "$border",
  height: "1px",
  margin: `$smaller 0`,
});
