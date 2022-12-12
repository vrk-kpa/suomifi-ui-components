import { css } from 'styled-components';
import { SuomifiTheme } from '../../../theme';
import { font } from '../../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${font(theme)('bodyText')};

  &.fi-date-picker {
    background-color: ${theme.colors.whiteBase};
    padding: ${theme.spacing.s};
    box-shadow: ${theme.shadows.wideBoxShadow};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &.fi-date-picker--hidden {
    display: none;
  }

  & .fi-date-picker_bottom-container {
    display: flex;
    gap: ${theme.spacing.xs};
  }

  & .fi-date-picker_bottom-button {
    flex: 1;
  }
`;
