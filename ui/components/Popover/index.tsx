"use client";

import { useEffect, type JSX } from "react";

import type { PopoverProps } from "./types";

import { useEventListener, useOutsideClick, usePortal, useFloating } from "../../hooks";
import { PopoverTriggerStyled, PopoverStyled } from "./styles";

/**
 * Popover - Floating content overlay with trigger interaction
 *
 * Provides a trigger element that opens floating content when clicked.
 * Uses portal rendering and manages focus/escape behavior automatically.
 *
 * Examples:
 * <Popover trigger={<Button>Click me</Button>}>Popover content</Popover>
 * <Popover trigger="Custom trigger" variant="minimal">Content</Popover>
 */
export function Popover({
  children,
  css,
  disabled = false,
  trigger,
  triggerCss,
  variant = "default",
  ...props
}: PopoverProps): JSX.Element {
  const {
    contentRef: popoverRef,
    handleClick: handleToggle,
    handleClose,
    isMounted,
    isOpen,
    triggerRef,
  } = useFloating();

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (!isOpen) return;

    if (event.key === "Escape") {
      event.preventDefault();
      handleClose();
    }
  };

  useEventListener("keydown", handleKeyDown);
  useOutsideClick(popoverRef, handleClose);

  useEffect(() => {
    if (isOpen && popoverRef.current) {
      popoverRef.current.focus();
    }
  }, [isOpen]);

  const { renderPortal } = usePortal();

  const content = typeof children === "function" ? children(handleClose) : children;

  return (
    <>
      <PopoverTriggerStyled
        ref={triggerRef}
        css={triggerCss}
        onClick={disabled ? undefined : handleToggle}
        {...props}>
        {trigger}
      </PopoverTriggerStyled>

      {isMounted &&
        renderPortal(
          <PopoverStyled
            ref={popoverRef}
            css={{
              opacity: isOpen ? 1 : 0,
              transition: "opacity 0.2s ease",
              ...css,
            }}
            tabIndex={-1}
            variant={variant}
            onClick={(e) => e.stopPropagation()}>
            {content}
          </PopoverStyled>,
        )}
    </>
  );
}
