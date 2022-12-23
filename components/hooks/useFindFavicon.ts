import { useState, useEffect } from "react";

export const useFaviconFetch = (url: string): string | null => {
  const [favicon, setFavicon] = useState<string | null>(null);

  useEffect(() => {
    const faviconUrl = `${url}/favicon.ico`;
    const appleTouchUrl = `${url}/apple-touch-icon.png`;

    const img = new Image();
    img.onload = (): void => setFavicon(img.src);
    img.onerror = (): void => setFavicon(null);
    img.src = faviconUrl;

    const appleTouchImg = new Image();
    appleTouchImg.onload = (): void => setFavicon(appleTouchImg.src);
    appleTouchImg.onerror = (): void => setFavicon(null);
    appleTouchImg.src = appleTouchUrl;
  }, [url]);

  return favicon;
};
