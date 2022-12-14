import localFont from '@next/font/local';

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

const theme = {
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

export default theme;
