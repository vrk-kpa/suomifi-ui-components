import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { font } from '../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  &.fi-status-text {
    ${font(theme)('bodySemiBoldSmall')};
    color: ${theme.colors.blackBase};
    font-size: 14px;
    line-height: 20px;
    display: block;

    &.fi-status-text--error {
      color: ${theme.colors.alertBase};
    }
  }
`;
