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

  & .fi-date-picker_bottom-container {
    display: flex;
    justify-content: flex-end;
  }

  & .fi-date-picker_application {
    padding: ${theme.spacing.m} ${theme.spacing.s};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: fit-content;
    margin: auto;
  }

  &.fi-date-picker--small-screen {
    border: none;
    background: none;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: fixed;
    transform: translateZ(0) translateY(0);
    transition: transform 200ms ${theme.transitions.basicTimingFunction};

    .fi-date-picker_application {
      padding-top: ${theme.spacing.xs};
      padding-bottom: ${theme.spacing.xl};
    }
  }

  &.fi-date-picker--hidden {
    visibility: hidden;
  }

  &.fi-date-picker--small-screen-hidden {
    transform: translateZ(0) translateY(100%);
    transition: transform 200ms ${theme.transitions.basicTimingFunction},
      visibility 200ms ${theme.transitions.basicTimingFunction};
  }

  & .fi-date-picker_slide-indicator-wrapper {
    touch-action: none;
    padding-top: ${theme.spacing.m};
    padding-bottom: ${theme.spacing.xs};
    cursor: grab;
  }

  & .fi-date-picker_slide-indicator {
    margin: 0 auto;
    width: 60px;
    height: 3px;
    background-color: ${theme.colors.depthLight1};
  }

  & .fi-date-picker_small-screen-container {
    touch-action: pan-x pinch-zoom;
    max-height: 100%;
    overscroll-behavior: contain;
    background-color: ${theme.colors.whiteBase};
    border-top: 1px solid ${theme.colors.blackLight1};
    border-radius: 10px 10px 0 0;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }

  & .fi-date-picker_small-screen-container--scroll {
    overflow: auto;
    touch-action: auto;
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
`;
