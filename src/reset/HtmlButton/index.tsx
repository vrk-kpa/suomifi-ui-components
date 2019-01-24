import React, { HTMLAttributes } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { resets, resetWithSelectors } from '../utils';

export interface HtmlButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * HTML Button type (button, submit, reset)
   * @default button
   */
  type?: string;
}

const buttonResets = css`
  ${resets.normalize.html}
  ${resets.normalize.button}
  ${resetWithSelectors([
    ':-moz-focusring',
    '::-moz-focus-inner',
    '::-webkit-file-upload-button',
    '::-webkit-inner-spin-button',
    '::-webkit-outer-spin-button',
    `[type='button']`,
    `[type='submit']`,
  ])}
  ${resets.common}
  display: inline-block;
  max-width: 100%;
`;

const Button = ({ type, ...rest }: HtmlButtonProps) => (
  <button {...rest} type={!!type ? type : 'button'} />
);

export const HtmlButton = styled(Button)`
  ${buttonResets}
`;
