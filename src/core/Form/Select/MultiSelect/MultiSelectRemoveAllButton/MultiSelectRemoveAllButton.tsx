import React, { ReactNode } from 'react';
import { IconRemove } from 'suomifi-icons';
import { Button } from '../../../../Button/Button';
import { MultiSelectData } from '../MultiSelect/MultiSelect';

export interface MultiSelectRemoveAllButtonProps<T extends MultiSelectData> {
  /** Array of currently selected items, used for controlling the button visibility and state */
  selectedItems: (T & MultiSelectData)[];
  /** Button content */
  children: ReactNode;
  /** Classname for the button element */
  className?: string;
  /** onClick event handler */
  onClick?: () => void;
}

export const MultiSelectRemoveAllButton = <T extends MultiSelectData>(
  props: MultiSelectRemoveAllButtonProps<T & MultiSelectData>,
) => {
  const { className, selectedItems, children, onClick, ...passProps } = props;

  const selectedAndEnabledKeysCount = selectedItems.reduce((count, item) => {
    if (item.disabled) {
      const newCount = count + 1;
      return newCount;
    }
    return count;
  }, 0);

  const showRemoveAllButton =
    children &&
    Object.keys(selectedItems).length > 0 &&
    Object.keys(selectedItems).length !== selectedAndEnabledKeysCount;

  return showRemoveAllButton ? (
    <Button
      className={className}
      variant="secondaryLight"
      icon={<IconRemove />}
      onClick={onClick}
      {...passProps}
    >
      {children}
    </Button>
  ) : null;
};
