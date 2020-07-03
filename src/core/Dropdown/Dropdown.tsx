import React, { Component, Fragment } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import {
  ListboxList,
  ListboxPopover,
  ListboxPopoverProps as ReachListBoxPopoverProps,
} from '@reach/listbox';
import { withSuomifiDefaultProps } from '../theme/utils';
import { TokensProp, InternalTokensProp } from '../theme';
import { baseStyles, listboxPopoverStyles } from './Dropdown.baseStyles';
import {
  Dropdown as CompDropdown,
  DropdownProps as CompDropdownProps,
} from '../../components/Dropdown/Dropdown';
import { DropdownItem, DropdownItemProps } from './DropdownItem';
import { positionMatchWidth } from '@reach/popover';

const baseClassName = 'fi-dropdown';

export const textInputClassNames = {
  baseClassName,
  labelParagraph: `${baseClassName}_label-p`,
};

type CompListboxPopoverProps = ReachListBoxPopoverProps & {
  ref?: any;
};

export interface DropdownProps extends CompDropdownProps, TokensProp {}

const StyledDropdown = styled(
  ({
    tokens,
    labelTextProps = { className: undefined },
    ...passProps
  }: DropdownProps & InternalTokensProp) => (
    <CompDropdown
      {...passProps}
      labelTextProps={{
        ...labelTextProps,
        className: classnames(
          labelTextProps.className,
          textInputClassNames.labelParagraph,
        ),
      }}
    />
  ),
)`
  ${(props) => baseStyles(props)}
`;

interface ListboxPopoverProps extends CompListboxPopoverProps, TokensProp {}

const StyledListboxPopover = styled(
  ({ tokens, children, ...passProps }: ListboxPopoverProps) => (
    <ListboxPopover position={positionMatchWidth} {...passProps}>
      <ListboxList>{children}</ListboxList>
    </ListboxPopover>
  ),
)`
  ${(props) => listboxPopoverStyles(props.theme)}
`;

/**
 * <i class="semantics" />
 * Use for selectable dropdown with items.
 */
export class Dropdown extends Component<DropdownProps> {
  static item = (props: DropdownItemProps) => <DropdownItem {...props} />;

  render() {
    const props = withSuomifiDefaultProps(this.props);
    return (
      <Fragment>
        <StyledDropdown
          {...props}
          listboxPopoverComponent={StyledListboxPopover}
        />
      </Fragment>
    );
  }
}
