import { css } from '@emotion/core';
import { suomifiTheme } from '../theme';
import { PanelProps } from './Panel';
import { focus, fontPanelTitle } from '../theme/reset';

export const baseStyles = ({ theme = suomifiTheme }: PanelProps) => css`
  position: relative;
  padding: 0;
  border-radius: 2px;
  box-shadow: ${theme.shadows.panelShadow};

  & .fi-panel-expansion-title {
    ${focus}
    display: block;
    width: 100%;
    &--no-tag {
      ${fontPanelTitle}
      padding: 20px 60px 20px 20px;
      color: ${theme.colors.secondaryColor};
    }
  }
  & .fi-panel-expansion-title-icon {
    position: absolute;
    top: 0;
    right: 0;
    margin: 20px;
    &--open {
      transform: rotate(-180deg);
    }
  }
  & .fi-panel-expansion-content {
    padding: 0 60px 20px 20px;
  }
`;
