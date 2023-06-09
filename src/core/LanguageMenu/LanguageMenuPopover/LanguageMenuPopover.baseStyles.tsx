import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { font } from '../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${font(theme)('bodyTextSmall')};

  &.fi-language-menu-popover {
    background-color: ${theme.colors.whiteBase};
    box-shadow: ${theme.shadows.wideBoxShadow};
    border: 1px solid ${theme.colors.blackLight1};
    border-radius: ${theme.radiuses.basic};
    z-index: ${theme.zindexes.menu};
  }

  &.fi-language-menu-popover--hidden {
    visibility: hidden;
  }

  & .fi-language-menu-popover_list {
    padding-top: 5px;
    padding-bottom: 5px;
    margin: 0;
    padding-left: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    list-style-type: none;
    overflow-y: auto;
    max-height: 260px;

    &:focus {
      /* Hide focus outline from menu */
      outline: none;
    }
  }

  /* Arrow base */
  & .fi-language-menu-popover_popper-arrow::before,
  & .fi-language-menu-popover_popper-arrow::after {
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
    .fi-language-menu-popover_popper-arrow[data-popper-placement^='bottom-end'] {
    bottom: 100%;
  }

  &
    .fi-language-menu-popover_popper-arrow[data-popper-placement^='bottom-end']::before {
    border-bottom-color: ${theme.colors.blackLight1};
    border-width: 9px;
    margin-right: -9px;
    bottom: 100%;
  }

  &
    .fi-language-menu-popover_popper-arrow[data-popper-placement^='bottom-end']::after {
    border-bottom-color: ${theme.colors.whiteBase};
    border-width: 8px;
    margin-right: -9px;
    left: -8px;
    bottom: 100%;
  }

  /* Arrow on bottom side */
  & .fi-language-menu-popover_popper-arrow[data-popper-placement^='top-end'] {
    top: 100%;
  }

  &
    .fi-language-menu-popover_popper-arrow[data-popper-placement^='top-end']::before {
    border-top-color: ${theme.colors.blackLight1};
    border-width: 9px;
    margin-right: -9px;
  }

  &
    .fi-language-menu-popover_popper-arrow[data-popper-placement^='top-end']::after {
    border-top-color: ${theme.colors.whiteBase};
    border-width: 8px;
    margin-right: -9px;
    left: -8px;
  }
`;
