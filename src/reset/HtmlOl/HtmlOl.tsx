import React, { HTMLAttributes } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { resets } from '../utils';

export interface HtmlOlProps extends HTMLAttributes<HTMLOListElement> {}

const olResets = css`
  ${resets.normalize.html}
  ${resets.common}
  display: block;
  list-style-type: decimal;
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 0;
  margin-right: 0;
  padding-left: 40px;
`;

const Ol = (props: HtmlOlProps) => <ol {...props} />;

export const HtmlOl = styled(Ol)`
  ${olResets}
`;
