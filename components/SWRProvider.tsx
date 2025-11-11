'use client';

import type { JSX, ReactNode } from "react";

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

export function SWRProvider({ children }: { children: ReactNode }): JSX.Element {
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
