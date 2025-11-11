// Provider components and utilities (SSR-optimized for Next.js App Router & Pages Router)
export {
  StoopProvider,
  useStoopConfig,
  useTheme,
  StoopContext,
  type StoopProviderProps,
  type StoopProviderConfig,
} from "./StoopProvider";

export { createGlobalStyles, injectGlobalStyles } from "./GlobalStyles";
export { injectCriticalCSS, getCriticalCSS, criticalCSS } from "./CriticalStyles";
export { useHydration, useLocalStorage } from "./useHydration";

// SSR utilities for Next.js
export type { ThemeName, Theme } from "../../styles/types";
