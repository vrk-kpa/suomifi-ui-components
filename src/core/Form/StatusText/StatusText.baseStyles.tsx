import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { font } from '../../theme/reset';
import { MarginProps, buildSpacingCSS } from '../../theme/utils/spacing';

export const baseStyles = (
  theme: SuomifiTheme,
  globalMargins?: MarginProps,
  propMargins?: MarginProps,
) => css`
  ${font(theme)('bodySemiBoldSmall')};
  color: ${theme.colors.blackBase};
  font-size: 14px;
  line-height: calc(18 / 14);
  ${buildSpacingCSS(globalMargins)}
  ${buildSpacingCSS(propMargins, true)};

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
    &.fi-status-text--success .fi-icon-base-fill {
      fill: ${theme.colors.successBase};
    }
  }
`;
