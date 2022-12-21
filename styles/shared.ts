import { styled } from "goober";

import { GridProps, TagProps, TextProps } from "../types/shared";

import { global } from "./global";

export const GridStyled = styled('div')((props: GridProps) => ({
  '&.column': {
    display: 'flex',
    flexDirection: 'column',
    flexFlow: 'column wrap',
    paddingLeft: global.space[6],
    paddingRight: global.space[6],
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
      paddingLeft: global.space[5],
      paddingRight: global.space[5],
      width: `${props.widthCollapse || 100}%`,
    },
    '&.row': {
      width: '100% !important',
    },
    'paddingBottom': global.space[props.bottomCollapse || props.bottom || 1],
    'paddingTop': global.space[props.topCollapse || props.top || 1],
  },
  'alignItems': props.flex || 'inherit',
  'justifyContent': props.flex || 'inherit',
  'margin': '0 auto',
  'maxWidth': props.as === 'main' ? '150rem' : 'auto',
  'paddingBottom': global.space[props.bottom || 1],
  'paddingTop': global.space[props.top || 1],
  'position': 'relative',
  'textAlign': props.align || 'initial',
}));

export const TagButtonStyled = styled('button')((props: TagProps) => ({
  '&:focus': {
    outline: 'none',
  },
  '&:hover': {
    background: global.colors.tagHover,
  },
  'WebkitTapHighlightColor': 'transparent',
  'appearance': 'none',
  'background': props.minimal ? 'transparent' : global.colors.tag,
  'border': 'none',
  'color': 'inherit',
  'cursor': 'pointer',
  'font': 'inherit',
  'fontSize': '1.6rem',
  'fontWeight': 'bold',
  'lineHeight': 'inherit',
  'marginRight': global.space[props.inline || 1],
  'overflow': 'visible',
  'padding': props.minimal ? '0' : '0.25rem 0.5rem',

  'userSelect': 'none',

  'verticalAlign': props.inline ? 'middle' : 'initial',
}));

export const TagCardStyled = styled('div')((props: TagProps) => ({
  display: 'block',
  padding: props.minimal ? '0' : global.space[4],
}));

export const TagStyled = styled('div')((props: TagProps) => ({
  background: props.minimal ? 'transparent' : global.colors.tag,
  borderRadius: '0.420rem',
  display: 'inline-block',
  marginRight: props.inline ? global.space[props.inline] : '0',
  padding: props.minimal ? '0' : '0.25rem 0.5rem',
  verticalAlign: props.inline ? 'middle' : 'initial',
  width: 'fit-content',
}));

export const TextStyled = styled('p')((props: TextProps) => ({
  '&:last-child': {
    marginBottom: 0,
  },
  'display': props.inline ? 'inline-block' : 'block',
  'fontStyle': props.italic ? 'italic' : 'normal',
  'fontWeight': props.bold ? 'bold' : 'normal',
  'marginBottom': global.space[props.bottom || 4],
  'marginRight': global.space[props.inline || 1],
  'marginTop': global.space[props.top || 1],
  'textAlign': props.align || 'left',
  'textDecoration': props.underline ? 'underline' : 'none',
  'textTransform': props.transform,
  'verticalAlign': props.inline ? 'middle' : 'initial',
}));