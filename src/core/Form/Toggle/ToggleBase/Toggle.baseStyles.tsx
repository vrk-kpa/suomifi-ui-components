import { css } from 'styled-components';
import { suomifiTheme } from '../../../theme';
import { element, font } from '../../../theme/reset';

export const iconWidth = '40px';
export const iconHeight = '24px';

export const focusOverrides = css`
  border-radius: 14px;
  right: -4px;
  left: -4px;
`;

export const toggleBaseStyles = css`
  ${element(suomifiTheme)}
  ${font(suomifiTheme)('bodyText')}
  background-color: ${suomifiTheme.colors.whiteBase};
  padding-left: 50px;
  position: relative;
  display: inline-block;
  cursor: pointer;

  &.fi-toggle--disabled {
    cursor: not-allowed;
  }

  & .fi-toggle_icon-container {
    position: absolute;
    margin-right: ${suomifiTheme.spacing.insetL};
    left: 0;
    top: 0.1em;
  }
`;
