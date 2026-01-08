/* eslint-disable react/no-danger */
"use client";

import { useServerInsertedHTML } from "next/navigation";
import { useRef } from "react";
import { getCssText } from "stoop-ui";

/**
 * Injects SSR-generated CSS into the document head.
 * Prevents FOUC by including critical CSS in the initial HTML.
 */
export function Styles(): null {
  const isInjected = useRef(false);

  useServerInsertedHTML(() => {
    // Prevent multiple injections during SSR streaming
    if (isInjected.current) {
      return null;
    }

    isInjected.current = true;
    const cssText = getCssText();

    if (!cssText) {
      return null;
    }

    return (
      <style
        dangerouslySetInnerHTML={{ __html: cssText }}
        id="stoop-ssr"
        suppressHydrationWarning
      />
    );
  });

  return null;
}
