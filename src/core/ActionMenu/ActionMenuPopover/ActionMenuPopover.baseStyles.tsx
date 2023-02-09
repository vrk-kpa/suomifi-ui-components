import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { font } from '../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${font(theme)('bodyText')};

  &.fi-action-menu-popover {
    background-color: ${theme.colors.whiteBase};
    box-shadow: ${theme.shadows.wideBoxShadow};
    border: 1px solid ${theme.colors.blackLight1};
  }

  &.fi-action-menu-popover--hidden {
    display: none;
  }

  & .fi-action-menu-popover_application {
    padding: 1px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  & .fi-action-menu-popover_popper-arrow {
    background-color: ${theme.colors.whiteBase};
    width: 11px;
    height: 11px;
    position: absolute;
    transform: rotate(45deg);
  }

  &
    .fi-action-menu-popover_popper-arrow[data-popper-placement^='bottom-start'] {
    border-top: 1px solid ${theme.colors.blackLight1};
    border-left: 1px solid ${theme.colors.blackLight1};
    top: -7px;
  }

  & .fi-action-menu-popover_popper-arrow[data-popper-placement^='top-start'] {
    border-bottom: 1px solid ${theme.colors.blackLight1};
    border-right: 1px solid ${theme.colors.blackLight1};
    bottom: -6px;
  }

  & .fi-action-menu-popover_bottom-container {
    display: flex;
    gap: ${theme.spacing.xs};
  }

  & .fi-action-menu-popover_bottom-button {
    flex: 1;
  }
`;
