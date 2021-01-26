import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv } from '../../../reset';
import { TokensProp, InternalTokensProp } from '../../theme';
import { withSuomifiDefaultProps } from '../../theme/utils';
import { AutoId } from '../../../utils/AutoId';
import { Chip } from '../../Chip/Chip';
import { FilterInput } from '../FilterInput/FilterInput';
import { Popover } from '../../Popover/Popover';
import { ComboboxItemList } from './ComboboxItemList';
import { ComboboxItem } from './ComboboxItem';
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
  // use label if not chipText given
  chipText?: string;
  /** Item selection disabled for the user */
  disabled?: boolean;
}

export interface ComboboxProps<T extends ComboboxData> extends TokensProp {
  /** Combobox container div class name for custom styling. */
  className?: string;
  items: Array<T & ComboboxData>;
  /**
   * Unique id
   * If no id is specified, one will be generated automatically
   */
  id?: string;
  /** Label */
  labelText: string;
  onItemSelectionsChange?: (selectedItems: Array<T>) => void;
}
interface ComboboxState<T extends ComboboxData> {
  items: T[];
  filteredItems: T[];
  filterInputRef: Element | null;
  showPopover: boolean;
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

  constructor(props: ComboboxProps<T & ComboboxData>) {
    super(props);
    this.popoverListRef = React.createRef();
  }

  state: ComboboxState<T & ComboboxData> = {
    items: this.props.items,
    filteredItems: this.props.items,
    filterInputRef: null,
    showPopover: false,
  };

  private handleItemSelected = (labelText: string, selected: boolean) => {
    this.setState((prevState: ComboboxState<T & ComboboxData>) => {
      const { onItemSelectionsChange } = this.props;
      const { items } = prevState;
      const currentItem = items.filter(
        (item) => item.labelText === labelText,
      )[0];
      const indexOfItem = items.indexOf(currentItem);
      if (indexOfItem > -1) {
        currentItem.selected = selected;
        items[indexOfItem] = currentItem;
      }
      if (onItemSelectionsChange) {
        onItemSelectionsChange(getSelectedItems(items));
      }
      return { items };
    });
  };

  private handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        // TODO: Opening closed list
        // TODO: If open, get next item
        console.log('TODO: Go to next item');
        break;

      case 'ArrowUp':
        event.preventDefault();
        // TODO: Opening closed list
        // TODO: If open, get previous item
        console.log('TODO: Go to previous item');
        break;

      default:
        break;
    }
  };

  private setFilterInputRefElement = (element: Element | null) => {
    this.setState({ filterInputRef: element });
  };

  render() {
    const {
      id,
      className,
      items: propItems,
      labelText,
      onItemSelectionsChange,
      ...passProps
    } = this.props;

    const filter = (data: ComboboxData, query: string) =>
      data.labelText.toLowerCase().includes(query.toLowerCase());

    const setPopoverVisibility = (toState: Boolean) => {
      this.setState({ showPopover: toState });
    };

    const { items, filteredItems } = this.state;
    return (
      <HtmlDiv
        id={id}
        {...passProps}
        className={classnames(baseClassName, className, {
          [comboboxClassNames.open]: this.state.showPopover,
        })}
      >
        <HtmlDiv className={classnames(comboboxClassNames.wrapper, {})}>
          <FilterInput
            labelText={labelText}
            items={items}
            onFilter={(filtered) => this.setState({ filteredItems: filtered })}
            filterFunc={filter}
            forwardRef={this.setFilterInputRefElement}
            onFocus={() => setPopoverVisibility(true)}
            aria-haspopup={true}
            aria-controls={`${id}-popover`}
            aria-expanded={this.state.showPopover}
            // onBlur={() => setPopoverVisibility(false)}
            onKeyDown={this.handleKeyDown}
          />
          <Popover
            sourceRef={this.state.filterInputRef}
            matchWidth={true}
            id={`${id}-popover`}
            tabIndex={-1}
            portalStyleProps={{ backgroundColor: 'white' }}
          >
            {this.state.showPopover && (
              <ComboboxItemList forwardRef={this.popoverListRef}>
                {filteredItems.map((item) => (
                  <ComboboxItem
                    key={item.labelText}
                    defaultChecked={item.selected}
                    disabled={item.disabled}
                    onClick={() =>
                      this.handleItemSelected(item.labelText, !item.selected)
                    }
                  >
                    {item.labelText}
                  </ComboboxItem>
                ))}
              </ComboboxItemList>
            )}
          </Popover>
          {/* TODO: ChipList */}
          <div>
            {getSelectedItems(items).map((item) => (
              <Chip key={item.labelText}>
                {item.chipText ? item.chipText : item.labelText}
              </Chip>
            ))}
          </div>
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
