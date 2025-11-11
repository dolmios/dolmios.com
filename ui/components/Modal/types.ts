import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { CSSObject } from "../../styles/types";

export interface ModalProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** Trigger element that opens the modal */
  trigger: ReactNode;
  /** Modal title displayed in header */
  title: string;
  /** Content to display in modal (can be function that receives close callback) */
  children: ReactNode | ((close: () => void) => ReactNode);
  /** Whether the modal is disabled */
  disabled?: boolean;
  /** Custom CSS styles for the modal content */
  css?: CSSObject;
}
