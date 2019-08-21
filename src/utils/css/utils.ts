import { css } from 'styled-components';

export const clearfix = css`
  &:after {
    display: block;
    content: '';
    clear: both;
  }
`;
