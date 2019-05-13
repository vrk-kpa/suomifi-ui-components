import { HTMLAttributes } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { resets } from '../utils';

export type hLevels = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HtmlHProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: hLevels | JSX.IntrinsicElements;
}

const hResets = css`
  ${resets.normalize.html}
  ${resets.common}
  display: block;
  max-width: 100%;
  word-wrap: normal;
  word-break: normal;
  white-space: normal;
`;

export const HtmlH = styled.h1<HtmlHProps>`
  ${hResets}
`;
