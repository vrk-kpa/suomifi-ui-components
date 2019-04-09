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
    box-shadow: ${theme.shadows.panelShadow};
    
    & > .fi-panel-expansion {
      box-shadow: none;
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
