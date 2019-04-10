import { css } from '@emotion/core';
import { suomifiTheme } from '../theme';
import { PanelExpansionProps } from './PanelExpansion';
import { element, focus, fontPanelTitle } from '../theme/reset';
import { absolute } from '../../components/utils/pseudo';

export const baseStyles = ({
  theme = suomifiTheme,
  noPadding = false,
}: PanelExpansionProps) => css`
  ${absolute('before')}
  position: relative;
  padding: 0;
  border-radius: 2px;
  box-shadow: ${theme.shadows.panelShadow};

  &:before {
    background-color: ${theme.colors.panelExpansionBgr};
    opacity: 0;
  }

  &.fi-panel-expansion--open:before {
    opacity: 1;
    transition: opacity ${theme.transitions.basicTime}
      ${theme.transitions.basicTimingFunction};
  }

  & .fi-panel-expansion-title {
    ${element}
    ${focus}
    position: relative;
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
  }
  & .fi-panel-expansion-title--open .fi-panel-expansion-title-icon,
  & .fi-panel-expansion-title-icon--open {
    transform: rotate(-180deg);
  }

  & > .fi-panel-expansion-content {
    position: relative;
    ${!noPadding && 'padding: 0 20px 20px 20px;'}
  }
`;
