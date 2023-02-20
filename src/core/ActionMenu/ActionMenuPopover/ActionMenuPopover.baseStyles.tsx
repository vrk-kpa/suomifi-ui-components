import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { font } from '../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${font(theme)('bodyTextSmall')};

  &.fi-action-menu-popover {
    background-color: ${theme.colors.whiteBase};
    box-shadow: ${theme.shadows.wideBoxShadow};
    border: 1px solid ${theme.colors.blackLight1};
    border-radius: ${theme.radiuses.basic};
  }

  &.fi-action-menu-popover--hidden {
    display: none;
  }

  & .fi-action-menu-popover_application {
    padding-top: 1px;
    padding-bottom: 1px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  /* Tooltip end */

  /* Datepicker version */

  & .fi-action-menu-popover_popper-arrow,
  & .fi-action-menu-popover_popper-arrow::before,
  & .fi-action-menu-popover_popper-arrow::after {
    position: absolute;
    width: 11px;
    height: 11px;
  }

  & .fi-action-menu-popover_popper-arrow::before,
  & .fi-action-menu-popover_popper-arrow::after {
    content: '';
    position: absolute;
    height: 0;
    width: 0;
    border: solid transparent;
    pointer-events: none;
  }

  /* Arrow on top side */
  & .fi-action-menu-popover_popper-arrow[data-popper-placement^='bottom-end'] {
    content: '';
    top: -3px;
    position: absolute;
    border: solid transparent;
    pointer-events: none;
    bottom: 100%;
  }

  &
    .fi-action-menu-popover_popper-arrow[data-popper-placement^='bottom-end']::before {
    content: '';
    position: absolute;
    border-bottom-color: ${theme.colors.blackLight1};
    border-width: 9px;
    margin-right: -9px;
    bottom: 100%;
  }

  &
    .fi-action-menu-popover_popper-arrow[data-popper-placement^='bottom-end']::after {
    content: '';
    position: absolute;
    border-bottom-color: ${theme.colors.whiteBase};
    border-width: 8px;
    margin-right: -9px;
    left: 1px;
    bottom: 100%;
  }

  /* Arrow on bottom side */
  & .fi-action-menu-popover_popper-arrow[data-popper-placement^='top-end'] {
    bottom: 0px;
    top: 100%;
  }

  &
    .fi-action-menu-popover_popper-arrow[data-popper-placement^='top-end']::before {
    border-top-color: ${theme.colors.blackLight1};
    border-width: 9px;
    margin-right: -9px;
  }

  &
    .fi-action-menu-popover_popper-arrow[data-popper-placement^='top-end']::after {
    border-top-color: ${theme.colors.whiteBase};
    border-width: 8px;
    margin-right: -9px;
    left: 1px;
  }

  & .fi-action-menu-popover_bottom-container {
    display: flex;
    gap: ${theme.spacing.xs};
  }

  & .fi-action-menu-popover_bottom-button {
    flex: 1;
  }
`;
