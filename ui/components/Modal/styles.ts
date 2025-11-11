import { styled } from "../../styles";

export const ModalTriggerStyled = styled(
  "div",
  {
    cursor: "pointer",
    display: "inline-block",
  },
  {
    disabled: {
      true: {
        cursor: "not-allowed",
        opacity: 0.6,
      },
    },
  },
);

export const ModalBackdropStyled = styled("div", {
  backdropFilter: "blur(4px)",
  backgroundColor: "$overlay",
  bottom: 0,
  left: 0,
  position: "fixed",
  right: 0,
  top: 0,
  transition: "$default",
  zIndex: 1000,
});

export const ModalStyled = styled(
  "div",
  {
    // Focus management
    "&:focus": {
      outline: "none",
    },
    // Mobile responsive
    "@media (max-width: 768px)": {
      maxHeight: "90vh",
      width: "95%",
    },
    backgroundColor: "$fill",
    border: "1px solid $border",
    borderRadius: "$large",
    boxShadow: "$subtle",
    color: "$text",
    display: "flex",
    flexDirection: "column",
    left: "50%",
    maxHeight: "80vh",
    maxWidth: "600px",
    opacity: 0,
    outline: "none",
    overflow: "hidden",
    position: "fixed",
    top: "50%",
    transform: "translate(-50%, -50%) translateY(10px)",
    transition: "$default",
    width: "90%",
  },
  {
    isOpen: {
      true: {
        opacity: 1,
        transform: "translate(-50%, -50%) translateY(0)",
      },
    },
    variant: {
      default: {
        backgroundColor: "$fill",
        border: "1px solid $border",
      },
    },
  },
);

export const ModalHeaderStyled = styled("div", {
  alignItems: "center",
  display: "flex",
  flexShrink: 0,
  justifyContent: "space-between",
  padding: "$large",
});

export const ModalTitleStyled = styled("h2", {
  color: "$text",
  fontSize: "1.25rem",
  fontWeight: "600",
  margin: 0,
});

export const ModalCloseButtonStyled = styled("button", {
  "&:focus": {
    outline: `1px solid $brand`,
    outlineOffset: "2px",
  },
  "&:hover": {
    backgroundColor: "$hover",
  },
  background: "none",
  border: "none",
  color: "$text",
  cursor: "pointer",

  fontSize: "1.5rem",

  padding: "$smaller",
});

export const ModalContentStyled = styled("div", {
  // Content area - scrollable and padded
  flex: 1,
  overflow: "auto",
  padding: "0 $large $large $large",
});

export const ModalFooterStyled = styled("div", {
  display: "flex",
  gap: "$small",
  justifyContent: "flex-end",
  marginTop: "$medium",
  paddingTop: "$small",
});
