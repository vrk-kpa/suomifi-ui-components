import React, { Fragment } from 'react';
import { Link, LinkProps } from '../Link/Link';
import { Icon } from '../Icon/Icon';
import { HtmlSpan } from '../../reset';
import classnames from 'classnames';

const baseClassName = 'fi-breadcrumb';
const linkClassName = `${baseClassName}_link`;
const iconClassName = `${baseClassName}_icon`;

export interface BreadcrumbLinkProps extends Omit<LinkProps, 'href'> {
  /** Indicating the link is the current page */
  current?: boolean;
  /** url for the link */
  href?: string;
}

export const BreadcrumbLink = ({
  current,
  children,
  className,
  href = '',
  ...passProps
}: BreadcrumbLinkProps) => {
  if (!!current) {
    return (
      <HtmlSpan className={className} aria-current="location">
        {children}
      </HtmlSpan>
    );
  }

  return (
    <Fragment>
      <Link
        {...passProps}
        className={classnames(linkClassName, className)}
        href={href}
      >
        {children}
      </Link>
      <Icon icon="linkBreadcrumb" className={iconClassName} />
    </Fragment>
  );
};
