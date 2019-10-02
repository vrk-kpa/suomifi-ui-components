import { css } from 'styled-components';
import { withSuomifiTheme, SuomifiThemeComponent } from '../theme';
import { element, font, focus } from '../theme/reset';

export const baseStyles = withSuomifiTheme(
  ({ theme }: SuomifiThemeComponent) => css`
  ${element({ theme })}
  display: flex;
  flex-direction: column;
  & > .fi-panel-expansion-group_panels {
    flex: none;

    & .fi-panel-expansion {
      margin-top: 0;
      margin-bottom: 0;
      transition: margin ${`${theme.transitions.basicTime}
        ${theme.transitions.basicTimingFunction}`};
      &.fi-panel-expansion--open {
        &:not(:first-of-type) {
          margin-top: ${theme.spacing.m};
        }
        &:not(:last-of-type) {
          margin-bottom: ${theme.spacing.m};
        }
      }
    }
  }

  & > .fi-panel-expansion-group_all-button {
    ${element({ theme })}
    ${font({ theme })('bodySemiBold')}
    ${focus({ theme })}
    flex: 1;
    margin-left: auto;
    margin-bottom: ${theme.spacing.s};
    padding: ${theme.spacing.xs} 0;
    color: ${theme.colors.highlightBase};
    cursor: pointer;
  }
`,
);
