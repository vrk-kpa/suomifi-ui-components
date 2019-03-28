import { css } from '@emotion/core';
import { SuomifiIconProps } from './Icon';

export const iconBaseStyles = ({
  mousePointer = false,
}: SuomifiIconProps) => css`
  display: inline-block;
  vertical-align: text-bottom;
  ${!!mousePointer && 'cursor: pointer;'}
`;
