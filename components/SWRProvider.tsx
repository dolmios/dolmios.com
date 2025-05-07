'use client';

import { SWRConfig } from "swr";
import type { ReactNode } from "react";

const fetcher = async (url: string): Promise<unknown> => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.message = await res.text();
    throw error;
  }

  return res.json();
};

export function SWRProvider({ children }: { children: ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
      }}>
      {children}
    </SWRConfig>
  );
} 