import { css } from '@emotion/core';
import { suomifiTheme } from '../theme';
import { PanelExpansionGroupProps } from './PanelExpansionGroup';
import { element, fonts, focus } from '../theme/reset';

export const baseStyles = ({
  theme = suomifiTheme,
}: PanelExpansionGroupProps) => css`
  ${element(theme)}
  display: flex;
  flex-direction: column;
  & > .fi-panel-expansion-group-panels {
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

  & > .fi-panel-expansion-group-all-button {
    ${element(theme)}
    ${fonts(theme).semiBold}
    ${focus(theme)}
    flex: 1;
    margin-left: auto;
    margin-bottom: ${theme.spacing.s};
    padding: ${theme.spacing.xs} 0;
    color: ${theme.colors.highlightBase};
    cursor: pointer;
  }
`;
