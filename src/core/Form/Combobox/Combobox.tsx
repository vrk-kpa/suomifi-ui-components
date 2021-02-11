import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv } from '../../../reset';
import { TokensProp, InternalTokensProp } from '../../theme';
import { withSuomifiDefaultProps } from '../../theme/utils';
import { AutoId } from '../../../utils/AutoId';
import { windowAvailable } from '../../../utils/common';
import { Button } from '../../Button/Button';
import { Chip } from '../../Chip/Chip';
import { FilterInput } from '../FilterInput/FilterInput';
import { Popover } from '../../Popover/Popover';
import { ComboboxItemList } from './ComboboxItemList';
import { ComboboxItem } from './ComboboxItem';
import { ComboboxEmptyItem } from './ComboboxEmptyItem';
import { ChipList } from './ChipList';
import { baseStyles } from './Combobox.baseStyles';

const baseClassName = 'fi-combobox';
const comboboxClassNames = {
  wrapper: `${baseClassName}_wrapper`,
  open: `${baseClassName}--open`,
};

export interface ComboboxData {
  /** Is item selected or not */
  selected: boolean;
  /** Unique label that will be shown on combobox item and used on filter */
  labelText: string;
  /** Using labelText if chipText is not given */
  chipText?: string;
  /** Item selection disabled for the user */
  disabled?: boolean;
}

export interface ComboboxProps<T extends ComboboxData> extends TokensProp {
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
}

interface ComboboxState<T extends ComboboxData> {
  items: T[];
  filterInputValue: string | undefined;
  filteredItems: T[];
  showPopover: boolean;
  currentSelection: string | null;
}

function getSelectedItems<T>(
  items: (T & ComboboxData)[],
): (T & ComboboxData)[] {
  return items.reduce(
    (selectedItems: (T & ComboboxData)[], item: T & ComboboxData) => {
      if (item.selected) {
        selectedItems.push(item);
      }
      return selectedItems;
    },
    [],
  );
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
    items: this.props.items,
    filterInputValue: '',
    filteredItems: this.props.items,
    showPopover: false,
    currentSelection: null,
  };

  handleItemSelected = (text: string) => {
    this.setState(
      (
        prevState: ComboboxState<T & ComboboxData>,
        prevProps: ComboboxProps<T & ComboboxData>,
      ) => {
        const { onItemSelectionsChange } = prevProps;
        const items = [...prevState.items];
        const filteredItems = [...prevState.filteredItems];
        const currentItem = items.filter((item) => item.labelText === text)[0];
        const indexOfItem = items.indexOf(currentItem);
        if (!currentItem.disabled) {
          if (indexOfItem > -1) {
            currentItem.selected = !currentItem.selected;
            items[indexOfItem] = currentItem;
          }
          if (onItemSelectionsChange) {
            onItemSelectionsChange(getSelectedItems(items));
          }
          const currentFilteredItem = filteredItems.filter(
            (item) => item.labelText === text,
          )[0];
          const indexOfFilteredItem = filteredItems.indexOf(
            currentFilteredItem,
          );
          if (indexOfFilteredItem > -1) {
            filteredItems[indexOfFilteredItem] = currentItem;
          }
        }
        return { items, filteredItems, currentSelection: text };
      },
    );
  };

  removeAllSelectionsHandler = () => {
    this.setState(
      (
        prevState: ComboboxState<T & ComboboxData>,
        prevProps: ComboboxProps<T & ComboboxData>,
      ) => {
        const { onItemSelectionsChange } = prevProps;
        const updateItem = (item: T & ComboboxData) => ({
          ...item,
          selected: item.disabled ? item.selected : false,
        });
        const updatedItems = [...prevState.items].map((item) =>
          updateItem(item),
        );
        const updatedFilteredItems = [...prevState.filteredItems].map((item) =>
          updateItem(item),
        );
        if (onItemSelectionsChange) {
          onItemSelectionsChange([]);
        }
        return { items: updatedItems, filteredItems: updatedFilteredItems };
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
        return <>{substring}</>;
      });
    };

    const filter = (data: ComboboxData, query: string) =>
      data.labelText.toLowerCase().includes(query.toLowerCase());

    const handleKeyDown = (event: React.KeyboardEvent) => {
      // TODO: Current index of the selection, items should have unique id/hash. Used to see which is selected and aria-activedescendant
      // TODO: indexOf to use instead to work better with IE
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
            this.handleItemSelected(currentSelection);
          }
          break;
        }

        case 'Escape': {
          event.preventDefault();
          this.setState((prevState: ComboboxState<T & ComboboxData>) => ({
            filterInputValue: '',
            filteredItems: prevState.items,
          }));
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
            this.setState((prevState: ComboboxState<T & ComboboxData>) => {
              const currentFilteredItems = prevState.filteredItems;
              if (
                currentFilteredItems.length === 1 &&
                currentFilteredItems[0].labelText.toLowerCase() ===
                  prevState.filterInputValue?.toLowerCase()
              ) {
                const items = [...prevState.items];
                const currentItem = items.filter(
                  (item) => item.labelText === prevState.filterInputValue,
                )[0];
                const indexOfItem = items.indexOf(currentItem);
                if (currentItem && !currentItem.disabled) {
                  if (indexOfItem > -1) {
                    currentItem.selected = !currentItem.selected;
                    items[indexOfItem] = currentItem;
                  }
                  if (onItemSelectionsChange) {
                    onItemSelectionsChange(getSelectedItems(items));
                  }
                }
                return {
                  filterInputValue: '',
                  filteredItems: items,
                };
              }
              return {
                filterInputValue: '',
                filteredItems: prevState.items,
              };
            });
          }
        });
      }
    };

    const setPopoverVisibility = (toState: Boolean) => {
      this.setState({ showPopover: toState });
    };

    const { items, filteredItems, showPopover, currentSelection } = this.state;

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
          currentSelection ? `todoHash-${currentSelection}` : undefined
        }
      >
        <HtmlDiv className={classnames(comboboxClassNames.wrapper, {})}>
          <FilterInput
            labelText={labelText}
            items={items}
            onFilter={(filtered) => this.setState({ filteredItems: filtered })}
            filterFunc={filter}
            forwardRef={this.filterInputRef}
            onFocus={() => setPopoverVisibility(true)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            value={this.state.filterInputValue}
            onChange={filterInputOnChangeHandler}
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
                        // FIXME: Quick and dirty; key should take note if any field of object is changed
                        key={`${item.labelText}_${item.selected}_${item.disabled}`}
                        id={`todoHash-${item.labelText}`}
                        defaultChecked={item.selected}
                        disabled={item.disabled}
                        onClick={() => {
                          focusToMenu();
                          this.handleItemSelected(item.labelText);
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
                  <ComboboxEmptyItem>No items</ComboboxEmptyItem>
                )}
              </ComboboxItemList>
            )}
          </Popover>
          {chipListVisible && (
            <ChipList>
              {getSelectedItems(items).map((item) => (
                <Chip
                  key={item.labelText}
                  disabled={item.disabled}
                  removable={!item.disabled}
                  onClick={() => this.handleItemSelected(item.labelText)}
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
              onClick={this.removeAllSelectionsHandler}
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
const ComboboxWithoutTokens: <T>(
  props: ComboboxProps<T & ComboboxData> & InternalTokensProp,
) => JSX.Element = ({
  // eslint-disable-next-line react/prop-types
  tokens,
  // eslint-disable-next-line react/prop-types
  id: propId,
  ...passProps
}) => (
  <AutoId id={propId}>{(id) => <BaseCombobox id={id} {...passProps} />}</AutoId>
);

const StyledCombobox = styled(ComboboxWithoutTokens)`
  ${(props) => baseStyles(props)}
`;

export class Combobox<T> extends Component<ComboboxProps<T & ComboboxData>> {
  render() {
    return <StyledCombobox {...withSuomifiDefaultProps(this.props)} />;
  }
}
