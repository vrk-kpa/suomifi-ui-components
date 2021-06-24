import { css } from 'styled-components';

export const staticIconBaseStyles = ({
  highlightColor,
  baseColor,
}: {
  highlightColor?: string;
  baseColor?: string;
}) => css`
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
