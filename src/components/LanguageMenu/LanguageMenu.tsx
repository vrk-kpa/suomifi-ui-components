import React, { Component, ReactNode, Fragment } from 'react';
import classnames from 'classnames';
import { HtmlSpan } from '../../reset/HtmlSpan/HtmlSpan';
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  MenuLink,
  MenuPopover,
  MenuPopoverProps,
} from '@reach/menu-button';
import { positionDefault } from '@reach/popover';
import { PRect } from '@reach/rect';
import { logger } from '../../utils/logger';
import { Omit } from '../../utils/typescript';

export { MenuItems, MenuItem, MenuLink, MenuPopover, MenuPopoverProps, PRect };

const baseClassName = 'fi-language-menu';
export interface LanguageMenuItemProps {
  /** Operation to run on select */
  onSelect: () => void;
  /** Item content */
  children: ReactNode;
}

type SupportedMenuLinkComponent = keyof JSX.IntrinsicElements;

interface LanguageMenuLinkPropsWithType {
  type: 'menulink';
  /** Url to direct to */
  href: string;
  /** Item content */
  children: ReactNode;
  className?: string;
  as?: SupportedMenuLinkComponent;
}

export interface LanguageMenuLinkProps
  extends Omit<LanguageMenuLinkPropsWithType, 'type'> {}

export type LanguageMenuPopoverItemsProps =
  | LanguageMenuItemProps
  | LanguageMenuLinkPropsWithType;
type OptionalLanguageMenuPopoverProps = {
  [K in keyof MenuPopoverProps]?: MenuPopoverProps[K];
};

export interface LanguageMenuProps {
  /** Name or content of menubutton */
  name: React.ReactNode | ((props: { isOpen: boolean }) => React.ReactNode);
  /** Custom classname to extend or customize */
  className?: string;
  /** Custom classname to extend or customize */
  languageMenuButtonClassName?: string;
  /** Custom classname to apply when menu is open */
  languageMenuOpenButtonClassName?: string;
  /** Properties given to LanguageMenu's popover-component, className etc. */
  languageMenuPopoverProps?: OptionalLanguageMenuPopoverProps;
  languageMenuPopoverComponent?: React.ComponentType<
    OptionalLanguageMenuPopoverProps
  >;
  /** Menu items: MenuItem or MenuLink */
  children?: Array<React.ReactElement<LanguageMenuPopoverItemsProps>>;
}

export class LanguageMenu extends Component<LanguageMenuProps> {
  render() {
    const {
      children,
      name,
      className,
      languageMenuButtonClassName: menuButtonClassName,
      languageMenuOpenButtonClassName: menuButtonOpenClassName,
      languageMenuPopoverProps: menuPopoverProps = {},
      languageMenuPopoverComponent: MenuPopoverComponentReplace,
      ...passProps
    } = this.props;

    if (React.Children.count(children) < 1) {
      logger.warn(`Menu '${name}' does not contain items`);
      return null;
    }
    return (
      <HtmlSpan className={classnames(className, baseClassName)}>
        <Menu>
          {({ isOpen }: { isOpen: boolean }) => {
            return (
              <Fragment>
                <MenuButton
                  {...passProps}
                  className={classnames(
                    menuButtonClassName,
                    isOpen && menuButtonOpenClassName,
                  )}
                >
                  {name}
                </MenuButton>
                {!!MenuPopoverComponentReplace ? (
                  <MenuPopoverComponentReplace {...menuPopoverProps}>
                    {children}
                  </MenuPopoverComponentReplace>
                ) : (
                  <MenuPopover position={positionDefault} {...menuPopoverProps}>
                    <MenuItems>{children}</MenuItems>
                  </MenuPopover>
                )}
              </Fragment>
            );
          }}
        </Menu>
      </HtmlSpan>
    );
  }
}
