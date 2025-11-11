import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { CSSObject } from "../../styles/types";

export interface PopoverProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** Trigger element that opens the popover */
  trigger: ReactNode;
  /** Content to display in popover (can be function that receives close callback) */
  children: ReactNode | ((close: () => void) => ReactNode);
  /** Popover variant - default has padding, minimal has no padding */
  variant?: "default" | "minimal";
  /** Whether popover is disabled */
  disabled?: boolean;
  /** Custom CSS for trigger */
  triggerCss?: CSSObject;
  /** Custom CSS for popover content */
  css?: CSSObject;
}
