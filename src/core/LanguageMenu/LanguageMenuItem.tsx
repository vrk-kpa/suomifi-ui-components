import React from 'react';
import classnames from 'classnames';
import { MenuItem } from '@reach/menu-button';
import { LanguageMenuItemBaseProps } from './LanguageMenu';

export interface LanguageMenuItemProps extends LanguageMenuItemBaseProps {
  /** Show item as selected one */
  selected?: boolean;
  className?: string;
}

export const LanguageMenuItem = ({
  selected,
  className,
  ...passProps
}: LanguageMenuItemProps) => (
  <MenuItem
    {...passProps}
    className={classnames(className, {
      'fi-language-menu-lang-item-selected': selected,
    })}
  />
);
