import React, { Component, ReactNode, forwardRef, ReactElement } from 'react';
import { styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv, HtmlDivProps } from '../../../../reset';
import { getOwnerDocument, escapeStringRegexp } from '../../../../utils/common';
import {
  HTMLAttributesIncludingDataAttributes,
  filterDuplicateKeys,
} from '../../../../utils/common/common';
import { AutoId } from '../../../utils/AutoId/AutoId';
import { Debounce } from '../../../utils/Debounce/Debounce';
import { Popover } from '../../../Popover/Popover';
import {
  SpacingConsumer,
  SuomifiThemeConsumer,
  SuomifiThemeProp,
} from '../../../theme';
import {
  separateMarginProps,
  MarginProps,
  GlobalMarginProps,
} from '../../../theme/utils/spacing';
import { FilterInput, FilterInputStatus } from '../../FilterInput/FilterInput';
import { LoadingSpinner } from '../../../LoadingSpinner/LoadingSpinner';
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
  fullWidth: `${baseClassName}--full-width`,
};

export interface SingleSelectData {
  /** Unique label that will be shown on SingleSelect item and used on filter */
  labelText: string;
  /** Item selection disabled for the user */
  disabled?: boolean;
  /** Unique id to identify the item */
  uniqueItemId: string;
  /** Props to pass to select item's list element, for example data-attributes */
  listItemProps?: HTMLAttributesIncludingDataAttributes<HTMLLIElement>;
}

export type SingleSelectStatus = FilterInputStatus & {};

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

export interface InternalSingleSelectProps<T extends SingleSelectData> {
  /** CSS class for custom styles */
  className?: string;
  /** Items for the SingleSelect
   * <pre>
   * SingleSelectData {
   *    labelText: string;
   *    uniqueItemId: string;
   *    disabled?: boolean;
   *    listItemProps?: HTMLAttributesIncludingDataAttributes&lt;HTMLLIElement&gt;;
   * }
   * </pre>
   */
  items: Array<T & SingleSelectData>;
  /**
   * HTML id attribute.
   * If no id is specified, one will be generated automatically
   */
  id?: string;
  /** Label for the input */
  labelText: ReactNode;
  /** Text to mark the field optional. Wrapped in parentheses and shown after labelText. */
  optionalText?: string;
  /** Hint text to be shown below the label */
  hintText?: string;
  /** Screen reader label for the 'Clear' button */
  clearButtonLabel: string;
  /** Callback fired when item selection changes */
  onItemSelectionChange?: (selectedItem: (T & SingleSelectData) | null) => void;
  /** Placeholder text for the input. Use only as visual aid, not for instructions. */
  visualPlaceholder?: string;
  /** Default selected items */
  defaultSelectedItem?: T & SingleSelectData;
  /** Callback fired when filter changes */
  onChange?: (value: string) => void;
  /**
   * Callback fired when filter changes. This function does not use debounce.
   * Intended use cases are, for example, to set the `loading` prop
   */
  onChangeWithoutDebounce?: (value: string) => void;
  /** Callback fired on inpur blur */
  onBlur?: () => void;
  /** Debounce time in milliseconds for onChange function. No debounce is applied if no value is given. */
  debounce?: number;
  /**
   * `'default'` | `'error'`
   *
   * Status of the component. Error state creates a red border around the input. Always use a descriptive `statusText` with an error status.
   * @default default
   */
  status?: SingleSelectStatus;
  /** Status text to be shown below the component. Use e.g. for validation error messages */
  statusText?: string;
  /** Controlled selected item */
  selectedItem?: (T & SingleSelectData) | null;
  /** Callback fired on item select */
  onItemSelect?: (uniqueItemId: string | null) => void;
  /** Disables the input */
  disabled?: boolean;
  /** Tooltip component for the input's label */
  tooltipComponent?: ReactElement;
  /** Ref is forwarded to the underlying input element. Alternative for React `ref` attribute. */
  forwardedRef?: React.RefObject<HTMLInputElement>;
  /** Props passed to the unordered list element inside the popover. For example data-attributes */
  listProps?: HTMLAttributesIncludingDataAttributes<HTMLUListElement>;
  /** Sets component's width to 100% of its parent */
  fullWidth?: boolean;
}

type LoadingProps =
  | {
      loading?: false;
      loadingText?: string;
    }
  | {
      /** Shows the animated icon indicating indicating the component is loading data
       * @default false
       */
      loading?: true;
      /** Text to show with the loading animation. Required if `loading` is true */
      loadingText: string;
    };

type AllowItemAdditionProps =
  | {
      allowItemAddition?: false;
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

export type SingleSelectProps<T> = InternalSingleSelectProps<
  T & SingleSelectData
> &
  Omit<HtmlDivProps, 'onChange' | 'onBlur'> &
  AllowItemAdditionProps &
  AriaOptionsAvailableProps &
  MarginProps &
  LoadingProps;

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

    if (this.props.forwardedRef) {
      this.filterInputRef = this.props.forwardedRef;
    } else {
      this.filterInputRef = React.createRef();
    }
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
        'selectedItem' in nextProps
          ? selectedItem
          : propItems.find(
              (item) =>
                item.uniqueItemId === prevState.selectedItem?.uniqueItemId,
            );
      let resolvedInputValue = prevState.filterInputValue;
      if (selectedItemChanged) {
        resolvedInputValue = selectedItem
          ? selectedItem.labelText || prevState.filterInputValue
          : '';
      } else {
        const matchingItem = propItems.find(
          (item) => item.uniqueItemId === prevState.selectedItem?.uniqueItemId,
        );
        if (matchingItem) {
          resolvedInputValue =
            matchingItem.labelText && !prevState.filterMode
              ? matchingItem.labelText
              : prevState.filterInputValue;
        }
      }

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
        event.preventDefault();
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
        event.preventDefault();
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
        event.preventDefault();
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
        if (this.state.showPopover) {
          event.stopPropagation();
        }
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

  private isOutsideClick(event: MouseEvent) {
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
      onChangeWithoutDebounce,
      onBlur,
      debounce,
      loading,
      loadingText,
      status,
      statusText,
      selectedItem: controlledItem,
      clearButtonLabel,
      ariaOptionsAvailableText,
      ariaOptionsAvailableTextFunction,
      onItemSelect,
      disabled,
      allowItemAddition,
      itemAdditionHelpText,
      tooltipComponent,
      items, // Only destructured away so they don't end up in the DOM
      forwardedRef, // Only destructured away so it doesn't end up in the DOM
      listProps,
      style,
      fullWidth,
      ...rest
    } = this.props;
    const [_marginProps, passProps] = separateMarginProps(rest);

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
          [singleSelectClassNames.fullWidth]: fullWidth,
        })}
        style={style}
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
                if (onChangeWithoutDebounce) {
                  onChangeWithoutDebounce(value);
                }
                this.handleOnChange(value);
              }}
              visualPlaceholder={!selectedItem ? visualPlaceholder : ''}
              status={status}
              statusText={statusText}
              disabled={disabled}
              tooltipComponent={tooltipComponent}
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
              {...listProps}
            >
              <>
                {popoverItems.length > 0 &&
                  !loading &&
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
                        {...item.listItemProps}
                      >
                        {item.labelText}
                      </SelectItem>
                    );
                  })}

                {popoverItems.length === 0 &&
                  !allowItemAddition &&
                  !loading && <SelectEmptyItem>{noItemsText}</SelectEmptyItem>}

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

                {filterInputValue !== '' &&
                  !this.inputValueInItems() &&
                  allowItemAddition &&
                  !loading && (
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
              </>
            </SelectItemList>
          </Popover>
        )}

        <VisuallyHidden aria-live="polite" aria-atomic="true">
          {this.state.filterMode && !loading
            ? ariaOptionsAvailableTextFunction
              ? ariaOptionsAvailableTextFunction(popoverItems.length)
              : `${popoverItems.length} ${ariaOptionsAvailableText}`
            : ''}
        </VisuallyHidden>

        <VisuallyHidden
          aria-live="polite"
          aria-atomic="true"
          id={`${id}-loading-announce`}
        >
          {loading ? loadingText : ''}
        </VisuallyHidden>
      </HtmlDiv>
    );
  }
}

const StyledSingleSelect = styled(
  ({
    globalMargins,
    ...passProps
  }: SingleSelectProps<SingleSelectData> &
    SuomifiThemeProp &
    GlobalMarginProps) => <BaseSingleSelect {...passProps} />,
)`
  ${({ theme, globalMargins, ...rest }) => {
    const [marginProps, _passProps] = separateMarginProps(rest);
    const cleanedGlobalMargins = filterDuplicateKeys(
      globalMargins.singleSelect,
      marginProps,
    );
    return baseStyles(theme, cleanedGlobalMargins, marginProps);
  }}
`;

function SingleSelectInner<T>(
  props: SingleSelectProps<T & SingleSelectData>,
  ref: React.RefObject<HTMLInputElement>,
) {
  const { id: propId, ...passProps } = props;
  return (
    <SpacingConsumer>
      {({ margins }) => (
        <SuomifiThemeConsumer>
          {({ suomifiTheme }) => (
            <AutoId id={propId}>
              {(id) => (
                <StyledSingleSelect
                  theme={suomifiTheme}
                  id={id}
                  globalMargins={margins}
                  forwardedRef={ref}
                  {...passProps}
                />
              )}
            </AutoId>
          )}
        </SuomifiThemeConsumer>
      )}
    </SpacingConsumer>
  );
}

// Type assertion is needed to set the function signature with generic T type.
export const SingleSelect = forwardRef(SingleSelectInner) as <T>(
  props: SingleSelectProps<T & SingleSelectData> & {
    ref?: React.ForwardedRef<HTMLInputElement>;
  },
) => ReturnType<typeof SingleSelectInner>;

// Because of type assertion the displayName has to be set like this
(SingleSelect as React.FC).displayName = 'SingleSelect';
