"use client";

import { useState, useRef, useEffect, type JSX } from "react";

import type { ModalProps } from "./types";

import { useEventListener, useOutsideClick, usePortal } from "../../hooks";
import { Button, Text } from "../index";
import {
  ModalBackdropStyled,
  ModalStyled,
  ModalHeaderStyled,
  ModalContentStyled,
  ModalTriggerStyled,
} from "./styles";

/**
 * Modal - Overlay modal component with trigger interaction
 *
 * Provides a trigger element that opens a modal when clicked.
 * Uses portal rendering and manages focus/escape behavior automatically.
 * Includes built-in header with title and close button.
 *
 * Examples:
 * <Modal trigger={<Button>Open Modal</Button>} title="My Modal">Modal content</Modal>
 * <Modal trigger="Custom trigger" title="Settings" small>Small modal form</Modal>
 */
export function Modal({
  children,
  css,
  disabled = false,
  title,
  trigger,
  ...props
}: ModalProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const { renderPortal } = usePortal();

  const isModalOpen = isOpen || isMounted;

  const handleClose = (): void => {
    setIsOpen(false);
    setTimeout(() => {
      setIsMounted(false);
    }, 200);
  };

  const handleOpen = (): void => {
    if (disabled) return;
    setIsOpen(true);
    setIsMounted(true);
  };

  const handleTriggerClick = (): void => {
    if (disabled) return;

    if (isModalOpen) {
      handleClose();
    } else {
      handleOpen();
    }
  };

  // Keyboard handling - always close on escape
  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === "Escape" && isModalOpen) {
      event.preventDefault();
      handleClose();
    }
  };

  useEventListener("keydown", handleKeyDown);

  // Handle outside clicks to close modal - always enabled
  useOutsideClick(modalRef, (): void => {
    if (isModalOpen) {
      handleClose();
    }
  });

  // Body scroll lock when modal is open
  useEffect(() => {
    if (isMounted) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";

      return (): void => {
        document.body.style.overflow = "";
      };
    }
  }, [isMounted]);

  return (
    <>
      {/* Trigger */}
      <ModalTriggerStyled
        disabled={disabled}
        onClick={handleTriggerClick}
        {...props}>
        {trigger}
      </ModalTriggerStyled>

      {/* Modal */}
      {isMounted &&
        renderPortal(
          <ModalBackdropStyled>
            <ModalStyled
              ref={modalRef}
              css={css}
              isOpen={isOpen}
              tabIndex={-1}
              variant="default">
              {/* Header with title and close button */}
              <ModalHeaderStyled>
                <Text
                  as="span"
                  css={{
                    flex: 1,
                    fontSize: "$small",
                    fontWeight: "$semibold",
                    margin: 0
                  }}
                >
                  {title}
                </Text>
                <Button
                  css={{
                    flexShrink: 0,
                    fontSize: "18px",
                    height: "32px",
                    padding: "0",
                    width: "32px",
                  }}
                  size="small"
                  variant="minimal"
                  onClick={handleClose}>
                  ×
                </Button>
              </ModalHeaderStyled>

              {/* Content */}
              <ModalContentStyled>
                {typeof children === "function" ? children(handleClose) : children}
              </ModalContentStyled>
            </ModalStyled>
          </ModalBackdropStyled>,
        )}
    </>
  );
}
