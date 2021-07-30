import { css } from 'styled-components';
import { suomifiTheme } from '../../theme';
import { element, font } from '../../theme/reset';

export const baseChipBaseStyles = css`
  ${element(suomifiTheme)}
  ${font(suomifiTheme)('actionElementInnerTextBold')}

    &:focus {
    outline: 0;
    position: relative;

    &::after {
      ${suomifiTheme.focus.absoluteFocus}
      border-radius: 16px;
    }
  }

  &.fi-chip {
    border-radius: 14px;
    padding: ${suomifiTheme.spacing.insetXxs} ${suomifiTheme.spacing.insetL};
    color: ${suomifiTheme.colors.whiteBase};
    background: ${suomifiTheme.colors.highlightBase};
    max-height: 28px;
    display: inline-block;

    & .fi-chip--content {
      display: inline-block;
      max-width: 270px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.5em;
    }
  }

  &.fi-chip--disabled {
    &.fi-chip {
      cursor: not-allowed;
      background: ${suomifiTheme.colors.depthBase};
      &:hover,
      &:active {
        background: ${suomifiTheme.colors.depthBase};
      }
    }
  }
`;
