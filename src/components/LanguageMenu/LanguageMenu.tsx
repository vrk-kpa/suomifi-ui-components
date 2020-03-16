import React, { Component, ReactNode, Fragment } from 'react';
import classnames from 'classnames';
import { HtmlSpan } from '../../reset/HtmlSpan/HtmlSpan';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuListProps,
  MenuItem,
  MenuLink,
  MenuPopover,
  MenuPopoverProps,
} from '@reach/menu-button';
import { logger } from '../../utils/logger';
import { Omit } from '../../utils/typescript';

export {
  MenuList,
  MenuListProps,
  MenuItem,
  MenuLink,
  MenuPopover,
  MenuPopoverProps,
};

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

export type LanguageMenuListItemsProps =
  | LanguageMenuItemProps
  | LanguageMenuLinkPropsWithType;
type OptionalLanguageMenuListProps = {
  [K in keyof MenuListProps]?: MenuListProps[K];
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
  /** Properties given to LanguageMenu's List-component, className etc. */
  languageMenuListProps?: OptionalLanguageMenuListProps;
  languageMenuListComponent?: React.ComponentType<
    OptionalLanguageMenuListProps
  >;
  /** Menu items: MenuItem or MenuLink */
  children?: Array<React.ReactElement<LanguageMenuListItemsProps>>;
}

export class LanguageMenu extends Component<LanguageMenuProps> {
  render() {
    const {
      children,
      name,
      className,
      languageMenuButtonClassName: menuButtonClassName,
      languageMenuOpenButtonClassName: menuButtonOpenClassName,
      languageMenuListProps: menuListProps = {},
      languageMenuListComponent: MenuListComponentReplace,
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
                {!!MenuListComponentReplace ? (
                  <MenuListComponentReplace {...menuListProps}>
                    {children}
                  </MenuListComponentReplace>
                ) : (
                  <MenuList {...menuListProps}>{children}</MenuList>
                )}
              </Fragment>
            );
          }}
        </Menu>
      </HtmlSpan>
    );
  }
}
