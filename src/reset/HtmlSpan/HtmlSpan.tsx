import React, { HTMLAttributes } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { resets } from '../utils';

export interface HtmlSpanProps extends HTMLAttributes<HTMLSpanElement> {}

const spanResets = css`
  ${resets.normalize.html}
  ${resets.common}
  display: inline;
  max-width: 100%;
`;

const Span = (props: HtmlSpanProps) => <span {...props} />;

export const HtmlSpan = styled(Span)`
  ${spanResets}
`;
