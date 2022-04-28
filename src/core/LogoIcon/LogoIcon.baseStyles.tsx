import { css } from 'styled-components';

export const logoIconBaseStyles = () => css`
  display: inline-block;
  vertical-align: baseline;

  &.fi-icon--cursor-pointer {
    cursor: pointer;
    & * {
      cursor: inherit;
    }
  }
`;
