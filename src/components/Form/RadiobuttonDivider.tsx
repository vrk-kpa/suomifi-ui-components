import React, { Component, ReactNode } from 'react';
import { HtmlSpan } from '../../reset';

export interface RadiobuttonDividerProps {
  children: ReactNode;
  className?: string;
  variant?: 'small' | 'large';
}

export class RadiobuttonDivider extends Component<RadiobuttonDividerProps> {
  render() {
    const { children, className } = this.props;

    return <HtmlSpan className={className}>{children}</HtmlSpan>;
  }
}
