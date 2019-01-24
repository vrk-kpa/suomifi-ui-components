import { css } from '@emotion/core';
import { suomifiTheme } from '../';
export { font } from './typography';

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

export const nav = css`
  ${element}
  display: block;
`;

export const list = css`
  ${element}
  list-style: none;
`;
