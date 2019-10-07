import { css } from 'styled-components';
import { withSuomifiTheme, SuomifiThemeProp } from '../theme';
import { element, font, focus } from '../theme/reset';
import { allStates } from '../../utils/css/pseudo';

export const baseStyles = withSuomifiTheme(
  ({ theme }: SuomifiThemeProp) => css`
  ${element({ theme })}
  ${font({ theme })('bodyText')}
  ${focus({ theme })}
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
`,
);

export const externalStyles = withSuomifiTheme(
  ({ theme }: SuomifiThemeProp) => css`
    & .fi-link_icon {
      padding-left: ${theme.spacing.xs};
      transform: translateY(0.1em);
    }
  `,
);
