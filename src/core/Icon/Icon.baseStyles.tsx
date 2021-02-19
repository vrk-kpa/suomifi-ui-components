import { css } from 'styled-components';

export const iconBaseStyles = ({
  highlightColor,
}: {
  highlightColor?: string;
}) => css`
  display: inline-block;
  vertical-align: baseline;
  ${!!highlightColor &&
  `.fi-icon-illustative-highlight-fill {
    fill: ${highlightColor};
  }
  .fi-icon-illustative-highlight-stroke {
    stroke: ${highlightColor}
  }
  `}
  &.fi-icon--cursor-pointer {
    cursor: pointer;
    & * {
      cursor: inherit;
    }
  }
`;
