import React, { HTMLProps } from 'react';
import { styled, css } from 'styled-components';
import { resets } from '../utils';

export interface HtmlTableProps
  extends Omit<
    HTMLProps<HTMLTableElement>,
    'ref' | 'as' | 'data' | 'children'
  > {
  forwardedRef?: React.Ref<HTMLTableElement>;
  children?: React.ReactNode;
}

const TableResets = css`
  ${resets.normalize.html}
  ${resets.common}
  border-spacing: 0;
  border-collapse: collapse;
`;

const Table = ({ forwardedRef, ...passProps }: HtmlTableProps) => (
  <table {...passProps} ref={forwardedRef} />
);

export const HtmlTable = styled(Table)`
  ${TableResets}
`;
