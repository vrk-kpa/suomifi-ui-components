import React from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlSpan, HtmlSpanProps } from '../../reset/HtmlSpan/HtmlSpan';

export interface VisuallyHiddenProps extends HtmlSpanProps {
  className?: string;
}

const baseClassName = 'fi-visually-hidden';

const StyledVisuallyHidden = styled((props: VisuallyHiddenProps) => (
  <HtmlSpan {...props} />
))`
  position: absolute;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  overflow: hidden;
`;

const VisuallyHidden = (props: VisuallyHiddenProps) => {
  const { className, ...passProps } = props;
  return (
    <StyledVisuallyHidden
      {...passProps}
      className={classnames(baseClassName, className)}
    />
  );
};

VisuallyHidden.displayName = 'VisuallyHidden';
export { VisuallyHidden };
