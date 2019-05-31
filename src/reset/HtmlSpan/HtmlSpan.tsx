import React, { HTMLProps } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { resets } from '../utils';
import { Omit } from '../../utils/typescript';

export interface HtmlSpanProps
  extends Omit<HTMLProps<HTMLSpanElement>, 'ref'> {}

const spanResets = css`
  ${resets.normalize.html}
  ${resets.common}
  display: inline;
  max-width: 100%;
  word-wrap: normal;
  word-break: normal;
  white-space: normal;
`;

const Span = (props: HtmlSpanProps) => <span {...props} />;

export const HtmlSpan = styled(Span)`
  ${spanResets}
`;
