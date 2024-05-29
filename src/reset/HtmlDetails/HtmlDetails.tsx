import React, { HTMLProps } from 'react';
import { default as styled, css } from 'styled-components';
import { resets, resetWithSelectors } from '../utils';

export interface HtmlDetailsProps
  extends Omit<HTMLProps<HTMLDetailsElement>, 'ref' | 'as' | 'children'> {
  forwardedRef?: React.Ref<HTMLDetailsElement>;
  children?: React.ReactNode;
}

const detailsResets = css`
  ${resets.normalize.html}
  ${resets.normalize.details}
  ${resetWithSelectors([
    ':-moz-focusring',
    '::-moz-focus-inner',
    '::-webkit-file-upload-details',
    '::-webkit-inner-spin-details',
    '::-webkit-outer-spin-details',
  ])}
  ${resets.common}
  max-width: 100%;
  cursor: pointer;
`;

const Details = ({ forwardedRef, ...passProps }: HtmlDetailsProps) => (
  <details {...passProps} ref={forwardedRef} />
);

export const HtmlDetails = styled(Details)`
  ${detailsResets}
`;
