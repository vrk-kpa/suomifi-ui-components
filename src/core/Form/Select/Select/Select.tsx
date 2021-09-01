import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv } from '../../../../reset';
import { getOwnerDocument } from '../../../../utils/common';
import { AutoId } from '../../../utils/AutoId/AutoId';
import { Debounce } from '../../../utils/Debounce/Debounce';
import { Popover } from '../../../Popover/Popover';
import { FilterInput, FilterInputStatus } from '../../FilterInput/FilterInput';
import { ClearButton } from '../../ClearButton/ClearButton';
import { SelectItemList } from '../BaseSelect/SelectItemList/SelectItemList';
import { SelectItem } from '../BaseSelect/SelectItem/SelectItem';
import { SelectEmptyItem } from '../BaseSelect/SelectEmptyItem/SelectEmptyItem';
import { baseStyles } from './Select.baseStyles';
import { SuomifiThemeConsumer, SuomifiThemeProp } from '../../../theme';
import { SelectAriaStatus } from '../BaseSelect/SelectAriaStatus/SelectAriaStatus';

const baseClassName = 'fi-select';
const selectClassNames = {
  valueSelected: `${baseClassName}--value-selected`,
  contentWrapper: `${baseClassName}_content_wrapper`,
  selectedValue: `${baseClassName}_selected-value`,
  clearButton: `${baseClassName}_clear-button`,
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
  /** Text for screen reader indicating the amount of available options after filtering by typing. Will be read after the amount.
   * E.g 'options available' as prop value would result in '{amount} options available' being read by screen reader upon removal.
   */
  ariaOptionsAvailableText: string;
}

interface SelectState<T extends SelectData> {
  filterInputValue: string;
  filteredItems: T[];
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

  constructor(props: SelectProps<T & SelectData> & SuomifiThemeProp) {
    super(props);
    this.popoverListRef = React.createRef();
    this.filterInputRef = React.createRef();
  }

  state: SelectState<T & SelectData> = {
    filterInputValue: this.props.selectedItem?.labelText
      ? this.props.selectedItem.labelText
      : this.props.defaultSelectedItem?.labelText || '',
    filteredItems: this.props.items,
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
    if (
      ('selectedItem' in nextProps &&
        selectedItem?.uniqueItemId !== prevState.selectedItem?.uniqueItemId) ||
      propItems !== prevState.initialItems
    ) {
      return {
        selectedItem:
          'selectedItem' in nextProps ? selectedItem : prevState.selectedItem,
        filteredItems: propItems,
        initialItems: propItems,
      };
    }
    return null;
  }

  private filter = (data: SelectData, query: string) =>
    data.labelText.toLowerCase().includes(query.toLowerCase());

  private handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    event.preventDefault();
    const ownerDocument = getOwnerDocument(this.popoverListRef);
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
      this.setState({ showPopover: focusInCombobox });
      if (!focusInCombobox) {
        this.setState((prevState: SelectState<T & SelectData>) => ({
          filterInputValue: prevState.selectedItem?.labelText,
        }));
      }
    });
  };

  private focusToInputAndCloseMenu = () => {
    if (!!this.filterInputRef && this.filterInputRef.current) {
      this.filterInputRef.current.focus();
      this.setState({ showPopover: false });
    }
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
    const { filteredItems, focusedDescendantId, selectedItem } = this.state;
    const popoverItems = !!selectedItem ? this.props.items : filteredItems;

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

  render() {
    const {
      filteredItems,
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

    const popoverItems = !!selectedItem ? propItems : filteredItems;

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
                    readOnly={!!selectedItem}
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
                      this.setState({ showPopover: true });
                    }}
                    onClick={() => {
                      this.setState({ showPopover: true });
                    }}
                    onKeyDown={this.handleKeyDown}
                    onBlur={this.handleBlur}
                    value={filterInputValue}
                    onChange={(value: string) => {
                      if (!selectedItem) {
                        if (propOnChange) {
                          debouncer(propOnChange, value);
                        }
                        this.setState({
                          filterInputValue: value,
                          showPopover: true,
                        });
                      }
                    }}
                    visualPlaceholder={!selectedItem ? visualPlaceholder : ''}
                    status={status}
                    statusText={statusText}
                  />
                  {!!selectedItem && (
                    <ClearButton
                      className={selectClassNames.clearButton}
                      onClick={() => this.handleItemSelection(null)}
                      label={clearButtonLabel}
                    />
                  )}
                </>
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
                          hightlightQuery={this.filterInputRef.current?.value}
                        >
                          {item.labelText}
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
          <SelectAriaStatus
            id={ariaStatusId}
            debounce={150}
            status={`${popoverItems.length} ${ariaOptionsAvailableText}`}
          />
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
