import React from 'react';
import classnames from 'classnames';
import {
  MenuLink as CompMenuLink,
  LanguageMenuLinkProps,
} from '../../components/LanguageMenu/LanguageMenu';

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
  <CompMenuLink
    {...passProps}
    className={classnames(className, {
      'fi-language-menu-lang-item-selected': selected,
    })}
  />
);
