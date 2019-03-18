import React, { HTMLAttributes } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { resets } from '../utils';

/* Only style reseted label-element, no need to check accessibility here */
/* eslint-disable jsx-a11y/label-has-associated-control */

export interface HtmlLabelProps extends HTMLAttributes<HTMLLabelElement> {
  /**
   * HTML Label for ID-name of the element
   */
  for?: string;
}

const labelResets = css`
  ${resets.normalize.html}
  ${resets.common}
  max-width: 100%;
`;

const Label = (props: HtmlLabelProps) => <label {...props} />;

export const HtmlLabel = styled(Label)`
  ${labelResets}
`;
