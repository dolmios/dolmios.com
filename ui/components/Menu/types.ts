import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { CSSObject } from "../../styles/types";

export interface MenuOption {
  value: string;
  label: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export interface MenuProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** Trigger element that opens the menu */
  trigger: ReactNode;
  /** Array of menu options */
  options: MenuOption[];
  /** Initially selected option value */
  initial?: string;
  /** Logo or header content */
  logo?: ReactNode;
  /** Custom content (can be function that receives close callback) */
  children?: ReactNode | ((close: () => void) => ReactNode);
  /** Called when menu option is selected */
  onSelection?: (value: string, label: string) => void;
  /** Custom CSS for trigger */
  triggerCss?: CSSObject;
  /** Custom CSS for menu content */
  css?: CSSObject;
}
