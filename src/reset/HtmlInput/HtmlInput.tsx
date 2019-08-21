import React, { HTMLProps } from 'react';
import { default as styled, css } from 'styled-components';
import { resets, resetWithSelectors } from '../utils';
import { Omit } from '../../utils/typescript';
export interface HtmlInputProps
  extends Omit<HTMLProps<HTMLInputElement>, 'ref' | 'as'> {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
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
