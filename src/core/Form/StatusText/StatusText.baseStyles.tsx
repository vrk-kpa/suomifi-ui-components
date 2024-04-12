import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { font } from '../../theme/reset';
import { MarginProps, buildSpacingCSS } from '../../theme/utils/spacing';

export const baseStyles = (theme: SuomifiTheme, margins?: MarginProps) => css`
  ${font(theme)('bodySemiBoldSmall')};
  color: ${theme.colors.blackBase};
  font-size: 14px;
  line-height: 20px;
  ${buildSpacingCSS(margins)};

  &.fi-status-text {
    display: block;
    &.fi-status-text--error {
      color: ${theme.colors.alertBase};
    }
    & .fi-icon {
      vertical-align: middle;
      transform: translateY(-0.1em);
      margin-right: ${theme.spacing.xxs};
    }
  }
`;
