import React, { Component, ReactNode } from 'react';
import { HtmlA, HtmlAProps } from '../../reset';
import classnames from 'classnames';

export const baseClassName = 'fi-link';

export interface LinkProps extends HtmlAProps {
  /** Link url */
  href: string;
  /** Custom classname to extend or customize */
  className?: string;
  /**
   * Link element displayed content
   */
  children?: ReactNode;
}

export class Link extends Component<LinkProps> {
  render() {
    const { className, ...passProps } = this.props;
    return (
      <HtmlA {...passProps} className={classnames(className, baseClassName)} />
    );
  }
}
