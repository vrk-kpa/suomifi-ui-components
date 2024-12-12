import React, { forwardRef } from 'react';
import { styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlSpan, HtmlSpanProps } from '../../reset/HtmlSpan/HtmlSpan';

export interface VisuallyHiddenProps extends HtmlSpanProps {
  /** CSS class for custom styles */
  className?: string;
  /** Ref is forwarded to the span element. Alternative to React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLSpanElement>;
}

const baseClassName = 'fi-visually-hidden';

const StyledVisuallyHidden = styled((props: VisuallyHiddenProps) => {
  const { forwardedRef, ...passProps } = props;
  return <HtmlSpan forwardedRef={forwardedRef} {...passProps} />;
})`
  position: absolute;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  overflow: hidden;
`;

const VisuallyHidden = forwardRef(
  (props: VisuallyHiddenProps, ref: React.Ref<HTMLSpanElement>) => {
    const { className, ...passProps } = props;
    return (
      <StyledVisuallyHidden
        forwardedRef={ref}
        {...passProps}
        className={classnames(baseClassName, className)}
      />
    );
  },
);

VisuallyHidden.displayName = 'VisuallyHidden';
export { VisuallyHidden };
