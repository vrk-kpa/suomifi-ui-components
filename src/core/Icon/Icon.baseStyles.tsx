import { css } from 'styled-components';

export const iconBaseStyles = ({ color }: { color?: string }) => css`
  display: inline-block;
  vertical-align: baseline;

  ${!!color &&
  `.fi-icon-base-fill {
    fill: ${color};
  }
  .fi-icon-base-stroke {
    stroke: ${color}
  }`}

  &.fi-icon--cursor-pointer {
    cursor: pointer;
    & * {
      cursor: inherit;
    }
  }
`;
