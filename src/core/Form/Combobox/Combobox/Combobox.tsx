import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv } from '../../../../reset';
import { AutoId } from '../../../../utils/AutoId';
import { windowAvailable } from '../../../../utils/common';
import { Button } from '../../../Button/Button';
import { Chip } from '../../../Chip/Chip';
import { FilterInput } from '../../FilterInput/FilterInput';
import { Popover } from '../../../Popover/Popover';
import { ComboboxItemList } from '../ComboboxItemList/ComboboxItemList';
import { ComboboxItem } from '../ComboboxItem/ComboboxItem';
import { ComboboxEmptyItem } from '../ComboboxEmptyItem/ComboboxEmptyItem';
import { ChipList } from '../ChipList/ChipList';
import { baseStyles } from './Combobox.baseStyles';

const baseClassName = 'fi-combobox';
const comboboxClassNames = {
  wrapper: `${baseClassName}_wrapper`,
  open: `${baseClassName}--open`,
};

export interface ComboboxData {
  /** Unique label that will be shown on combobox item and used on filter */
  labelText: string;
  /** Using labelText if chipText is not given */
  chipText?: string;
  /** Item selection disabled for the user */
  disabled?: boolean;
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
  /** Event that is sent when item selections change */
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
}

// actual boolean value does not matter, only if it exists on the list
interface SelectedItemKeys {
  [key: string]: boolean;
}

interface ComboboxState<T extends ComboboxData> {
  // items: T[];
  filterInputValue: string | undefined;
  filteredItems: T[];
  showPopover: boolean;
  currentSelection: string | null;
  selectedKeys: SelectedItemKeys;
  selectedItems: T[];
}

function getSelectedKeys<T>(items: (T & ComboboxData)[]): SelectedItemKeys {
  const selectedKeys: SelectedItemKeys = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const item of items) {
    selectedKeys[item.labelText] = false;
  }
  return selectedKeys;
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
    selectedKeys: getSelectedKeys(this.props.defaultSelectedItems || []),
    selectedItems: this.props.defaultSelectedItems || [],
  };

  handleItemSelection = (item: T & ComboboxData) => {
    this.setState(
      (
        prevState: ComboboxState<T & ComboboxData>,
        prevProps: ComboboxProps<T & ComboboxData>,
      ) => {
        const { onItemSelectionsChange } = prevProps;
        const { selectedKeys, selectedItems } = prevState;
        const newSelectedKeys = Object.assign({}, selectedKeys);
        if (!item.disabled) {
          if (item.labelText in newSelectedKeys) {
            delete newSelectedKeys[item.labelText];
            const newSelectedItems = selectedItems.filter(
              (selectedItem) => selectedItem.labelText !== item.labelText,
            );
            if (onItemSelectionsChange) {
              onItemSelectionsChange(newSelectedItems);
            }
            return {
              selectedKeys: newSelectedKeys,
              selectedItems: newSelectedItems,
            };
          }
          newSelectedKeys[item.labelText] = false;
          const newSelectedItems = selectedItems.concat([item]);
          if (onItemSelectionsChange) {
            onItemSelectionsChange(newSelectedItems);
          }
          return {
            selectedKeys: newSelectedKeys,
            selectedItems: newSelectedItems,
          };
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
        const { onItemSelectionsChange } = prevProps;
        const disabledItems = [];
        const newSelectedKeys: SelectedItemKeys = {};
        // eslint-disable-next-line no-restricted-syntax
        for (const item of selectedItems) {
          if (item.disabled) {
            disabledItems.push(item);
            newSelectedKeys[item.labelText] = false;
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
      const substrings = text.split(new RegExp(`(${query})`, 'gi'));
      return substrings.map((substring, i) => {
        const isMatch = substring.toLowerCase() === query.toLowerCase();
        if (isMatch) {
          // eslint-disable-next-line react/no-array-index-key
          return <mark key={i}>{substring}</mark>;
        }
        // eslint-disable-next-line react/no-array-index-key
        return <span key={i}>{substring}</span>;
      });
    };

    const filter = (data: ComboboxData, query: string) =>
      data.labelText.toLowerCase().includes(query.toLowerCase());

    const handleKeyDown = (event: React.KeyboardEvent) => {
      const { filteredItems: items, currentSelection } = this.state;
      const index = items.findIndex(
        ({ labelText: uniqueText }) => uniqueText === currentSelection,
      );

      const getNextIndex = () => (index + 1) % items.length;
      const getPreviousIndex = () => (index - 1 + items.length) % items.length;

      const getNextItem = () => items[getNextIndex()];
      const getPreviousItem = () => items[getPreviousIndex()];

      switch (event.key) {
        case 'ArrowDown': {
          event.preventDefault();
          focusToMenu();
          const nextItem = getNextItem();
          if (nextItem) {
            this.setState({ currentSelection: nextItem.labelText });
          }
          break;
        }

        case 'ArrowUp': {
          event.preventDefault();
          focusToMenu();
          const previousItem = getPreviousItem();
          if (previousItem) {
            this.setState({ currentSelection: previousItem.labelText });
          }
          break;
        }

        case 'Enter': {
          event.preventDefault();
          if (currentSelection) {
            const currentItem = items.find(
              ({ labelText: uniqueText }) => uniqueText === currentSelection,
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

    const filterInputOnChangeHandler = (value: string | undefined) => {
      this.setState({ filterInputValue: value });
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
      ...passProps
    } = this.props;

    return (
      <HtmlDiv
        role="combobox"
        aria-haspopup="listbox"
        aria-controls={`${id}-popover`}
        aria-expanded={showPopover}
        id={id}
        {...passProps}
        className={classnames(baseClassName, className, {
          [comboboxClassNames.open]: showPopover,
        })}
        aria-activedescendant={
          currentSelection ? `${id}-${currentSelection}` : undefined
        }
      >
        <HtmlDiv className={classnames(comboboxClassNames.wrapper, {})}>
          <FilterInput
            labelText={labelText}
            items={propItems}
            onFilter={(filtered) => this.setState({ filteredItems: filtered })}
            filterFunc={filter}
            forwardRef={this.filterInputRef}
            onFocus={() => setPopoverVisibility(true)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            value={this.state.filterInputValue}
            onChange={filterInputOnChangeHandler}
            visualPlaceholder={visualPlaceholder}
          />
          <Popover
            sourceRef={this.filterInputRef.current}
            matchWidth={true}
            id={`${id}-popover`}
            portalStyleProps={{ backgroundColor: 'white' }}
            onKeyDown={handleKeyDown}
          >
            {showPopover && (
              <ComboboxItemList
                forwardRef={this.popoverListRef}
                onBlur={handleBlur}
              >
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => {
                    const isCurrentlySelected =
                      item.labelText === currentSelection;

                    return (
                      <ComboboxItem
                        currentSelection={isCurrentlySelected}
                        key={`${item.labelText}_${
                          item.labelText in selectedKeys
                        }`}
                        id={`${id}-${item.labelText}`}
                        defaultChecked={item.labelText in selectedKeys}
                        disabled={item.disabled}
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
          {chipListVisible && (
            <ChipList>
              {selectedItems.map((item) => (
                <Chip
                  key={item.labelText}
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
          {removeAllButtonLabel && (
            <Button
              variant="secondary"
              icon="remove"
              onClick={this.handleRemoveAllSelections}
              style={{ borderRadius: 20, marginTop: 10 }}
            >
              {removeAllButtonLabel}
            </Button>
          )}
        </HtmlDiv>
      </HtmlDiv>
    );
  }
}

const ComboboxWithAutoId: <T>(
  props: ComboboxProps<T & ComboboxData>,
) => JSX.Element = ({
  // eslint-disable-next-line react/prop-types
  id: propId,
  ...passProps
}) => (
  <AutoId id={propId}>{(id) => <BaseCombobox id={id} {...passProps} />}</AutoId>
);

const StyledCombobox = styled(ComboboxWithAutoId)`
  ${baseStyles}
`;

export class Combobox<T> extends Component<ComboboxProps<T & ComboboxData>> {
  render() {
    return <StyledCombobox {...this.props} />;
  }
}
