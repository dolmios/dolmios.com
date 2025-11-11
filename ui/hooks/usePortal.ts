import { useEffect, useRef, type ReactNode, type ReactPortal } from "react";
import { createPortal } from "react-dom";

/**
 * Hook for rendering content in a portal (outside the normal DOM tree)
 * Useful for modals, tooltips, dropdowns that need to escape parent containers
 */
export function usePortal(container?: HTMLElement | string): {
  renderPortal: (children: ReactNode) => ReactPortal | null;
  portalElement: HTMLDivElement | null;
} {
  const portalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create portal element
    const portalElement = document.createElement("div");

    portalElement.style.position = "relative";
    portalElement.style.zIndex = "9999";

    // Determine container
    let targetContainer: HTMLElement;

    if (typeof container === "string") {
      const foundElement = document.querySelector(container) as HTMLElement;

      targetContainer = foundElement || document.body;
    } else if (container instanceof HTMLElement) {
      targetContainer = container;
    } else {
      // Default: try to find main element, fallback to body
      const mainElements = document.querySelectorAll("main");

      targetContainer =
        mainElements.length === 1 ? (mainElements[0] as HTMLElement) : document.body;
    }

    // Append to container
    targetContainer.appendChild(portalElement);
    portalRef.current = portalElement;

    // Cleanup function
    return (): void => {
      if (portalElement.parentNode) {
        portalElement.parentNode.removeChild(portalElement);
      }
      portalRef.current = null;
    };
  }, [container]);

  const renderPortal = (children: ReactNode): ReactPortal | null => {
    if (!portalRef.current) {
      return null;
    }

    return createPortal(children, portalRef.current);
  };

  return {
    portalElement: portalRef.current,
    renderPortal,
  };
}
