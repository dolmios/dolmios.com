import { TextStyled } from "../styles";
import { TextProps } from "../types";

export function Text({ children, ...props }: TextProps): JSX.Element {
  return <TextStyled {...props}>{children}</TextStyled>;
}
