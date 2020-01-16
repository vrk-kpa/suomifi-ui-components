import React from 'react';
import classnames from 'classnames';
import {
  MenuItem as CompMenuItem,
  LanguageMenuItemProps,
} from '../../components/LanguageMenu/LanguageMenu';

export interface LanguageMenuItemLanguageProps extends LanguageMenuItemProps {
  /** Show item as selected one */
  selected?: boolean;
  className?: string;
}

export const LanguageMenuItemLanguage = ({
  selected,
  className,
  ...passProps
}: LanguageMenuItemLanguageProps) => (
  <CompMenuItem
    {...passProps}
    className={classnames(className, {
      'fi-language-menu-lang-item-selected': selected,
    })}
  />
);
