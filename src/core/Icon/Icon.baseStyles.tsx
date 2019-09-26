import { css } from 'styled-components';
import { SuomifiIconProps } from './Icon';

export const iconBaseStyles = ({
  mousePointer = false,
}: SuomifiIconProps) => css`
  display: inline-block;
  vertical-align: baseline;
  ${!!mousePointer &&
    `cursor: pointer;
      & * {
        cursor: inherit;
      }
  `}
`;
