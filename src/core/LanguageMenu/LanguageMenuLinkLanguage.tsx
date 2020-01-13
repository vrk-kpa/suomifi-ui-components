import React from 'react';
import classnames from 'classnames';
import {
  LanguageMenuLink as CompLanguageMenuLink,
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
  <CompLanguageMenuLink
    {...passProps}
    className={classnames(className, {
      'fi-language-menu-lang-item-selected': selected,
    })}
  />
);
