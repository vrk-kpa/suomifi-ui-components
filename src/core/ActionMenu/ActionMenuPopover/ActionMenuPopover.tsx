import React, { useState, useEffect, useRef, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { default as styled } from 'styled-components';
import { usePopper } from 'react-popper';
import classnames from 'classnames';
import { useEnhancedEffect } from '../../../utils/common';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { HtmlDivWithRef, HtmlUlWithRef } from '../../../reset';
import { getLogger } from '../../../utils/log';
import { baseStyles } from './ActionMenuPopover.baseStyles';

import { ActionMenuItem, ActionMenuItemProps } from '../ActionMenuItem';

const baseClassName = 'fi-action-menu-popover';

export const actionMenuClassNames = {
  baseClassName,
  hidden: `${baseClassName}--hidden`,
  application: `${baseClassName}_application`,
  popperArrow: `${baseClassName}_popper-arrow`,
};

export type InitialFocus = 'first' | 'last' | 'none';
export interface InternalActionMenuPopoverProps {
  /** Button ref for positioning dialog and closing dialog on button click */
  openButtonRef: React.RefObject<any>;

  /** Callback fired when closing popover */
  onClose: () => void;
  /** Styled component className */
  className?: string;
  /** Menu items: MenuItem or MenuLink */
  /*
  children?:
    | Array<React.ReactElement<ActionMenuPopoverItemsProps>>
    | null
    | undefined;
*/

  /** Menu items. Use the `<ActionMenuItem>` or  `<ActionMenuDivider>` components as children */
  children: ReactNode;

  menuId: string;

  buttonId: string;

  initialFocus: InitialFocus;
}

export interface SingleSelectData {
  /** Unique label that will be shown on SingleSelect item and used on filter */
  labelText: string;
  /** Item selection disabled for the user */
  disabled?: boolean;
  /** Unique id to identify the item */
  uniqueItemId: string;
}

export interface ActionMenuProviderState {
  /** Callback for communicating DropdownItem click to parent  */
  onItemClick: (itemValue: number) => void;

  onItemMouseOver: (itemValue: number) => void;
  /** Currently selected DropdownItem */
  selectedDropdownValue: string | undefined | null;
  /** Currently focused DropdownItem */
  focusedItemId: string | null | undefined;
  /** ID of the Dropdown component.
   * Used in DropdownItem to create a derived ID for each item
   */
  id: string | undefined;

  focusedIndex: number;
}

const defaultProviderValue: ActionMenuProviderState = {
  onItemClick: () => null,
  onItemMouseOver: () => null,
  selectedDropdownValue: null,
  id: '',
  focusedItemId: null,
  focusedIndex: -1,
};

const { Provider: ActionMenuProvider, Consumer: ActionMenuConsumer } =
  React.createContext(defaultProviderValue);

export const BaseActionMenuPopover = (
  props: InternalActionMenuPopoverProps,
) => {
  const {
    openButtonRef,
    onClose,
    className,
    children,
    menuId,
    buttonId,
    initialFocus,
  } = props;

  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const [dialogElement, setDialogElement] = useState<HTMLElement | null>(null);
  const [selectedValue, setSelectedValue] = useState<string | undefined | null>(
    undefined,
  );
  const [focusedDescendantId, setFocusedDescendantId] = useState<string | null>(
    null,
  );
  const [focusedChild, setFocusedChild] = useState<number>(-1);

  const portalRef = useRef<HTMLDivElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);

  useEnhancedEffect(() => {
    setMountNode(window.document.body);
  }, []);

  useEffect(() => {
    console.log('HOOK: Popover listeners');

    document.addEventListener('click', globalClickHandler, {
      capture: true,
    });
    document.addEventListener('keydown', globalKeyDownHandler, {
      capture: true,
    });

    return () => {
      document.removeEventListener('click', globalClickHandler, {
        capture: true,
      });
      document.removeEventListener('keydown', globalKeyDownHandler, {
        capture: true,
      });
    };
  }, [focusedChild]);

  useEffect(() => {
    console.log('HOOK: Popover ref');

    if (!ulRef.current) {
      console.log('ref hook undefined!');
    }

    ulRef.current?.focus();
  });

  useEffect(() => {
    console.log('HOOK: Popover Initial focus ');
    setTimeout(() => {
      if (initialFocus === 'first') {
        setFocusedChild(0);
      }
      if (initialFocus === 'last') {
        setFocusedChild(React.Children.count(children) - 1);
      }
    }, 100);
  }, [initialFocus]);

  const globalClickHandler = (nativeEvent: MouseEvent) => {
    if (
      !portalRef.current?.contains(nativeEvent.target as Node) &&
      !openButtonRef.current?.contains(nativeEvent.target as Node)
    ) {
      // Click is outside of button and menu elements
      handleClose();
    }
  };

  // Decide if the node is focusable or not
  const isFocusable = (child: React.ReactElement<ActionMenuItemProps>) =>
    child?.type === ActionMenuItem;

  // Find nect child that can be focused
  const nextFocusable = (current: number | undefined) => {
    let nextFocusableIndex: number | undefined;
    let firstFocusableIndex: number | undefined;
    let startFrom = 0;

    if (current) {
      startFrom = current;
    }

    React.Children.forEach(children, (child, index) => {
      if (isFocusable(child) && firstFocusableIndex === undefined) {
        firstFocusableIndex = index;
      }

      if (
        index > startFrom &&
        isFocusable(child) &&
        nextFocusableIndex === undefined
      ) {
        nextFocusableIndex = index;
      }
    });

    // Is there focusable later in the list
    if (nextFocusableIndex !== undefined) {
      return nextFocusableIndex;
    }
    // Return the first focusable of the list
    return firstFocusableIndex;
  };

  const previousFocusable = (current: number) => {
    let result: number | undefined;
    let lastFocusable: number | undefined;

    React.Children.forEach(children, (child, index) => {
      if (isFocusable(child)) {
        lastFocusable = index;
      }

      if (index < current && isFocusable(child)) {
        result = index;
      }
    });

    if (result !== undefined) {
      return result;
    }

    return lastFocusable;
  };

  const globalKeyDownHandler = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleClose();
      event.preventDefault();
    }

    if (event.key === 'Tab') {
      // Close the menu
      handleClose();
    }

    if (event.key === 'Enter' || event.key === ' ') {
      // Call action of the child item
      console.log('Enter ja indeksi: ', focusedChild);

      const childProps = React.Children.toArray(children)[focusedChild]?.props;

      if (childProps.onClick) {
        childProps.onClick();
      } else if (childProps.href) {
        window.open(childProps.href, '_self');
      }

      handleClose();
      event.preventDefault();
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setFocusedChild((previous) => nextFocusable(previous));
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setFocusedChild((previous) => previousFocusable(previous));
    }
  };

  const { styles, attributes } = usePopper(
    openButtonRef.current,
    dialogElement,
    {
      strategy: 'fixed',
      modifiers: [
        { name: 'eventListeners', enabled: true },
        {
          name: 'offset',
          options: {
            offset: [0, 10],
          },
        },
        {
          name: 'flip',
          options: {
            fallbackPlacements: ['top-end'],
          },
        },
        {
          name: 'preventOverflow',
          options: {
            padding: 5,
          },
        },
      ],
      placement: 'bottom-end',
    },
  );

  const handleClose = (): void => {
    onClose();
  };

  if (React.Children.count(children) < 1) {
    getLogger().warn(`Action Menu does not contain items`);
    return null;
  }

  const menuItems = (childs: ReactNode) =>
    React.Children.map(
      childs,
      (child: React.ReactElement<ActionMenuItemProps>, index) => {
        // Add onClick prop to clickable items
        if (React.isValidElement(child) && child.type === ActionMenuItem) {
          // console.log(child);
          return React.cloneElement(child, {
            selected: focusedChild === index,
            itemIndex: index,
          });
        }
        return child;
      },
    );

  const handleItemSelection = (value: ReactNode) => {
    console.log('handle item selection');
    handleClose();
  };

  const itemMouseOver = (value: number) => {
    setFocusedChild(value);
  };

  if (!mountNode) {
    return null;
  }
  return (
    <>
      {ReactDOM.createPortal(
        <HtmlDivWithRef
          role="dialog"
          className={classnames(className, baseClassName)}
          style={styles.popper}
          forwardedRef={setDialogElement}
        >
          <div ref={portalRef}>
            <ActionMenuProvider
              value={{
                onItemClick: (itemValue) => handleItemSelection(itemValue),
                onItemMouseOver(itemValue) {
                  itemMouseOver(itemValue);
                },
                selectedDropdownValue: selectedValue,
                id: menuId,
                focusedItemId: focusedDescendantId,
                focusedIndex: focusedChild,
              }}
            >
              <HtmlUlWithRef
                role="menu"
                id={menuId}
                aria-activedescendant={`${focusedChild}-menu-item`}
                aria-labelledby={buttonId}
                tabIndex={-1}
                className={actionMenuClassNames.application}
                onMouseLeave={() => console.log('Menu ul leave')}
                forwardRef={ulRef}
              >
                {menuItems(children)}
              </HtmlUlWithRef>
            </ActionMenuProvider>
            <div
              className={actionMenuClassNames.popperArrow}
              style={styles.arrow}
              data-popper-arrow
              data-popper-placement={
                attributes.popper?.['data-popper-placement']
              }
            />
          </div>
        </HtmlDivWithRef>,
        mountNode,
      )}
    </>
  );
};

const StyledActionMenuPopover = styled(
  ({
    theme,
    ...passProps
  }: InternalActionMenuPopoverProps & SuomifiThemeProp) => (
    <BaseActionMenuPopover {...passProps} />
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

const ActionMenuPopover = (props: InternalActionMenuPopoverProps) => (
  <SuomifiThemeConsumer>
    {({ suomifiTheme }) => (
      <StyledActionMenuPopover theme={suomifiTheme} {...props} />
    )}
  </SuomifiThemeConsumer>
);

ActionMenuPopover.displayName = 'ActionMenuPopover';
export { ActionMenuPopover, ActionMenuProvider, ActionMenuConsumer };
