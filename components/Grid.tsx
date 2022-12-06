import { ReactNode, CSSProperties } from 'react';

import theme from '../styles/theme';
interface GridProps {
  align?: CSSProperties['textAlign'];
  children: ReactNode | JSX.Element;
  flex?:
    | 'stretch'
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'baseline'
    | 'initial'
    | 'inherit';
  css?: CSSProperties;
  cssCollapse?: CSSProperties;
  width?: number;
  widthCollapse?: number;
  direction?: 'row' | 'column';
  as?: 'div' | 'section' | 'main' | 'header' | 'footer' | 'aside' | 'nav';
  top?: keyof typeof theme.space;
  topCollapse?: keyof typeof theme.space;
  bottom?: keyof typeof theme.space;
  bottomCollapse?: keyof typeof theme.space;
  left?: keyof typeof theme.space;
  leftCollapse?: keyof typeof theme.space;
  right?: keyof typeof theme.space;
  rightCollapse?: keyof typeof theme.space;
  hiddenCollapse?: boolean;
  visibleCollapse?: boolean;
}

export default function Grid(props: GridProps): JSX.Element {
  const GridComponent = props.as || 'div';

  return (
    <GridComponent className={props.direction || 'stack'} style={props.css}>
      {props.children}
      <style jsx>{`
        .row,
        .column,
        .stack {
          position: relative;
          max-width: ${props.as === 'main' ? '150rem' : 'auto'};
          text-align: ${props.align || 'initial'};
          padding-top: ${props.top !== undefined ? theme.space[props.top] : '0'};
          padding-bottom: ${
            props.bottom !== undefined ? theme.space[props.bottom] : '0'
          };
          padding-left: ${props.left !== undefined ? theme.space[props.left] : '0'};
          padding-right: ${props.right !== undefined ? theme.space[props.right] : '0'};
            ...props.css,
        }

        .row {
          display: flex;
          flex-direction: row;
          flex-flow: row wrap;
          align-items: ${props.flex || 'initial'};
          justify-content: ${props.flex || 'initial'};
          width: 100%;
          min-width: 100%;
          margin: 0 auto;
        }

        .column {
          display: flex;
          flex-direction: column;
          flex-flow: column wrap;
          align-items: ${props.flex || 'initial'};
          justify-content: ${props.flex || 'initial'};
          width: ${props.width !== undefined ? `${props.width}%` : '100%'};
          margin: 0 auto;
        }

        @media only screen and (max-width: 768px) {
          .row,
          .column,
          .stack {
            display: ${props.hiddenCollapse ? 'none' : 'initial'};
            padding-top: ${
              props.topCollapse
                ? `${props.topCollapse}rem`
                : props.top !== undefined
                ? `${props.top}rem`
                : '0'
            };

            padding-bottom: ${
              props.bottomCollapse
                ? `${props.bottomCollapse}rem`
                : props.bottom !== undefined
                ? `${props.bottom}rem`
                : '0'
            };

            padding-left: ${
              props.leftCollapse
                ? `${props.leftCollapse}rem`
                : props.left !== undefined
                ? `${props.left}rem`
                : 'inherit'
            };

            padding-right: ${
              props.rightCollapse
                ? `${props.rightCollapse}rem`
                : props.right !== undefined
                ? `${props.right}rem`
                : 'inherit'
            };

            width: ${
              props.widthCollapse !== undefined ? `${props.widthCollapse}%` : '100%'
            };
            margin: 0 auto;

            ...props.cssCollapse,


          }

        }
      `}</style>
    </GridComponent>
  );
}
