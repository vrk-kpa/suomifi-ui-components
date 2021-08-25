import React, { RefObject } from 'react';
import { ChipList, Chip } from '../../../../Chip';

import { MultiSelectData } from '../MultiSelect/MultiSelect';

export interface MultiSelectChipListProps<T extends MultiSelectData> {
  selectedItems: (T & MultiSelectData)[];
  ariaChipActionLabel?: string;
  sourceRef?: RefObject<any>;
  onClick?: (item: T & MultiSelectData) => void;
}

export const MultiSelectChipList = <T extends MultiSelectData>(
  props: MultiSelectChipListProps<T & MultiSelectData>,
) => {
  const { selectedItems, sourceRef, ariaChipActionLabel, onClick } = props;

  const chipRefs = selectedItems
    .filter((item) => !item.disabled)
    .reduce(
      (
        arr: Array<React.RefObject<HTMLButtonElement>>,
        _chip: T & MultiSelectData,
        index: number,
      ) => {
        const mutatedArr: Array<React.RefObject<HTMLButtonElement>> = [...arr];
        mutatedArr[index] = React.createRef();
        return mutatedArr;
      },
      [],
    );

  return selectedItems && selectedItems.length > 0 ? (
    <ChipList>
      {selectedItems
        .filter((item) => item.disabled)
        .map((disabledItem) => (
          <Chip
            aria-disabled={true}
            key={disabledItem.uniqueItemId}
            actionLabel={ariaChipActionLabel}
            removable={true}
          >
            {disabledItem.chipText
              ? disabledItem.chipText
              : disabledItem.labelText}
          </Chip>
        ))}
      {selectedItems
        .filter((item) => !item.disabled)
        .map((enabledItem, index) => (
          <Chip
            key={enabledItem.uniqueItemId}
            removable={!enabledItem.disabled}
            onClick={() => {
              if (selectedItems.filter((item) => !item.disabled).length > 1) {
                if (index > 0) {
                  // eslint-disable-next-line no-unused-expressions
                  chipRefs[index - 1]?.current?.focus();
                } else if (index === 0) {
                  // eslint-disable-next-line no-unused-expressions
                  chipRefs[1]?.current?.focus();
                }
              } else {
                // eslint-disable-next-line no-unused-expressions
                sourceRef?.current?.focus();
              }
              if (!!onClick) {
                onClick(enabledItem);
              }
            }}
            actionLabel={ariaChipActionLabel}
            ref={chipRefs[index]}
          >
            {enabledItem.chipText
              ? enabledItem.chipText
              : enabledItem.labelText}
          </Chip>
        ))}
    </ChipList>
  ) : null;
};
