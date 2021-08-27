import { css } from 'styled-components';
import { SuomifiTheme } from '../theme';
import { element, font } from '../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  &.fi-alert {
    border-left: 5px solid ${theme.colors.alertBase};
    padding-left: 10px;
    background-color: ${theme.colors.alertLight1};
  }

  & .fi-alert-label {
    font-weight: 600;
  }

  ${element(theme)}
  ${font(theme)('bodyText')}
`;
