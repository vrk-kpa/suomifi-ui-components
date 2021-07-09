import React from 'react';
import classnames from 'classnames';
import { MenuLink } from '@reach/menu-button';
import { LanguageMenuLinkProps } from './LanguageMenu';

export interface LanguageMenuLinkLanguageProps extends LanguageMenuLinkProps {
  /** Show item as selected one */
  selected?: boolean;
  className?: string;
}

export const LanguageMenuLinkLanguage = ({
  selected,
  className,
  ...passProps
}: LanguageMenuLinkLanguageProps) => (
  <MenuLink
    {...passProps}
    className={classnames(className, {
      'fi-language-menu-lang-item-selected': selected,
    })}
  />
);
