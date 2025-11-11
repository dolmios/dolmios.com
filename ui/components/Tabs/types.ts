import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { CSSObject } from "../../styles/types";

export interface TabTriggerProps extends ComponentPropsWithoutRef<"button"> {
  /** Tab value identifier */
  value: string;
  /** Whether the tab is disabled */
  disabled?: boolean;
  /** Custom CSS styles */
  css?: CSSObject;
}

export interface TabListProps extends ComponentPropsWithoutRef<"div"> {
  /** Custom CSS styles */
  css?: CSSObject;
}

export interface TabsProps extends ComponentPropsWithoutRef<"div"> {
  /** Currently active tab value */
  value?: string;
  /** Default active tab value */
  defaultValue?: string;
  /** Called when tab selection changes */
  onValueChange?: (value: string) => void;
  /** Custom CSS styles */
  css?: CSSObject;
  /** Tab list and triggers */
  children: ReactNode;
}
