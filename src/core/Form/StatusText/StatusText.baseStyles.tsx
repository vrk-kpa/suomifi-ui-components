import { css } from 'styled-components';
import { suomifiTheme } from '../../theme';
import { font } from '../../theme/reset';

export const baseStyles = css`
  &.fi-status-text {
    ${font(suomifiTheme)('bodySemiBoldSmall')};
    color: ${suomifiTheme.colors.blackBase};
    font-size: 14px;
    line-height: 20px;

    &.fi-status-text--error {
      color: ${suomifiTheme.colors.alertBase};
    }

    &.fi-status-text--hasContent {
      margin-top: ${suomifiTheme.spacing.xxs};
    }
  }
`;
