import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { element, font } from '../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${element(theme)}
  ${font(theme)('bodyText')}

  & .fi-checkbox_container {
    margin-top: ${theme.spacing.xs};
  }

  & .fi-checkbox_container.fi-checkbox--large {
    margin-top: ${theme.spacing.s};
  }
`;
