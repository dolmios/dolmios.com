import { CSSProperties, ReactNode } from 'react';

import theme from '../styles/theme';

interface TextProps {
  align?: CSSProperties['textAlign'];
  children: ReactNode | JSX.Element;
  css?: CSSProperties;
  cssCollapse?: CSSProperties;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'small';
  top?: keyof typeof theme.space;
  topCollapse?: keyof typeof theme.space;
  bottom?: keyof typeof theme.space;
  bottomCollapse?: keyof typeof theme.space;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  inline?: keyof typeof theme.space | boolean;
  transform?: CSSProperties['textTransform'];
  accent?: boolean;
}

export default function Text(props: TextProps): JSX.Element {
  const TextComponent = props.as || 'p';

  return (
    <TextComponent className='text' style={props.css}>
      {props.children}
      <style jsx>{`
        .text {
          display: ${props.inline ? 'inline-block' : 'block'};
          margin-top: ${props.top !== undefined ? `${props.top}rem` : '0'};
          margin-bottom: ${props.bottom !== undefined
            ? `${props.bottom}rem`
            : props.inline
            ? '0'
            : props.as === ('h1' || 'h2' || 'h3')
            ? theme.space[3]
            : props.as === ('h4' || 'h5' || 'h6' || 'p')
            ? theme.space[2]
            : '0'};
          margin-right: ${props.inline ? `${props.inline}rem` : '0'};
          font-weight: ${props.bold ? 'bold' : 'initial'};
          font-style: ${props.italic ? 'italic' : 'initial'};
          text-decoration: ${props.underline ? 'underline' : 'initial'};
          text-align: ${props.align || 'inherit'};
          text-transform: ${props.transform || 'initial'};
          vertical-align: ${props.inline ? 'middle' : 'initial'};
        }

        .text:last-child {
          margin-bottom: 0 !important;
        }
      `}</style>
    </TextComponent>
  );
}
