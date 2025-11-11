"use client";

import { useState, useRef, useEffect, type JSX } from "react";

import type { MenuProps, MenuOption } from "./types";

import { useEventListener, useOutsideClick, usePortal } from "../../hooks";
import { colors } from "../../styles/theme";
import {
  MenuTriggerStyled,
  MenuOverlayStyled,
  MenuStyled,
  MenuItemStyled,
  MenuDividerStyled,
} from "./styles";

/**
 * Menu - Dropdown menu component with trigger and options
 *
 * Sharp edges design with customizable triggers and option handling
 * Supports keyboard navigation and outside click to close
 *
 * Examples:
 * <Menu trigger={<Button>Open Menu</Button>} options={menuOptions} />
 * <Menu trigger="Click me" options={options} onSelection={handleSelect} />
 */
export function Menu({
  children,
  css,
  initial,
  logo,
  onSelection,
  options,
  trigger,
  triggerCss,
  ...props
}: MenuProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(
    initial ? options.findIndex((opt) => opt.value === initial) : -1,
  );

  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { renderPortal } = usePortal();

  const handleToggle = (): void => setIsOpen(!isOpen);
  const handleClose = (): void => setIsOpen(false);

  const handleSelection = (option: MenuOption): void => {
    onSelection?.(option.value, option.label);
    handleClose();
  };

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (!isOpen) return;

    switch (event.key) {
      case "Escape":
        handleClose();
        break;
      case "ArrowDown":
        event.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % options.length);
        break;
      case "ArrowUp":
        event.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + options.length) % options.length);
        break;
      case "Enter":
        event.preventDefault();
        if (selectedIndex >= 0) {
          handleSelection(options[selectedIndex]);
        }
        break;
    }
  };

  useEventListener("keydown", handleKeyDown);
  useOutsideClick(menuRef, handleClose);

  useEffect(() => {
    if (isOpen && menuRef.current) {
      menuRef.current.focus();
    }
  }, [isOpen]);

  return (
    <>
      <MenuTriggerStyled ref={triggerRef} css={triggerCss} onClick={handleToggle} {...props}>
        {trigger}
      </MenuTriggerStyled>

      {isOpen &&
        renderPortal(
          <MenuOverlayStyled onClick={handleClose}>
            <MenuStyled
              ref={menuRef}
              css={css}
              tabIndex={-1}
              variant="default"
              onClick={(e) => e.stopPropagation()}>
              {logo && (
                <div style={{ borderBottom: `1px solid ${colors.border}`, padding: "16px" }}>
                  {logo}
                </div>
              )}

              {options.map((option, index) => (
                <MenuItemStyled
                  key={option.value}
                  style={{
                    backgroundColor: selectedIndex === index ? colors.hover : undefined,
                  }}
                  variant={
                    option.value.includes("delete") || option.value.includes("remove")
                      ? "danger"
                      : "default"
                  }
                  onClick={() => handleSelection(option)}
                  onMouseEnter={() => setSelectedIndex(index)}>
                  {option.iconPosition !== "right" && option.icon}
                  <span>{option.label}</span>
                  {option.iconPosition === "right" && option.icon}
                </MenuItemStyled>
              ))}

              {children && (
                <>
                  <MenuDividerStyled />
                  <div style={{ padding: "8px" }}>
                    {typeof children === "function" ? children(handleClose) : children}
                  </div>
                </>
              )}
            </MenuStyled>
          </MenuOverlayStyled>,
        )}
    </>
  );
}
