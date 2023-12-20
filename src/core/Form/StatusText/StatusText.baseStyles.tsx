import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { font } from '../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${font(theme)('bodySemiBoldSmall')};
  color: ${theme.colors.blackBase};
  font-size: 14px;
  line-height: 20px;

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
