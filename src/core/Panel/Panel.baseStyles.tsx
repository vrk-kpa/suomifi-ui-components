import { css } from '@emotion/core';
import { suomifiTheme } from '../theme';
import { PanelProps } from './Panel';
import { element, font } from '../theme/reset';

export const baseStyles = ({ theme = suomifiTheme }: PanelProps) => css`
  ${element}
  ${font}
  padding: 20px;
  background-color: ${theme.colors.white};
`;
