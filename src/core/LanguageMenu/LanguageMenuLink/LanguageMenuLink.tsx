import React, { ReactNode } from 'react';
import classnames from 'classnames';
import { MenuLink } from '@reach/menu-button';

export interface LanguageMenuLinkProps {
  /** Url to direct to */
  href: string;
  /** Item content */
  children: ReactNode;
  /** Show item as selected one */
  selected?: boolean;
  className?: string;
}

const LanguageMenuLink = ({
  selected,
  className,
  ...passProps
}: LanguageMenuLinkProps) => (
  <MenuLink
    {...passProps}
    className={classnames(className, {
      'fi-language-menu-lang-item-selected': selected,
    })}
  />
);

LanguageMenuLink.displayName = 'LanguageMenuLink';
export { LanguageMenuLink };
