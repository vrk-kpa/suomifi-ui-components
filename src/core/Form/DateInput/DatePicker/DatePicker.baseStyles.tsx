import { css } from 'styled-components';
import { SuomifiTheme } from '../../../theme';
import { font } from '../../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${font(theme)('bodyText')};

  &.fi-date-picker {
    background-color: ${theme.colors.whiteBase};
    box-shadow: ${theme.shadows.wideBoxShadow};
    border: 1px solid ${theme.colors.blackLight1};
  }

  &.fi-date-picker--hidden {
    display: none;
  }

  & .fi-date-picker_application {
    padding: ${theme.spacing.m} ${theme.spacing.s};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  & .fi-date-picker_popper-arrow,
  & .fi-date-picker_popper-arrow::before {
    position: absolute;
    width: 11px;
    height: 11px;
  }

  & .fi-date-picker_popper-arrow::before {
    content: '';
    background-color: ${theme.colors.whiteBase};
    transform: rotate(45deg);
  }

  & .fi-date-picker_popper-arrow[data-popper-placement^='bottom-end'] {
    top: -7px;
  }

  & .fi-date-picker_popper-arrow[data-popper-placement^='bottom-end']::before {
    border-top: 1px solid ${theme.colors.blackLight1};
    border-left: 1px solid ${theme.colors.blackLight1};
  }

  & .fi-date-picker_popper-arrow[data-popper-placement^='top-end'] {
    bottom: -6px;
  }

  & .fi-date-picker_popper-arrow[data-popper-placement^='top-end']::before {
    border-bottom: 1px solid ${theme.colors.blackLight1};
    border-right: 1px solid ${theme.colors.blackLight1};
  }

  & .fi-date-picker_bottom-container {
    display: flex;
    gap: ${theme.spacing.xs};
  }

  & .fi-date-picker_bottom-button {
    flex: 1;
  }
`;
