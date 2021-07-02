import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv } from '../../../../reset';
import { windowAvailable } from '../../../../utils/common';
import { AutoId } from '../../../../utils/AutoId';
import { Debounce } from '../../../utils/Debounce/Debounce';
import { Popover } from '../../../Popover/Popover';
import { FilterInput, FilterInputStatus } from '../../FilterInput/FilterInput';
import { SelectItemList } from '../SelectItemList/SelectItemList';
import { SelectItem } from '../SelectItem/SelectItem';
import { SelectEmptyItem } from '../SelectEmptyItem/SelectEmptyItem';
import { baseStyles } from './Select.baseStyles';

const baseClassName = 'fi-select';
const selectClassNames = {
  content_wrapper: `${baseClassName}_content_wrapper`,
  open: `${baseClassName}--open`,
  error: `${baseClassName}--error`,
  queryHighlight: `${baseClassName}-item--query_highlight`,
};

export interface SelectData {
  /** Unique label that will be shown on Select item and used on filter */
  labelText: string;
  /** Item selection disabled for the user */
  disabled?: boolean;
  /** Unique id to identify the item */
  uniqueItemId: string;
}

export interface SelectProps<T extends SelectData> {
  /** Select container div class name for custom styling. */
  className?: string;
  /** Items for the Select */
  items: Array<T & SelectData>;
  /**
   * Unique id
   * If no id is specified, one will be generated automatically
   */
  id?: string;
  /** Label */
  labelText: string;
  /** Event that is fired when item selections change */
  onItemSelectionChange?: (selectedItem: T | null) => void;
  /** Placeholder text for input. Use only as visual aid, not for instructions. */
  visualPlaceholder?: string;
  /** Text to show when no items to show, e.g filtered all out */
  noItemsText: string;
  /** Default selected items */
  defaultSelectedItem?: T & SelectData;
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
  selectedItem?: T & SelectData;
  /** Selecting the item will send event with the id */
  onItemSelect?: (uniqueItemId: string | null) => void;
}

interface SelectState<T extends SelectData> {
  filterInputValue: string;
  filteredItems: T[];
  showPopover: boolean;
  currentSelection: string | null;
  selectedKey: string | null;
  initialItems: T[];
}

class BaseSelect<T> extends Component<SelectProps<T & SelectData>> {
  private popoverListRef: React.RefObject<HTMLUListElement>;

  private filterInputRef: React.RefObject<HTMLInputElement>;

  private preventPopupToggle = false;

  constructor(props: SelectProps<T & SelectData>) {
    super(props);
    this.popoverListRef = React.createRef();
    this.filterInputRef = React.createRef();
  }

  state: SelectState<T & SelectData> = {
    filterInputValue: '',
    filteredItems: this.props.items,
    showPopover: false,
    currentSelection: null,
    selectedKey: this.props.selectedItem
      ? this.props.selectedItem.uniqueItemId
      : this.props.defaultSelectedItem?.uniqueItemId || null,
    initialItems: this.props.items,
  };

  static getDerivedStateFromProps<U>(
    nextProps: SelectProps<U & SelectData>,
    prevState: SelectState<U & SelectData>,
  ) {
    const { items: propItems, selectedItem } = nextProps;
    if (
      ('selectedItems' in nextProps &&
        selectedItem?.uniqueItemId !== prevState.selectedKey) ||
      propItems !== prevState.initialItems
    ) {
      return {
        selectedKey:
          'selectedItem' in nextProps
            ? selectedItem?.uniqueItemId
            : prevState.selectedKey,
        filteredItems: propItems,
        initialItems: propItems,
      };
    }
    return null;
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.globalClickHandler, {
      capture: true,
    });
  }

  private globalClickHandler = (nativeEvent: MouseEvent) => {
    if (
      this.popoverListRef.current?.contains(nativeEvent.target as Node) ||
      this.filterInputRef.current?.contains(nativeEvent.target as Node)
    ) {
      return;
    }
    this.setPopoverVisibility(false);
  };

  private highlightQuery = (text: string, query: string) => {
    if (query.length > 0) {
      const substrings = text.split(new RegExp(`(${query})`, 'gi'));
      return substrings.map((substring, i) => {
        const isMatch = substring.toLowerCase() === query.toLowerCase();
        if (isMatch) {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <mark className={selectClassNames.queryHighlight} key={i}>
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

  private filter = (data: SelectData, query: string) =>
    data.labelText.toLowerCase().includes(query.toLowerCase());

  private setPopoverVisibility = (visible: Boolean) => {
    if (visible) {
      document.addEventListener('click', this.globalClickHandler, {
        capture: true,
      });
    } else {
      document.removeEventListener('click', this.globalClickHandler, {
        capture: true,
      });
    }
    this.setState({ showPopover: visible });
  };

  private handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (this.popoverListRef !== null && this.popoverListRef.current !== null) {
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
        this.setPopoverVisibility(focusInCombobox);
        if (!focusInCombobox) {
          this.resetInputValue();
        }
      });
    }
  };

  private focusToMenu = () => {
    if (
      this.popoverListRef !== null &&
      this.popoverListRef.current !== null &&
      this.state.showPopover
    ) {
      this.popoverListRef.current.focus();
    }
  };

  private focusToInputAndCloseMenu = () => {
    if (!!this.filterInputRef && this.filterInputRef.current) {
      this.filterInputRef.current.focus();
      this.setPopoverVisibility(false);
    }
  };

  private resetInputValue = () => {
    const currentItem = this.props.items.find(
      ({ uniqueItemId }) => uniqueItemId === this.state.selectedKey,
    );

    this.setState((_prevState: SelectState<T & SelectData>) => ({
      filterInputValue: !!currentItem ? currentItem.labelText : '',
    }));
  };

  private handleItemSelection = (
    item: (T & SelectData) | null,
    inputValue?: string,
  ) => {
    if (item !== null && item.disabled) return;
    const { onItemSelect, onItemSelectionChange, selectedItem } = this.props;
    if (!selectedItem) {
      this.setState({
        selectedKey: item?.uniqueItemId || null,
        filterInputValue: item?.labelText || inputValue || '',
      });
    }
    if (!!onItemSelect) {
      onItemSelect(item?.uniqueItemId || null);
    }
    if (!!onItemSelectionChange) {
      onItemSelectionChange(item);
    }
    this.focusToInputAndCloseMenu();
  };

  private handleKeyDown = (event: React.KeyboardEvent) => {
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
        this.state.showPopover
      ) {
        const idOfCurrentElement = `${this.props.id}-${lblTxt}`;
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
        this.focusToMenu();
        if (!this.state.showPopover) {
          this.setPopoverVisibility(true);
          this.focusToMenu();
        }
        const nextItem = getNextItem();
        if (nextItem) {
          this.setState({ currentSelection: nextItem.uniqueItemId });
          scrollItemList(nextItem.uniqueItemId);
        }
        break;
      }

      case 'ArrowUp': {
        event.preventDefault();
        this.focusToMenu();
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
        this.resetInputValue();
        this.focusToInputAndCloseMenu();
        break;
      }

      default: {
        if (this.filterInputRef && this.filterInputRef.current) {
          this.filterInputRef.current.focus();
          this.setPopoverVisibility(true);
        }
        break;
      }
    }
  };

  render() {
    const {
      filteredItems,
      showPopover,
      currentSelection,
      filterInputValue,
      selectedKey,
    } = this.state;

    const {
      id,
      className,
      items: propItems,
      labelText,
      onItemSelectionChange,
      visualPlaceholder,
      noItemsText,
      defaultSelectedItem,
      onChange: propOnChange,
      debounce,
      status,
      statusText,
      selectedItem: controlledItems,
      onItemSelect,
      ...passProps
    } = this.props;

    const ariaActiveDescendant = currentSelection
      ? `${id}-${currentSelection}`
      : '';
    const popoverItemListId = `${id}-popover`;

    return (
      <>
        <HtmlDiv
          role="combobox"
          aria-haspopup="listbox"
          aria-owns={popoverItemListId}
          aria-expanded={showPopover}
          {...passProps}
          className={classnames(baseClassName, className, {
            [selectClassNames.open]: showPopover,
            [selectClassNames.error]: status === 'error',
          })}
        >
          <HtmlDiv className={classnames(selectClassNames.content_wrapper, {})}>
            <Debounce waitFor={debounce}>
              {(debouncer: Function) => (
                <FilterInput
                  id={id}
                  labelText={labelText}
                  items={propItems}
                  onFilter={(filtered) =>
                    this.setState({ filteredItems: filtered })
                  }
                  onMouseDown={() => {
                    if (
                      !!document &&
                      document.activeElement &&
                      this.filterInputRef.current !== document.activeElement
                    ) {
                      this.preventPopupToggle = true;
                    }
                    this.setPopoverVisibility(!this.state.showPopover);
                  }}
                  onMouseUp={() => {
                    this.preventPopupToggle = false;
                  }}
                  filterFunc={this.filter}
                  forwardedRef={this.filterInputRef}
                  onFocus={() => {
                    if (!this.preventPopupToggle) {
                      this.setPopoverVisibility(true);
                    }
                  }}
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
              sourceRef={this.filterInputRef.current}
              matchWidth={true}
              onKeyDown={this.handleKeyDown}
            >
              {showPopover && (
                <SelectItemList
                  id={popoverItemListId}
                  forwardRef={this.popoverListRef}
                  aria-activedescendant={ariaActiveDescendant}
                >
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => {
                      const isCurrentlySelected =
                        item.uniqueItemId === currentSelection;

                      return (
                        <SelectItem
                          hasKeyboardFocus={isCurrentlySelected}
                          key={`${item.uniqueItemId}_${
                            item.uniqueItemId === selectedKey
                          }`}
                          id={`${id}-${item.uniqueItemId}`}
                          checked={item.uniqueItemId === selectedKey}
                          disabled={item.disabled}
                          onClick={() => {
                            this.handleItemSelection(item);
                          }}
                        >
                          {this.highlightQuery(
                            item.labelText,
                            this.filterInputRef.current
                              ? this.filterInputRef.current.value
                              : '',
                          )}
                        </SelectItem>
                      );
                    })
                  ) : (
                    <SelectEmptyItem>{noItemsText}</SelectEmptyItem>
                  )}
                </SelectItemList>
              )}
            </Popover>
          </HtmlDiv>
        </HtmlDiv>
      </>
    );
  }
}

const SelectCombobox = styled(BaseSelect)`
  ${baseStyles}
`;

export class Select<T> extends Component<SelectProps<T & SelectData>> {
  render() {
    const { id: propId, ...passProps } = this.props;
    return (
      <AutoId id={propId}>
        {(id) => <SelectCombobox id={id} {...passProps} />}
      </AutoId>
    );
  }
}
