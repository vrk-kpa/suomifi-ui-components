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
    padding-top: 8px;
    padding-bottom: 8px;
    z-index: ${theme.zindexes.menu};
  }

  &.fi-action-menu-popover--hidden {
    visibility: hidden;
  }

  & .fi-action-menu-popover_list {
    margin: 0;
    padding-left: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    list-style-type: none;
    overflow-y: auto;
    max-height: 265px;

    &:focus {
      /* Hide focus outline from <ul> */
      outline: none;
    }
  }

  /* Arrow base */
  & .fi-action-menu-popover_floatingui-arrow::before,
  & .fi-action-menu-popover_floatingui-arrow::after {
    content: '';
    position: absolute;
    left: -9px;
    height: 0;
    width: 0;
    border: solid transparent;
    pointer-events: none;
  }

  /* Arrow on top side */
  &
    .fi-action-menu-popover_floatingui-arrow[data-floatingui-placement^='bottom'] {
    bottom: 100%;
  }

  &
    .fi-action-menu-popover_floatingui-arrow[data-floatingui-placement^='bottom']::before {
    border-bottom-color: ${theme.colors.blackLight1};
    border-width: 9px;
    margin-right: -9px;
    bottom: 100%;
  }

  &
    .fi-action-menu-popover_floatingui-arrow[data-floatingui-placement^='bottom']::after {
    border-bottom-color: ${theme.colors.whiteBase};
    border-width: 8px;
    margin-right: -9px;
    left: -8px;
    bottom: 100%;
  }

  /* Arrow on bottom side */
  & .fi-action-menu-popover_floatingui-arrow[data-floatingui-placement^='top'] {
    top: 100%;
  }

  &
    .fi-action-menu-popover_floatingui-arrow[data-floatingui-placement^='top']::before {
    border-top-color: ${theme.colors.blackLight1};
    border-width: 9px;
    margin-right: -9px;
  }

  &
    .fi-action-menu-popover_floatingui-arrow[data-floatingui-placement^='top']::after {
    border-top-color: ${theme.colors.whiteBase};
    border-width: 8px;
    margin-right: -9px;
    left: -8px;
  }
`;
