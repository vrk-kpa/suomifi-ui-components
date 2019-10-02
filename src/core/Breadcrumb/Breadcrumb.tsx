import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { withSuomifiDefaults } from '../theme/utils';
import { TokensComponent } from '../theme';
import { baseStyles } from './Breadcrumb.baseStyles';
import {
  Breadcrumb as CompBreadcrumb,
  BreadcrumbProps as CompBreadcrumbProps,
} from '../../components/Breadcrumb/Breadcrumb';
import { LinkProps } from '../Link/Link';
import { BreadcrumbLink, BreadcrumbLinkProps } from './BreadcrumbLink';

type BreadcrumbVariant = 'default' | 'link';

export interface BreadcrumbProps extends CompBreadcrumbProps, TokensComponent {
  /**
   * 'default' | 'expansion'
   * @default default
   */
  variant?: BreadcrumbVariant;
}

const StyledBreadcrumb = styled(({ tokens, ...passProps }: BreadcrumbProps) => (
  <CompBreadcrumb {...passProps} />
))`
  ${props => baseStyles(props)};
`;

type VariantBreadcrumbProps =
  | BreadcrumbProps
  | LinkProps & { variant?: BreadcrumbVariant };

/**
 * <i class="semantics" />
 * Used for navigation path
 */
export class Breadcrumb extends Component<VariantBreadcrumbProps> {
  static link = (props: BreadcrumbLinkProps) => {
    return <BreadcrumbLink {...withSuomifiDefaults(props)} />;
  };

  render() {
    const {
      variant,
      'aria-label': ariaLabel,
      ...passProps
    } = withSuomifiDefaults(this.props);
    if (variant === 'link') {
      return <BreadcrumbLink {...passProps as BreadcrumbLinkProps} />;
    }
    return (
      <StyledBreadcrumb
        {...passProps}
        aria-label={!!ariaLabel ? ariaLabel : 'Breadcrumb'}
      />
    );
  }
}
