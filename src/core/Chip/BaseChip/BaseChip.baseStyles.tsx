import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { element, font } from '../../theme/reset';

export const baseChipBaseStyles = (theme: SuomifiTheme) => css`
  ${element(theme)}
  ${font(theme)('actionElementInnerTextBold')}

  &.fi-chip {
    border-radius: 14px;
    padding: ${theme.spacing.insetXxs} ${theme.spacing.insetL};
    color: ${theme.colors.whiteBase};
    background: ${theme.colors.highlightBase};
    max-height: 100%;
    display: inline-block;

    &:focus {
      outline: 0;
      position: relative;

      &::after {
        ${theme.focus.absoluteFocus}
        border-radius: 16px;
      }
    }

    & .fi-chip--content {
      display: block;
      word-break: break-word;
      overflow: hidden;
      line-height: 1.5em;
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
  }
`;
