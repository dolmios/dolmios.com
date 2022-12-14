import { createGlobalStyles } from 'goober/global';

import theme from './theme';

export const GlobalStyles = createGlobalStyles`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: ${theme.fontFamily.sansSerif};
    line-height: 1.4;
    font-size: 16px;
    color: ${theme.colors.text};
    background-color: ${theme.colors.background};
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
    color: ${theme.colors.text};
    text-decoration: none;
  }
  a:hover {
    color: ${theme.colors.text};
    border-bottom: 0.1rem dashed ${theme.colors.border};
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
