import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv } from '../../../../reset';
import { getOwnerDocument, escapeStringRegexp } from '../../../../utils/common';
import { AutoId } from '../../../utils/AutoId/AutoId';
import { Debounce } from '../../../utils/Debounce/Debounce';
import { Popover } from '../../../Popover/Popover';
import { SuomifiThemeConsumer, SuomifiThemeProp } from '../../../theme';
import { FilterInput, FilterInputStatus } from '../../FilterInput/FilterInput';
import { VisuallyHidden } from '../../../VisuallyHidden/VisuallyHidden';
import { InputClearButton } from '../../InputClearButton/InputClearButton';
import { SelectItemList } from '../BaseSelect/SelectItemList/SelectItemList';
import { SelectItem } from '../BaseSelect/SelectItem/SelectItem';
import { SelectEmptyItem } from '../BaseSelect/SelectEmptyItem/SelectEmptyItem';
import { InputToggleButton } from '../../InputToggleButton/InputToggleButton';
import { baseStyles } from './SingleSelect.baseStyles';
import { SelectItemAddition } from '../BaseSelect/SelectItemAddition/SelectItemAddition';

const baseClassName = 'fi-single-select';
const singleSelectClassNames = {
  valueSelected: `${baseClassName}--value-selected`,
  clearButtonWrapper: `${baseClassName}_clear-button_wrapper`,
  open: `${baseClassName}--open`,
  error: `${baseClassName}--error`,
  queryHighlight: `${baseClassName}-item--query_highlight`,
};

export interface SingleSelectData {
  /** Unique label that will be shown on SingleSelect item and used on filter */
  labelText: string;
  /** Item selection disabled for the user */
  disabled?: boolean;
  /** Unique id to identify the item */
  uniqueItemId: string;
}

export type SingleSelectStatus = FilterInputStatus & {};

export interface InternalSingleSelectProps<T extends SingleSelectData> {
  /** SingleSelect container div class name for custom styling. */
  className?: string;
  /** Items for the SingleSelect */
  items: Array<T & SingleSelectData>;
  /**
   * Unique id
   * If no id is specified, one will be generated automatically
   */
  id?: string;
  /** Label */
  labelText: string;
  /** Text to mark a field optional. Wrapped in parentheses and shown after labelText. */
  optionalText?: string;
  /** Hint text to be shown below the label */
  hintText?: string;
  /** Clear button label for screen readers */
  clearButtonLabel: string;
  /** Event that is fired when item selection changes */
  onItemSelectionChange?: (selectedItem: T | null) => void;
  /** Placeholder text for input. Use only as visual aid, not for instructions. */
  visualPlaceholder?: string;
  /**
   * Text for screen reader indicating the amount of available options after filtering by typing. Will be read after the amount.
   * E.g 'options available' as prop value would result in '{amount} options available' being read by screen reader upon removal.
   */
  ariaOptionsAvailableText: string;
  /** Default selected items */
  defaultSelectedItem?: T & SingleSelectData;
  /** Event sent when filter changes */
  onChange?: (value: string) => void;
  /** onBlur event handler */
  onBlur?: () => void;
  /** Debounce time in milliseconds for onChange function. No debounce is applied if no value is given. */
  debounce?: number;
  /**
   * 'default' | 'error'
   * @default default
   */
  status?: SingleSelectStatus;
  /** Status text to be shown below the component and hint text. Use e.g. for validation error */
  statusText?: string;
  /** Controlled items; if item is in array, it is selected. If item has disabled: true, it will be disabled. */
  selectedItem?: (T & SingleSelectData) | null;
  /** Selecting the item will send event with the id */
  onItemSelect?: (uniqueItemId: string | null) => void;
  /** Disable the input */
  disabled?: boolean;
}

type AllowItemAdditionProps =
  | {
      allowItemAddition?: false | never;
      itemAdditionHelpText?: never;
      noItemsText: string;
    }
  | {
      /** Whether the user is allowed to enter their own text as the selected value
       * @default false
       */
      allowItemAddition?: true;
      /** Text to show above the item addition element.
       * Also read by screen reader when focusing on the item addition element.
       * Required if `allowItemAddition` is true */
      itemAdditionHelpText: string;
      /** Text to show when no items to show, e.g filtered all out. Required when `allowItemAddition` is false */
      noItemsText?: never;
    };

export type SingleSelectProps<T> = InternalSingleSelectProps<
  T & SingleSelectData
> &
  AllowItemAdditionProps;

interface SingleSelectState<T extends SingleSelectData> {
  filterInputValue: string;
  filteredItems: T[];
  computedItems: Array<T & SingleSelectData>;
  filterMode: boolean;
  showPopover: boolean;
  focusedDescendantId: string | null;
  selectedItem: (T & SingleSelectData) | null;
  initialItems: T[];
}

class BaseSingleSelect<T> extends Component<
  SingleSelectProps<T & SingleSelectData> & SuomifiThemeProp
> {
  private popoverListRef: React.RefObject<HTMLUListElement>;

  private filterInputRef: React.RefObject<HTMLInputElement>;

  private toggleButtonRef: React.RefObject<HTMLButtonElement>;

  private clearButtonRef: React.RefObject<HTMLButtonElement>;

  private preventShowPopoverOnInputFocus = false;

  constructor(
    props: SingleSelectProps<T & SingleSelectData> & SuomifiThemeProp,
  ) {
    super(props);
    this.popoverListRef = React.createRef();
    this.filterInputRef = React.createRef();
    this.toggleButtonRef = React.createRef();
    this.clearButtonRef = React.createRef();
  }

  state: SingleSelectState<T & SingleSelectData> = {
    filterInputValue: this.props.selectedItem?.labelText
      ? this.props.selectedItem.labelText
      : this.props.defaultSelectedItem?.labelText || '',
    filteredItems: this.props.items,
    filterMode: false,
    showPopover: false,
    focusedDescendantId: null,
    selectedItem: this.props.selectedItem
      ? this.props.selectedItem
      : this.props.defaultSelectedItem || null,
    initialItems: this.props.items,
    computedItems: this.props.items,
  };

  static getDerivedStateFromProps<U>(
    nextProps: SingleSelectProps<U & SingleSelectData>,
    prevState: SingleSelectState<U & SingleSelectData>,
  ) {
    const { items: propItems, selectedItem } = nextProps;
    const selectedItemChanged =
      'selectedItem' in nextProps &&
      selectedItem?.uniqueItemId !== prevState.selectedItem?.uniqueItemId;

    if (selectedItemChanged || propItems !== prevState.initialItems) {
      const resolvedSelectedItem =
        'selectedItem' in nextProps ? selectedItem : prevState.selectedItem;
      const resolvedInputValue = selectedItemChanged
        ? selectedItem?.labelText || ''
        : prevState.filterInputValue;

      return {
        selectedItem: resolvedSelectedItem,
        filteredItems: propItems,
        filterInputValue: resolvedInputValue,
        filterMode: prevState.filterMode,
        initialItems: propItems,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps: SingleSelectProps<T & SingleSelectData>): void {
    if (JSON.stringify(this.props.items) !== JSON.stringify(prevProps.items)) {
      this.setState({
        computedItems: this.props.items,
      });
    }
  }

  private filter = (data: SingleSelectData, query: string) =>
    data.labelText.toLowerCase().includes(query.toLowerCase());

  private handleBlur = () => {
    if (!!this.props.onBlur) {
      this.props.onBlur();
    }
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
      const focusInSingleSelect =
        focusInPopover || focusInInput || focusInToggleButton;
      if (!focusInSingleSelect) {
        this.setState((prevState: SingleSelectState<T & SingleSelectData>) => ({
          filterInputValue: prevState.selectedItem?.labelText || '',
          filterMode: false,
          showPopover: focusInSingleSelect,
          focusedDescendantId: null,
        }));
      }
    });
  };

  private handleOnChange = (value: string) => {
    this.setState((prevState: SingleSelectState<T & SingleSelectData>) => {
      const newValue =
        prevState.filterMode || !prevState.selectedItem
          ? value
          : value.replace(
              new RegExp(
                `^${escapeStringRegexp(
                  prevState.selectedItem?.labelText || '',
                )}`,
              ),
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
    this.setState({
      showPopover: false,
      filterMode: false,
      focusedDescendantId: null,
    });
  };

  private handleItemSelection = (item: (T & SingleSelectData) | null) => {
    if (item !== null && item.disabled) return;
    const {
      onItemSelect,
      onItemSelectionChange,
      selectedItem: controlledItem,
    } = this.props;
    if (!controlledItem) {
      const userAddedSelectedItem: Array<T & SingleSelectData> = [];
      if (item !== null) {
        const itemIsFromPropItems = this.props.items.some(
          (propItem) => propItem.uniqueItemId === item.uniqueItemId,
        );
        if (!itemIsFromPropItems) {
          userAddedSelectedItem.push(item);
        }
      }
      this.setState({
        selectedItem: item || null,
        filterInputValue: item?.labelText || '',
        focusedDescendantId: null,
        computedItems: this.props.items.concat(userAddedSelectedItem),
      });
    } else {
      this.setState((prevState: SingleSelectState<T & SingleSelectData>) => ({
        filterInputValue: prevState.selectedItem?.labelText || '',
      }));
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
    const { filteredItems, focusedDescendantId, filterMode, filterInputValue } =
      this.state;
    const popoverItems = !!filterMode
      ? filteredItems
      : this.state.computedItems;
    /**
     * Index is determined as thus:
     * null: No activeDescendantId
     * -1: Focus is in the selectItemAddition element
     * > -1: Focus is somewhere in (actual) items
     */
    const index = !!focusedDescendantId
      ? popoverItems.findIndex(
          ({ uniqueItemId }) => uniqueItemId === focusedDescendantId,
        )
      : null;

    const getNextIndex = () =>
      index !== null ? (index + 1) % popoverItems.length : 0;
    const getPreviousIndex = () =>
      index !== null && index !== -1
        ? (index - 1 + popoverItems.length) % popoverItems.length
        : popoverItems.length - 1;

    const getNextItem = () => popoverItems[getNextIndex()];
    const getPreviousItem = () => popoverItems[getPreviousIndex()];

    switch (event.key) {
      case 'ArrowDown': {
        if (!this.state.showPopover) {
          this.setState({ showPopover: true });
        }
        const nextItem =
          this.props.allowItemAddition &&
          (index === popoverItems.length - 1 || popoverItems.length === 0) &&
          filterInputValue !== '' &&
          !this.inputValueInItems()
            ? {
                uniqueItemId: filterInputValue.toLowerCase(),
                labelText: filterInputValue,
              }
            : getNextItem();
        if (nextItem) {
          this.setState({ focusedDescendantId: nextItem.uniqueItemId });
        }
        break;
      }

      case 'ArrowUp': {
        if (!this.state.showPopover) {
          this.setState({ showPopover: true });
        }
        const previousItem =
          this.props.allowItemAddition &&
          (index === null || index === 0) &&
          filterInputValue !== '' &&
          !this.inputValueInItems()
            ? {
                uniqueItemId: filterInputValue.toLowerCase(),
                labelText: filterInputValue,
              }
            : getPreviousItem();
        if (previousItem) {
          this.setState({ focusedDescendantId: previousItem.uniqueItemId });
        }
        break;
      }

      case 'Enter': {
        if (focusedDescendantId) {
          const focusedItem = popoverItems.find(
            ({ uniqueItemId }) => uniqueItemId === focusedDescendantId,
          );
          if (focusedItem) {
            this.handleItemSelection(focusedItem);
          } else {
            // @ts-expect-error: Cannot create an object which implements unknown generic type T
            const userAddedItem: T & MultiSelectData = {
              uniqueItemId: filterInputValue.toLowerCase(),
              labelText: filterInputValue,
            };
            this.handleItemSelection(userAddedItem);
          }
        }
        break;
      }

      case 'Escape': {
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

  private inputValueInItems = () =>
    !!this.state.computedItems.find(
      (ci) =>
        ci.uniqueItemId === this.state.filterInputValue.toLowerCase() ||
        ci.labelText.toLowerCase() ===
          this.state.filterInputValue.toLowerCase(),
    );

  render() {
    const {
      filteredItems,
      filterMode,
      showPopover,
      focusedDescendantId,
      filterInputValue,
      selectedItem,
      computedItems,
    } = this.state;

    const {
      id,
      className,
      theme,
      labelText,
      optionalText,
      hintText,
      onItemSelectionChange,
      visualPlaceholder,
      noItemsText,
      defaultSelectedItem,
      onChange: propOnChange,
      onBlur,
      debounce,
      status,
      statusText,
      selectedItem: controlledItem,
      clearButtonLabel,
      ariaOptionsAvailableText,
      onItemSelect,
      disabled,
      allowItemAddition,
      itemAdditionHelpText,
      items, // Only destructured away so they don't end up in the DOM
      ...passProps
    } = this.props;

    const ariaActiveDescendant = focusedDescendantId
      ? `${id}-${focusedDescendantId}`
      : '';
    const popoverItemListId = `${id}-popover`;
    const popoverItems = filterMode ? filteredItems : computedItems;

    return (
      <HtmlDiv
        {...passProps}
        className={classnames(baseClassName, className, {
          [singleSelectClassNames.valueSelected]: !!selectedItem,
          [singleSelectClassNames.open]: showPopover,
          [singleSelectClassNames.error]: status === 'error',
        })}
      >
        <Debounce waitFor={debounce}>
          {(debouncer: Function) => (
            <FilterInput
              inputElementContainerProps={{
                role: 'combobox',
                'aria-haspopup': 'listbox',
                'aria-owns': popoverItemListId,
                'aria-expanded': showPopover,
              }}
              aria-activedescendant={ariaActiveDescendant}
              id={id}
              aria-controls={popoverItemListId}
              labelText={labelText}
              optionalText={optionalText}
              hintText={hintText}
              items={computedItems}
              onFilter={(filtered) => {
                if (this.state.filterMode) {
                  this.setState(
                    (prevState: SingleSelectState<T & SingleSelectData>) => {
                      let newFocusedDescendandId =
                        prevState.focusedDescendantId;
                      if (
                        !filtered.some(
                          (f) => f.uniqueItemId === newFocusedDescendandId,
                        )
                      ) {
                        newFocusedDescendandId = null;
                      }
                      return {
                        filteredItems: filtered,
                        focusedDescendantId: newFocusedDescendandId,
                      };
                    },
                  );
                }
              }}
              filterFunc={this.filter}
              forwardedRef={this.filterInputRef}
              onFocus={() => {
                if (!this.preventShowPopoverOnInputFocus) {
                  this.setState({ showPopover: true });
                }
                this.preventShowPopoverOnInputFocus = false;
              }}
              onClick={() => {
                this.focusToInputAndSelectText();
                this.setState({
                  showPopover: true,
                });
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
              disabled={disabled}
            >
              {!!selectedItem && (
                <HtmlDiv className={singleSelectClassNames.clearButtonWrapper}>
                  <InputClearButton
                    forwardedRef={this.clearButtonRef}
                    onClick={() => this.handleItemSelection(null)}
                    onBlur={this.handleBlur}
                    label={clearButtonLabel}
                    disabled={disabled}
                  />
                </HtmlDiv>
              )}
              <InputToggleButton
                open={showPopover}
                ref={this.toggleButtonRef}
                onClick={(event) => {
                  event.preventDefault();
                  this.setState(
                    (prevState: SingleSelectState<T & SingleSelectData>) => ({
                      showPopover: !prevState.showPopover,
                    }),
                  );
                  this.preventShowPopoverOnInputFocus = true;
                  this.focusToInputAndSelectText();
                }}
                aria-hidden={true}
                tabIndex={-1}
                disabled={disabled}
              />
            </FilterInput>
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
              ref={this.popoverListRef}
              focusedDescendantId={ariaActiveDescendant}
            >
              <HtmlDiv>
                {popoverItems.length > 0 &&
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
                  })}

                {popoverItems.length === 0 && !allowItemAddition && (
                  <SelectEmptyItem>{noItemsText}</SelectEmptyItem>
                )}

                {filterInputValue !== '' &&
                  !this.inputValueInItems() &&
                  allowItemAddition && (
                    <SelectItemAddition
                      hintText={itemAdditionHelpText}
                      hasKeyboardFocus={
                        filterInputValue === focusedDescendantId
                      }
                      id={`${id}-${filterInputValue.toLowerCase()}`}
                      onClick={() => {
                        // @ts-expect-error: Cannot create an object which implements unknown generic type T
                        const item: T & MultiSelectData = {
                          labelText: filterInputValue,
                          uniqueItemId: filterInputValue.toLowerCase(),
                        };
                        this.handleItemSelection(item);
                      }}
                    >
                      {filterInputValue}
                    </SelectItemAddition>
                  )}
              </HtmlDiv>
            </SelectItemList>
          </Popover>
        )}
        {this.state.filterMode && (
          <VisuallyHidden aria-live="polite" aria-atomic="true">
            {`${popoverItems.length} ${ariaOptionsAvailableText}`}
          </VisuallyHidden>
        )}
      </HtmlDiv>
    );
  }
}

const StyledSingleSelect = styled(BaseSingleSelect)`
  ${({ theme }) => baseStyles(theme)}
`;

export class SingleSelect<T> extends Component<
  SingleSelectProps<T & SingleSelectData>
> {
  render() {
    const { id: propId, ...passProps } = this.props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <AutoId id={propId}>
            {(id) => (
              <StyledSingleSelect theme={suomifiTheme} id={id} {...passProps} />
            )}
          </AutoId>
        )}
      </SuomifiThemeConsumer>
    );
  }
}
