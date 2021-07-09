import React from 'react';
import classnames from 'classnames';
import { MenuItem } from '@reach/menu-button';
import { LanguageMenuItemProps } from './LanguageMenu';

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
  <MenuItem
    {...passProps}
    className={classnames(className, {
      'fi-language-menu-lang-item-selected': selected,
    })}
  />
);
