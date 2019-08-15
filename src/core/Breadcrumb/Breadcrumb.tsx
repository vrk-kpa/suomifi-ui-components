import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { withDefaultTheme } from '../theme/utils';
import { ThemeComponent } from '../theme';
import { baseStyles } from './Breadcrumb.baseStyles';
import {
  Breadcrumb as CompBreadcrumb,
  BreadcrumbProps as CompBreadcrumbProps,
} from '../../components/Breadcrumb/Breadcrumb';
import { LinkProps } from '../Link/Link';
import { BreadcrumbLink, BreadcrumbLinkProps } from './BreadcrumbLink';

type BreadcrumbVariant = 'default' | 'link';

export interface BreadcrumbProps extends CompBreadcrumbProps, ThemeComponent {
  /**
   * 'default' | 'expansion'
   * @default default
   */
  variant?: BreadcrumbVariant;
}

const StyledBreadcrumb = styled(({ theme, ...passProps }: BreadcrumbProps) => (
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
    return <BreadcrumbLink {...withDefaultTheme(props)} />;
  };

  render() {
    const { variant, 'aria-label': ariaLabel, ...passProps } = withDefaultTheme(
      this.props,
    );
    if (variant === 'link') {
      return <BreadcrumbLink {...passProps as BreadcrumbLinkProps} />;
    }
    return (
      <StyledBreadcrumb
        {...passProps}
        aria-label={!!ariaLabel ? ariaLabel : 'breadcrumb'}
      />
    );
  }
}
