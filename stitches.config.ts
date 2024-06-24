import { createStitches } from "@stitches/react";
import localFont from "next/font/local";

const Standard = localFont({
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  preload: true,
  src: [
    {
      path: "./public/fonts/standard-bold.woff2",
      style: "normal",
      weight: "700",
    },
    {
      path: "./public/fonts/standard-book.woff2",
      style: "normal",
      weight: "400",
    },
  ],
});

export const { styled, css, globalCss, keyframes, getCssText, theme, createTheme, config } =
  createStitches({
    media: {
      bp1: "(min-width: 480px)",
    },
    prefix: "dolmios",
    theme: {
      colors: {
        background: "#ffffff",
        border: "rgba(140, 140, 140, 0.447)",
        text: "rgb(0, 0, 0)",
      },
      fonts: {
        standard: "Standard, system-ui, sans-serif",
      },
      radii: {
        1: "7px",
      },
      shadows: {
        1: "0 1px 1px 1px rgba(0, 0, 0, 0.05)",
      },
      space: {
        1: "0rem",
        2: "4px",
        3: "8px",
        4: "16px",
        5: "32px",
        6: "64px",
      },
    },
  });

export const globalStyles = globalCss({
  "*, *::before, *::after": {
    boxSizing: "border-box",
    marginBlock: 0,
    paddingBlock: 0,
  },
  ".fill": {
    height: "100%",
    objectFit: "cover",
    width: "100%",
  },
  "@media screen and (-webkit-min-device-pixel-ratio: 2), screen and (min-resolution: 2dppx)": {
    body: {
      MozOsxFontSmoothing: "grayscale",
      WebkitFontSmoothing: "antialiased",
    },
  },
  a: {
    "&:hover, :hover": {
      color: "inherit",
      opacity: 0.5,
    },
    "&:visited, &:active": {
      color: "inherit",
    },
    color: "inherit",
    textDecoration: "none",
    wordBreak: "break-word",
    overflowWrap: "break-word",
    hyphens: "auto",
  },

  body: {
    "@media (prefers-color-scheme: dark)": {
      backgroundColor: "$text !important",
      color: "$background !important",
    },
    backgroundColor: "$background",
    color: "$text",
    fontFamily: Standard.style.fontFamily,
    fontSize: "18px",
    lineHeight: 1.4,
    margin: 0,
    padding: 0,
  },

  img: {
    display: "block",
    maxWidth: "100%",
  },

  main: {
    maxWidth: "48rem",
    minWidth: "100%",
    margin: "0 auto",
  },

  small: {
    display: "block",
    fontSize: "10px",
    opacity: 0.75,
  },

  svg: {
    display: "inline-block",
    height: "14px",
    verticalAlign: "middle",
    width: "14px",
    alignContent: "center",
  },
  header: {
    a: {
      borderBottom: "none",
    },
  },
});
