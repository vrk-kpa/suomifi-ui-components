import React, { Component, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { getConditionalAriaProp } from '../../utils/aria';
import { BaseLinkProps } from '../Link/BaseLink/BaseLink';
import { BreadcrumbLink, BreadcrumbLinkProps } from './BreadcrumbLink';
import { HtmlLi, HtmlNav, HtmlNavProps, HtmlOl } from '../../reset';
import { baseStyles } from './Breadcrumb.baseStyles';

type BreadcrumbVariant = 'default' | 'link';
const baseClassName = 'fi-breadcrumb';
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
  /**
   * 'default' | 'link'
   * @default default
   */
  variant?: BreadcrumbVariant;
}

type VariantBreadcrumbProps =
  | BreadcrumbProps
  | (BaseLinkProps & { variant?: BreadcrumbVariant });

const breadcrumbItems = (children: ReactNode) =>
  React.Children.map(children, (child) => (
    <HtmlLi className={itemClassName}>{child}</HtmlLi>
  ));

class BaseBreadcrumb extends Component<BreadcrumbProps> {
  render() {
    const { className, children, ...passProps } = this.props;
    return (
      <HtmlNav {...passProps} className={classnames(baseClassName, className)}>
        <HtmlOl className={listClassName}>{breadcrumbItems(children)}</HtmlOl>
      </HtmlNav>
    );
  }
}

const StyledBreadcrumb = styled(BaseBreadcrumb)`
  ${baseStyles};
`;

/**
 * <i class="semantics" />
 * Used for navigation path
 */
export class Breadcrumb extends Component<VariantBreadcrumbProps> {
  render() {
    const { variant, 'aria-label': ariaLabel, ...passProps } = this.props;
    if (variant === 'link') {
      return <BreadcrumbLink {...(passProps as BreadcrumbLinkProps)} />;
    }
    return (
      <StyledBreadcrumb
        {...passProps}
        {...getConditionalAriaProp('aria-label', [ariaLabel])}
      />
    );
  }
}