import React, { ReactNode } from 'react';
import classnames from 'classnames';
import { MenuItem } from '@reach/menu-button';
export interface LanguageMenuItemProps {
  /** Operation to run on select */
  onSelect: () => void;
  /** Item content */
  children: ReactNode;
  /** Show item as selected one */
  selected?: boolean;
  className?: string;
}

const LanguageMenuItem = ({
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

LanguageMenuItem.displayName = 'LanguageMenuItem';
export { LanguageMenuItem };
