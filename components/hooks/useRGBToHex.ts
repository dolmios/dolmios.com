import { useEffect, useState } from "react";

export const useRGBToHex = (
  rgb: string
): {
  hex: string;
} => {
  const [hex, setHex] = useState<string>("");

  useEffect(() => {
    const rgbArr = rgb
      .replace("rgb(", "")
      .replace(")", "")
      .split(",")
      .map((n) => parseInt(n, 10));

    const hexArr = rgbArr.map((n) => {
      const hex = n.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    });

    setHex(`#${hexArr.join("")}`);
  }, [rgb]);

  return { hex };
};
