import React, { InputHTMLAttributes } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { resets, resetWithSelectors } from '../utils';

export interface HtmlInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * HTML Input type
   * @default text
   */
  type?: string;
}

const inputResets = css`
  ${resets.normalize.html}
  ${resets.normalize.input}
  ${resetWithSelectors(['::-webkit-input-placeholder'])}
  ${resets.common}
  display: inline-block;
  max-width: 100%;
`;

const Input = ({ type, ...passProps }: HtmlInputProps) => (
  <input {...passProps} type={!!type ? type : 'text'} />
);

export const HtmlInput = styled(Input)`
  ${inputResets}
`;
