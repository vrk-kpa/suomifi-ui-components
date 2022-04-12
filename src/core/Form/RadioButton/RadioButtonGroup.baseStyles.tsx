import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { element, font } from '../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${element(theme)}
  ${font(theme)('bodyText')}

  &.fi-radio-button-group {
    & .fi-radio-button-group_label {
      display: block;
      ${theme.typography.bodySemiBoldSmall};
    }

    & .fi-radio-button-group_label--visible {
      margin-bottom: 10px;
    }

    & .fi-radio-button-group_legend .fi-hint-text {
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
    }
  }
`;
