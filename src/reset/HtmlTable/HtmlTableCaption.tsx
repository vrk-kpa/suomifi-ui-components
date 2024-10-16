import React, { HTMLProps } from 'react';
import { default as styled, css } from 'styled-components';
import { resets } from '../utils';

export interface HtmlTableCaptionProps
  extends Omit<HTMLProps<HTMLTableCaptionElement>, 'ref' | 'as' | 'children'> {
  forwardedRef?: React.Ref<HTMLTableCaptionElement>;
  children?: React.ReactNode;
}

const TableCaptionResets = css`
  ${resets.normalize.html}
  ${resets.common}
  text-align: left;
`;

const TableCaption = ({
  forwardedRef,
  ...passProps
}: HtmlTableCaptionProps) => <caption {...passProps} ref={forwardedRef} />;

export const HtmlTableCaption = styled(TableCaption)`
  ${TableCaptionResets}
`;
