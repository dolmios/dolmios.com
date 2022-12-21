import { TagStyled, TagButtonStyled, TagCardStyled } from "../styles";
import { TagProps } from "../types";

export function Tag(props: TagProps): JSX.Element {
  const TagComponent =
    props.as === "button" ? TagButtonStyled : props.as === "card" ? TagCardStyled : TagStyled;

  return <TagComponent {...props} />;
}
