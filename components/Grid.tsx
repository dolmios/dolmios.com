import { GridStyled } from "../styles/shared";
import { GridProps } from "../types/shared";

export function Grid({ children, ...props }: GridProps): JSX.Element {
  return (
    <GridStyled className={props.direction || "grid-block"} {...props}>
      {children}
    </GridStyled>
  );
}
