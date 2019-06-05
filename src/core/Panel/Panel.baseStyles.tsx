import { css } from '@emotion/core';
import { suomifiTheme } from '../theme';
import { PanelProps } from './Panel';
import { element, fonts } from '../theme/reset';

export const baseStyles = ({ theme = suomifiTheme }: PanelProps) => css`
  ${element}
  ${fonts(theme).body}
  padding: ${theme.spacing.m};
  background-color: ${theme.colors.whiteBase};
`;
