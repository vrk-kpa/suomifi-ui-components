import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { element, fixInternalMargins, font } from '../../theme/reset';
import { MarginProps, buildSpacingCSS } from '../../theme/utils/spacing';

export const baseStyles = (
  theme: SuomifiTheme,
  globalMargins?: MarginProps,
  propMargins?: MarginProps,
) => css`
  ${element(theme)}
  ${font(theme)('bodyText')}
  ${buildSpacingCSS(globalMargins)}
  ${buildSpacingCSS(propMargins, true)}
  ${fixInternalMargins()}

  &.fi-radio-button-group {
    & .fi-radio-button-group_legend {
      &--with-margin {
        margin-bottom: ${theme.spacing.xs};
      }
      .fi-hint-text {
        margin-bottom: 0;
      }
    }

    & .fi-radio-button-group_label {
      display: block;
      ${theme.typography.bodySemiBoldSmall};
    }

    & .fi-radio-button-group_label--with-margin {
      margin-bottom: ${theme.spacing.xs};
    }

    & .fi-radio-button-group_hintText {
      color: ${theme.colors.depthDark1};
      ${theme.typography.bodyTextSmall};
    }

    & .fi-status-text {
      line-height: calc(18 / 14);
      &.fi-radio-button-group_statusText--has-content {
        margin-top: ${theme.spacing.xxs};
        padding-left: 3px;
      }
    }
  }

  & .fi-radio-button-group_container {
    & > .fi-radio-button {
      margin: 0;
      margin-bottom: ${theme.spacing.xs};

      &:last-child {
        margin-bottom: 0;
      }

      &--large {
        margin-bottom: ${theme.spacing.s};

        &:first-child {
          margin-top: ${theme.spacing.xxs};
        }
      }
    }
  }
`;
