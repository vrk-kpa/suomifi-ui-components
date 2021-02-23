import React, { HTMLProps } from 'react';
import { default as styled, css } from 'styled-components';
import { resets, resetWithSelectors } from '../utils';
import { asPropType } from '../../utils/typescript';

export interface HtmlTextareaProps
  extends Omit<HTMLProps<HTMLTextAreaElement>, 'ref' | 'as'> {
  as?: asPropType;
}

const textareaResets = css`
  ${resets.normalize.html}
  ${resets.normalize.textarea}
  ${resetWithSelectors(['::-webkit-input-placeholder'])}
  ${resets.common}
  display: inline-block;
  max-width: 100%;
`;

const Textarea = (props: HtmlTextareaProps) => <textarea {...props} />;

export const HtmlTextarea = styled(Textarea)`
  ${textareaResets}
`;

const TextareaWithRef = ({
  forwardedRef,
  ...passProps
}: HtmlTextareaProps & {
  forwardedRef: React.RefObject<HTMLTextAreaElement>;
}) => <textarea {...passProps} ref={forwardedRef} />;

export const HtmlTextareaWithRef = styled(TextareaWithRef)`
  ${textareaResets}
`;
