import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../theme';
import { element, font } from '../theme/reset';
import { allStates } from '../../utils/css';
import { boxShadowFocus } from '../theme/utils/focus';

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
    ${element({ theme })}
    ${font({ theme })('bodyText')}
  ${allStates(`color: ${theme.colors.highlightBase};`)};
    color: ${theme.colors.highlightBase};
    text-decoration: none;

    &:focus,
    &:focus-within {
      text-decoration: none;
    }

    &:focus {
      ${boxShadowFocus}
    }

    &:hover,
    &:active {
      text-decoration: underline;
    }
    &:visited {
      color: ${theme.colors.accentTertiaryDark1};
    }
  `,
);

export const externalStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
    & .fi-link_icon {
      padding-left: ${theme.spacing.insetXs};
      transform: translateY(0.1em);
    }
  `,
);

export const skipLinkStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
    &.fi-link--skip {
      position: absolute;
      z-index: 10000;
      left: -1000px;
      margin: ${theme.spacing.insetXl};
      padding: ${theme.spacing.insetM};
      background: ${theme.colors.highlightLight3};
      border: 1px solid ${theme.colors.depthLight1};
      color: ${theme.colors.blackBase};
      text-decoration: none;
    }

    &.fi-link--skip:focus {
      position: absolute;
      left: auto;
    }
  `,
);
