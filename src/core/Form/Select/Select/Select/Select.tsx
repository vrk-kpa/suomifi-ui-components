import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv } from '../../../../../reset';
import { getOwnerDocument } from '../../../../../utils/common';
import { AutoId } from '../../../../utils/AutoId/AutoId';
import { Debounce } from '../../../../utils/Debounce/Debounce';
import { Popover } from '../../../../Popover/Popover';
import { SuomifiThemeConsumer, SuomifiThemeProp } from '../../../../theme';
import {
  FilterInput,
  FilterInputStatus,
} from '../../../FilterInput/FilterInput';
import { VisuallyHidden } from '../../../../VisuallyHidden/VisuallyHidden';
import { ClearButton } from '../../../ClearButton/ClearButton';
import { SelectItemList } from '../../BaseSelect/SelectItemList/SelectItemList';
import { SelectItem } from '../../BaseSelect/SelectItem/SelectItem';
import { SelectEmptyItem } from '../../BaseSelect/SelectEmptyItem/SelectEmptyItem';
import { SelectToggleButton } from '../SelectToggleButton/SelectToggleButton';
import { baseStyles } from './Select.baseStyles';

const baseClassName = 'fi-select';
const selectClassNames = {
  valueSelected: `${baseClassName}--value-selected`,
  contentWrapper: `${baseClassName}_content_wrapper`,
  selectedValue: `${baseClassName}_selected-value`,
  clearButtonWrapper: `${baseClassName}_clear-button_wrapper`,
  clearButton: `${baseClassName}_clear-button`,
  toggleButton: `${baseClassName}_toggle-button`,
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
  /** Clear button label for screen readers */
  clearButtonLabel: string;
  /** Event that is fired when item selections change */
  onItemSelectionChange?: (selectedItem: T | null) => void;
  /** Placeholder text for input. Use only as visual aid, not for instructions. */
  visualPlaceholder?: string;
  /** Text to show when no items to show, e.g filtered all out */
  noItemsText: string;
  /**
   * Text for screen reader indicating the amount of available options after filtering by typing. Will be read after the amount.
   * E.g 'options available' as prop value would result in '{amount} options available' being read by screen reader upon removal.
   */
  ariaOptionsAvailableText: string;
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
  filterMode: boolean;
  showPopover: boolean;
  focusedDescendantId: string | null;
  selectedItem: (T & SelectData) | null;
  initialItems: T[];
}

class BaseSelect<T> extends Component<
  SelectProps<T & SelectData> & SuomifiThemeProp
> {
  private popoverListRef: React.RefObject<HTMLUListElement>;

  private filterInputRef: React.RefObject<HTMLInputElement>;

  private toggleButtonRef: React.RefObject<HTMLButtonElement>;

  private clearButtonRef: React.RefObject<HTMLButtonElement>;

  private preventShowPopoverOnInputFocus = false;

  constructor(props: SelectProps<T & SelectData> & SuomifiThemeProp) {
    super(props);
    this.popoverListRef = React.createRef();
    this.filterInputRef = React.createRef();
    this.toggleButtonRef = React.createRef();
    this.clearButtonRef = React.createRef();
  }

  state: SelectState<T & SelectData> = {
    filterInputValue: this.props.selectedItem?.labelText
      ? this.props.selectedItem.labelText
      : this.props.defaultSelectedItem?.labelText || '',
    filteredItems: this.props.items,
    filterMode: !!this.props.selectedItem || !!this.props.defaultSelectedItem,
    showPopover: false,
    focusedDescendantId: null,
    selectedItem: this.props.selectedItem
      ? this.props.selectedItem
      : this.props.defaultSelectedItem || null,
    initialItems: this.props.items,
  };

  static getDerivedStateFromProps<U>(
    nextProps: SelectProps<U & SelectData>,
    prevState: SelectState<U & SelectData>,
  ) {
    const { items: propItems, selectedItem } = nextProps;
    const selectedItemChanged =
      'selectedItem' in nextProps &&
      selectedItem?.uniqueItemId !== prevState.selectedItem?.uniqueItemId;
    if (selectedItemChanged || propItems !== prevState.initialItems) {
      const resolvedSelectedItem =
        'selectedItem' in nextProps ? selectedItem : prevState.selectedItem;
      return {
        selectedItem: resolvedSelectedItem,
        filteredItems: propItems,
        filterInputValue: resolvedSelectedItem?.labelText,
        filterMode: selectedItemChanged ? !selectedItem : prevState.filterMode,
        initialItems: propItems,
      };
    }
    return null;
  }

  private filter = (data: SelectData, query: string) =>
    data.labelText.toLowerCase().includes(query.toLowerCase());

  private handleBlur = (
    event: React.FocusEvent<HTMLInputElement | HTMLButtonElement>,
  ) => {
    event.preventDefault();
    const ownerDocument = getOwnerDocument(this.popoverListRef);
    if (!ownerDocument) {
      return;
    }
    requestAnimationFrame(() => {
      const focusInPopover = this.popoverListRef.current?.contains(
        ownerDocument.activeElement,
      );
      const focusInToggleButton = this.toggleButtonRef.current?.contains(
        ownerDocument.activeElement,
      );
      const focusInInput =
        ownerDocument.activeElement === this.filterInputRef.current;
      const focusInSelect =
        focusInPopover || focusInInput || focusInToggleButton;
      this.setState({ showPopover: focusInSelect });
      if (!focusInSelect) {
        this.setState((prevState: SelectState<T & SelectData>) => ({
          filterInputValue: prevState.selectedItem?.labelText,
          filterMode: false,
        }));
      }
    });
  };

  private handleOnChange = (value: string) => {
    this.setState((prevState: SelectState<T & SelectData>) => {
      const newValue =
        prevState.filterMode || !prevState.selectedItem
          ? value
          : value.replace(
              new RegExp(`^${prevState.selectedItem?.labelText}`),
              '',
            );
      return {
        filterInputValue: newValue,
        showPopover: true,
        filterMode: true,
      };
    });
  };

  private focusToInputAndSelectText = () => {
    if (!!this.filterInputRef && this.filterInputRef.current) {
      this.filterInputRef.current.focus();
      setTimeout(() => this.filterInputRef.current?.select(), 100);
    }
  };

  private focusToInputAndCloseMenu = () => {
    this.focusToInputAndSelectText();
    this.setState({ showPopover: false, filterMode: false });
  };

  private handleItemSelection = (item: (T & SelectData) | null) => {
    if (item !== null && item.disabled) return;
    const { onItemSelect, onItemSelectionChange, selectedItem } = this.props;
    if (!selectedItem) {
      this.setState({
        selectedItem: item || null,
        filterInputValue: item?.labelText || '',
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
    const { filteredItems, focusedDescendantId, filterMode } = this.state;
    const popoverItems = !!filterMode ? filteredItems : this.props.items;
    const index = popoverItems.findIndex(
      ({ uniqueItemId }) => uniqueItemId === focusedDescendantId,
    );

    const getNextIndex = () => (index + 1) % popoverItems.length;
    const getPreviousIndex = () =>
      (index - 1 + popoverItems.length) % popoverItems.length;

    const getNextItem = () => popoverItems[getNextIndex()];
    const getPreviousItem = () => popoverItems[getPreviousIndex()];

    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        if (!this.state.showPopover) {
          this.setState({ showPopover: true });
        }
        const nextItem = getNextItem();
        if (nextItem) {
          this.setState({ focusedDescendantId: nextItem.uniqueItemId });
        }
        break;
      }

      case 'ArrowUp': {
        event.preventDefault();
        if (!this.state.showPopover) {
          this.setState({ showPopover: true });
        }
        const previousItem = getPreviousItem();
        if (previousItem) {
          this.setState({ focusedDescendantId: previousItem.uniqueItemId });
        }
        break;
      }

      case 'Enter': {
        event.preventDefault();
        if (focusedDescendantId) {
          const focusedItem = popoverItems.find(
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
        if (!this.state.selectedItem) {
          this.setState({ filterInputValue: '' });
        }
        this.focusToInputAndCloseMenu();
        break;
      }

      default: {
        break;
      }
    }
  };

  private isOutsideClick(event: MouseEvent | KeyboardEvent) {
    return (
      !!this.toggleButtonRef &&
      (this.toggleButtonRef.current as Node).contains(event.target as Node)
    );
  }

  render() {
    const {
      filteredItems,
      filterMode,
      showPopover,
      focusedDescendantId,
      filterInputValue,
      selectedItem,
    } = this.state;

    const {
      id,
      className,
      theme,
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
      selectedItem: controlledItem,
      clearButtonLabel,
      ariaOptionsAvailableText,
      onItemSelect,
      ...passProps
    } = this.props;

    const ariaActiveDescendant = focusedDescendantId
      ? `${id}-${focusedDescendantId}`
      : '';
    const popoverItemListId = `${id}-popover`;
    const ariaStatusId = `${id}-aria-status`;

    const popoverItems = filterMode ? filteredItems : propItems;

    return (
      <>
        <HtmlDiv
          role="combobox"
          aria-haspopup="listbox"
          aria-owns={popoverItemListId}
          aria-expanded={showPopover}
          {...passProps}
          className={classnames(baseClassName, className, {
            [selectClassNames.valueSelected]: !!selectedItem,
            [selectClassNames.open]: showPopover,
            [selectClassNames.error]: status === 'error',
          })}
        >
          <HtmlDiv className={classnames(selectClassNames.contentWrapper, {})}>
            <Debounce waitFor={debounce}>
              {(debouncer: Function) => (
                <>
                  <FilterInput
                    aria-activedescendant={ariaActiveDescendant}
                    id={id}
                    aria-controls={popoverItemListId}
                    aria-describedby={ariaStatusId}
                    labelText={labelText}
                    items={propItems}
                    onFilter={(filtered) =>
                      this.setState({ filteredItems: filtered })
                    }
                    filterFunc={this.filter}
                    forwardedRef={this.filterInputRef}
                    onFocus={() => {
                      if (!this.preventShowPopoverOnInputFocus) {
                        this.setState({ showPopover: true });
                      }
                      this.preventShowPopoverOnInputFocus = false;
                    }}
                    onClick={(event) => {
                      if (!this.isOutsideClick((event as any) as MouseEvent)) {
                        this.setState(
                          (prevState: SelectState<T & SelectData>) => ({
                            showPopover: true,
                            filterInputValue: prevState.filterMode
                              ? prevState.filterInputValue
                              : '',
                            filterMode: true,
                          }),
                        );
                      }
                      this.focusToInputAndSelectText();
                    }}
                    onKeyDown={this.handleKeyDown}
                    onBlur={this.handleBlur}
                    value={filterInputValue}
                    onChange={(value: string) => {
                      if (propOnChange) {
                        debouncer(propOnChange, value);
                      }
                      this.handleOnChange(value);
                    }}
                    visualPlaceholder={!selectedItem ? visualPlaceholder : ''}
                    status={status}
                    statusText={statusText}
                  />
                  {!!selectedItem && (
                    <HtmlDiv className={selectClassNames.clearButtonWrapper}>
                      <ClearButton
                        forwardedRef={this.clearButtonRef}
                        className={selectClassNames.clearButton}
                        onClick={() => this.handleItemSelection(null)}
                        onBlur={(event) => this.handleBlur(event)}
                        label={clearButtonLabel}
                      />
                    </HtmlDiv>
                  )}
                  <SelectToggleButton
                    open={showPopover}
                    buttonRef={this.toggleButtonRef}
                    className={selectClassNames.toggleButton}
                    onClick={(event) => {
                      event.preventDefault();
                      this.setState(
                        (prevState: SelectState<T & SelectData>) => ({
                          showPopover: !prevState.showPopover,
                        }),
                      );
                      this.preventShowPopoverOnInputFocus = true;
                      this.focusToInputAndSelectText();
                    }}
                    aria-hidden={true}
                    tabIndex={-1}
                  />
                </>
              )}
            </Debounce>
            {showPopover && (
              <Popover
                sourceRef={this.filterInputRef}
                matchWidth={true}
                onKeyDown={this.handleKeyDown}
                onClickOutside={(event) => {
                  if (!this.isOutsideClick(event)) {
                    this.setState({ showPopover: false });
                  }
                }}
              >
                <SelectItemList
                  id={popoverItemListId}
                  forwardRef={this.popoverListRef}
                  focusedDescendantId={{ id: ariaActiveDescendant }}
                >
                  {popoverItems.length > 0 ? (
                    popoverItems.map((item) => {
                      const isCurrentlySelected =
                        item.uniqueItemId === focusedDescendantId;

                      return (
                        <SelectItem
                          hasKeyboardFocus={isCurrentlySelected}
                          key={`${item.uniqueItemId}_${
                            item.uniqueItemId === selectedItem?.uniqueItemId
                          }`}
                          id={`${id}-${item.uniqueItemId}`}
                          checked={
                            item.uniqueItemId === selectedItem?.uniqueItemId
                          }
                          disabled={item.disabled}
                          onClick={() => {
                            this.handleItemSelection(item);
                          }}
                          hightlightQuery={
                            filterMode ? this.filterInputRef.current?.value : ''
                          }
                        >
                          {item.labelText}
                        </SelectItem>
                      );
                    })
                  ) : (
                    <SelectEmptyItem>{noItemsText}</SelectEmptyItem>
                  )}
                </SelectItemList>
              </Popover>
            )}
          </HtmlDiv>
          <VisuallyHidden
            aria-live="polite"
            aria-atomic="true"
            id={ariaStatusId}
          >
            {`${popoverItems.length} ${ariaOptionsAvailableText}`}
          </VisuallyHidden>
        </HtmlDiv>
      </>
    );
  }
}

const SelectCombobox = styled(BaseSelect)`
  ${({ theme }) => baseStyles(theme)}
`;

export class Select<T> extends Component<SelectProps<T & SelectData>> {
  render() {
    const { id: propId, ...passProps } = this.props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <AutoId id={propId}>
            {(id) => (
              <SelectCombobox theme={suomifiTheme} id={id} {...passProps} />
            )}
          </AutoId>
        )}
      </SuomifiThemeConsumer>
    );
  }
}
