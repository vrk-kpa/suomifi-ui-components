import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv } from '../../../../reset';
import { windowAvailable } from '../../../../utils/common';
import { AutoId } from '../../../../utils/AutoId';
import { Debounce } from '../../../utils/Debounce/Debounce';
import { Button } from '../../../Button/Button';
import { Chip } from '../../../Chip';
import { Popover } from '../../../Popover/Popover';
import { FilterInput, FilterInputStatus } from '../../FilterInput/FilterInput';
import { ComboboxItemList } from '../ComboboxItemList/ComboboxItemList';
import { ComboboxItem } from '../ComboboxItem/ComboboxItem';
import { ComboboxEmptyItem } from '../ComboboxEmptyItem/ComboboxEmptyItem';
import { ChipList } from '../ChipList/ChipList';
import { baseStyles } from './Combobox.baseStyles';

const baseClassName = 'fi-combobox';
const comboboxClassNames = {
  content_wrapper: `${baseClassName}_content_wrapper`,
  open: `${baseClassName}--open`,
  removeAllButton: `${baseClassName}_removeAllButton`,
  error: `${baseClassName}--error`,
  queryHighlight: `${baseClassName}-item--query_highlight`,
};

export interface ComboboxData {
  /** Unique label that will be shown on combobox item and used on filter */
  labelText: string;
  /** Using labelText if chipText is not given */
  chipText?: string;
  /** Item selection disabled for the user */
  disabled?: boolean;
  /** Unique id to identify the item */
  uniqueItemId: string;
}

export interface ComboboxProps<T extends ComboboxData> {
  /** Combobox container div class name for custom styling. */
  className?: string;
  /** Items for the combobox */
  items: Array<T & ComboboxData>;
  /**
   * Unique id
   * If no id is specified, one will be generated automatically
   */
  id?: string;
  /** Label */
  labelText: string;
  /** Event that is fired when item selections change */
  onItemSelectionsChange?: (selectedItems: Array<T>) => void;
  /** Show chip list */
  chipListVisible?: boolean;
  /** Chip action label */
  chipActionLabel?: string;
  /** Label for remove button. If it is given, button will be shown. */
  removeAllButtonLabel?: string;
  /** Placeholder text for input. Use only as visual aid, not for instructions. */
  visualPlaceholder?: string;
  /** Label to show when no items to show, e.g filtered all out */
  emptyItemsLabel: string;
  /** Default selected items */
  defaultSelectedItems?: Array<T & ComboboxData>;
  /** Event sent when filter changes */
  onChange?: (value: string | undefined) => void;
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
  selectedItems?: Array<T & ComboboxData>;
  /** Selecting the item will send event with the id */
  onItemSelect?: (uniqueItemId: string) => void;
  /** Event to be sent when pressing remove all button */
  onRemoveAll?: () => void;
}

// actual boolean value does not matter, only if it exists on the list
interface ItemKeys {
  [key: string]: boolean;
}

interface ComboboxState<T extends ComboboxData> {
  filterInputValue: string | undefined;
  filteredItems: T[];
  showPopover: boolean;
  currentSelection: string | null;
  selectedKeys: ItemKeys;
  selectedItems: T[];
  initialItems: T[];
  disabledKeys: ItemKeys;
}

function getSelectedKeys<T>(items: (T & ComboboxData)[] = []): ItemKeys {
  return items.reduce((keys: ItemKeys, item: T & ComboboxData) => {
    const newSelectedKeys: ItemKeys = { ...keys };
    newSelectedKeys[item.uniqueItemId] = false;
    return newSelectedKeys;
  }, {});
}

function getDisabledKeys<T>(items: (T & ComboboxData)[] = []): ItemKeys {
  return items.reduce((keys: ItemKeys, item: T & ComboboxData) => {
    const newDisabledKeys: ItemKeys = { ...keys };
    if (item.disabled) {
      newDisabledKeys[item.uniqueItemId] = false;
    }
    return newDisabledKeys;
  }, {});
}

class BaseCombobox<T> extends Component<ComboboxProps<T & ComboboxData>> {
  private popoverListRef: React.RefObject<HTMLUListElement>;

  private filterInputRef: React.RefObject<HTMLInputElement>;

  constructor(props: ComboboxProps<T & ComboboxData>) {
    super(props);
    this.popoverListRef = React.createRef();
    this.filterInputRef = React.createRef();
  }

  state: ComboboxState<T & ComboboxData> = {
    filterInputValue: '',
    filteredItems: this.props.items,
    showPopover: false,
    currentSelection: null,
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
  };

  static getDerivedStateFromProps<U>(
    nextProps: ComboboxProps<U & ComboboxData>,
    prevState: ComboboxState<U & ComboboxData>,
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

  handleItemSelection = (item: T & ComboboxData) => {
    this.setState(
      (
        prevState: ComboboxState<T & ComboboxData>,
        prevProps: ComboboxProps<T & ComboboxData>,
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
        prevState: ComboboxState<T & ComboboxData>,
        prevProps: ComboboxProps<T & ComboboxData>,
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
  };

  render() {
    const highlightQuery = (text: string, query: string) => {
      if (query.length > 0) {
        const substrings = text.split(new RegExp(`(${query})`, 'gi'));
        return substrings.map((substring, i) => {
          const isMatch = substring.toLowerCase() === query.toLowerCase();
          if (isMatch) {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <mark className={comboboxClassNames.queryHighlight} key={i}>
                {substring}
              </mark>
            );
          }
          // eslint-disable-next-line react/no-array-index-key
          return <React.Fragment key={i}>{substring}</React.Fragment>;
        });
      }
      return text;
    };

    const filter = (data: ComboboxData, query: string) =>
      data.labelText.toLowerCase().includes(query.toLowerCase());

    const handleKeyDown = (event: React.KeyboardEvent) => {
      const { filteredItems: items, currentSelection } = this.state;
      const index = items.findIndex(
        ({ uniqueItemId }) => uniqueItemId === currentSelection,
      );

      const getNextIndex = () => (index + 1) % items.length;
      const getPreviousIndex = () => (index - 1 + items.length) % items.length;

      const getNextItem = () => items[getNextIndex()];
      const getPreviousItem = () => items[getPreviousIndex()];

      const scrollItemList = (lblTxt: string) => {
        if (
          this.popoverListRef !== null &&
          this.popoverListRef.current !== null &&
          showPopover
        ) {
          const idOfCurrentElement = `${id}-${lblTxt}`;
          const elementOffsetTop =
            document.getElementById(idOfCurrentElement)?.offsetTop || 0;
          const elementOffsetHeight =
            document.getElementById(idOfCurrentElement)?.offsetHeight || 0;
          if (elementOffsetTop < this.popoverListRef.current.scrollTop) {
            this.popoverListRef.current.scrollTop = elementOffsetTop;
          } else {
            const offsetBottom = elementOffsetTop + elementOffsetHeight;
            const scrollBottom =
              this.popoverListRef.current.scrollTop +
              this.popoverListRef.current.offsetHeight;
            if (offsetBottom > scrollBottom) {
              this.popoverListRef.current.scrollTop =
                offsetBottom - this.popoverListRef.current.offsetHeight;
            }
          }
        }
      };

      switch (event.key) {
        case 'ArrowDown': {
          event.preventDefault();
          focusToMenu();
          const nextItem = getNextItem();
          if (nextItem) {
            this.setState({ currentSelection: nextItem.uniqueItemId });
            scrollItemList(nextItem.uniqueItemId);
          }
          break;
        }

        case 'ArrowUp': {
          event.preventDefault();
          focusToMenu();
          const previousItem = getPreviousItem();
          if (previousItem) {
            this.setState({ currentSelection: previousItem.uniqueItemId });
            scrollItemList(previousItem.uniqueItemId);
          }
          break;
        }

        case 'Enter': {
          event.preventDefault();
          if (currentSelection) {
            const currentItem = items.find(
              ({ uniqueItemId }) => uniqueItemId === currentSelection,
            );
            if (currentItem) {
              this.handleItemSelection(currentItem);
            }
          }
          break;
        }

        case 'Escape': {
          event.preventDefault();
          this.setState(
            (
              _: ComboboxState<T & ComboboxData>,
              prevProps: ComboboxProps<T & ComboboxData>,
            ) => ({
              filterInputValue: '',
              filteredItems: prevProps.items,
            }),
          );
          setPopoverVisibility(false);
          break;
        }

        default: {
          if (this.filterInputRef && this.filterInputRef.current) {
            this.filterInputRef.current.focus();
            setPopoverVisibility(true);
          }
          break;
        }
      }
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      event.preventDefault();
      if (
        this.popoverListRef !== null &&
        this.popoverListRef.current !== null
      ) {
        const elem = this.popoverListRef.current;
        const ownerDocument = windowAvailable()
          ? elem
            ? elem.ownerDocument
            : document
          : null;

        if (!ownerDocument) {
          return;
        }
        requestAnimationFrame(() => {
          const focusInPopover = this.popoverListRef.current?.contains(
            ownerDocument.activeElement,
          );
          const focusInInput =
            ownerDocument.activeElement === this.filterInputRef.current;
          const focusInCombobox = focusInPopover || focusInInput;
          setPopoverVisibility(focusInCombobox);

          if (!focusInCombobox) {
            this.setState(
              (
                _: ComboboxState<T & ComboboxData>,
                prevProps: ComboboxProps<T & ComboboxData>,
              ) => ({
                filterInputValue: '',
                filteredItems: prevProps.items,
              }),
            );
          }
        });
      }
    };

    const setPopoverVisibility = (toState: Boolean) => {
      this.setState({ showPopover: toState });
    };

    const {
      filteredItems,
      showPopover,
      currentSelection,
      selectedKeys,
      selectedItems,
      disabledKeys,
      filterInputValue,
    } = this.state;

    const focusToMenu = () => {
      if (
        this.popoverListRef !== null &&
        this.popoverListRef.current !== null &&
        showPopover
      ) {
        this.popoverListRef.current.focus();
      }
    };

    const {
      id,
      className,
      items: propItems,
      labelText,
      onItemSelectionsChange,
      chipListVisible,
      chipActionLabel,
      removeAllButtonLabel,
      visualPlaceholder,
      emptyItemsLabel,
      defaultSelectedItems,
      onChange: propOnChange,
      debounce,
      status,
      statusText,
      selectedItems: controlledItems,
      onItemSelect,
      onRemoveAll,
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

    return (
      <HtmlDiv
        role="combobox"
        aria-haspopup="listbox"
        aria-controls={`${id}-popover`}
        aria-expanded={showPopover}
        {...passProps}
        className={classnames(baseClassName, className, {
          [comboboxClassNames.open]: showPopover,
          [comboboxClassNames.error]: status === 'error',
        })}
      >
        <HtmlDiv className={classnames(comboboxClassNames.content_wrapper, {})}>
          <Debounce waitFor={debounce}>
            {(debouncer: Function) => (
              <FilterInput
                id={id}
                labelText={labelText}
                items={propItems}
                onFilter={(filtered) =>
                  this.setState({ filteredItems: filtered })
                }
                filterFunc={filter}
                forwardedRef={this.filterInputRef}
                onFocus={() => setPopoverVisibility(true)}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                value={filterInputValue}
                onChange={(value: string | undefined) => {
                  if (propOnChange) {
                    debouncer(propOnChange, value);
                  }
                  this.setState({ filterInputValue: value });
                }}
                visualPlaceholder={visualPlaceholder}
                status={status}
                statusText={statusText}
              />
            )}
          </Debounce>
          <Popover
            sourceRef={this.filterInputRef.current}
            matchWidth={true}
            id={`${id}-popover`}
            onKeyDown={handleKeyDown}
          >
            {showPopover && (
              <ComboboxItemList
                forwardRef={this.popoverListRef}
                onBlur={handleBlur}
                aria-activedescendant={
                  currentSelection ? `${id}-${currentSelection}` : undefined
                }
              >
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => {
                    const isCurrentlySelected =
                      item.uniqueItemId === currentSelection;

                    return (
                      <ComboboxItem
                        hasKeyboardFocus={isCurrentlySelected}
                        key={`${item.uniqueItemId}_${
                          item.uniqueItemId in selectedKeys
                        }`}
                        id={`${id}-${item.uniqueItemId}`}
                        checked={item.uniqueItemId in selectedKeys}
                        disabled={item.uniqueItemId in disabledKeys}
                        onClick={() => {
                          focusToMenu();
                          this.handleItemSelection(item);
                        }}
                      >
                        {highlightQuery(
                          item.labelText,
                          this.filterInputRef.current
                            ? this.filterInputRef.current.value
                            : '',
                        )}
                      </ComboboxItem>
                    );
                  })
                ) : (
                  <ComboboxEmptyItem>{emptyItemsLabel}</ComboboxEmptyItem>
                )}
              </ComboboxItemList>
            )}
          </Popover>
          {showChipList && (
            <ChipList>
              {selectedItems.map((item) => (
                <Chip
                  key={item.uniqueItemId}
                  disabled={item.disabled}
                  removable={!item.disabled}
                  onClick={() => this.handleItemSelection(item)}
                  actionLabel={chipActionLabel}
                >
                  {item.chipText ? item.chipText : item.labelText}
                </Chip>
              ))}
            </ChipList>
          )}
          {showRemoveAllButton && (
            <Button
              className={classnames(comboboxClassNames.removeAllButton, {})}
              variant="link"
              icon="remove"
              onClick={this.handleRemoveAllSelections}
            >
              {removeAllButtonLabel}
            </Button>
          )}
        </HtmlDiv>
      </HtmlDiv>
    );
  }
}

const StyledCombobox = styled(BaseCombobox)`
  ${baseStyles}
`;

export class Combobox<T> extends Component<ComboboxProps<T & ComboboxData>> {
  render() {
    const { id: propId, ...passProps } = this.props;
    return (
      <AutoId id={propId}>
        {(id) => <StyledCombobox id={id} {...passProps} />}
      </AutoId>
    );
  }
}
