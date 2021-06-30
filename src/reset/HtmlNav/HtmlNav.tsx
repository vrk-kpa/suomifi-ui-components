import React, { HTMLProps } from 'react';
import { default as styled, css } from 'styled-components';
import { resets } from '../utils';
import { asPropType } from '../../utils/typescript';

export interface HtmlNavProps
  extends Omit<HTMLProps<HTMLElement>, 'ref' | 'as'> {
  as?: asPropType;
}

const aResets = css`
  ${resets.normalize.html}
  ${resets.common}
  display: block;
  max-width: 100%;
`;

const Nav = (props: HtmlNavProps) => <nav {...props} />;

export const HtmlNav = styled(Nav)`
  ${aResets}
`;
