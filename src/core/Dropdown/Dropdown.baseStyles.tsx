import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../theme';
import { element, inputButton } from '../theme/reset';

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
    & > [data-reach-menu-button].fi-dropdown_button {
      ${inputButton({ theme })}
      position: relative;
      padding-right: 30px;
      text-align: left;
      background-color: ${theme.colors.whiteBase};
      cursor: pointer;
      &:before {
        content: '';
        position: absolute;
        top: 50%;
        right: 10px;
        margin-top: -3px;
        border-style: solid;
        border-color: ${theme.colors.depthDark1} transparent transparent
          transparent;
        border-width: 6px 4px 0 4px;
      }
      &[aria-expanded='true']:before {
        border-color: transparent transparent ${theme.colors.depthDark1}
          transparent;
        border-width: 0 4px 6px 4px;
      }
    }
  `,
);

export const menuPopoverStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
  &[data-reach-menu-popover].fi-dropdown_popover {
    ${element({ theme })}
    ${theme.typography.actionElementInnerText}
    margin-top: -1px;
    padding: 0;
    box-sizing: border-box;
    font-size: 100%;
    border: 0;
    background-color: ${theme.colors.whiteBase};
    border-color: ${theme.colors.depthBase};
    border-style: solid;
    border-width: 0 1px 1px 1px;
    border-radius: 0px 0px ${theme.radius.basic} ${theme.radius.basic};
    overflow: hidden;
  }
  
  & [data-reach-menu-items] {
    border: 0;
    padding: 0;
  }

  & [data-reach-menu-item].fi-dropdown_item {
    ${element({ theme })}
    ${theme.typography.actionElementInnerText}
    padding: ${theme.spacing.insetM} ${theme.spacing.insetXl};
    border: 0;
    &[data-selected] {
      ${theme.typography.actionElementInnerText}
      color: ${theme.colors.blackBase};
      background-image: none;
      background-color: ${theme.colors.highlightLight3};
      border: 0;
    }
    &:focus {
      outline: 0;
    }
  }
`,
);
