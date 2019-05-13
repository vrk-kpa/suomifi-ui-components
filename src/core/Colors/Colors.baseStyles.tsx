import { css } from '@emotion/core';
import { invert } from 'polished';
import { suomifiTheme } from '../theme';
import { clearfix } from '../../utils/css/utils';
import { absolute } from '../../utils/css/pseudo';
import { ColorProps } from './Colors';

export const baseStyles = ({ color, theme = suomifiTheme }: ColorProps) => css`
  ${absolute('before')}
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  float: left;
  width: 124px;
  height: 160px;
  max-width: 100%;
  padding: ${theme.spacing.s};
  color: ${invert(color)};
  background-color: ${color};
  cursor: pointer;
  z-index: 2;

  &:before,
  .fi-color__name {
    pointer-events: none;
  }

  &:hover:before {
    border-bottom: 4px solid
      ${color === theme.colors.blackBase
        ? theme.colors.whiteBase
        : theme.colors.blackBase};
    z-index: 2;
  }

  .fi-color__name {
    position: relative;
    width: 100%;
    text-align: right;
    overflow-wrap: break-word;
    z-index: 3;
  }

  &:hover .fi-color__name--key {
    text-decoration: underline;
  }
`;

export const containerStyles = css`
  ${clearfix}
`;
