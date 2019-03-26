import { css } from '@emotion/core';
import { suomifiTheme } from '../';
import { focus as focusUtil } from '../utils/focus';
export { font, fontSemibold, fontInput, fontPanelTitle } from './typography';

export const focus = focusUtil({ theme: suomifiTheme });

export const element = css`
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  color: ${suomifiTheme.colors.text};
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
`;

export const input = css`
  ${element}
  ${focus}
  min-width: 245px;
  max-width: 100%;
  padding: 8px 12px;
  border: 1px solid ${suomifiTheme.colors.elementBorder};
  border-radius: 2px;
`;

export const nav = css`
  ${element}
  display: block;
`;

export const list = css`
  ${element}
  list-style: none;
`;
