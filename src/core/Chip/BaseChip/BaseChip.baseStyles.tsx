import { css } from 'styled-components';
import { defaultThemeTokens as theme } from '../../theme';
import { element, font } from '../../theme/reset';
import { absoluteFocus } from '../../theme/utils/focus';

export const baseChipBaseStyles = css`
  ${element(theme)}
  ${font(theme)('actionElementInnerTextBold')}

    &:focus {
    outline: 0;
    position: relative;

    &::after {
      ${absoluteFocus}
      border-radius: 16px;
    }
  }

  &.fi-chip {
    border-radius: 14px;
    padding-top: ${theme.spacing.insetXxs};
    padding-right: 22px;
    padding-bottom: ${theme.spacing.insetXxs};
    padding-left: ${theme.spacing.insetL};
    color: ${theme.colors.whiteBase};
    background: ${theme.colors.highlightBase};
    max-height: 28px;
    display: inline-block;
    position: relative;

    & .fi-chip--icon {
      position: absolute;
      top: 8px;
      right: 10px;
      height: 12px;
      width: 12px;
    }

    & .fi-chip--content {
      display: inline-block;
      max-width: 270px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.5em;
      vertical-align: center;
    }
  }

  &.fi-chip--disabled {
    &.fi-chip {
      cursor: not-allowed;
      background: ${theme.colors.depthBase};
      &:hover,
      &:active {
        background: ${theme.colors.depthBase};
      }
    }
    & .fi-chip--icon {
      cursor: not-allowed;
    }
  }
`;
