import { CSSAttribute, styled } from 'goober';
import { ReactNode } from 'react';

import theme from '../styles/theme';
interface GridProps {
  align?: CSSAttribute['textAlign'];
  children: ReactNode | JSX.Element;
  flex?: 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'initial' | 'inherit';
  style?: CSSAttribute;
  width?: number;
  widthCollapse?: number;
  direction?: 'row' | 'column';
  as?: 'div' | 'section' | 'main' | 'header' | 'footer' | 'aside' | 'nav';
  top?: keyof typeof theme.space;
  topCollapse?: keyof typeof theme.space;
  bottom?: keyof typeof theme.space;
  bottomCollapse?: keyof typeof theme.space;
}

const GridStyled = styled('div')((props: GridProps) => ({
  '&.column': {
    display: 'flex',
    flexDirection: 'column',
    flexFlow: 'column wrap',
    paddingLeft: theme.space[6],
    paddingRight: theme.space[6],
    width: `${props.width || 100}%`,
  },
  '&.row': {
    display: 'flex',
    flexDirection: 'row',
    flexFlow: 'row wrap',
    minWidth: '100%',
    width: '100%',
  },
  '@media (max-width: 900px)': {
    '&.column': {
      paddingLeft: theme.space[5],
      paddingRight: theme.space[5],
      width: `${props.widthCollapse || 100}%`,
    },
    '&.row': {
      width: '100% !important',
    },
    'paddingBottom': theme.space[props.bottomCollapse || props.bottom || 1],
    'paddingTop': theme.space[props.topCollapse || props.top || 1],
  },
  'alignItems': props.flex || 'inherit',
  'justifyContent': props.flex || 'inherit',
  'margin': '0 auto',
  'maxWidth': props.as === 'main' ? '150rem' : 'auto',
  'paddingBottom': theme.space[props.bottom || 1],
  'paddingTop': theme.space[props.top || 1],
  'position': 'relative',
  'textAlign': props.align || 'initial',
}));

export function Grid(props: GridProps): JSX.Element {
  return (
    <GridStyled className={props.direction} style={props.style} as={props.as || 'div'} {...props}>
      {props.children}
    </GridStyled>
  );
}
