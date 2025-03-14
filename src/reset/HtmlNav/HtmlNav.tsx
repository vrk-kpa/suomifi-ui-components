import React, { HTMLProps } from 'react';
import { styled, css } from 'styled-components';
import { resets } from '../utils';
import { asPropType } from '../../utils/typescript';

export interface HtmlNavProps
  extends Omit<HTMLProps<HTMLElement>, 'ref' | 'as'> {
  as?: asPropType;
  forwardedRef?: React.Ref<HTMLElement>;
}

const aResets = css`
  ${resets.normalize.html}
  ${resets.common}
  display: block;
  max-width: 100%;
`;

const Nav = ({ forwardedRef, ...passProps }: HtmlNavProps) => (
  <nav ref={forwardedRef} {...passProps} />
);

export const HtmlNav = styled(Nav)`
  ${aResets}
`;
