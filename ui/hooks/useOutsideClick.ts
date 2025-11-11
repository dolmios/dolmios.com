import { RefObject } from "react";

import { useEventListener } from "./useEventListener";

/**
 * Hook for detecting clicks outside of a specific element
 * Useful for closing dropdowns, modals, or other overlay components
 */
export function useOutsideClick<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void,
  eventType: "mousedown" | "mouseup" | "click" | "touchstart" = "mousedown",
): void {
  useEventListener(eventType as keyof WindowEventMap, (event: Event) => {
    const element = ref.current;
    const target = event.target as Node;

    // Do nothing if the element doesn't exist
    if (!element) return;

    // Do nothing if the click is inside the element
    if (element.contains(target)) return;

    // Call the handler for outside clicks
    handler(event as MouseEvent | TouchEvent);
  });
}
