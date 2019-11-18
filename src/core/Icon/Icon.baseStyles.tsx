import { css } from 'styled-components';
import { IconProps } from './Icon';

export const iconBaseStyles = ({ mousePointer = false }: IconProps) => css`
  display: inline-block;
  vertical-align: baseline;
  ${!!mousePointer &&
    `cursor: pointer;
      & * {
        cursor: inherit;
      }
  `}
`;
