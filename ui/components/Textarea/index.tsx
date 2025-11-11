import type { JSX } from "react";

import type { TextareaProps } from "./types";

import { TextareaStyled } from "./styles";

/**
 * Textarea - Multi-line text input component
 *
 * Sharp edges design with consistent styling
 * Supports various states and accessibility features
 * Use cols/rows attributes for sizing
 *
 * Examples:
 * <Textarea placeholder="Enter your message..." />
 * <Textarea variant="minimal" />
 * <Textarea disabled rows={5} cols={50} />
 */
export function Textarea({ css, variant = "default", ...props }: TextareaProps): JSX.Element {
  return <TextareaStyled css={css} variant={variant} {...props} />;
}
