import { css } from '@emotion/core';
import { suomifiTheme } from '../theme';
import { LinkProps } from './Link';
import { element, font } from '../theme/reset';
import { allStates } from '../../utils/css/pseudo';

export const baseStyles = ({ theme = suomifiTheme }: LinkProps) => css`
  ${element}
  ${font}
  ${allStates(`color: ${theme.colors.highlightBase};`)};
  color: ${theme.colors.highlightBase};
  text-decoration: none;
  &:hover,
  &:active {
    text-decoration: underline;
  }
`;
