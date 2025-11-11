// Stoop UI Library - Main exports

// Provider (wrap your app with this)
export * from "./components/Provider";

// Core styling system
export * from "./styles";

// Utility hooks (including floating UI)
export * from "./hooks";

// All components (modular structure)
export {
  Stack,
  Section,
  Text,
  Button,
  Badge,
  Card,
  Input,
  Textarea,
  Tabs,
  Menu,
  Select,
  Popover,
  Modal,
  StoopProvider,
} from "./components";

// Additional exports
export { useTheme } from "./components/Provider";
export type {
  StackProps,
  SectionProps,
  TextProps,
  TextElement,
  ButtonProps,
  BadgeProps,
  CardProps,
  InputProps,
  TextareaProps,
  TabsProps,
  TabListProps,
  TabTriggerProps,
  MenuProps,
  MenuOption,
  SelectProps,
  SelectOption,
  PopoverProps,
  ModalProps,
} from "./components";
