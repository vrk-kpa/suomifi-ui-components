import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv } from '../../../reset';
import { TokensProp, InternalTokensProp } from '../../theme';
import { withSuomifiDefaultProps } from '../../theme/utils';
import { FilterInput } from '../FilterInput/FilterInput';
import { Popover } from '../../Popover/Popover';
import { baseStyles } from './Combobox.baseStyles';

interface Product {
  name: string;
  price: number;
  tax: boolean;
}

const baseClassName = 'fi-combobox';
// const comboboxClassNames = {
//   wrapper: `${baseClassName}_wrapper`,
// };

export interface ComboboxProps extends TokensProp {
  /** Combobox container div class name for custom styling. */
  className?: string;
}

interface ComboboxState {
  items: Product[];
  filterInputRef: Element | null;
  showPopover: Boolean;
}
class BaseCombobox extends Component<ComboboxProps> {
  state: ComboboxState = {
    items: [],
    filterInputRef: null,
    showPopover: false,
  };

  private setFilterInputRefElement = (element: Element | null) => {
    this.setState({ filterInputRef: element });
  };

  render() {
    const { className, ...passProps } = this.props;

    const tools: Product[] = [
      { name: 'Jackhammer', price: 230, tax: false },
      { name: 'Hammer', price: 15, tax: true },
      { name: 'Sledgehammer', price: 36, tax: false },
      { name: 'Spade', price: 50, tax: true },
      { name: 'Powersaw', price: 150, tax: false },
    ];

    const filter = (tool: Product, query: string) =>
      tool.name.toLowerCase().includes(query.toLowerCase());

    const setPopoverVisibility = (toState: Boolean) => {
      this.setState({ showPopover: toState });
    };

    return (
      <HtmlDiv
        {...passProps}
        className={classnames(baseClassName, className, {})}
      >
        <FilterInput
          labelText="Combobox"
          items={tools}
          onFilter={(filtered) => this.setState({ items: filtered })}
          filterFunc={filter}
          forwardRef={this.setFilterInputRefElement}
          onFocus={() => setPopoverVisibility(true)}
          onBlur={() => setPopoverVisibility(false)}
        />
        <Popover
          sourceRef={this.state.filterInputRef}
          matchWidth={true}
          id="popover-test"
          tabIndex={-1}
          portalStyleProps={{ backgroundColor: 'white' }}
        >
          {this.state.showPopover && (
            <ul tabIndex={-1}>
              {this.state.items.map((item) => (
                <li key={item.name}>{item.name}</li>
              ))}
            </ul>
          )}
        </Popover>
      </HtmlDiv>
    );
  }
}

const StyledCombobox = styled(
  ({ tokens, ...passProps }: ComboboxProps & InternalTokensProp) => (
    <BaseCombobox {...passProps} />
  ),
)`
  ${(props) => baseStyles(props)}
`;

export class Combobox extends Component<ComboboxProps> {
  render() {
    return <StyledCombobox {...withSuomifiDefaultProps(this.props)} />;
  }
}
