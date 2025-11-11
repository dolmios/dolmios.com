import type { ComponentPropsWithoutRef } from "react";

import type { CSSObject } from "../../styles/types";

export interface InputProps extends ComponentPropsWithoutRef<"input"> {
  /** Input state */
  state?: "default" | "error";
  /** Custom CSS styles */
  css?: CSSObject;
}
