import { css } from '@emotion/core';

export const allStates = (styles: string) => css`
  &:hover,
  &:active,
  &:focus,
  &:focus-within,
  &:visited {
    ${styles}
  }
`;

export const afterAbsolute = css`
  position: relative;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
`;
