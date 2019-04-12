import React, { Component, Fragment } from 'react';
import styled from '@emotion/styled';
import { withDefaultTheme } from '../theme/utils/defaultTheme';
import { ThemeComponent, ThemeProp } from '../theme';
import { baseStyles } from './Breadcrumb.baseStyles';
import {
  Breadcrumb as CompBreadcrumb,
  BreadcrumbProps as CompBreadcrumbProps,
  baseClassName,
} from '../../components/Breadcrumb/Breadcrumb';
import { Link, LinkProps } from '../Link/Link';
import { Icon } from '../Icon/Icon';
import { HtmlSpan } from '../../reset';
import classnames from 'classnames';

const linkClassName = `${baseClassName}-link`;
const iconClassName = `${baseClassName}-icon`;

type BreadcrumbVariant = 'default' | 'link';

export interface BreadcrumbProps extends CompBreadcrumbProps, ThemeComponent {
  /**
   * 'default' | 'expansion'
   * @default default
   */
  variant?: BreadcrumbVariant;
}

export interface BreadcrumbLinkProps extends LinkProps {
  /** Indicating the link is the current page */
  current?: boolean;
  theme: ThemeProp;
}

const StyledBreadcrumb = styled(({ theme, ...passProps }: BreadcrumbProps) => (
  <CompBreadcrumb {...passProps} />
))`
  ${props => baseStyles(props)};
`;

const BreadcrumbLink = ({
  theme,
  current,
  children,
  className,
  ...passProps
}: BreadcrumbLinkProps) =>
  !!current ? (
    <HtmlSpan className={className} aria-current="page">
      {children}
    </HtmlSpan>
  ) : (
    <Fragment>
      <Link {...passProps} className={classnames(linkClassName, className)}>
        {children}
      </Link>
      <Icon
        icon="linkBreadcrumb"
        className={iconClassName}
        color={theme.colors.text}
      />
    </Fragment>
  );

type VariantBreadcrumbProps =
  | BreadcrumbProps
  | LinkProps & { variant?: BreadcrumbVariant };

/**
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
