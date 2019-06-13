import { css } from '@emotion/core';
import { readableColor } from 'polished';
import { suomifiTheme } from '../theme';
import { fonts } from '../theme/reset';
import { clearfix } from '../../utils/css/utils';
import { ColorProps } from './Colors';

export const baseStyles = ({ color, theme = suomifiTheme }: ColorProps) => css`
  ${fonts(theme).body}
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  float: left;
  width: 192px;
  height: 180px;
  max-width: 100%;
  padding: ${theme.spacing.s};
  color: ${readableColor(color)};
  background-color: ${color};
  border-bottom: 4px solid ${color};
  cursor: pointer;
  z-index: 2;

  &:hover {
    border-bottom-color: ${readableColor(color)};
  }

  .fi-color__name {
    position: relative;
    width: 100%;
    text-align: right;
    overflow-wrap: break-word;
    z-index: 3;
    pointer-events: none;

    &--hex {
      ${fonts(theme).smRes.body}
      opacity: .4;
    }

    &--key {
      ${fonts(theme).semiBold}
    }
  }

  &:hover .fi-color__name--key {
    text-decoration: underline;
  }
`;

export const containerStyles = css`
  ${clearfix}
`;
