import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../theme';
import { element, font, focus } from '../theme/reset';

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
  ${element({ theme })}
  display: flex;
  flex-direction: column;
  & > .fi-expander-group_panels {
    flex: none;

    & .fi-expander {
      margin-top: 0;
      margin-bottom: 0;
      transition: margin ${`${theme.transitions.basicTime}
        ${theme.transitions.basicTimingFunction}`};
      &.fi-expander--open {
        &:not(:first-of-type) {
          margin-top: ${theme.spacing.m};
        }
        &:not(:last-of-type) {
          margin-bottom: ${theme.spacing.m};
        }
      }
    }
  }

  & > .fi-expander-group_all-button {
    ${element({ theme })}
    ${font({ theme })('actionElementInnerTextBold')}
    ${focus({ theme })}
    flex: 1 1 auto;
    align-self: flex-end; 
    margin-left: auto;
    margin-bottom: ${theme.spacing.s};
    padding: ${theme.spacing.xs} 0;
    color: ${theme.colors.highlightBase};
    cursor: pointer;
  }
`,
);
