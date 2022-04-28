import { css } from 'styled-components';

export const staticIconBaseStyles = ({
  highlightColor,
  baseColor,
}: {
  highlightColor?: string;
  baseColor?: string;
}) => css`
  vertical-align: baseline;

  &.fi-static-icon {
    display: inline-block;
  }
  &.fi-icon--cursor-pointer {
    cursor: pointer;
    & * {
      cursor: inherit;
    }
  }

  ${!!highlightColor &&
  `.fi-icon-illustrative-highlight-fill {
    fill: ${highlightColor};
  }
  .fi-icon-illustrative-highlight-stroke {
    stroke: ${highlightColor}
  }
  `}

  ${!!baseColor &&
  `.fi-icon-illustrative-base-fill {
    fill: ${baseColor};
  }
  .fi-icon-illustrative-base-stroke {
    stroke: ${baseColor}
  }
  `}
`;
