// tag, which is either a button or div

import { ReactNode, CSSProperties } from 'react';

import theme from '../styles/theme';

interface TagProps {
  children: ReactNode | JSX.Element;
  css?: CSSProperties;
  cssCollapse?: CSSProperties;
  as?: 'card' | 'button' | 'tag';
  top?: keyof typeof theme.space;
  topCollapse?: keyof typeof theme.space;
  bottom?: keyof typeof theme.space;
  bottomCollapse?: keyof typeof theme.space;
  inline?: keyof typeof theme.space | 'true';
  minimal?: boolean;
}

export default function Tag(props: TagProps): JSX.Element {
  const TagComponent = props.as === 'button' ? 'button' : 'div';

  return (
    <TagComponent className={props.as || 'tag'} style={props.css}>
      {props.children}
      <style jsx>{`
        .card,
        .tag,
        .button,
        button {
          margin-top: ${props.top !== undefined ? theme.space[props.top] : '0'};
          margin-bottom: ${
            props.bottom !== undefined ? theme.space[props.bottom] : '0'
          };
          margin-right: ${props.inline ? theme.space[props.inline] : '0'};
          vertical-align: ${props.inline ? 'middle' : 'initial'};
          background: rgba(0, 0, 0, 0.075);
          border-radius: 0.42rem;
        }

        .card {
          display: block;
          padding: ${props.minimal ? '0' : theme.space[4]};
        }

        .tag {
          display: inline-block;
          padding: ${props.minimal ? '0' : `${theme.space[2]}`};
        }

        .button,
        button {
          display: inline-block;
          width:
          padding: ${props.minimal ? '0' : `${theme.space[1]} ${theme.space[3]}`};
          border: none;
          cursor: pointer;
          border: none;
          color: inherit;
          font: inherit;
          line-height: 1.5;
          overflow: visible;
          user-select: none;
          appearance: none;
          -webkit-tap-highlight-color: transparent;
          font-size: 1.6rem;
          font-weight: 500;
        }
      `}</style>
    </TagComponent>
  );
}
