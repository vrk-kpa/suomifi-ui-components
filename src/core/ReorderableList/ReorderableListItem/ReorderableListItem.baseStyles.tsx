import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { element, font } from '../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${element(theme)}
  ${font(theme)('bodyText')}
  list-style: none;
  margin: 0;
  padding: 0;
  outline: none;

  &.fi-reorderable-list-item {
    margin-bottom: ${theme.spacing.xs};
    transition: transform 0.2s ease;

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  & .fi-reorderable-list-item_inner {
    background-color: ${theme.colors.highlightLight4};
    border: 1px solid ${theme.colors.depthLight1};
    border-radius: ${theme.radiuses.basic};
    display: flex;
    align-items: stretch;
    position: relative;
    transition:
      box-shadow 0.2s ease,
      transform 0.2s ease,
      border-color 0.2s ease;

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }

  /* View mode */
  &.fi-reorderable-list-item--view-mode {
    & .fi-reorderable-list-item_inner {
      padding: ${theme.spacing.s} ${theme.spacing.m};
    }
  }

  /* Edit mode */
  &.fi-reorderable-list-item--edit-mode {
    & .fi-reorderable-list-item_inner {
      box-shadow: ${theme.shadows.panelShadow};
      cursor: grab;
    }

    &:focus {
      & .fi-reorderable-list-item_inner {
        border-color: ${theme.colors.depthLight1};
        padding: ${theme.spacing.s} ${theme.spacing.m};
        &:after {
          ${theme.focuses.absoluteFocus}
          ${theme.focuses.highContrastFocus}
        }
      }
    }
  }

  & .fi-reorderable-list-item_drag-handle {
    align-items: center;
    align-self: stretch;
    border-right: 1px solid ${theme.colors.depthLight1};
    display: flex;
    background-color: ${theme.colors.depthLight2};
    flex: 0 0 ${theme.spacing.xl};
    justify-content: center;
    pointer-events: none;
    padding: 0 ${theme.spacing.xxs};

    & .fi-reorderable-list-item_drag-handle-icon {
      width: 16px;
      height: 16px;
      margin-left: -6px;

      &:first-child {
        margin-left: 0;
      }

      & .fi-icon-base-fill {
        fill: ${theme.colors.depthDark1};
      }
    }
  }

  & .fi-reorderable-list-item_content-wrapper {
    display: flex;
    flex: 1;
    min-width: 0;
  }

  /* Content area */
  & .fi-reorderable-list-item_content {
    flex: 1;
    min-width: 0;
  }

  /* Move buttons container */
  & .fi-reorderable-list-item_buttons {
    display: flex;
    gap: ${theme.spacing.xxs};
    flex-shrink: 0;
    justify-content: flex-end;
    padding: 0 ${theme.spacing.s};

    &.fi-reorderable-list-item_buttons--top {
      justify-content: flex-start;
      margin: 0 ${theme.spacing.s} 0 ${theme.spacing.s};
      padding: ${theme.spacing.s} 0 ${theme.spacing.s} 0;
    }

    & .fi-reorderable-list-item_button-to-top,
    & .fi-reorderable-list-item_button-up,
    & .fi-reorderable-list-item_button-down,
    & .fi-reorderable-list-item_button-to-bottom {
      &.fi-reorderable-list-item_button--boundary {
        border-color: ${theme.colors.depthBase};
        color: ${theme.colors.depthBase};
        cursor: default;

        & .fi-icon .fi-icon-base-fill {
          fill: ${theme.colors.depthBase};
        }
      }
    }
  }

  &.fi-reorderable-list-item--buttons-top {
    &.fi-reorderable-list-item--edit-mode {
      & .fi-reorderable-list-item_content-wrapper {
        flex-direction: column;
      }

      & .fi-reorderable-list-item_buttons {
        border-bottom: 1px solid ${theme.colors.depthLight1};
      }

      & .fi-reorderable-list-item_content {
        padding: ${theme.spacing.s};
      }
    }
  }

  &.fi-reorderable-list-item--buttons-inline {
    &.fi-reorderable-list-item--edit-mode {
      & .fi-reorderable-list-item_content-wrapper {
        flex-direction: row;
      }

      & .fi-reorderable-list-item_content {
        padding: ${theme.spacing.s};
      }

      & .fi-reorderable-list-item_buttons {
        border-left: 1px solid ${theme.colors.depthLight1};
        align-items: center;
        justify-content: center;
        margin: ${theme.spacing.s} 0;
      }
    }
  }

  /* Dragging state */
  &.fi-reorderable-list-item--dragging {
    & .fi-reorderable-list-item_inner {
      opacity: 0.5;
      box-shadow: ${theme.shadows.wideBoxShadow};
      transform: rotate(-2deg);

      @media (prefers-reduced-motion: reduce) {
        transform: none;
      }
    }
  }

  /* Drag over target state */
  &.fi-reorderable-list-item--drag-over {
    & .fi-reorderable-list-item_inner {
      border-color: ${theme.colors.highlightBase};
      border-style: dashed;
      border-width: 2px;
      background-color: ${theme.colors.infoLight1};
    }
  }

  /* Small screen variant */
  &.fi-reorderable-list-item--small-screen {
    margin-bottom: ${theme.spacing.s};

    &.fi-reorderable-list-item--view-mode {
      & .fi-reorderable-list-item_inner {
        padding: ${theme.spacing.s};
      }
    }

    &.fi-reorderable-list-item--edit-mode {
      & .fi-reorderable-list-item_content-wrapper {
        flex-direction: column;
      }

      & .fi-reorderable-list-item_content {
        padding: ${theme.spacing.s};
      }

      & .fi-reorderable-list-item_buttons {
        border-bottom: 1px solid ${theme.colors.depthLight1};
        border-left: none;
        justify-content: flex-start;
      }
    }
  }
`;
