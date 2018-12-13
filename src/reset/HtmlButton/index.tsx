import { HTMLAttributes } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { resets, resetWithSelectors } from '../utils';

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
`;

const HtmlButton = styled.button`
  ${buttonResets}
`;

export interface IHtmlButtonProps extends HTMLAttributes<HTMLButtonElement> {}
export default HtmlButton;
