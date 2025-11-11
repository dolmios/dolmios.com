import {
  computePosition,
  offset,
  flip,
  shift,
  autoUpdate,
  limitShift,
  type Strategy,
  type ComputePositionReturn,
} from "@floating-ui/dom";
import { useState, useRef, useEffect, RefObject } from "react";

export interface UseFloatingReturn {
  /** Ref for the trigger element */
  triggerRef: RefObject<HTMLDivElement | null>;
  /** Ref for the floating element */
  contentRef: RefObject<HTMLDivElement | null>;
  /** Whether floating element is open */
  isOpen: boolean;
  /** Whether floating element is mounted */
  isMounted: boolean;
  /** Open the floating element */
  handleOpen: () => void;
  /** Close the floating element */
  handleClose: () => void;
  /** Toggle the floating element */
  handleClick: () => void;
}

export function useFloating(): UseFloatingReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const triggerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  const updatePosition = (): void => {
    if (!triggerRef.current || !contentRef.current) return;

    const strategy: Strategy = "fixed";

    computePosition(triggerRef.current, contentRef.current, {
      middleware: [
        offset(8),
        flip({
          fallbackPlacements: [
            "bottom",
            "top",
            "bottom-start",
            "top-start",
            "bottom-end",
            "top-end",
          ],
          padding: 8,
        }),
        shift({
          limiter: limitShift(),
          padding: 8,
        }),
      ],
      placement: "bottom",
      strategy,
    }).then(({ x, y }: ComputePositionReturn) => {
      if (!contentRef.current || !triggerRef.current) return;

      contentRef.current.style.position = strategy;
      contentRef.current.style.left = `${Math.round(x)}px`;
      contentRef.current.style.top = `${Math.round(y)}px`;
      contentRef.current.style.visibility = "visible"; // Show after positioning
    });
  };

  const prepareFloatingElement = (element: HTMLDivElement): void => {
    if (!element) return;
    element.style.position = "fixed";
    element.style.top = "0";
    element.style.left = "0";
    element.style.transform = "";
    element.style.visibility = "hidden"; // Hide until positioned
  };

  useEffect(() => {
    if (!isMounted || !triggerRef.current || !contentRef.current) {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }

      return;
    }

    prepareFloatingElement(contentRef.current);

    updatePosition();

    cleanupRef.current = autoUpdate(triggerRef.current, contentRef.current, updatePosition, {
      ancestorResize: true,
      ancestorScroll: true,
      elementResize: true,
    });

    return (): void => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [isMounted]);

  useEffect(() => {
    return (): void => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, []);

  function handleOpen(): void {
    setIsMounted(true);
    setIsOpen(true);
  }

  function handleClose(): void {
    setIsOpen(false);
    setTimeout(() => setIsMounted(false), 200);
  }

  function handleClick(): void {
    if (isOpen || isMounted) {
      handleClose();
    } else {
      handleOpen();
    }
  }

  return {
    contentRef,
    handleClick,
    handleClose,
    handleOpen,
    isMounted,
    isOpen,
    triggerRef,
  };
}
