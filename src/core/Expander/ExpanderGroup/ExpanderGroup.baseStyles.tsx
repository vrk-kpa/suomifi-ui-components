import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { element, font } from '../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${element(theme)}
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
      border-top: 1px solid ${theme.colors.depthLight1};
      transition: margin ${`${theme.transitions.basicTime}
        ${theme.transitions.basicTimingFunction}`};

      & > {
        border-radius: 0;
      }
      &:first-child {
        border-top: none;
        border-radius: ${theme.radiuses.basic} ${theme.radiuses.basic} 0 0;
      }
      &:last-child {
        /* stylelint-disable */
        /* prettier-ignore */
        border-radius: 0 0 ${theme.radiuses.basic} ${theme.radiuses.basic};
      }
      &.fi-expander--open {
        border-top: none;
        &:not(:first-of-type) {
          margin-top: ${theme.spacing.insetXl};
        }
        &:not(:last-of-type) {
          margin-bottom: ${theme.spacing.insetXl};
        }
        & + .fi-expander {
          border-top: none;
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
      outline: 0;
      position: relative;

      &:after {
        ${theme.focuses.absoluteFocus}
      }
    }
    ${theme.focuses.noMouseFocus}
  }
`;
