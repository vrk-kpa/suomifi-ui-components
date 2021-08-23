import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../../../theme';
import { HtmlDiv } from '../../../../../reset';
import { getOwnerDocument } from '../../../../../utils/common';
import { AutoId } from '../../../../utils/AutoId/AutoId';
import { Debounce } from '../../../../utils/Debounce/Debounce';
import { Button } from '../../../../Button/Button';
import { Chip } from '../../../../Chip';
import { Popover } from '../../../../Popover/Popover';
import {
  FilterInput,
  FilterInputStatus,
} from '../../../FilterInput/FilterInput';
import { SelectItemList } from '../../BaseSelect/SelectItemList/SelectItemList';
import { MultiSelectItem } from '../MultiSelectItem/MultiSelectItem';
import { SelectEmptyItem } from '../../BaseSelect/SelectEmptyItem/SelectEmptyItem';
import { ChipList } from '../../../../Chip/ChipList/ChipList';
import { VisuallyHidden } from '../../../../VisuallyHidden/VisuallyHidden';
import { baseStyles } from './MultiSelect.baseStyles';

const baseClassName = 'fi-multiselect';
const multiSelectClassNames = {
  content_wrapper: `${baseClassName}_content_wrapper`,
  open: `${baseClassName}--open`,
  removeAllButton: `${baseClassName}_removeAllButton`,
  error: `${baseClassName}--error`,
};

export interface MultiSelectData {
  /** Unique label that will be shown on MultiSelect item and used on filter */
  labelText: string;
  /** Using labelText if chipText is not given */
  chipText?: string;
  /** Item selection disabled for the user */
  disabled?: boolean;
  /** Unique id to identify the item */
  uniqueItemId: string;
}

export interface MultiSelectProps<T extends MultiSelectData> {
  /** MultiSelect container div class name for custom styling. */
  className?: string;
  /** Items for the MultiSelect */
  items: Array<T & MultiSelectData>;
  /**
   * Unique id
   * If no id is specified, one will be generated automatically
   */
  id?: string;
  /** Label */
  labelText: string;
  /** Hint text to be shown below the label */
  hintText?: string;
  /** Event that is fired when item selections change */
  onItemSelectionsChange?: (selectedItems: Array<T>) => void;
  /** Show chip list */
  chipListVisible?: boolean;
  /** Chip action label */
  ariaChipActionLabel?: string;
  /** Label for remove button. If it is given, button will be shown. */
  removeAllButtonLabel?: string;
  /** Placeholder text for input. Use only as visual aid, not for instructions. */
  visualPlaceholder?: string;
  /** Text to show when no items to show, e.g filtered all out */
  noItemsText: string;
  /** Default selected items */
  defaultSelectedItems?: Array<T & MultiSelectData>;
  /** Event sent when filter changes */
  onChange?: (value: string) => void;
  /** Debounce time in milliseconds for onChange function. No debounce is applied if no value is given. */
  debounce?: number;
  /**
   * 'default' | 'error'
   * @default default
   */
  status?: FilterInputStatus;
  /** Status text to be shown below the component and hint text. Use e.g. for validation error */
  statusText?: string;
  /** Controlled items; if item is in array, it is selected. If item has disabled: true, it will be disabled. */
  selectedItems?: Array<T & MultiSelectData>;
  /** Selecting the item will send event with the id */
  onItemSelect?: (uniqueItemId: string) => void;
  /** Event to be sent when pressing remove all button */
  onRemoveAll?: () => void;
  /** Text for screen reader to indicate how many items are selected */
  ariaSelectedAmountText: string;
  /** Text for screen reader indicating the amount of available options after filtering by typing. Will be read after the amount.
   * E.g 'options available' as prop value would result in '{amount} options available' being read by screen reader upon removal.
   */
  ariaOptionsAvailableText: string;
  /** Text for screen reader to read, after labelText/chipText, when selected option is removed from chip list.
   * E.g 'removed' as prop value would result in '{option} removed' being read by screen reader upon removal.
   */
  ariaOptionChipRemovedText: string;
}

// actual boolean value does not matter, only if it exists on the list
interface ItemKeys {
  [key: string]: boolean;
}

interface MultiSelectState<T extends MultiSelectData> {
  filterInputValue: string;
  filteredItems: T[];
  showPopover: boolean;
  focusedDescendantId: string | null;
  selectedKeys: ItemKeys;
  selectedItems: T[];
  initialItems: T[];
  disabledKeys: ItemKeys;
  chipRemovalAnnounceText: string;
}

function getSelectedKeys<T>(items: (T & MultiSelectData)[] = []): ItemKeys {
  return items.reduce((keys: ItemKeys, item: T & MultiSelectData) => {
    const newSelectedKeys: ItemKeys = { ...keys };
    newSelectedKeys[item.uniqueItemId] = false;
    return newSelectedKeys;
  }, {});
}

function getDisabledKeys<T>(items: (T & MultiSelectData)[] = []): ItemKeys {
  return items.reduce((keys: ItemKeys, item: T & MultiSelectData) => {
    const newDisabledKeys: ItemKeys = { ...keys };
    if (item.disabled) {
      newDisabledKeys[item.uniqueItemId] = false;
    }
    return newDisabledKeys;
  }, {});
}

class BaseMultiSelect<T> extends Component<
  MultiSelectProps<T & MultiSelectData> & SuomifiThemeProp
> {
  private popoverListRef: React.RefObject<HTMLUListElement>;

  private filterInputRef: React.RefObject<HTMLInputElement>;

  constructor(props: MultiSelectProps<T & MultiSelectData> & SuomifiThemeProp) {
    super(props);
    this.popoverListRef = React.createRef();
    this.filterInputRef = React.createRef();
  }

  state: MultiSelectState<T & MultiSelectData> = {
    filterInputValue: '',
    filteredItems: this.props.items,
    showPopover: false,
    focusedDescendantId: null,
    selectedKeys: this.props.selectedItems
      ? getSelectedKeys(this.props.selectedItems)
      : getSelectedKeys(this.props.defaultSelectedItems),
    selectedItems: this.props.selectedItems
      ? this.props.selectedItems || []
      : this.props.defaultSelectedItems || [],
    initialItems: this.props.items,
    disabledKeys: this.props.selectedItems
      ? getDisabledKeys(this.props.selectedItems)
      : getDisabledKeys(this.props.items),
    chipRemovalAnnounceText: '',
  };

  static getDerivedStateFromProps<U>(
    nextProps: MultiSelectProps<U & MultiSelectData>,
    prevState: MultiSelectState<U & MultiSelectData>,
  ) {
    const { items: propItems, selectedItems } = nextProps;
    if (
      ('selectedItems' in nextProps &&
        selectedItems !== prevState.selectedItems) ||
      propItems !== prevState.initialItems
    ) {
      return {
        selectedItems: selectedItems || prevState.selectedItems || [],
        selectedKeys:
          'selectedItems' in nextProps
            ? getSelectedKeys(selectedItems)
            : getSelectedKeys(prevState.selectedItems),
        disabledKeys: selectedItems
          ? getDisabledKeys(selectedItems)
          : getDisabledKeys(propItems),
        filteredItems: propItems,
        initialItems: propItems,
      };
    }
    return null;
  }

  handleItemSelection = (item: T & MultiSelectData) => {
    this.setState(
      (
        prevState: MultiSelectState<T & MultiSelectData>,
        prevProps: MultiSelectProps<T & MultiSelectData>,
      ) => {
        const {
          onItemSelectionsChange,
          onItemSelect,
          selectedItems: controlledItems,
        } = prevProps;
        const { selectedKeys, selectedItems } = prevState;
        const newSelectedKeys = Object.assign({}, selectedKeys);
        if (!item.disabled) {
          if (onItemSelect) {
            onItemSelect(item.uniqueItemId);
          }
          if (!controlledItems) {
            if (item.uniqueItemId in newSelectedKeys) {
              delete newSelectedKeys[item.uniqueItemId];
              const newSelectedItems = selectedItems.filter(
                (selectedItem) =>
                  selectedItem.uniqueItemId !== item.uniqueItemId,
              );
              if (onItemSelectionsChange) {
                onItemSelectionsChange(newSelectedItems);
              }
              return {
                selectedKeys: newSelectedKeys,
                selectedItems: newSelectedItems,
              };
            }
            newSelectedKeys[item.uniqueItemId] = false;
            const newSelectedItems = selectedItems.concat([item]);
            if (onItemSelectionsChange) {
              onItemSelectionsChange(newSelectedItems);
            }
            return {
              selectedKeys: newSelectedKeys,
              selectedItems: newSelectedItems,
            };
          }
        }
      },
    );
  };

  handleRemoveAllSelections = () => {
    this.setState(
      (
        prevState: MultiSelectState<T & MultiSelectData>,
        prevProps: MultiSelectProps<T & MultiSelectData>,
      ) => {
        const { selectedItems } = prevState;
        const { onItemSelectionsChange, onRemoveAll } = prevProps;
        const disabledItems = [];
        const newSelectedKeys: ItemKeys = {};
        if (onRemoveAll) {
          onRemoveAll();
        }
        // eslint-disable-next-line no-restricted-syntax
        for (const item of selectedItems) {
          if (item.disabled) {
            disabledItems.push(item);
            newSelectedKeys[item.uniqueItemId] = false;
          }
        }
        if (onItemSelectionsChange) {
          onItemSelectionsChange(disabledItems);
        }
        return { selectedKeys: newSelectedKeys, selectedItems: disabledItems };
      },
    );
    if (this.filterInputRef && this.filterInputRef.current) {
      this.filterInputRef.current.focus();
    }
  };

  private filter = (data: MultiSelectData, query: string) =>
    data.labelText.toLowerCase().includes(query.toLowerCase());

  private focusInInput = (ownerDocument: Document | null) =>
    ownerDocument
      ? ownerDocument.activeElement === this.filterInputRef.current
      : false;

  private focusInPopover = (ownerDocument: Document | null) =>
    ownerDocument
      ? this.popoverListRef.current?.contains(ownerDocument.activeElement)
      : false;

  private handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    event.preventDefault();
    const ownerDocument = getOwnerDocument(this.popoverListRef);
    if (!ownerDocument) {
      return;
    }
    requestAnimationFrame(() => {
      const focusInPopover = this.focusInPopover(ownerDocument);
      const focusInInput = this.focusInInput(ownerDocument);
      const focusInCombobox = focusInPopover || focusInInput;
      this.setState({ showPopover: focusInCombobox });

      if (!focusInCombobox) {
        this.setState(
          (
            _prevState: MultiSelectState<T & MultiSelectData>,
            prevProps: MultiSelectProps<T & MultiSelectData>,
          ) => ({
            filterInputValue: '',
            filteredItems: prevProps.items,
          }),
        );
      }
    });
  };

  private focusToMenu = () => {
    if (
      this.popoverListRef !== null &&
      this.popoverListRef.current !== null &&
      this.state.showPopover
    ) {
      if (!this.focusInPopover(getOwnerDocument(this.popoverListRef))) {
        this.popoverListRef.current.focus();
      }
    }
  };

  private handleKeyDown = (event: React.KeyboardEvent) => {
    const { filteredItems: items, focusedDescendantId } = this.state;
    const index = items.findIndex(
      ({ uniqueItemId }) => uniqueItemId === focusedDescendantId,
    );

    const getNextIndex = () => (index + 1) % items.length;
    const getPreviousIndex = () => (index - 1 + items.length) % items.length;

    const getNextItem = () => items[getNextIndex()];
    const getPreviousItem = () => items[getPreviousIndex()];

    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        this.focusToMenu();
        const nextItem = getNextItem();
        if (nextItem) {
          this.setState({ focusedDescendantId: nextItem.uniqueItemId });
        }
        break;
      }

      case 'ArrowUp': {
        event.preventDefault();
        this.focusToMenu();
        const previousItem = getPreviousItem();
        if (previousItem) {
          this.setState({ focusedDescendantId: previousItem.uniqueItemId });
        }
        break;
      }

      case 'Enter': {
        event.preventDefault();
        if (focusedDescendantId) {
          const focusedItem = items.find(
            ({ uniqueItemId }) => uniqueItemId === focusedDescendantId,
          );
          if (focusedItem) {
            this.handleItemSelection(focusedItem);
          }
        }
        break;
      }

      case 'Escape': {
        event.preventDefault();
        this.setState(
          (
            _prevState: MultiSelectState<T & MultiSelectData>,
            prevProps: MultiSelectProps<T & MultiSelectData>,
          ) => ({
            filterInputValue: '',
            filteredItems: prevProps.items,
          }),
        );
        this.setState({ showPopover: false });
        break;
      }

      default: {
        if (this.filterInputRef && this.filterInputRef.current) {
          this.filterInputRef.current.focus();
          this.setState({ showPopover: true });
        }
        break;
      }
    }
  };

  render() {
    const {
      filteredItems,
      showPopover,
      focusedDescendantId,
      selectedKeys,
      selectedItems,
      disabledKeys,
      filterInputValue,
      chipRemovalAnnounceText,
    } = this.state;

    const {
      id,
      className,
      theme,
      items: propItems,
      labelText,
      hintText,
      onItemSelectionsChange,
      chipListVisible,
      ariaChipActionLabel,
      removeAllButtonLabel,
      visualPlaceholder,
      noItemsText,
      defaultSelectedItems,
      onChange: propOnChange,
      debounce,
      status,
      statusText,
      selectedItems: controlledItems,
      onItemSelect,
      onRemoveAll,
      ariaSelectedAmountText,
      ariaOptionsAvailableText,
      ariaOptionChipRemovedText,
      ...passProps
    } = this.props;

    const selectedAndDisabledKeys = Object.keys(selectedKeys).reduce(
      (amount: number, key: string) => {
        if (key in disabledKeys) {
          return amount + 1;
        }
        return amount;
      },
      0,
    );

    const showChipList =
      chipListVisible && selectedItems && selectedItems.length > 0;

    const showRemoveAllButton =
      removeAllButtonLabel &&
      Object.keys(selectedKeys).length > 0 &&
      Object.keys(selectedKeys).length !== selectedAndDisabledKeys;

    const ariaActiveDescendant = focusedDescendantId
      ? `${id}-${focusedDescendantId}`
      : '';
    const popoverItemListId = `${id}-popover`;

    const chipRefs = selectedItems
      .filter((item) => !item.disabled)
      .reduce(
        (
          arr: Array<React.RefObject<HTMLButtonElement>>,
          _chip: T & MultiSelectData,
          index: number,
        ) => {
          const mutatedArr: Array<React.RefObject<HTMLButtonElement>> = [
            ...arr,
          ];
          mutatedArr[index] = React.createRef();
          return mutatedArr;
        },
        [],
      );

    return (
      <>
        <HtmlDiv
          role="combobox"
          aria-haspopup="listbox"
          aria-owns={popoverItemListId}
          aria-expanded={showPopover}
          {...passProps}
          className={classnames(baseClassName, className, {
            [multiSelectClassNames.open]: showPopover,
            [multiSelectClassNames.error]: status === 'error',
          })}
        >
          <HtmlDiv
            className={classnames(multiSelectClassNames.content_wrapper, {})}
          >
            <Debounce waitFor={debounce}>
              {(debouncer: Function) => (
                <FilterInput
                  id={id}
                  labelText={labelText}
                  hintText={hintText}
                  items={propItems}
                  onFilter={(filtered) =>
                    this.setState({ filteredItems: filtered })
                  }
                  filterFunc={this.filter}
                  forwardedRef={this.filterInputRef}
                  onFocus={() => this.setState({ showPopover: true })}
                  onKeyDown={this.handleKeyDown}
                  onBlur={this.handleBlur}
                  value={filterInputValue}
                  onChange={(value: string) => {
                    if (propOnChange) {
                      debouncer(propOnChange, value);
                    }
                    this.setState({ filterInputValue: value });
                  }}
                  visualPlaceholder={visualPlaceholder}
                  status={status}
                  statusText={statusText}
                  aria-controls={popoverItemListId}
                  aria-describedby={`${id}-selectedItems-length`}
                />
              )}
            </Debounce>
            <Popover
              sourceRef={this.filterInputRef}
              matchWidth={true}
              onKeyDown={this.handleKeyDown}
              onClickOutside={() => {
                if (this.state.showPopover) {
                  this.setState({ showPopover: false });
                }
              }}
            >
              {showPopover && (
                <SelectItemList
                  id={popoverItemListId}
                  forwardRef={this.popoverListRef}
                  focusedDescendantId={{ id: ariaActiveDescendant }}
                  aria-activedescendant={ariaActiveDescendant}
                  aria-multiselectable="true"
                >
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => {
                      const isCurrentlySelected =
                        item.uniqueItemId === focusedDescendantId;

                      return (
                        <MultiSelectItem
                          hasKeyboardFocus={isCurrentlySelected}
                          key={`${item.uniqueItemId}_${
                            item.uniqueItemId in selectedKeys
                          }`}
                          id={`${id}-${item.uniqueItemId}`}
                          checked={item.uniqueItemId in selectedKeys}
                          disabled={item.uniqueItemId in disabledKeys}
                          onClick={() => {
                            this.handleItemSelection(item);
                          }}
                          hightlightQuery={this.filterInputRef.current?.value}
                        >
                          {item.labelText}
                        </MultiSelectItem>
                      );
                    })
                  ) : (
                    <SelectEmptyItem>{noItemsText}</SelectEmptyItem>
                  )}
                </SelectItemList>
              )}
            </Popover>
            {showChipList && (
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
                        if (
                          selectedItems.filter((item) => !item.disabled)
                            .length > 1
                        ) {
                          if (index > 0) {
                            // eslint-disable-next-line no-unused-expressions
                            chipRefs[index - 1]?.current?.focus();
                          } else if (index === 0) {
                            // eslint-disable-next-line no-unused-expressions
                            chipRefs[1]?.current?.focus();
                          }
                        } else {
                          // eslint-disable-next-line no-unused-expressions
                          this.filterInputRef?.current?.focus();
                        }
                        this.setState({
                          chipRemovalAnnounceText: `${
                            enabledItem.chipText
                              ? enabledItem.chipText
                              : enabledItem.labelText
                          } ${ariaOptionChipRemovedText}`,
                        });
                        this.handleItemSelection(enabledItem);
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
            )}
            {showRemoveAllButton && (
              <Button
                className={classnames(
                  multiSelectClassNames.removeAllButton,
                  {},
                )}
                variant="link"
                icon="remove"
                onClick={this.handleRemoveAllSelections}
              >
                {removeAllButtonLabel}
              </Button>
            )}
          </HtmlDiv>
        </HtmlDiv>
        <VisuallyHidden
          aria-live="polite"
          aria-atomic="true"
          id={`${id}-selectedItems-length`}
        >
          {selectedItems.length}
          {ariaSelectedAmountText}
        </VisuallyHidden>
        <VisuallyHidden
          aria-live="polite"
          aria-atomic="true"
          id={`${id}-filteredItems-length`}
        >
          {this.focusInInput(getOwnerDocument(this.popoverListRef)) ? (
            <>
              {filteredItems.length}
              {ariaOptionsAvailableText}
            </>
          ) : null}
        </VisuallyHidden>
        <VisuallyHidden
          aria-live="assertive"
          aria-atomic="true"
          id={`${id}-chip-removal-announce`}
        >
          {chipRemovalAnnounceText}
        </VisuallyHidden>
      </>
    );
  }
}

const MultiSelectCombobox = styled(BaseMultiSelect)`
  ${({ theme }) => baseStyles(theme)}
`;

export class MultiSelect<T> extends Component<
  MultiSelectProps<T & MultiSelectData>
> {
  render() {
    const { id: propId, ...passProps } = this.props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <AutoId id={propId}>
            {(id) => (
              <MultiSelectCombobox
                theme={suomifiTheme}
                id={id}
                {...passProps}
              />
            )}
          </AutoId>
        )}
      </SuomifiThemeConsumer>
    );
  }
}
