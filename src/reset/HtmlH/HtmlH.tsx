import { HTMLProps } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { resets } from '../utils';
import { Omit } from '../../utils/typescript';

export type hLevels = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HtmlHProps
  extends Omit<HTMLProps<HTMLHeadingElement>, 'ref'> {}

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
