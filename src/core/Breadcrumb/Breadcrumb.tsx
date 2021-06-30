import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { getConditionalAriaProp } from '../../utils/aria';
import {
  Breadcrumb as CompBreadcrumb,
  BreadcrumbProps as CompBreadcrumbProps,
} from '../../components/Breadcrumb/Breadcrumb';
import { LinkProps } from '../Link/Link';
import { BreadcrumbLink, BreadcrumbLinkProps } from './BreadcrumbLink';
import { baseStyles } from './Breadcrumb.baseStyles';

type BreadcrumbVariant = 'default' | 'link';

export interface BreadcrumbProps extends CompBreadcrumbProps {
  /**
   * 'default' | 'expansion'
   * @default default
   */
  variant?: BreadcrumbVariant;
}

const StyledBreadcrumb = styled(CompBreadcrumb)`
  ${baseStyles};
`;

type VariantBreadcrumbProps =
  | BreadcrumbProps
  | (LinkProps & { variant?: BreadcrumbVariant });

/**
 * <i class="semantics" />
 * Used for navigation path
 */
export class Breadcrumb extends Component<VariantBreadcrumbProps> {
  static link = (props: BreadcrumbLinkProps) => <BreadcrumbLink {...props} />;

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
