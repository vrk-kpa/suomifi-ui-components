import { css } from '@emotion/core';
import { SuomifiIconProps } from './Icon';

export const iconBaseStyles = ({
  mousePointer = false,
}: SuomifiIconProps) => css`
  display: inline-block;
  vertical-align: baseline;
  transform: translateY(0.1em);
  ${!!mousePointer &&
    `cursor: pointer;
      & * {
        cursor: inherit;
      }
  `}
`;
