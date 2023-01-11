import { css } from 'styled-components';
import { SuomifiTheme } from '../../../theme';
import { font } from '../../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${font(theme)('bodyText')};

  &.fi-date-picker {
    background-color: ${theme.colors.whiteBase};
    padding: ${theme.spacing.m} ${theme.spacing.s};
    box-shadow: ${theme.shadows.wideBoxShadow};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid ${theme.colors.blackLight1};
  }

  &.fi-date-picker--hidden {
    display: none;
  }

  & .fi-date-picker_popper-arrow {
    background-color: ${theme.colors.whiteBase};
    width: 11px;
    height: 11px;
    position: absolute;
    transform: rotate(45deg);
  }

  & .fi-date-picker_popper-arrow[data-popper-placement^='bottom-start'] {
    border-top: 1px solid ${theme.colors.blackLight1};
    border-left: 1px solid ${theme.colors.blackLight1};
    top: -7px;
  }

  & .fi-date-picker_popper-arrow[data-popper-placement^='top-start'] {
    border-bottom: 1px solid ${theme.colors.blackLight1};
    border-right: 1px solid ${theme.colors.blackLight1};
    bottom: -6px;
  }

  & .fi-date-picker_bottom-container {
    display: flex;
    gap: ${theme.spacing.xs};
  }

  & .fi-date-picker_bottom-button {
    flex: 1;
  }
`;
