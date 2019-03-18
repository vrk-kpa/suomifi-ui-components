import { css } from '@emotion/core';
import { suomifiTheme } from '../';
export { font, fontInput, fontSemibold } from './typography';

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
  min-width: 245px;
  max-width: 100%;
  padding: 8px 12px;
  border: 1px solid ${suomifiTheme.colors.elementBorder};
  border-radius: 2px;

  &:focus {
    ${suomifiTheme.outlines.input}
    border-radius: 4px;
  }
`;

export const nav = css`
  ${element}
  display: block;
`;

export const list = css`
  ${element}
  list-style: none;
`;
