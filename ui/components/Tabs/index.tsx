"use client";

import { createContext, useContext, useState, type JSX, type KeyboardEvent } from "react";

import type { TabsProps, TabListProps, TabTriggerProps } from "./types";

import { TabsStyled, TabListStyled, TabTriggerStyled } from "./styles";

// Context for tab state
interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(): TabsContextValue {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("Tab components must be used within Tabs");
  }

  return context;
}

/**
 * Tabs - Tab navigation component (selectors only)
 *
 * Minimalist tab design inspired by Medusa UI
 * Tabs are just selectors - content is managed separately
 *
 * Examples:
 * <Tabs value="tab1" onValueChange={setValue}>
 *   <Tabs.List>
 *     <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
 *     <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
 *   </Tabs.List>
 * </Tabs>
 */
export function Tabs({
  css,
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  ...props
}: TabsProps): JSX.Element {
  const [internalValue, setInternalValue] = useState(defaultValue || "");
  const value = controlledValue ?? internalValue;

  const handleValueChange = (newValue: string): void => {
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <TabsStyled css={css} {...props}>
        {children}
      </TabsStyled>
    </TabsContext.Provider>
  );
}

/**
 * TabList - Container for tab triggers
 */
function TabList({ css, children, ...props }: TabListProps): JSX.Element {
  return (
    <TabListStyled css={css} role="tablist" {...props}>
      {children}
    </TabListStyled>
  );
}

/**
 * TabTrigger - Individual tab button
 */
function TabTrigger({
  css,
  disabled,
  value,
  children,
  ...props
}: TabTriggerProps): JSX.Element {
  const { value: activeValue, onValueChange } = useTabsContext();
  const isActive = activeValue === value;

  const handleClick = (): void => {
    if (!disabled) {
      onValueChange(value);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>): void => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <TabTriggerStyled
      active={isActive}
      aria-selected={isActive}
      css={css}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="tab"
      {...props}>
      {children}
    </TabTriggerStyled>
  );
}

// Attach sub-components
Tabs.List = TabList;
Tabs.Trigger = TabTrigger;
