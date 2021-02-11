import { css } from 'styled-components';
import { IconBaseProps } from './Icon';

export const iconBaseStyles = ({
  mousePointer = false,
  highlightColor,
}: IconBaseProps & { highlightColor?: string }) => css`
  display: inline-block;
  vertical-align: baseline;
  ${!!mousePointer &&
  `cursor: pointer;
      & * {
        cursor: inherit;
      }
  `}
  ${!!highlightColor &&
  `.fi-icon-illustative-highlight-fill {
    fill: ${highlightColor};
  }
  .fi-icon-illustative-highlight-stroke {
    stroke: ${highlightColor}
  }
  `}
`;
