import { css } from 'styled-components';
import { TokensAndTheme } from '../../../theme';
import { disabledCursor } from '../../../../components/utils/css';
import { element, font } from '../../../theme/reset';

// Contains double underscore because it is written in the SVG-file
export const iconWidth = '40px';
export const iconHeight = '24px';

export const focusOverrides = css`
  border-radius: 14px;
  right: -4px;
  left: -4px;
`;

/* stylelint-disable no-descending-specificity */
export const toggleBaseStyles = ({ theme }: TokensAndTheme) => css`
  ${element({ theme })}
  ${font({ theme })('bodyText')}
  background-color: ${theme.colors.whiteBase};
  padding-left: 50px;
  position: relative;
  display: inline-block;
  cursor: pointer;

  &.fi-toggle--disabled {
    ${disabledCursor}
  }

  & .fi-toggle_icon-container {
    position: absolute;
    margin-right: ${theme.spacing.insetL};
    left: 0;
    top: 0.1em;
  }
`;
