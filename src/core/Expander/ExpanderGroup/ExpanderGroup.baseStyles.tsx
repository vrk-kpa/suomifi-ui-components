import { css } from 'styled-components';
import { suomifiTheme } from '../../theme';
import { element, font } from '../../theme/reset';

export const baseStyles = css`
  ${element(suomifiTheme)}
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;

  & > .fi-expander-group_expanders {
    flex: none;

    & .fi-expander {
      margin-top: 0;
      margin-bottom: 0;
      border-radius: 0;
      border-top: 1px solid ${suomifiTheme.colors.depthLight1};
      transition: margin ${`${suomifiTheme.transitions.basicTime}
        ${suomifiTheme.transitions.basicTimingFunction}`};

      & .fi-icon {
        color: ${suomifiTheme.colors.highlightBase};
      }
      & > {
        border-radius: 0;
      }
      &:first-child {
        border-top: none;
        border-radius: ${suomifiTheme.radius.basic} ${suomifiTheme.radius.basic}
          0 0;
      }
      &:last-child {
        /* stylelint-disable */
        /* prettier-ignore */
        border-radius: 0 0 ${suomifiTheme.radius.basic} ${suomifiTheme.radius
          .basic};
      }
      &.fi-expander--open {
        border-top: none;
        &:not(:first-of-type) {
          margin-top: ${suomifiTheme.spacing.insetXl};
        }
        &:not(:last-of-type) {
          margin-bottom: ${suomifiTheme.spacing.insetXl};
        }
        & + .fi-expander {
          border-top: none;
        }
      }
    }
  }

  & > .fi-expander-group_all-button {
    ${element(suomifiTheme)}
    ${font(suomifiTheme)('actionElementInnerTextBold')}
    flex: 1 1 auto;
    align-self: flex-end;
    margin-left: auto;
    margin-bottom: ${suomifiTheme.spacing.insetM};
    padding: ${suomifiTheme.spacing.insetXs} 0;
    color: ${suomifiTheme.colors.highlightBase};
    border-radius: ${suomifiTheme.radius.basic};
    border: none;
    cursor: pointer;

    &:focus {
      outline: 0;
      position: relative;

      &:after {
        ${suomifiTheme.focus.absoluteFocus}
      }
    }
    ${suomifiTheme.focus.noMouseFocus}
  }
`;
