import { JSX } from "react";

import type { InputProps } from "./types";

import { InputStyled } from "./styles";

/**
 * Input - Form input component with clean, accessible design
 *
 * Sharp edges design with consistent styling and form validation support
 * Supports all native input attributes
 *
 * Examples:
 * <Input placeholder="Enter text" />
 * <Input state="error" />
 */
export function Input({ state = "default", ...props }: InputProps): JSX.Element {
  return <InputStyled variant={state} {...props} />;
}
