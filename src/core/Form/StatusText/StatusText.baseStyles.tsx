import { css } from 'styled-components';
import { StatusTextProps } from './StatusText';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { font } from '../../theme/reset';

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme & StatusTextProps) => css`
    & .fi-status-text {
      margin-top: ${theme.spacing.xxs};
      ${font({ theme })('bodySemiBoldSmall')};
      font-size: 14px;
      line-height: 20px;
    }
  `,
);
