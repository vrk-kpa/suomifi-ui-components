import React, { ReactNode } from 'react';
import { Button } from '../../../../Button/Button';
import { MultiSelectData } from '../MultiSelect/MultiSelect';

export interface MultiSelectRemoveAllButtonProps<T extends MultiSelectData> {
  selectedItems: (T & MultiSelectData)[];
  children: ReactNode;
  className?: string;
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
      variant="link"
      icon="remove"
      onClick={onClick}
      {...passProps}
    >
      {children}
    </Button>
  ) : null;
};
