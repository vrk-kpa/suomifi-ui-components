import React, { Component } from 'react';
import styled from '@emotion/styled';
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

export class VisuallyHidden extends Component<VisuallyHiddenProps> {
  render() {
    const { className, ...passProps } = this.props;
    return (
      <StyledVisuallyHidden
        {...passProps}
        className={classnames(baseClassName, className)}
      />
    );
  }
}
