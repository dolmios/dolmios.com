import { RefObject, useEffect, useRef } from "react";

/**
 * Hook for efficiently adding event listeners to elements or window
 * Automatically handles cleanup and re-binding when dependencies change
 */
export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: RefObject<HTMLElement | Window | null> | HTMLElement | Window | null,
  options?: boolean | AddEventListenerOptions,
): void {
  // Store handler in ref to avoid effect re-runs when handler changes
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    // Determine target element
    let targetElement: HTMLElement | Window | null = null;

    if (!element) {
      targetElement = window;
    } else if ("current" in element) {
      // It's a RefObject
      targetElement = element.current;
    } else {
      // It's a direct element or window
      targetElement = element;
    }

    // Do nothing if no target element
    if (!targetElement) return;

    // Create event listener wrapper
    const eventListener = (event: Event): void => {
      savedHandler.current(event as WindowEventMap[K]);
    };

    // Add event listener
    targetElement.addEventListener(eventName, eventListener, options);

    // Cleanup function
    return (): void => {
      targetElement?.removeEventListener(eventName, eventListener, options);
    };
  }, [eventName, element, options]);
}
