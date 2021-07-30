import { css } from 'styled-components';
import { suomifiTheme } from '../../theme';
import { font } from '../../theme/reset';

export const baseStyles = css`
  &.fi-label-text {
    & .fi-label-text_label-span {
      ${font(suomifiTheme)('actionElementInnerTextBold')};
      display: block;
      margin-bottom: ${suomifiTheme.spacing.xs};
      color: ${suomifiTheme.colors.blackBase};

      & .fi-label-text_optionalText {
        ${suomifiTheme.typography.bodyTextSmall};
      }
    }
  }
`;
