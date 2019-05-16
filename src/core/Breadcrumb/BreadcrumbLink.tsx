import React, { Fragment } from 'react';
import { ThemeProp, suomifiTheme } from '../theme';
import { baseClassName } from '../../components/Breadcrumb/Breadcrumb';
import { Link, LinkProps } from '../Link/Link';
import { Icon } from '../Icon/Icon';
import { HtmlSpan } from '../../reset';
import classnames from 'classnames';
import { Omit } from '../../utils/typescript';

const linkClassName = `${baseClassName}-link`;
const iconClassName = `${baseClassName}-icon`;

export interface BreadcrumbLinkProps extends Omit<LinkProps, 'href'> {
  /** Indicating the link is the current page */
  current?: boolean;
  /** url for the link */
  href?: string;
  theme?: ThemeProp;
}

export const BreadcrumbLink = ({
  current,
  children,
  className,
  href = '',
  ...passProps
}: BreadcrumbLinkProps) =>
  !!current ? (
    <HtmlSpan className={className} aria-current="page">
      {children}
    </HtmlSpan>
  ) : (
    <Fragment>
      <Link
        {...passProps}
        className={classnames(linkClassName, className)}
        href={href}
      >
        {children}
      </Link>
      <Icon
        icon="linkBreadcrumb"
        className={iconClassName}
        color={
          !!passProps.theme
            ? passProps.theme.colors.blackBase
            : suomifiTheme.colors.blackBase // TODO
        }
      />
    </Fragment>
  );
