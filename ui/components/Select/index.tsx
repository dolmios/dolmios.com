"use client";

import { useState, useEffect, type JSX } from "react";

import type { SelectProps, SelectOption } from "./types";

import { useEventListener, useOutsideClick, usePortal, useFloating } from "../../hooks";
import { Input } from "../Input";
import {
  SelectTriggerStyled,
  SelectDropdownStyled,
  SelectLabelStyled,
  SelectFilterStyled,
  SelectItemStyled,
  SelectEmptyStyled,
  SelectLoadingStyled,
} from "./styles";

/**
 * Select - Dropdown selection component with filtering and search
 *
 * Provides a searchable dropdown with keyboard navigation and portal rendering.
 * Supports custom options with icons and loading states.
 *
 * Examples:
 * <Select options={options} onSelection={handleSelect} />
 * <Select options={options} filter label="Choose option" />
 */
export function Select({
  css,
  disabled = false,
  filter = false,
  initial,
  label,
  loading = false,
  onSelection,
  options,
  trigger,
  triggerCss,
  ...props
}: SelectProps): JSX.Element {
  const {
    contentRef: dropdownRef,
    handleClick: handleToggle,
    handleClose,
    isMounted,
    isOpen,
    triggerRef,
  } = useFloating();

  const [selected, setSelected] = useState<string | undefined>(initial);
  const [selectedIndex, setSelectedIndex] = useState(
    initial ? options.findIndex((opt) => opt.value === initial) : -1,
  );
  const [search, setSearch] = useState("");

  const { renderPortal } = usePortal();

  const filteredOptions = filter
    ? options.filter((option) => option.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  const handleCloseWithReset = (): void => {
    handleClose();
    setSearch("");
  };

  const handleSelection = (option: SelectOption): void => {
    setSelected(option.value);
    onSelection?.(option.value, option.label);
    handleCloseWithReset();
  };

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (!isOpen) return;

    switch (event.key) {
      case "Escape":
        event.preventDefault();
        handleCloseWithReset();
        break;
      case "ArrowDown":
        event.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredOptions.length);
        break;
      case "ArrowUp":
        event.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredOptions.length) % filteredOptions.length);
        break;
      case "Enter":
        event.preventDefault();
        if (selectedIndex >= 0 && filteredOptions[selectedIndex]) {
          handleSelection(filteredOptions[selectedIndex]);
        }
        break;
    }
  };

  useEventListener("keydown", handleKeyDown);
  useOutsideClick(dropdownRef, handleCloseWithReset);

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      dropdownRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && filteredOptions.length > 0) {
      setSelectedIndex(selected ? filteredOptions.findIndex((opt) => opt.value === selected) : 0);
    }
  }, [isOpen, filteredOptions, selected]);

  return (
    <>
      <SelectTriggerStyled
        ref={triggerRef}
        css={triggerCss}
        onClick={disabled ? undefined : handleToggle}
        {...props}>
        {trigger}
      </SelectTriggerStyled>

      {isMounted &&
        renderPortal(
          <SelectDropdownStyled
            ref={dropdownRef}
            css={{
              opacity: isOpen ? 1 : 0,
              transition: "opacity 0.2s ease",
              ...css,
            }}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}>
            {label && <SelectLabelStyled>{label}</SelectLabelStyled>}

            {filter && (
              <SelectFilterStyled>
                <Input
                  placeholder="Type to search..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </SelectFilterStyled>
            )}

            {loading ? (
              <SelectLoadingStyled>Loading...</SelectLoadingStyled>
            ) : filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <SelectItemStyled
                  key={option.value}
                  data-focused={selectedIndex === index ? "true" : undefined}
                  data-selected={option.value === selected ? "true" : undefined}
                  onClick={() => handleSelection(option)}
                  onMouseEnter={() => setSelectedIndex(index)}>
                  {option.iconPosition !== "right" && option.icon}
                  <span>{option.label}</span>
                  {option.iconPosition === "right" && option.icon}
                </SelectItemStyled>
              ))
            ) : (
              <SelectEmptyStyled>No matching options</SelectEmptyStyled>
            )}
          </SelectDropdownStyled>,
        )}
    </>
  );
}
