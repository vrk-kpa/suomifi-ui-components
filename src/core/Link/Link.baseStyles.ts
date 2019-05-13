import { css } from '@emotion/core';
import { suomifiTheme } from '../theme';
import { LinkProps } from './Link';
import { element, fonts, focus } from '../theme/reset';
import { allStates } from '../../utils/css/pseudo';

export const baseStyles = ({ theme = suomifiTheme }: LinkProps) => css`
  ${element}
  ${fonts.body}
  ${focus}
  ${allStates(`color: ${theme.colors.highlightBase};`)};
  color: ${theme.colors.highlightBase};
  text-decoration: none;
  &:hover,
  &:active {
    text-decoration: underline;
  }
`;
