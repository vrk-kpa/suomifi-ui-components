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

    & .fi-radio-button-group_hintText {
      color: ${theme.colors.depthDark1};
      ${theme.typography.bodyTextSmall};
    }
  }

  & .fi-radio-button_container {
    margin-top: ${theme.spacing.xs};
  }

  & .fi-radio-button_container.fi-radio-button--large {
    margin-top: ${theme.spacing.s};
  }
`;
