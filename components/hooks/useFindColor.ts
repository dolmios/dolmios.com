import { useEffect, useState } from "react";

export const useFindColor = (
  src: string
): {
  dominantColor: string;
  textColor: string;
} => {
  const [dominantColor, setDominantColor] = useState<string>("");
  const [textColor, setTextColor] = useState<string>("");

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.crossOrigin = "Anonymous";
    img.src = src;

    img.onload = (): void => {
      canvas.height = img.height;
      canvas.width = img.width;

      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, 10, 1).data;
      const rgb = data[0] + "," + data[1] + "," + data[2];
      setDominantColor(`rgb(${rgb})`);

      const luminance = 0.2126 * data[0] + 0.7152 * data[1] + 0.0722 * data[2];
      setTextColor(luminance > 128 ? "rgb(0,0,0)" : "rgb(255, 255, 255)");
    };
  }, [src]);

  return { dominantColor, textColor };
};
