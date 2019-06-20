import { css } from '@emotion/core';
import { suomifiTheme } from '../theme';
import { LinkProps } from './Link';
import { element, fonts, focus } from '../theme/reset';
import { allStates } from '../../utils/css/pseudo';

export const baseStyles = ({ theme = suomifiTheme }: LinkProps) => css`
  ${element(theme)}
  ${fonts(theme).body}
  ${focus(theme)}
  ${allStates(`color: ${theme.colors.highlightBase};`)};
  color: ${theme.colors.highlightBase};
  text-decoration: none;
  &:hover,
  &:active,
  &:focus,
  &:focus-within {
    text-decoration: underline;
  }
  &:visited {
    color: ${theme.colors.accentTertiaryDark9};
  }
`;

export const externalStyles = ({ theme = suomifiTheme }: LinkProps) => css`
  & .fi-link_icon {
    padding-left: ${theme.spacing.xs};
  }
`;
