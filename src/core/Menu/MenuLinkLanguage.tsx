import React from 'react';
import classnames from 'classnames';
import {
  MenuLink as CompMenuLink,
  MenuLinkProps,
} from '../../components/Menu/Menu';

export interface MenuLinkLanguageProps extends MenuLinkProps {
  /** Show item as selected one */
  selected?: boolean;
  className?: string;
}

export const MenuLinkLanguage = ({
  selected,
  className,
  ...passProps
}: MenuLinkLanguageProps) => (
  <CompMenuLink
    {...passProps}
    className={classnames(className, {
      'fi-menu-lang-item-selected': selected,
    })}
  />
);
