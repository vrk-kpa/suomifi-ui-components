import React from 'react';
import classnames from 'classnames';
import {
  MenuItem as CompMenuItem,
  MenuItemProps,
} from '../../components/Menu/Menu';

export interface MenuItemLanguageProps extends MenuItemProps {
  /** Show item as selected one */
  selected?: boolean;
  className?: string;
}

export const MenuItemLanguage = ({
  selected,
  className,
  ...passProps
}: MenuItemLanguageProps) => (
  <CompMenuItem
    {...passProps}
    className={classnames(className, {
      'fi-menu-lang-item-selected': selected,
    })}
  />
);
