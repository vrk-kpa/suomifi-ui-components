import { css } from 'styled-components';
import { SuomifiTheme } from '../../../theme';
import { element, font } from '../../../theme/reset';

export const iconWidth = '40px';
export const iconHeight = '24px';

export const focusOverrides = css`
  border-radius: 14px;
  right: -4px;
  left: -4px;
`;

export const toggleBaseStyles = (theme: SuomifiTheme) => css`
  ${element(theme)}
  ${font(theme)('bodyText')}
  padding-left: 50px;
  position: relative;
  cursor: pointer;

  &.fi-toggle {
    display: inline-block;
  }
  &.fi-toggle--disabled {
    cursor: not-allowed;
  }

  & .fi-toggle_icon-container {
    position: absolute;
    margin-right: ${theme.spacing.insetL};
    left: 0;
    top: 0.1em;
  }
`;
