import React from 'react';
import classnames from 'classnames';
import { MenuLink } from '@reach/menu-button';
import { LanguageMenuLinkBaseProps } from './LanguageMenu';

export interface LanguageMenuLinkProps extends LanguageMenuLinkBaseProps {
  /** Show item as selected one */
  selected?: boolean;
  className?: string;
}

export const LanguageMenuLink = ({
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
