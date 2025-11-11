import { useEffect, useState } from "react";

/**
 * Hook to detect when React has finished hydrating
 * Prevents layout shift by managing rendering states
 */
export function useHydration(): boolean {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // This effect only runs client-side after hydration
    setIsHydrated(true);
  }, []);

  return isHydrated;
}

/**
 * Hook to safely access localStorage during SSR
 * Returns null during SSR to prevent hydration mismatches
 */
export function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Return default during SSR
    if (typeof window === "undefined") {
      return defaultValue;
    }

    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);

      return defaultValue;
    }
  });

  const setValue = (value: T): void => {
    try {
      setStoredValue(value);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
