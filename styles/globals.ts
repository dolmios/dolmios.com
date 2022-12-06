import css from 'styled-jsx/css';

import theme from './theme';

export default css.global`
  html {
    font-size: 62.5%;
  }

  * {
    box-sizing: border-box;
  }

  body {
    background: ${theme.colors.background};
    color: ${theme.colors.text};
    font-family: ${theme.fontFamily.default};
    font-size: 1.5rem;
    line-height: 1.3;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a {
    color: ${theme.colors.text};
    text-decoration: none;
    border-bottom: 1px dashed ${theme.colors.text};
  }
  a:hover {
    text-decoration: none;
  }
  svg,
  img {
    vertical-align: middle;
  }

  img.fill {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
