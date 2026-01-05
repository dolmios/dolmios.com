"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "stoop-ui";
import { SWRConfig } from "swr";

const fetcher = async (url: string): Promise<unknown> => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.message = await res.text();
    throw error;
  }

  return res.json();
};

export function Providers({ 
  children,
  initialTheme,
}: { 
  children: ReactNode;
  initialTheme: string;
}): ReactNode {
  return (
    <ThemeProvider 
      cookieKey="dolmios-theme"
      defaultTheme={initialTheme} 
      storageKey="dolmios-theme">
      <SWRConfig
        value={{
          fetcher,
          revalidateOnFocus: true,
          revalidateOnReconnect: true,
        }}>
        {children}
      </SWRConfig>
    </ThemeProvider>
  );
}
