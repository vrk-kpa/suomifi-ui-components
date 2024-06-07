import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { font } from '../../theme/reset';
import { cssValueToString } from '../../../utils/css';

export const baseStyles = (theme: SuomifiTheme) => css`
  font-size: ${cssValueToString(
    theme.values.typography.bodyTextSmall.fontSize,
  )};
  &.fi-breadcrumb-link {
    display: inline-block;

    & .fi-breadcrumb-link_link {
      ${font(theme)('bodyTextSmall')}
      margin: 0;

      &:hover,
      &:active {
        text-decoration: underline;
      }

      &--initial-underline {
        text-decoration: underline;

        &:focus,
        &:focus-within {
          text-decoration: underline;
        }

        &:hover,
        &:active {
          text-decoration: none;
        }
      }

      &--current {
        color: ${theme.colors.depthDark1};
        text-decoration: none;

        &:hover,
        &:active {
          text-decoration: none;
        }
      }
    }

    & .fi-breadcrumb-link_icon {
      transform: translateY(0.2em);
      margin: 0 ${theme.spacing.insetXs};
      & .fi-icon-base-fill {
        fill: ${theme.colors.depthDark1};
      }
    }
  }
`;
