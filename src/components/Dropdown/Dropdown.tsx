import React, { Component, ReactNode, ReactElement } from 'react';
import classnames from 'classnames';
import { HtmlSpan } from '../../reset/HtmlSpan/HtmlSpan';
import {
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuPopoverProps,
  MenuItems,
  MenuItem,
  MenuItemProps,
  MenuPopover,
} from '@reach/menu-button';
import { positionMatchWidth } from '@reach/popover';
import { logger } from '../../utils/logger';

export { MenuItem as DropdownItem };

const baseClassName = 'fi-dropdown';
const buttonClassName = `${baseClassName}_button`;
const dropdownPopoverClassName = `${baseClassName}_popover`;
const dropdownItemClassName = `${baseClassName}_item`;

export interface DropdownItemProps {
  /** Operation to run on select */
  onSelect: () => void;
  /** Item content */
  children: ReactNode;
}

type DropdownPopoverItems = DropdownItemProps;

interface DropdownState {
  selectedName: ReactNode;
}

type OptionalMenuButtonProps = {
  [K in keyof MenuButtonProps]?: MenuButtonProps[K];
};
type OptionalMenuPopoverProps = {
  [K in keyof MenuPopoverProps]?: MenuPopoverProps[K];
};
type OptionalMenuItemProps = { [K in keyof MenuItemProps]?: MenuItemProps[K] };

export interface DropdownProps {
  /** Name to show for the dropdown */
  name: ReactNode;
  /** Change name by selection
   * @default true
   */
  changeNameToSelection?: boolean;
  /** Custom classname to extend or customize */
  className?: string;
  /** Properties given to dropdown's Button-component, className etc. */
  dropdownButtonProps?: OptionalMenuButtonProps;
  /** Properties given to dropdown's popover-component, className etc. */
  dropdownPopoverProps?: OptionalMenuPopoverProps;
  menuPopoverComponent?: React.ComponentType<OptionalMenuPopoverProps>;
  /** Properties given to dropdown's item-component, className etc. */
  dropdownItemProps?: OptionalMenuItemProps;
  /** DropdownItems */
  children?:
    | Array<ReactElement<DropdownPopoverItems>>
    | ReactElement<DropdownPopoverItems>;
}

export class Dropdown extends Component<DropdownProps> {
  state: DropdownState = { selectedName: undefined };

  changeName = (name: ReactNode) => this.setState({ selectedName: name });

  dropDownItems = (
    children: ReactNode,
    changeNameToSelection: boolean,
    dropdownItemProps?: OptionalMenuItemProps,
  ) =>
    React.Children.map(children, (child: React.ReactElement<MenuItemProps>) => {
      const { children: childChildren } = child.props;
      const isChildString =
        !!changeNameToSelection &&
        !!childChildren &&
        typeof childChildren === 'string';
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          ...dropdownItemProps,
          ...(!!isChildString && {
            onSelect: () => {
              child.props.onSelect();
              this.changeName.bind(this)(childChildren);
            },
          }),
        });
      }
      return child;
    });

  render() {
    const {
      children,
      name,
      className,
      dropdownButtonProps = {},
      dropdownPopoverProps = {},
      menuPopoverComponent: MenuPopoverComponentReplace,
      dropdownItemProps = {},
      changeNameToSelection = true,
      ...passProps
    } = this.props;

    if (React.Children.count(children) < 1) {
      logger.warn(`Dropdown '${name}' does not contain items`);
      return null;
    }

    const { selectedName } = this.state;
    const passDropdownButtonProps = {
      ...dropdownButtonProps,
      className: classnames(buttonClassName, dropdownButtonProps.className),
    };
    const passDropdownPopoverProps = {
      ...dropdownPopoverProps,
      className: classnames(
        dropdownPopoverClassName,
        dropdownPopoverProps.className,
      ),
    };
    const passDropdownItemProps = {
      ...dropdownItemProps,
      className: classnames(dropdownItemClassName, dropdownItemProps.className),
    };

    return (
      <HtmlSpan className={classnames(className, baseClassName)}>
        <Menu {...passProps}>
          <MenuButton {...passDropdownButtonProps}>
            {!!selectedName ? selectedName : name}
          </MenuButton>
          {!!MenuPopoverComponentReplace ? (
            <MenuPopoverComponentReplace {...passDropdownPopoverProps}>
              {this.dropDownItems(
                children,
                changeNameToSelection,
                passDropdownItemProps,
              )}
            </MenuPopoverComponentReplace>
          ) : (
            <MenuPopover
              position={positionMatchWidth}
              {...passDropdownPopoverProps}
            >
              <MenuItems>
                {this.dropDownItems(
                  children,
                  changeNameToSelection,
                  passDropdownItemProps,
                )}
              </MenuItems>
            </MenuPopover>
          )}
        </Menu>
      </HtmlSpan>
    );
  }
}
