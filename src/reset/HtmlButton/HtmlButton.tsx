import React, { HTMLProps, ButtonHTMLAttributes } from 'react';
import { default as styled, css } from 'styled-components';
import { resets, resetWithSelectors } from '../utils';
import { asPropType } from '../../utils/typescript';

export interface HtmlButtonProps
  extends Omit<HTMLProps<HTMLButtonElement>, 'ref' | 'as'> {
  as?: asPropType;
  /**
   * HTML button type
   * @default button
   */
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  'data-testid'?: string;
  forwardedRef?: React.Ref<HTMLButtonElement>;
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
  cursor: pointer;
`;

const Button = ({ forwardedRef, type, ...passProps }: HtmlButtonProps) => (
  <button {...passProps} ref={forwardedRef} type={!!type ? type : 'button'} />
);

export const HtmlButton = styled(Button)`
  ${buttonResets}
`;
