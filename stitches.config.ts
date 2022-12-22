import localFont from "@next/font/local";
import { createStitches } from "@stitches/react";

const Standard = localFont({
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  preload: true,
  src: [
    {
      path: "./fonts/standard-bold.woff2",
      style: "normal",
      weight: "700",
    },
    {
      path: "./fonts/standard-bold.woff",
      style: "normal",
      weight: "700",
    },
    {
      path: "./fonts/standard-book.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "./fonts/standard-book.woff",
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
    theme: {
      colors: {
        background: "#ffffff",
        border: "rgba(126, 126, 126, 0.399)",
        tag: " rgb(238, 205, 91)",
        tagHover: "rgb(185, 158, 60)",
        text: "rgb(0, 0, 0)",
      },
      fonts: {
        standard: "Standard, system-ui, sans-serif",
      },
      space: {
        1: "0rem",
        2: "0.25rem",
        3: "0.5rem",
        4: "1rem",
        5: "2rem",
        6: "4rem",
        7: "8rem",
      },
    },
    utils: {
      marginX: (value: unknown) => ({ marginLeft: value, marginRight: value }),
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
    "&:hover": {
      borderBottom: "0.1rem dashed $border",
      color: "$text",
    },
    "&:visited, &:active": {
      color: "$text",
      textDecoration: "none",
    },
    color: "$text",
    textDecoration: "none",
  },
  body: {
    "@media (prefers-color-scheme: dark)": {
      backgroundColor: "$text !important",
      color: "$background !important",
    },
    backgroundColor: "$background",
    color: "$text",
    fontFamily: Standard.style.fontFamily,
    lineHeight: 1.4,
    margin: 0,
    padding: 0,
  },
  code: {
    "*": {
      verticalAlign: "middle",
    },
    border: "1px solid $border",
    borderRadius: "3px",
    padding: "0.2em 0.4em",
    verticalAlign: "middle",
  },

  img: {
    display: "block",
    maxWidth: "100%",
  },

  main: {
    maxWidth: "48rem",
    minWidth: "100%",
  },
  small: {
    fontSize: "15px",
  },
  svg: {
    height: "1rem",
    verticalAlign: "middle",
    width: "1rem",
  },
});
