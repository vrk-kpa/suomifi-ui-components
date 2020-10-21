import { css } from 'styled-components';
import { StatusTextProps } from './StatusText';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { font } from '../../theme/reset';

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme & StatusTextProps) => css`
    &.fi-status-text {
      margin-top: ${theme.spacing.xxs};
      ${font({ theme })('bodySemiBoldSmall')};
      color: ${theme.colors.blackBase};
      font-size: 14px;
      line-height: 20px;

      &.fi-status-text--error {
        color: ${theme.colors.alertBase};
      }
    }
  `,
);
