import { css } from '@emotion/core';
import { suomifiTheme } from '../';
import { focus as focusUtil } from '../utils/focus';
export { font, fontSemibold, fontInput, fontPanelTitle } from './typography';

export const focus = focusUtil({ theme: suomifiTheme });

export const element = css`
  color: ${suomifiTheme.colors.blackBase};
`;

export const input = css`
  ${element}
  ${focus}
  min-width: 245px;
  max-width: 100%;
  padding: 8px 12px;
  border: 1px solid ${suomifiTheme.colors.depthBase};
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

export const listItem = css`
  ${element}
  list-style: none;
`;
