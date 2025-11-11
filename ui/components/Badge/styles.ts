import { styled } from "../../styles";

export const BadgeStyled = styled(
  "span",
  {
    alignItems: "center",
    backgroundColor: "$surface",
    border: "1px solid $border",
    borderRadius: "$default",
    color: "$text",
    display: "inline-flex",
    fontSize: "0.75rem",
    fontWeight: "600",
    gap: "$smaller",
    justifyContent: "center",
    margin: 0,
    outline: "none",
    padding: "$smaller $small",
    position: "relative",
    textDecoration: "none",
    transition: "$default",
    verticalAlign: "middle",
    whiteSpace: "nowrap",
  },
  {
    clickable: {
      false: {},
      true: {
        "&:hover": {
          backgroundColor: "$hover",
        },
        cursor: "pointer",
      },
    },
    variant: {
      brand: {
        borderColor: "$brand",
      },
      default: {},
    },
  },
);
