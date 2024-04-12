import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { element, font } from '../../theme/reset';
import { MarginProps, buildSpacingCSS } from '../../theme/utils/spacing';

export const baseStyles = (theme: SuomifiTheme, margins?: MarginProps) => css`
  ${element(theme)}
  ${font(theme)('bodyText')}
  ${buildSpacingCSS(margins)}

  &.fi-radio-button-group {
    & .fi-radio-button-group_legend {
      margin-bottom: 10px;

      .fi-hint-text {
        margin-bottom: 0;
      }
    }

    & .fi-radio-button-group_label {
      display: block;
      ${theme.typography.bodySemiBoldSmall};
    }

    & .fi-radio-button-group_label--with-margin {
      margin-bottom: 10px;
    }

    & .fi-radio-button-group_hintText {
      color: ${theme.colors.depthDark1};
      ${theme.typography.bodyTextSmall};
    }
  }

  & .fi-radio-button-group_container {
    & > .fi-radio-button {
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
