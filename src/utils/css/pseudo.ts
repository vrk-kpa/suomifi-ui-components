import { css } from 'styled-components';

export const allStates = (styles: string) => css`
  &:hover,
  &:active,
  &:focus,
  &:focus-within {
    ${styles}
  }
`;
