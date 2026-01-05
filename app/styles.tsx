"use client";

import { useServerInsertedHTML } from "next/navigation";
import { getCssText } from "stoop-ui";

/**
 * Injects SSR-generated CSS into the document head.
 * Prevents FOUC by including critical CSS in the initial HTML.
 */
export function Styles(): null {
  useServerInsertedHTML(() => {
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
