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
    background-color: ${theme.colors.infoLight1};
    border: 1px solid ${theme.colors.depthLight1};
    border-radius: ${theme.radiuses.basic};
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
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
      padding: ${theme.spacing.s} ${theme.spacing.s} ${theme.spacing.s}
        ${theme.spacing.xl};
      & .fi-reorderable-list-item_content {
        padding-left: ${theme.spacing.xs};
        padding-right: ${theme.spacing.s};
      }
    }

    &:focus {
      & .fi-reorderable-list-item_inner {
        border-color: ${theme.colors.highlightBase};
        &:after {
          ${theme.focuses.absoluteFocus}
          ${theme.focuses.highContrastFocus}
        }
      }
    }

    &:focus-within {
      & .fi-reorderable-list-item_inner {
        border-color: ${theme.colors.highlightBase};
      }
    }
  }

  /* Drag handle (two vertical option icons) */
  & .fi-reorderable-list-item_drag-handle {
    position: absolute;
    left: ${theme.spacing.xxs};
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    pointer-events: none;

    & .fi-reorderable-list-item_drag-handle-icon {
      width: 16px;
      height: 16px;
      margin-left: -6px;

      &:first-child {
        margin-left: 0;
      }

      & .fi-icon-base-fill {
        fill: ${theme.colors.depthBase};
      }
    }
  }

  /* Content area */
  & .fi-reorderable-list-item_content {
    flex: 1;
    min-width: 0;
    pointer-events: none;
  }

  /* Buttons container */
  & .fi-reorderable-list-item_buttons {
    display: flex;
    gap: ${theme.spacing.xxs};
    flex-shrink: 0;
    justify-content: flex-end;

    & .fi-reorderable-list-item_button-up,
    & .fi-reorderable-list-item_button-down {
      min-width: 40px;
      min-height: 40px;
      background-color: ${theme.colors.whiteBase};
      padding: ${theme.spacing.xs};
      border: 1px solid ${theme.colors.highlightBase};
      border-radius: ${theme.radiuses.basic};

      &.fi-reorderable-list-item_button--boundary {
        border-color: ${theme.colors.depthBase};
        color: ${theme.colors.depthBase};
        cursor: default;

        & .fi-icon .fi-icon-base-fill {
          fill: ${theme.colors.depthBase};
        }
      }

      &:focus-visible {
        position: relative;
        outline: 0;
        &:after {
          ${theme.focuses.absoluteFocus}
          ${theme.focuses.highContrastFocus}
        }
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
      background-color: ${theme.colors.highlightLight4};
    }
  }
`;
