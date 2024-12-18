import React, { HTMLProps } from 'react';
import { styled, css } from 'styled-components';
import { resets } from '../utils';

export interface HtmlTableHeaderProps
  extends Omit<HTMLProps<HTMLTableSectionElement>, 'ref' | 'as' | 'children'> {
  forwardedRef?: React.Ref<HTMLTableSectionElement>;
  children?: React.ReactNode;
}

const TableHeaderResets = css`
  ${resets.normalize.html}
  ${resets.common}
`;

const TableHeader = ({ forwardedRef, ...passProps }: HtmlTableHeaderProps) => (
  <thead {...passProps} ref={forwardedRef} />
);

export const HtmlTableHeader = styled(TableHeader)`
  ${TableHeaderResets}
`;
