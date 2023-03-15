import React, { HTMLProps } from 'react';
import { default as styled, css } from 'styled-components';
import { resets } from '../utils';
import { asPropType } from '../../utils/typescript';

export interface HtmlLiProps extends Omit<HTMLProps<HTMLLIElement>, 'as'> {
  as?: asPropType;
  /** Ref for the input element */
  forwardedRef?: React.Ref<HTMLLIElement>;
}

const liResets = css`
  ${resets.normalize.html}
  ${resets.common}
  display: list-item;
`;

const Li = ({ forwardedRef, ...passProps }: HtmlLiProps) => (
  <li ref={forwardedRef} {...passProps} />
);

export const HtmlLi = styled(Li)`
  ${liResets}
`;
