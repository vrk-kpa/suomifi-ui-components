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
import {
  ActionMenuItem,
  ActionMenuItemProps,
} from '../ActionMenuItem/ActionMenuItem';
import { ActionMenuDividerProps } from '../ActionMenuDivider/ActionMenuDivider';

const baseClassName = 'fi-action-menu-popover';

export const actionMenuClassNames = {
  baseClassName,
  hidden: `${baseClassName}--hidden`,
  application: `${baseClassName}_application`,
  popperArrow: `${baseClassName}_popper-arrow`,
};

export type InitialActiveDescendant = 'first' | 'last' | 'none';
export interface InternalActionMenuPopoverProps {
  /** Button ref for positioning dialog and closing dialog on button click */
  openButtonRef: React.RefObject<any>;
  /** Callback fired when closing popover */
  onClose: () => void;
  /** Styled component className */
  className?: string;
  /** Menu items. Use the `<ActionMenuItem>` or  `<ActionMenuDivider>` components as children */
  children?:
    | Array<
        | React.ReactElement<ActionMenuItemProps>
        | React.ReactElement<ActionMenuDividerProps>
      >
    | React.ReactElement<ActionMenuItemProps>
    | React.ReactElement<ActionMenuDividerProps>;

  menuId: string;

  buttonId: string;

  initialActiveDescendant: InitialActiveDescendant;
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
  /** Callback for communicating ActionMenuItem click to parent  */
  onItemClick: (itemIndex: number) => void;
  /** Callback for communicating ActionMenuItem mouse over to parent  */
  onItemMouseOver: (itemIndex: number) => void;
  /** Index of the child that has aria active descendant status */
  activeDescendantIndex: number;
}

const defaultProviderValue: ActionMenuProviderState = {
  onItemClick: () => null,
  onItemMouseOver: () => null,
  activeDescendantIndex: -1,
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
    initialActiveDescendant,
  } = props;

  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const [dialogElement, setDialogElement] = useState<HTMLElement | null>(null);
  const [activeChild, setActiveChild] = useState<number>(-1);

  const portalRef = useRef<HTMLDivElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);

  useEnhancedEffect(() => {
    setMountNode(window.document.body);
  }, []);

  useEffect(
    () => {
      // Add listener for keyboard events
      document.addEventListener('keydown', globalKeyDownHandler, {
        capture: true,
      });

      return () => {
        document.removeEventListener('keydown', globalKeyDownHandler, {
          capture: true,
        });
      };
    }, // Event listener has to be updated on every active child change or it's always -1 inside the globalKeyDownHandler
    [activeChild],
  );

  useEffect(() => {
    // Add listener for click events
    document.addEventListener('click', globalClickHandler, {
      capture: true,
    });

    return () => {
      document.removeEventListener('click', globalClickHandler, {
        capture: true,
      });
    };
  }, [openButtonRef]);

  useEffect(() => {
    // Set focus to ul element when menu opens
    ulRef.current?.focus();
  }, [ulRef.current]);

  useEffect(() => {
    // Timeout is needed for Safari + VoiceOver to read the active menu item when menu opens
    setTimeout(() => {
      if (initialActiveDescendant === 'first') {
        setActiveChild(0);
      } else if (initialActiveDescendant === 'last') {
        setActiveChild(React.Children.count(children) - 1);
      }
    }, 100);
  }, [initialActiveDescendant]);

  const globalClickHandler = (nativeEvent: MouseEvent) => {
    if (
      !portalRef.current?.contains(nativeEvent.target as Node) &&
      !openButtonRef.current?.contains(nativeEvent.target as Node)
    ) {
      // Click is outside of "open menu button" and menu elements
      handleClose();
    }
  };

  // Decide if the node can be active descendant or not (is it a menu item or divider)
  const isActivable = (child: any) => child?.type === ActionMenuItem;

  // Find next child that can be active descendant
  const nextActivable = (current: number) => {
    let nextActivableIndex = -1;
    let firstActivableIndex = -1;
    let startFrom = 0;

    if (current) {
      startFrom = current;
    }

    React.Children.forEach(children, (child, index) => {
      if (isActivable(child) && firstActivableIndex === -1) {
        firstActivableIndex = index;
      }

      if (
        index > startFrom &&
        isActivable(child) &&
        nextActivableIndex === -1
      ) {
        nextActivableIndex = index;
      }
    });

    // Is there "activable" later in the list
    if (nextActivableIndex !== -1) {
      return nextActivableIndex;
    }
    // Return the first "activable" of the list
    return firstActivableIndex;
  };

  const previousActivable = (current: number) => {
    let result = -1;
    let lastActivable = -1;

    React.Children.forEach(children, (child, index) => {
      if (isActivable(child)) {
        lastActivable = index;
      }

      if (index < current && isActivable(child)) {
        result = index;
      }
    });

    if (result !== -1) {
      return result;
    }

    return lastActivable;
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
      const currentChild = React.Children.toArray(children)[activeChild];

      if (React.isValidElement(currentChild) && !currentChild.props.disabled) {
        const childProps = currentChild.props;

        if (childProps.onClick) {
          childProps.onClick();
        }
        if (childProps.href) {
          window.open(childProps.href, '_self');
        }

        // Close the menu only if the child item is not disabled
        handleClose();
      }

      event.preventDefault();
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveChild((previous) => nextActivable(previous));
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveChild((previous) => previousActivable(previous));
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
        // Add itemIndex prop to clickable items
        if (React.isValidElement(child) && child.type === ActionMenuItem) {
          return React.cloneElement(
            child as React.ReactElement<ActionMenuItemProps>,
            {
              itemIndex: index,
            },
          );
        }
        return child;
      },
    );

  const itemMouseOver = (value: number) => {
    setActiveChild(value);
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
                onItemClick: () => handleClose(),
                onItemMouseOver(itemIndex) {
                  itemMouseOver(itemIndex);
                },
                activeDescendantIndex: activeChild,
              }}
            >
              <HtmlUlWithRef
                role="menu"
                id={menuId}
                aria-activedescendant={`${activeChild}-menu-item`}
                aria-labelledby={buttonId}
                tabIndex={-1}
                className={actionMenuClassNames.application}
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
