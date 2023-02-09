import React, { ReactNode } from 'react';
import classnames from 'classnames';

export interface ActionMenuItemProps {
  /** Operation to run on select */
  onSelect: () => void;
  /** Item content */
  children: ReactNode;
  /** Show item as selected one */
  selected?: boolean;
  className?: string;
}

const ActionMenuItem = ({
  selected,
  className,
  ...passProps
}: ActionMenuItemProps) => (
  <div
    {...passProps}
    className={classnames(className, {
      'fi-action-menu-lang-item-selected': selected,
    })}
  >
    sdfsd
  </div>
);

ActionMenuItem.displayName = 'ActionMenuItem';
export { ActionMenuItem };
