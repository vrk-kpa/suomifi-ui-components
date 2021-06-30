import { css } from 'styled-components';

export const iconBaseStyles = css`
  display: inline-block;
  vertical-align: baseline;

  &.fi-icon--cursor-pointer {
    cursor: pointer;
    & * {
      cursor: inherit;
    }
  }
`;
