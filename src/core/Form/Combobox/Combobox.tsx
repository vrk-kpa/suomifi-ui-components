import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv } from '../../../reset';
import { TokensProp, InternalTokensProp } from '../../theme';
import { withSuomifiDefaultProps } from '../../theme/utils';
import { AutoId } from '../../../utils/AutoId';
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
  /** label that will be shown on combobox item and used on filter */
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
}
interface ComboboxState<T extends ComboboxData> {
  items: T[];
  filterInputRef: Element | null;
  showPopover: Boolean;
}
class BaseCombobox<T> extends Component<ComboboxProps<T & ComboboxData>> {
  state: ComboboxState<T & ComboboxData> = {
    items: this.props.items,
    filterInputRef: null,
    showPopover: false,
  };

  private setFilterInputRefElement = (element: Element | null) => {
    this.setState({ filterInputRef: element });
  };

  render() {
    const { className, items, labelText, ...passProps } = this.props;

    const filter = (data: ComboboxData, query: string) =>
      data.labelText.toLowerCase().includes(query.toLowerCase());

    const setPopoverVisibility = (toState: Boolean) => {
      this.setState({ showPopover: toState });
    };

    return (
      <HtmlDiv
        {...passProps}
        className={classnames(baseClassName, className, {
          [comboboxClassNames.open]: this.state.showPopover,
        })}
      >
        <HtmlDiv className={classnames(comboboxClassNames.wrapper, {})}>
          <FilterInput
            labelText={labelText}
            items={items}
            onFilter={(filtered) => this.setState({ items: filtered })}
            filterFunc={filter}
            forwardRef={this.setFilterInputRefElement}
            onFocus={() => setPopoverVisibility(true)}
            // onBlur={() => setPopoverVisibility(false)}
          />
          <Popover
            sourceRef={this.state.filterInputRef}
            matchWidth={true}
            // id="popover-test"
            tabIndex={-1}
            portalStyleProps={{ backgroundColor: 'white' }}
          >
            {this.state.showPopover && (
              <ComboboxItemList>
                {this.state.items.map((item) => (
                  <ComboboxItem
                    defaultChecked={item.selected}
                    disabled={item.disabled}
                  >
                    {item.labelText}
                  </ComboboxItem>
                ))}
              </ComboboxItemList>
            )}
          </Popover>
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
