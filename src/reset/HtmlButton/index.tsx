import React, { HTMLAttributes } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { resets, resetWithSelectors } from '../utils';

export interface IHtmlButtonProps extends HTMLAttributes<HTMLButtonElement> {}

const buttonResets = css`
  ${resets.html}
  ${resets.button}
  ${resetWithSelectors([
    ':-moz-focusring',
    '::-moz-focus-inner',
    '::-webkit-file-upload-button',
    '::-webkit-inner-spin-button',
    '::-webkit-outer-spin-button',
    `[type='button']`,
    `[type='submit']`,
  ])}
  display: inline-block;
  max-width: 100%;
`;

const Button = (props: IHtmlButtonProps) => <button {...props} type="button" />;

const HtmlButton = styled(Button)`
  ${buttonResets}
`;

export default HtmlButton;
