import React from 'react';
import { styled } from 'styled-components';
import { Link, LinkProps } from '../../Link';
import { HtmlSpan } from '../../../reset';
import classnames from 'classnames';
import { baseStyles } from './BreadcrumbLink.baseStyles';
import { SuomifiThemeConsumer, SuomifiThemeProp } from '../../theme';
import { IconLinkBreadcrumb } from 'suomifi-icons';

const baseClassName = 'fi-breadcrumb-link';
const breadcrumbClassNames = {
  link: `${baseClassName}_link`,
  current: `${baseClassName}_link--current`,
  linkUnderline: `${baseClassName}_link--initial-underline`,
  icon: `${baseClassName}_icon`,
};

export interface BreadcrumbLinkProps
  extends Omit<
    LinkProps,
    'href' | 'margin' | 'mx' | 'my' | 'mt' | 'mr' | 'mb' | 'ml'
  > {
  /** Indicates the link is the current page */
  current?: boolean;
  /** Url for the link */
  href?: string;
}

const BaseBreadcrumbLink = (props: BreadcrumbLinkProps & SuomifiThemeProp) => {
  const {
    current,
    children,
    className,
    theme,
    underline = 'hover',
    href = '',
    ...passProps
  } = props;
  return (
    <HtmlSpan className={classnames(className, baseClassName)}>
      {!current ? (
        <>
          <Link
            {...passProps}
            className={classnames(breadcrumbClassNames.link, {
              [breadcrumbClassNames.linkUnderline]: underline === 'initial',
            })}
            href={href}
          >
            {children}
          </Link>
          <IconLinkBreadcrumb className={breadcrumbClassNames.icon} />
        </>
      ) : (
        <HtmlSpan
          className={classnames(
            breadcrumbClassNames.link,
            breadcrumbClassNames.current,
          )}
          aria-current="location"
        >
          {children}
        </HtmlSpan>
      )}
    </HtmlSpan>
  );
};

const StyledBreadcrumbLink = styled(BaseBreadcrumbLink)`
  ${({ theme }) => baseStyles(theme)}
`;

export const BreadcrumbLink = (props: BreadcrumbLinkProps) => (
  <SuomifiThemeConsumer>
    {({ suomifiTheme }) => (
      <StyledBreadcrumbLink theme={suomifiTheme} {...props} />
    )}
  </SuomifiThemeConsumer>
);
