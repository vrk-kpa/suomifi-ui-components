import { css } from '@emotion/core';
import { invert } from 'polished';

export const baseStyles = (color: string) => css`
  display: flex;
  align-items: flex-end;
  float: left;
  width: 120px;
  height: 160px;
  max-width: 100%;
  padding: 6px;
  color: ${invert(color)};
  background-color: ${color};

  .color__name {
    width: 100%;
    text-align: right;
    overflow-wrap: break-word;
  }
`;
