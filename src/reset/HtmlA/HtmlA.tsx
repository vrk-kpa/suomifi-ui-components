import React, { ReactNode, HTMLAttributes } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { resets } from '../utils';
import { allStates } from '../../utils/css/pseudo';

export interface HtmlAProps extends HTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

const aResets = css`
  ${resets.normalize.html}
  ${resets.normalize.a}
  ${resets.common}
  ${allStates('color: inherit; text-decoration: underline; cursor: pointer;')}
  display: inline;
  text-decoration: underline;
`;

const Ahref = ({ children, ...passProps }: HtmlAProps) => (
  <a {...passProps}>{children}</a>
);

export const HtmlA = styled(Ahref)`
  ${aResets}
`;
