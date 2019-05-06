import React, { HTMLAttributes } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { resets } from '../utils';

export interface HtmlDivProps extends HTMLAttributes<HTMLDivElement> {}

const divResets = css`
  ${resets.normalize.html}
  ${resets.common}
  display: block;
  max-width: 100%;
  word-wrap: normal;
  word-break: normal;
  white-space: normal;
`;

const Div = (props: HtmlDivProps) => <div {...props} />;

export const HtmlDiv = styled(Div)`
  ${divResets}
`;
