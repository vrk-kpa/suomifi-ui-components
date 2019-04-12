import React, { HTMLAttributes } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { resets } from '../utils';

export interface HtmlLiProps extends HTMLAttributes<HTMLLIElement> {}

const liResets = css`
  ${resets.normalize.html}
  ${resets.common}
  display: list-item;
`;

const Li = (props: HtmlLiProps) => <li {...props} />;

export const HtmlLi = styled(Li)`
  ${liResets}
`;
