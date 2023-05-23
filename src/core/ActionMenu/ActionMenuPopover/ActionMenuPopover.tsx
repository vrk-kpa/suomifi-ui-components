import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import { usePopper } from 'react-popper';
import classnames from 'classnames';
import { useEnhancedEffect } from '../../../utils/common';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { HtmlDivWithRef, HtmlUlWithRef } from '../../../reset';
import { getLogger } from '../../../utils/log';
import { baseStyles } from './ActionMenuPopover.baseStyles';

const baseClassName = 'fi-action-menu-popover';

export const actionMenuClassNames = {
  baseClassName,
  list: `${baseClassName}_list`,
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
  children?: ReactNode;
  /** Id given to menu `<ul>` element */
  menuId: string;
  /** Id of the menu opne button */
  buttonId: string;
  /** Initial active menu item */
  initialActiveDescendant: InitialActiveDescendant;
  /** If true, popover will be full width */
  fullWidth?: boolean;
}

export interface ActionMenuProviderState {
  /** Callback for communicating ActionMenuItem click to parent  */
  onItemClick: (itemIndex: number) => void;
  /** Callback for communicating ActionMenuItem mouse over to parent  */
  onItemMouseOver: (itemIndex: number) => void;
  /** Index of the child that has aria active descendant status */
  activeDescendantIndex: number;
  /* Id of the parent (popover component) */
  parentId: string;
}

const defaultProviderValue: ActionMenuProviderState = {
  onItemClick: () => null,
  onItemMouseOver: () => null,
  activeDescendantIndex: -1,
  parentId: '',
};

const { Provider: ActionMenuProvider, Consumer: ActionMenuConsumer } =
  React.createContext(defaultProviderValue);

/* From Popover.tsx */
const sameWidth: any = {
  name: 'sameWidth',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['computeStyles'],
  /* eslint-disable no-param-reassign */
  fn({ state }: { state: any }) {
    state.styles.popper.width = `${state.rects.reference.width}px`;
  },
  effect({ state }: { state: any }) {
    state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`;
  },
};

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
    fullWidth,
  } = props;

  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const [dialogElement, setDialogElement] = useState<HTMLElement | null>(null);
  const [activeChild, setActiveChild] = useState<number>(-1);

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

      //  scrollItemList(`${menuId}-list-item-${activeChild}`, ulRef);

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
    // For cleanup to prevent setting state on unmounted component
    let isSubscribed = true;
    // Timeout is needed for Safari + VoiceOver to read the active menu item when menu opens
    setTimeout(() => {
      if (isSubscribed) {
        if (initialActiveDescendant === 'first') {
          setActiveChild(0);
        } else if (initialActiveDescendant === 'last') {
          setActiveChild(React.Children.count(children) - 1);
        }
      }
    }, 100);

    // Cancel subscription to useEffect on unmount
    return () => {
      isSubscribed = false;
    };
  }, [initialActiveDescendant]);

  const globalClickHandler = (nativeEvent: MouseEvent) => {
    if (
      !ulRef.current?.contains(nativeEvent.target as Node) &&
      !openButtonRef.current?.contains(nativeEvent.target as Node)
    ) {
      // Click is outside of "open menu button" and menu elements
      handleClose();
    }
  };

  // Decide if the node can be active descendant or not (is it a menu item or divider)
  const isActivable = (child: any) =>
    child?.type?.displayName === 'ActionMenuItem';

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
      handleClose();
      // No preventDefault, so that tabbing works normally
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

  // Popper options modifiers
  const defaultModifiers = [
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
  ];

  const { styles, attributes } = usePopper(
    openButtonRef.current,
    dialogElement,
    {
      strategy: 'fixed',
      modifiers: fullWidth
        ? [...defaultModifiers, sameWidth]
        : defaultModifiers,
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
    React.Children.map(childs, (child, index) => {
      // Add itemIndex prop to clickable items
      if (React.isValidElement(child) && isActivable(child)) {
        return React.cloneElement(child as React.ReactElement<any>, {
          itemIndex: index,
        });
      }
      return child;
    });

  const itemMouseOver = (value: number) => {
    setActiveChild(value);
  };

  if (!mountNode) {
    return null;
  }
  return (
    <HtmlDivWithRef
      className={classnames(className, baseClassName)}
      style={styles.popper}
      forwardedRef={setDialogElement}
    >
      <ActionMenuProvider
        value={{
          onItemClick: () => handleClose(),
          onItemMouseOver(itemIndex) {
            itemMouseOver(itemIndex);
          },
          activeDescendantIndex: activeChild,
          parentId: menuId,
        }}
      >
        <HtmlUlWithRef
          role="menu"
          id={menuId}
          aria-labelledby={buttonId}
          tabIndex={-1}
          className={actionMenuClassNames.list}
          forwardRef={ulRef}
        >
          {menuItems(children)}
        </HtmlUlWithRef>
      </ActionMenuProvider>
      <div
        className={actionMenuClassNames.popperArrow}
        style={styles.arrow}
        data-popper-arrow
        data-popper-placement={attributes.popper?.['data-popper-placement']}
      />
    </HtmlDivWithRef>
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
