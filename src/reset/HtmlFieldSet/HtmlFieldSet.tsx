import React, { HTMLProps } from 'react';
import { styled, css } from 'styled-components';
import { resets } from '../utils';
import { asPropType } from '../../utils/typescript';

export interface HtmlFieldSetProps
  extends Omit<HTMLProps<HTMLFieldSetElement>, 'ref' | 'as'> {
  as?: asPropType;
  for?: string;
}

const fieldSetResets = css`
  ${resets.normalize.html}
  ${resets.common}
  max-width: 100%;
`;

const FieldSet = (props: HtmlFieldSetProps) => <fieldset {...props} />;

export const HtmlFieldSet = styled(FieldSet)`
  ${fieldSetResets}
`;
