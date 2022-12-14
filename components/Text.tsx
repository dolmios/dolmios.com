import { CSSAttribute, styled } from 'goober';
import { ReactNode } from 'react';

import theme from '../styles/theme';

interface TextProps {
  align?: CSSAttribute['textAlign'];
  children: ReactNode;
  style?: CSSAttribute;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'small';
  top?: keyof typeof theme.space;
  bottom?: keyof typeof theme.space;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  inline?: keyof typeof theme.space;
  transform?: CSSAttribute['textTransform'];
}

const TextStyled = styled('p')((props: TextProps) => ({
  '&:last-child': {
    marginBottom: 0,
  },
  'display': props.inline ? 'inline-block' : 'block',
  'fontStyle': props.italic ? 'italic' : 'normal',
  'fontWeight': props.bold ? 'bold' : 'normal',
  'marginBottom': theme.space[props.bottom || 4],
  'marginRight': theme.space[props.inline || 1],
  'marginTop': theme.space[props.top || 1],
  'textAlign': props.align || 'left',
  'textDecoration': props.underline ? 'underline' : 'none',
  'textTransform': props.transform,

  'verticalAlign': props.inline ? 'middle' : 'initial',
}));

export function Text(props: TextProps): JSX.Element {
  return (
    <TextStyled as={props.as || 'p'} style={props.style} {...props}>
      {props.children}
    </TextStyled>
  );
}
