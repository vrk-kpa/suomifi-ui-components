import React, { HTMLProps } from 'react';
import { default as styled, css } from 'styled-components';
import { resets } from '../utils';
import { asPropType } from '../../utils/typescript';

export interface HtmlUlProps
  extends Omit<HTMLProps<HTMLUListElement>, 'type' | 'as'> {
  as?: asPropType;
}

const ulResets = css`
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

const Ul = (props: HtmlUlProps) => <ul {...props} />;

export const HtmlUl = styled(Ul)`
  ${ulResets}
`;

const UlWithRef = ({
  forwardRef,
  ...passProps
}: HtmlUlProps & { forwardRef: React.Ref<HTMLUListElement> }) => (
  <ul {...passProps} ref={forwardRef} />
);

export const HtmlUlWithRef = styled(UlWithRef)`
  ${ulResets}
`;
