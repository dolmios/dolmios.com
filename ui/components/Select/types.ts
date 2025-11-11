import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { CSSObject } from "../../styles/types";

export interface SelectOption {
  value: string;
  label: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export interface SelectProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** Trigger element that opens the select */
  trigger: ReactNode;
  /** Array of select options */
  options: SelectOption[];
  /** Initially selected option value */
  initial?: string;
  /** Optional label for the dropdown */
  label?: string;
  /** Whether to show filter/search */
  filter?: boolean;
  /** Whether the select is loading */
  loading?: boolean;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Called when option is selected */
  onSelection?: (value: string, label: string) => void;
  /** Custom CSS for trigger */
  triggerCss?: CSSObject;
  /** Custom CSS for dropdown content */
  css?: CSSObject;
}
