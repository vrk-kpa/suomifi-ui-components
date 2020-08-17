import React, { Component, ReactNode } from 'react';
import { HtmlSpan } from '../../reset';

export interface RadioButtonDividerProps {
  children: ReactNode;
  className?: string;
  variant?: 'small' | 'large';
}

export class RadioButtonDivider extends Component<RadioButtonDividerProps> {
  render() {
    const { children, className } = this.props;

    return <HtmlSpan className={className}>{children}</HtmlSpan>;
  }
}
