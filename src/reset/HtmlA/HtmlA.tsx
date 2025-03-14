import React, { ReactNode, HTMLProps } from 'react';
import { styled, css } from 'styled-components';
import { resets } from '../utils';
import { allStates } from '../../utils/css';
import { asPropType } from '../../utils/typescript';

export interface HtmlAProps
  extends Omit<HTMLProps<HTMLAnchorElement>, 'ref' | 'as'> {
  children: ReactNode;
  as?: asPropType;
}

export interface HtmlAWithRefProps extends HtmlAProps {
  /** Ref for the heading element */
  forwardedRef?: React.Ref<HTMLAnchorElement>;
}

const aResets = css`
  ${resets.normalize.html}
  ${resets.normalize.a}
  ${resets.common}
  ${allStates('color: inherit; text-decoration: underline; cursor: pointer;')}
  display: inline;
  text-decoration: underline;
`;

const Ahref = styled.a<HtmlAWithRefProps>`
  ${aResets}
`;

export const HtmlA = ({ forwardedRef, ...passProps }: HtmlAWithRefProps) => (
  <Ahref ref={forwardedRef} {...passProps} />
);
