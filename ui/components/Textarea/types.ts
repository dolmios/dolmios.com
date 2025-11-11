import type { ComponentPropsWithoutRef } from "react";

import type { CSSObject } from "../../styles/types";

export interface TextareaProps extends ComponentPropsWithoutRef<"textarea"> {
  /** Textarea variant */
  variant?: "default" | "minimal";
  /** Whether to allow manual resizing */
  resize?: "none" | "vertical" | "horizontal" | "both";
  /** Custom CSS styles */
  css?: CSSObject;
}
