import { CSSAttribute } from "goober";
import { ReactNode } from "react";

import { global } from "../styles/global";

export interface GridProps {
  align?: CSSAttribute['textAlign'];
  children: ReactNode | JSX.Element;
  flex?: 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'initial' | 'inherit';
  style?: CSSAttribute;
  width?: number;
  widthCollapse?: number;
  direction?: 'row' | 'column';
  as?: 'div' | 'section' | 'main' | 'header' | 'footer' | 'aside' | 'nav';
  top?: keyof typeof global.space;
  topCollapse?: keyof typeof global.space;
  bottom?: keyof typeof global.space;
  bottomCollapse?: keyof typeof global.space;
}

export interface TagProps {
  children: ReactNode | JSX.Element;
  style?: CSSAttribute;
  as?: 'card' | 'button' | 'tag';
  inline?: keyof typeof global.space;
  minimal?: boolean;
}

export interface TextProps {
  align?: CSSAttribute['textAlign'];
  children: ReactNode;
  style?: CSSAttribute;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'small';
  top?: keyof typeof global.space;
  bottom?: keyof typeof global.space;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  inline?: keyof typeof global.space;
  transform?: CSSAttribute['textTransform'];
}