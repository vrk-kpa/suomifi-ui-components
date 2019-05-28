import React, { HTMLProps } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { resets } from '../utils';
import { Omit } from '../../utils/typescript';

export interface HtmlNavProps extends Omit<HTMLProps<HTMLElement>, 'ref'> {}

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
