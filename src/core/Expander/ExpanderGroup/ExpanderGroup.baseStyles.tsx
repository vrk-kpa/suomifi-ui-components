import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { element, font } from '../../theme/reset';
import { MarginProps, buildSpacingCSS } from '../../theme/utils/spacing';

export const baseStyles = (
  theme: SuomifiTheme,
  globalMargins?: MarginProps,
  propMargins?: MarginProps,
) => css`
  ${element(theme)}
  ${buildSpacingCSS(globalMargins)}
  ${buildSpacingCSS(propMargins, true)}
  width: 100%;
  max-width: 100%;

  &.fi-expander-group {
    display: flex;
    flex-direction: column;
  }
  & > .fi-expander-group_expanders {
    flex: none;

    & .fi-expander {
      margin-top: 0;
      margin-bottom: 0;
      border-radius: 0;
      transition: margin ${`${theme.transitions.basicTime}
        ${theme.transitions.basicTimingFunction}`};

      & > {
        border-radius: 0;
      }
      &:first-child {
        border-radius: ${theme.radiuses.basic} ${theme.radiuses.basic} 0 0;
      }
      &:last-child {
        border-bottom-left-radius: ${theme.radiuses.basic};
        border-bottom-right-radius: ${theme.radiuses.basic};
      }
      &:not(:first-child) {
        border-top: none;
      }

      &.fi-expander--open {
        border-top: 1px solid ${theme.colors.highlightBase};
        border-radius: ${theme.radiuses.basic};
        & + .fi-expander {
          border-top: 1px solid ${theme.colors.highlightBase};
        }
        &:not(:first-of-type) {
          margin-top: ${theme.spacing.insetXl};
        }
        &:not(:last-of-type) {
          margin-bottom: ${theme.spacing.insetXl};
        }
      }
    }
  }

  & > .fi-expander-group_all-button {
    ${element(theme)}
    ${font(theme)('actionElementInnerTextBold')}
    flex: 1 1 auto;
    align-self: flex-end;
    margin-left: auto;
    margin-bottom: ${theme.spacing.insetM};
    padding: ${theme.spacing.insetXs} 0;
    color: ${theme.colors.highlightBase};
    border-radius: ${theme.radiuses.basic};
    border: none;
    cursor: pointer;

    &:focus {
      ${theme.focuses.highContrastFocus}
      position: relative;

      &:after {
        ${theme.focuses.absoluteFocus}
      }
    }
    ${theme.focuses.noMouseFocus}
  }
`;
