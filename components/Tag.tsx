import { CSSAttribute, styled } from 'goober';
import { ReactNode } from 'react';

import theme from '../styles/theme';

interface TagProps {
  children: ReactNode | JSX.Element;
  style?: CSSAttribute;
  as?: 'card' | 'button' | 'tag';
  inline?: keyof typeof theme.space;
  minimal?: boolean;
}

const TagButtonStyled = styled('button')((props: TagProps) => ({
  '&:focus': {
    outline: 'none',
  },
  '&:hover': {
    background: theme.colors.tagHover,
  },
  'WebkitTapHighlightColor': 'transparent',
  'appearance': 'none',
  'background': props.minimal ? 'transparent' : theme.colors.tag,
  'border': 'none',
  'color': 'inherit',
  'cursor': 'pointer',
  'font': 'inherit',
  'fontSize': '1.6rem',
  'fontWeight': 'bold',
  'lineHeight': 'inherit',
  'marginRight': theme.space[props.inline || 1],
  'overflow': 'visible',
  'padding': props.minimal ? '0' : '0.25rem 0.5rem',

  'userSelect': 'none',

  'verticalAlign': props.inline ? 'middle' : 'initial',
}));

const TagCardStyled = styled('div')((props: TagProps) => ({
  display: 'block',
  padding: props.minimal ? '0' : theme.space[4],
}));

const TagStyled = styled('div')((props: TagProps) => ({
  background: props.minimal ? 'transparent' : theme.colors.tag,
  borderRadius: '0.420rem',
  display: 'inline-block',
  marginRight: props.inline ? theme.space[props.inline] : '0',
  padding: props.minimal ? '0' : '0.25rem 0.5rem',
  verticalAlign: props.inline ? 'middle' : 'initial',
  width: 'fit-content',
}));

export function Tag(props: TagProps): JSX.Element {
  const TagComponent = props.as === 'button' ? TagButtonStyled : props.as === 'card' ? TagCardStyled : TagStyled;

  return (
    <TagComponent
      style={{
        ...props.style,
      }}
      {...props}>
      {props.children}
    </TagComponent>
  );
}
