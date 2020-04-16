import React, { Component, ReactNode } from 'react';
import { HtmlNav, HtmlNavProps, HtmlOl, HtmlLi } from '../../reset';
import classnames from 'classnames';

export const baseClassName = 'fi-breadcrumb';
const listClassName = `${baseClassName}_list`;
const itemClassName = `${baseClassName}_item`;

export interface BreadcrumbProps extends HtmlNavProps {
  /** Name for the breadcrumb like 'Breadcrumb' */
  'aria-label': string;
  /** Custom classname to extend or customize */
  className?: string;
  /**
   * Link element displayed content
   */
  children?: ReactNode;
}

const breadcrumbItems = (children: ReactNode) =>
  React.Children.map(children, (child) => (
    <HtmlLi className={itemClassName}>{child}</HtmlLi>
  ));

export class Breadcrumb extends Component<BreadcrumbProps> {
  render() {
    const { className, children, ...passProps } = this.props;
    return (
      <HtmlNav {...passProps} className={classnames(baseClassName, className)}>
        <HtmlOl className={listClassName}>{breadcrumbItems(children)}</HtmlOl>
      </HtmlNav>
    );
  }
}
