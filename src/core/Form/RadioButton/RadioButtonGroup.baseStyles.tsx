import { css } from 'styled-components';
import { suomifiTheme } from '../../theme';
import { element, font } from '../../theme/reset';

export const baseStyles = css`
  ${element(suomifiTheme)}
  ${font(suomifiTheme)('bodyText')}

    &.fi-radio-button-group {
    & .fi-radio-button-group_label {
      display: block;
      ${suomifiTheme.typography.bodySemiBoldSmall};
    }

    & .fi-radio-button-group_hintText {
      color: ${suomifiTheme.colors.depthDark1};
      ${suomifiTheme.typography.bodyTextSmall};
    }
  }

  & .fi-radio-button_container {
    margin-top: ${suomifiTheme.spacing.xs};
  }

  & .fi-radio-button_container.fi-radio-button--large {
    margin-top: ${suomifiTheme.spacing.s};
  }
`;
