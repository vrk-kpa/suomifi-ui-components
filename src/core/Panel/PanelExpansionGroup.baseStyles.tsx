import { css } from '@emotion/core';
import { suomifiTheme } from '../theme';
import { PanelExpansionGroupProps } from './PanelExpansionGroup';
import { element, fontPanelTitle, focus } from '../theme/reset';

export const baseStyles = ({
  theme = suomifiTheme,
}: PanelExpansionGroupProps) => css`
  ${element}
  display: flex;
  flex-direction: column;
  & > .fi-panel-expansion-group-panels {
    flex: none;

    & .fi-panel-expansion {
      margin-top: 0;
      margin-bottom: 0;
      transition: margin ${theme.transitions.basicTime}
        ${theme.transitions.basicTimingFunction};
      &.fi-panel-expansion--open {
        &:not(:first-child) {
          margin-top: 14px;
        }
        &:not(:last-child) {
          margin-bottom: 14px;
        }
      }
    }
  }

  & > .fi-panel-expansion-group-all-button {
    ${element}
    ${fontPanelTitle}
    ${focus}
    flex: 1;
    margin-left: auto;
    margin-bottom: 10px;
    padding: 4px 0;
    color: ${theme.colors.secondaryColor};
    cursor: pointer;
  }
`;
