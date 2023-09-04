import React, { Component, ReactNode, forwardRef, ReactElement } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../../../theme';
import {
  spacingStyles,
  separateMarginProps,
  MarginProps,
} from '../../../../theme/utils/spacing';
import { HtmlDiv } from '../../../../../reset';
import { getOwnerDocument } from '../../../../../utils/common';
import { HTMLAttributesIncludingDataAttributes } from '../../../../../utils/common/common';
import { AutoId } from '../../../../utils/AutoId/AutoId';
import { Debounce } from '../../../../utils/Debounce/Debounce';
import { Popover } from '../../../../Popover/Popover';
import {
  FilterInput,
  FilterInputStatus,
} from '../../../FilterInput/FilterInput';
import { SelectItemList } from '../../BaseSelect/SelectItemList/SelectItemList';
import { SelectItem } from '../../BaseSelect/SelectItem/SelectItem';
import { SelectEmptyItem } from '../../BaseSelect/SelectEmptyItem/SelectEmptyItem';
import { VisuallyHidden } from '../../../../VisuallyHidden/VisuallyHidden';
import { MultiSelectChipList } from '../MultiSelectChipList/MultiSelectChipList';
import { MultiSelectRemoveAllButton } from '../MultiSelectRemoveAllButton/MultiSelectRemoveAllButton';
import { baseStyles } from './MultiSelect.baseStyles';
import { InputToggleButton } from '../../../InputToggleButton/InputToggleButton';
import { SelectItemAddition } from '../../BaseSelect/SelectItemAddition/SelectItemAddition';
import { LoadingSpinner } from '../../../../LoadingSpinner/LoadingSpinner';

const baseClassName = 'fi-multiselect';
const multiSelectClassNames = {
  open: `${baseClassName}--open`,
  error: `${baseClassName}--error`,
  content_wrapper: `${baseClassName}_content_wrapper`,
  removeAllButton: `${baseClassName}_removeAllButton`,
};

export interface MultiSelectData {
  /** Unique label that will be shown on MultiSelect item and used for filtering */
  labelText: string;
  /** Visible text for the item. Overrides labelText for the visible part. */
  chipText?: string;
  /** Item selection disabled for the user */
  disabled?: boolean;
  /** Unique id to identify the item */
  uniqueItemId: string;
  /** Props to pass to select item's list element, for example data-attributes */
  listItemProps?: HTMLAttributesIncludingDataAttributes<HTMLLIElement>;
}

interface CheckedProp {
  checked: boolean;
}

export type MultiSelectStatus = FilterInputStatus & {};

type AriaOptionsAvailableProps =
  | {
      ariaOptionsAvailableText?: never;
      ariaOptionsAvailableTextFunction: (length: number) => string;
    }
  | {
      /** Text for screen reader indicating the amount of available options after filtering by typing. Will be read after the amount.
       * E.g 'options available' as prop value would result in '{amount} options available' being read by screen reader upon removal.
       */
      ariaOptionsAvailableText: string;

      /** Function to provide text for screen reader indicating the amount of available options after filtering by typing. Overrides
       * `ariaOptionsAvailableText` if both are provided.
       */
      ariaOptionsAvailableTextFunction?: never;
    };

type AriaOptionChipRemovedProps =
  | {
      ariaOptionChipRemovedText: string;
      ariaOptionChipRemovedTextFunction?: never;
    }
  | {
      /** Text for screen reader to read, after labelText/chipText, when selected option is removed from chip list.
       * E.g 'removed' as prop value would result in '{option} removed' being read by screen reader upon removal.
       */
      ariaOptionChipRemovedText?: never;
      /** Function to provide text for screen reader to read, after labelText/chipText, when selected option is removed from chip list.
       *  Overrides `ariaOptionChipRemovedText` if both are provided.
       */
      ariaOptionChipRemovedTextFunction: (option: string) => string;
    };

type AriaSelectedAmountProps =
  | {
      ariaSelectedAmountText: string;
      ariaSelectedAmountTextFunction?: never;
    }
  | {
      /** Text for screen reader to indicate how many items are selected.
       * E.g 'items selected' as prop value would result in '{amount} items selected' being read by screen reader.
       */
      ariaSelectedAmountText?: never;
      /** Function to provide text for screen reader to indicate how many items are selected. Overrides
       * `ariaSelectedAmountText` if both are provided.
       */
      ariaSelectedAmountTextFunction: (amount: number) => string;
    };

type LoadingProps =
  | {
      loading?: false | never;
      loadingText?: string;
    }
  | {
      /** Show the animated icon indicating that component is loading data
       * @default false
       */
      loading?: true;
      /** Text to show with the loading animation. Required if `loading` is true */
      loadingText: string;
    };

interface InternalMultiSelectProps<T extends MultiSelectData> {
  /** CSS class for custom styles */
  className?: string;
  /** Items for the MultiSelect
   * <pre>
   * MultiSelectData {
   *    labelText: string;
   *    uniqueItemId: string;
   *    disabled?: boolean;
   *    chipText? string;
   *    listItemProps?: HTMLAttributesIncludingDataAttributes&lt;HTMLLIElement&gt;;
   * }
   * </pre>
   */
  items: Array<T & MultiSelectData>;
  /**
   * HTML id attribute.
   * If no id is specified, one will be generated automatically
   */
  id?: string;
  /** Label for the component */
  labelText: ReactNode;
  /** Text to mark the field optional. Wrapped in parentheses and shown after labelText. */
  optionalText?: string;
  /** Hint text to be shown below the label */
  hintText?: string;
  /** Callback fired when item selections change */
  onItemSelectionsChange?: (selectedItems: Array<T & MultiSelectData>) => void;
  /** Shows the chip list below the input */
  chipListVisible?: boolean;
  /** Chip action label. Tells assistive technology what pressing the chip does. E.g. 'Remove'. Required with `chipListVisible` */
  ariaChipActionLabel?: string;
  /** Label for the 'Remove all' button. If it is given, the button will be shown. */
  removeAllButtonLabel?: string;
  /** Placeholder text for the input. Use only as visual aid, not for instructions. */
  visualPlaceholder?: string;
  /** Default selected items */
  defaultSelectedItems?: Array<T & MultiSelectData>;
  /** Callback fired when filter changes */
  onChange?: (value: string) => void;
  /** Callback fired on input blur */
  onBlur?: () => void;
  /** Debounce time in milliseconds for `onChange()` function. No debounce is applied if no value is given. */
  debounce?: number;
  /**
   * `'default'` | `'error'`
   *
   * Status of the component. Error state creates a red border around the MultiSelect.
   * Always use a descriptive `statusText` with an error status.
   * @default default
   */
  status?: MultiSelectStatus;
  /** Status text to be shown below the component. Use e.g. for validation error messages */
  statusText?: string;
  /** Controlled selected items. If item has disabled: true, it will be disabled. */
  selectedItems?: Array<T & MultiSelectData>;
  /**
   * Callback fired on item select
   * @param {string} uniqueItemId id of the selected item
   */
  onItemSelect?: (uniqueItemId: string) => void;
  /** Callback fired when pressing the remove all button */
  onRemoveAll?: () => void;
  /** Disables the input */
  disabled?: boolean;
  /** Tooltip component for the input's label */
  tooltipComponent?: ReactElement;
  /** Ref object is forwarded to the underlying input element. Alternative to React `ref` attribute. */
  forwardedRef?: React.RefObject<HTMLInputElement>;
  /** Props passed to unordered list element inside the popover. For example data-attributes */
  listProps?: HTMLAttributesIncludingDataAttributes<HTMLUListElement>;
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
      /** Text to show when there are no items to show, e.g filtered all out. Required when `allowItemAddition` is false */
      noItemsText?: never;
    };

export type MultiSelectProps<T> = InternalMultiSelectProps<
  T & MultiSelectData
> &
  AllowItemAdditionProps &
  AriaOptionsAvailableProps &
  AriaOptionChipRemovedProps &
  AriaSelectedAmountProps &
  MarginProps &
  LoadingProps;

interface MultiSelectState<T extends MultiSelectData> {
  filterInputValue: string;
  filteredItems: T[];
  computedItems: Array<T & MultiSelectData>;
  showPopover: boolean;
  showOptionsAvailableText: boolean;
  focusedDescendantId: string | null;
  selectedItems: Array<T & MultiSelectData>;
  chipRemovalAnnounceText: string;
}

class BaseMultiSelect<T> extends Component<
  MultiSelectProps<T & MultiSelectData> & SuomifiThemeProp
> {
  private popoverListRef: React.RefObject<HTMLUListElement>;

  private filterInputRef: React.RefObject<HTMLInputElement>;

  private toggleButtonRef: React.RefObject<HTMLButtonElement>;

  private chipRemovalAnnounceTimeOut: ReturnType<typeof setTimeout> | null =
    null;

  constructor(props: MultiSelectProps<T & MultiSelectData> & SuomifiThemeProp) {
    super(props);
    this.popoverListRef = React.createRef();

    this.filterInputRef = this.props.forwardedRef
      ? this.props.forwardedRef
      : React.createRef();

    this.toggleButtonRef = React.createRef();
  }

  state: MultiSelectState<T & MultiSelectData> = {
    filterInputValue: '',
    filteredItems: this.props.items,
    showPopover: false,
    showOptionsAvailableText: false,
    focusedDescendantId: null,
    selectedItems: this.props.selectedItems
      ? this.props.selectedItems || []
      : this.props.defaultSelectedItems || [],
    chipRemovalAnnounceText: '',
    computedItems: this.props.items,
  };

  static getDerivedStateFromProps<U>(
    nextProps: MultiSelectProps<U & MultiSelectData>,
    prevState: MultiSelectState<U & MultiSelectData>,
  ) {
    const { selectedItems } = nextProps;
    if (
      'selectedItems' in nextProps &&
      selectedItems !== prevState.selectedItems
    ) {
      return {
        selectedItems: selectedItems || prevState.selectedItems || [],
      };
    }
    return null;
  }

  componentDidUpdate(prevProps: MultiSelectProps<T & MultiSelectData>): void {
    if (JSON.stringify(this.props.items) !== JSON.stringify(prevProps.items)) {
      this.setState({
        computedItems: this.props.items,
      });
    }
  }

  componentWillUnmount() {
    if (this.chipRemovalAnnounceTimeOut) {
      clearTimeout(this.chipRemovalAnnounceTimeOut);
    }
  }

  private handleItemSelection = (item: T & MultiSelectData) => {
    if (item.disabled) return;

    const {
      onItemSelectionsChange,
      onItemSelect,
      selectedItems: controlledItems,
    } = this.props;

    let newSelectedItems: Array<T & MultiSelectData> = [];

    if (
      this.state.selectedItems.find(
        (prevItem) => prevItem.uniqueItemId === item.uniqueItemId,
      )
    ) {
      newSelectedItems = this.state.selectedItems.filter(
        (selectedItem) => selectedItem.uniqueItemId !== item.uniqueItemId,
      );
    } else {
      newSelectedItems = this.state.selectedItems.concat([item]);
    }

    if (!controlledItems) {
      this.setState(
        (
          prevState: MultiSelectState<T & MultiSelectData>,
          prevProps: MultiSelectProps<T & MultiSelectData>,
        ) => {
          const itemIsFromPropItems = prevProps.items.some(
            (propItem) => propItem.uniqueItemId === item.uniqueItemId,
          );
          if (
            prevState.selectedItems.find(
              (prevItem) => prevItem.uniqueItemId === item.uniqueItemId,
            )
          ) {
            if (itemIsFromPropItems) {
              return {
                selectedItems: newSelectedItems,
              };
            }
            const newComputedItems = prevState.computedItems.filter(
              (compi) => compi.uniqueItemId !== item.uniqueItemId,
            );
            return {
              selectedItems: newSelectedItems,
              computedItems: newComputedItems,
            };
          }

          return {
            selectedItems: newSelectedItems,
            computedItems: !itemIsFromPropItems
              ? prevState.computedItems.concat([item])
              : prevState.computedItems,
          };
        },
      );
    }

    if (!!onItemSelect) {
      onItemSelect(item.uniqueItemId);
    }
    if (!!onItemSelectionsChange) {
      onItemSelectionsChange(newSelectedItems);
    }
  };

  private handleRemoveAllSelections = () => {
    this.setState(
      (
        prevState: MultiSelectState<T & MultiSelectData>,
        prevProps: MultiSelectProps<T & MultiSelectData>,
      ) => {
        const { selectedItems } = prevState;
        const { onItemSelectionsChange, onRemoveAll } = prevProps;
        const disabledItems = [];
        if (onRemoveAll) {
          onRemoveAll();
        }
        // eslint-disable-next-line no-restricted-syntax
        for (const item of selectedItems) {
          if (item.disabled) {
            disabledItems.push(item);
          }
        }
        if (onItemSelectionsChange) {
          onItemSelectionsChange(disabledItems);
        }
        return {
          selectedItems: disabledItems,
          computedItems: prevProps.items,
        };
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

  private focusInToggleButton = (ownerDocument: Document | null) =>
    ownerDocument
      ? this.toggleButtonRef.current?.contains(ownerDocument.activeElement)
      : false;

  private handleBlur = () => {
    if (!!this.props.onBlur) {
      this.props.onBlur();
    }
    const ownerDocument = getOwnerDocument(this.popoverListRef);
    if (!ownerDocument) {
      return;
    }
    requestAnimationFrame(() => {
      const focusInPopover = this.focusInPopover(ownerDocument);
      const focusInInput = this.focusInInput(ownerDocument);
      const focusInToggleButton = this.focusInToggleButton(ownerDocument);

      const focusInMultiSelect =
        focusInPopover || focusInInput || focusInToggleButton;

      const userAddedSelectedItems: Array<T & MultiSelectData> =
        this.state.selectedItems.filter((si) =>
          this.props.items.every((pi) => pi.uniqueItemId !== si.uniqueItemId),
        );

      if (!focusInMultiSelect) {
        this.setState(
          (
            _prevState: MultiSelectState<T & MultiSelectData>,
            prevProps: MultiSelectProps<T & MultiSelectData>,
          ) => ({
            filterInputValue: '',
            filteredItems: prevProps.items,
            showPopover: false,
            showOptionsAvailableText: false,
            focusedDescendantId: null,
            computedItems: prevProps.items.concat(userAddedSelectedItems),
          }),
        );
      }
    });
  };

  private handleKeyDown = (event: React.KeyboardEvent) => {
    const {
      filteredItems: items,
      focusedDescendantId,
      filterInputValue,
    } = this.state;
    /**
     * Index is determined as thus:
     * null: No activeDescendantId
     * -1: Focus is in the selectItemAddition element
     * > -1: Focus is somewhere in (actual) items
     */
    const index = !!focusedDescendantId
      ? items.findIndex(
          ({ uniqueItemId }) => uniqueItemId === focusedDescendantId,
        )
      : null;

    const getNextIndex = () =>
      index !== null ? (index + 1) % items.length : 0;
    const getPreviousIndex = () =>
      index !== null && index !== -1
        ? (index - 1 + items.length) % items.length
        : items.length - 1;

    const getNextItem = () => items[getNextIndex()];
    const getPreviousItem = () => items[getPreviousIndex()];

    switch (event.key) {
      case 'ArrowDown': {
        this.setState({ showPopover: true });
        const nextItem =
          this.props.allowItemAddition &&
          (index === items.length - 1 || items.length === 0) &&
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
        this.setState({ showPopover: true });
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
        event.preventDefault();
        if (focusedDescendantId) {
          const focusedItem = items.find(
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
        if (this.state.showPopover) {
          event.stopPropagation();
        }
        this.setState(
          (
            _prevState: MultiSelectState<T & MultiSelectData>,
            prevProps: MultiSelectProps<T & MultiSelectData>,
          ) => ({
            filterInputValue: '',
            filteredItems: prevProps.items,
          }),
        );
        this.setState({ showPopover: false, focusedDescendantId: null });
        break;
      }

      default: {
        break;
      }
    }
  };

  private clickWasInToggleButton(event: MouseEvent) {
    return (
      !!this.toggleButtonRef &&
      (this.toggleButtonRef.current as Node).contains(event.target as Node)
    );
  }

  private handleToggleButtonClick(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    if (!!this.filterInputRef && this.filterInputRef.current) {
      if (document.activeElement !== this.filterInputRef.current) {
        this.filterInputRef.current.focus();
      } else {
        this.setState((prevState: MultiSelectState<T & MultiSelectData>) => ({
          showPopover: !prevState.showPopover,
          showOptionsAvailableText: !prevState.showOptionsAvailableText,
        }));
      }
    }
  }

  private disableItems = (items: MultiSelectData[]): MultiSelectData[] =>
    items.map((item) => ({
      ...item,
      disabled: true,
    }));

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
      showPopover,
      focusedDescendantId,
      selectedItems,
      filterInputValue,
      chipRemovalAnnounceText,
      computedItems,
    } = this.state;

    const {
      id,
      className,
      theme,
      labelText,
      optionalText,
      hintText,
      onItemSelectionsChange,
      chipListVisible,
      ariaChipActionLabel,
      removeAllButtonLabel,
      visualPlaceholder,
      loading,
      loadingText,
      noItemsText,
      defaultSelectedItems,
      onChange: propOnChange,
      debounce,
      status,
      statusText,
      selectedItems: controlledItems,
      onItemSelect,
      onRemoveAll,
      onBlur,
      ariaSelectedAmountText,
      ariaSelectedAmountTextFunction,
      ariaOptionsAvailableText,
      ariaOptionsAvailableTextFunction,
      ariaOptionChipRemovedText,
      ariaOptionChipRemovedTextFunction,
      disabled,
      allowItemAddition,
      itemAdditionHelpText,
      tooltipComponent,
      items, // Only destructured away so they don't end up in the DOM
      forwardedRef, // Only destructured away so it doesn't end up in the DOM
      listProps,
      ...rest
    } = this.props;
    const [marginProps, passProps] = separateMarginProps(rest);
    const marginStyle = spacingStyles(marginProps);

    const filteredItemsWithChecked: (T & MultiSelectData & CheckedProp)[] =
      filteredItems.map((item) => ({
        ...item,
        checked: !!selectedItems.find(
          (selectedItem) => selectedItem.uniqueItemId === item.uniqueItemId,
        ),
      }));

    const ariaActiveDescendant = focusedDescendantId
      ? `${id}-${focusedDescendantId}`
      : '';
    const popoverItemListId = `${id}-popover`;

    return (
      <>
        <HtmlDiv
          {...passProps}
          className={classnames(baseClassName, className, {
            [multiSelectClassNames.open]: showPopover,
            [multiSelectClassNames.error]: status === 'error',
          })}
          style={marginStyle}
        >
          <HtmlDiv
            className={classnames(multiSelectClassNames.content_wrapper, {})}
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
                  labelText={labelText}
                  optionalText={optionalText}
                  hintText={hintText}
                  items={computedItems}
                  onFilter={(filtered) => {
                    this.setState(
                      (prevState: MultiSelectState<T & MultiSelectData>) => {
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
                  }}
                  filterFunc={this.filter}
                  forwardedRef={this.filterInputRef}
                  onFocus={() =>
                    this.setState({
                      showPopover: true,
                      showOptionsAvailableText: true,
                    })
                  }
                  onKeyDown={this.handleKeyDown}
                  onBlur={this.handleBlur}
                  value={filterInputValue}
                  onChange={(value: string) => {
                    if (propOnChange) {
                      debouncer(propOnChange, value);
                    }
                    this.setState({
                      filterInputValue: value,
                      showPopover: true,
                    });
                  }}
                  visualPlaceholder={visualPlaceholder}
                  status={status}
                  statusText={statusText}
                  aria-controls={popoverItemListId}
                  disabled={disabled}
                  tooltipComponent={tooltipComponent}
                >
                  <InputToggleButton
                    open={showPopover}
                    ref={this.toggleButtonRef}
                    onClick={(event) => this.handleToggleButtonClick(event)}
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
                  if (!this.clickWasInToggleButton(event)) {
                    this.setState({ showPopover: false });
                  }
                }}
              >
                <SelectItemList
                  id={popoverItemListId}
                  ref={this.popoverListRef}
                  focusedDescendantId={ariaActiveDescendant}
                  aria-multiselectable="true"
                  {...listProps}
                >
                  <HtmlDiv>
                    {!loading &&
                      filteredItemsWithChecked.length > 0 &&
                      filteredItemsWithChecked.map((item) => {
                        const isCurrentlySelected =
                          item.uniqueItemId === focusedDescendantId;
                        return (
                          <SelectItem
                            hasKeyboardFocus={isCurrentlySelected}
                            key={`${item.uniqueItemId}_${item.checked}`}
                            id={`${id}-${item.uniqueItemId}`}
                            checked={item.checked}
                            disabled={item.disabled}
                            onClick={() => {
                              this.handleItemSelection(item);
                            }}
                            hightlightQuery={this.filterInputRef.current?.value}
                            {...item.listItemProps}
                          >
                            {item.labelText}
                          </SelectItem>
                        );
                      })}

                    {!loading &&
                      filteredItemsWithChecked.length === 0 &&
                      !allowItemAddition && (
                        <SelectEmptyItem>{noItemsText}</SelectEmptyItem>
                      )}

                    {!loading &&
                      filterInputValue !== '' &&
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
                            this.setState({
                              focusedDescendantId:
                                filterInputValue.toLowerCase(),
                            });
                          }}
                        >
                          {filterInputValue}
                        </SelectItemAddition>
                      )}

                    {loading && (
                      <SelectEmptyItem className="loading">
                        <LoadingSpinner
                          status="loading"
                          variant="small"
                          textAlign="right"
                          text={loadingText}
                        />
                      </SelectEmptyItem>
                    )}
                  </HtmlDiv>
                </SelectItemList>
              </Popover>
            )}
            {chipListVisible && (
              <MultiSelectChipList
                sourceRef={this.filterInputRef}
                selectedItems={
                  disabled ? this.disableItems(selectedItems) : selectedItems
                }
                ariaChipActionLabel={ariaChipActionLabel}
                onClick={(item: MultiSelectData & T) => {
                  if (!!this.chipRemovalAnnounceTimeOut) {
                    clearTimeout(this.chipRemovalAnnounceTimeOut);
                  }
                  this.chipRemovalAnnounceTimeOut = setTimeout(() => {
                    this.setState({ chipRemovalAnnounceText: '' });
                  }, 1000);

                  if (ariaOptionChipRemovedTextFunction) {
                    this.setState({
                      chipRemovalAnnounceText:
                        ariaOptionChipRemovedTextFunction(
                          item.chipText ? item.chipText : item.labelText,
                        ),
                    });
                  } else {
                    this.setState({
                      chipRemovalAnnounceText: `${
                        item.chipText ? item.chipText : item.labelText
                      } ${ariaOptionChipRemovedText}`,
                    });
                  }

                  this.handleItemSelection(item);
                }}
              />
            )}
            <MultiSelectRemoveAllButton
              className={multiSelectClassNames.removeAllButton}
              selectedItems={
                disabled ? this.disableItems(selectedItems) : selectedItems
              }
              onClick={this.handleRemoveAllSelections}
            >
              {removeAllButtonLabel}
            </MultiSelectRemoveAllButton>
          </HtmlDiv>
        </HtmlDiv>

        <VisuallyHidden aria-live="polite" aria-atomic="true">
          {this.state.showOptionsAvailableText ? (
            ariaSelectedAmountTextFunction ? (
              <>{ariaSelectedAmountTextFunction(selectedItems.length)}</>
            ) : (
              <>
                {selectedItems.length}
                {ariaSelectedAmountText}
              </>
            )
          ) : (
            ''
          )}
        </VisuallyHidden>

        <VisuallyHidden
          aria-live="polite"
          aria-atomic="true"
          id={`${id}-filteredItems-length`}
        >
          {!loading && this.state.showOptionsAvailableText ? (
            this.focusInInput(getOwnerDocument(this.popoverListRef)) ? (
              ariaOptionsAvailableTextFunction ? (
                <>{ariaOptionsAvailableTextFunction(filteredItems.length)}</>
              ) : (
                <>
                  {filteredItems.length}
                  {ariaOptionsAvailableText}
                </>
              )
            ) : (
              ''
            )
          ) : (
            ''
          )}
        </VisuallyHidden>

        <VisuallyHidden
          aria-live="polite"
          aria-atomic="true"
          id={`${id}-loading-announce`}
        >
          {loading ? loadingText : ''}
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

const StyledMultiSelect = styled(BaseMultiSelect)`
  ${({ theme }) => baseStyles(theme)}
`;

function MultiSelectInner<T>(
  props: MultiSelectProps<T & MultiSelectData>,
  ref: React.RefObject<HTMLInputElement>,
) {
  const { id: propId, ...passProps } = props;
  return (
    <SuomifiThemeConsumer>
      {({ suomifiTheme }) => (
        <AutoId id={propId}>
          {(id) => (
            <StyledMultiSelect
              theme={suomifiTheme}
              id={id}
              forwardedRef={ref}
              {...passProps}
            />
          )}
        </AutoId>
      )}
    </SuomifiThemeConsumer>
  );
}

// Type assertion is needed to set the function signature with generic T type.
export const MultiSelect = forwardRef(MultiSelectInner) as <T>(
  props: MultiSelectProps<T & MultiSelectData> & {
    ref?: React.ForwardedRef<HTMLInputElement>;
  },
) => ReturnType<typeof MultiSelectInner>;

// Because of type assertion the displayName has to be set like this
(MultiSelect as React.FC).displayName = 'MultiSelect';
