import { css } from 'styled-components';
import { IconBaseProps } from './Icon';

export const iconBaseStyles = ({ mousePointer = false }: IconBaseProps) => css`
  display: inline-block;
  vertical-align: baseline;
  ${!!mousePointer &&
    `cursor: pointer;
      & * {
        cursor: inherit;
      }
  `}
`;
