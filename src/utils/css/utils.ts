import { css } from '@emotion/core';

export const clearfix = css`
  &:after {
    display: block;
    content: '';
    clear: both;
  }
`;
