import localFont from '@next/font/local';
import { createGlobalStyles } from 'goober/global';


const Standard = localFont({
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
  preload: true,
  src: [
    {
      path: './fonts/standard-bold.woff2',
      style: 'normal',
      weight: '700',
    },
    {
      path: './fonts/standard-bold.woff',
      style: 'normal',
      weight: '700',
    },
    {
      path: './fonts/standard-book.woff2',
      style: 'normal',
      weight: '400',
    },
    {
      path: './fonts/standard-book.woff',
      style: 'normal',
      weight: '400',
    },
  ],
});

export const global = {
  colors: {
    background: '#ffffff',
    border: 'rgb(11, 12, 73)',
    tag: ' rgb(238, 205, 91)',
    tagHover: 'rgb(185, 158, 60)',
    text: 'rgb(24, 16, 17)',
  },
  fontFamily: {
    sansSerif: Standard.style.fontFamily,
  },
  space: {
    1: '0rem',
    2: '0.25rem',
    3: '0.5rem',
    4: '1rem',
    5: '2rem',
    6: '4rem',
    7: '8rem',
  },
};

export const reset = createGlobalStyles`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: ${global.fontFamily.sansSerif};
    line-height: 1.4;
    font-size: 16px;
    color: ${global.colors.text};
    background-color: ${global.colors.background};
  }
  @media screen and (-webkit-min-device-pixel-ratio: 2),
    screen and (min-resolution: 2dppx) {
    body {
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
    }
  }
  * {
    box-sizing: border-box;
  }
  img {
    max-width: 100%;
    display: block;
  }


  a:visited,
  a:active {
    color: ${global.colors.text};
    text-decoration: none;
  }
  a:hover {
    color: ${global.colors.text};
    border-bottom: 0.1rem dashed ${global.colors.border};
  }
  svg {
    vertical-align: middle;
    height: 1rem;
    width: 1rem;
  }
  img.fill {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
`;
