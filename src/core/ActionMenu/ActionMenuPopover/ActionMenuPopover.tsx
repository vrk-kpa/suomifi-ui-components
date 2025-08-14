import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { styled } from 'styled-components';
import classnames from 'classnames';
import { useEnhancedEffect } from '../../../utils/common';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { HtmlDivWithRef } from '../../../reset';
import { getLogger } from '../../../utils/log';
import { baseStyles } from './ActionMenuPopover.baseStyles';
import { MenuContent } from '../ActionMenu';
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  arrow,
} from '@floating-ui/react-dom';

const baseClassName = 'fi-action-menu-popover';

export const actionMenuClassNames = {
  baseClassName,
  hidden: `${baseClassName}--hidden`,
  list: `${baseClassName}_list`,
  floatinguiArrow: `${baseClassName}_floatingui-arrow`,
};

export type InitialActiveDescendant = 'first' | 'last' | 'none';
export interface InternalActionMenuPopoverProps {
  /** Button ref for positioning dialog and closing dialog on button click */
  openButtonRef: React.RefObject<any>;
  /** Callback fired when closing popover */
  onClose: (moveFocus: boolean) => void;
  /** Styled component className */
  className?: string;
  /** Menu items. Use the `<ActionMenuItem>` or  `<ActionMenuDivider>` components as children */
  children?: MenuContent;
  /** Id given to menu `<ul>` element */
  menuId: string;
  /** Id of the menu opne button */
  buttonId: string;
  /** Initial active menu item */
  initialActiveDescendant: InitialActiveDescendant;
  /** If true, popover will be full width */
  fullWidth?: boolean;
  /** Boolean to open or close menu */
  isOpen: boolean;
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

// These styled components are a workaround to make floating UI work without inline styles
const StyledPopoverWrapper = styled(HtmlDivWithRef)<{
  $floatingStyles: React.CSSProperties;
  $referenceWidth?: number;
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ $referenceWidth }) =>
    $referenceWidth !== undefined ? `${$referenceWidth}px` : 'max-content'};

  ${({ $floatingStyles }) => `
    ${$floatingStyles.position ? `position: ${$floatingStyles.position};` : ''}
    ${
      $floatingStyles.left !== undefined
        ? `left: ${$floatingStyles.left}px;`
        : ''
    }
    ${$floatingStyles.top !== undefined ? `top: ${$floatingStyles.top}px;` : ''}
    ${
      $floatingStyles.transform
        ? `transform: ${$floatingStyles.transform};`
        : ''
    }
  `}
`;

const StyledArrow = styled(HtmlDivWithRef)<{
  $arrowX?: number;
  $arrowY?: number;
}>`
  position: absolute;
  ${({ $arrowX }) => $arrowX !== undefined && `left: ${$arrowX}px;`}
  ${({ $arrowY }) => $arrowY !== undefined && `top: ${$arrowY}px;`}
`;

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
    isOpen,
  } = props;

  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const [dialogElement, setDialogElement] = useState<HTMLElement | null>(null);
  const [activeChild, setActiveChild] = useState<number>(-1);
  const divRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  const [referenceWidth, setReferenceWidth] = useState<number | undefined>(
    undefined,
  );

  useEnhancedEffect(() => {
    setMountNode(window.document.body);
  }, []);

  useEffect(
    () => {
      if (isOpen) {
        // Add listener for keyboard events
        document.addEventListener('keydown', globalKeyDownHandler, {
          capture: true,
        });

        return () => {
          document.removeEventListener('keydown', globalKeyDownHandler, {
            capture: true,
          });
        };
      }
    }, // Event listener has to be updated on every active child change or it's always -1 inside the globalKeyDownHandler
    [isOpen],
  );

  useEffect(() => {
    if (isOpen) {
      // Add listener for click events
      document.addEventListener('click', globalClickHandler, {
        capture: true,
      });

      return () => {
        document.removeEventListener('click', globalClickHandler, {
          capture: true,
        });
      };
    }
  }, [isOpen]);

  useEffect(() => {
    // For cleanup to prevent setting state on unmounted component
    let isSubscribed = true;

    // Timeout is needed for iOS Safari + VoiceOver to move focus into menu item on open
    setTimeout(() => {
      if (isSubscribed) {
        if (initialActiveDescendant === 'first') {
          setActiveChild(0);
        } else if (initialActiveDescendant === 'last') {
          setActiveChild(React.Children.count(children) - 1);
        }
      }
    }, 0);

    // Cancel subscription to useEffect on unmount
    return () => {
      setActiveChild(-1);
      isSubscribed = false;
    };
  }, [isOpen]);

  useEffect(() => {
    if (fullWidth && openButtonRef.current) {
      setReferenceWidth(openButtonRef.current.offsetWidth);

      const resizeObserver = new ResizeObserver(() => {
        if (openButtonRef.current) {
          setReferenceWidth(openButtonRef.current.offsetWidth);
        }
      });

      resizeObserver.observe(openButtonRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [fullWidth, openButtonRef]);

  const globalClickHandler = (nativeEvent: MouseEvent) => {
    if (
      !divRef.current?.contains(nativeEvent.target as Node) &&
      !openButtonRef.current?.contains(nativeEvent.target as Node)
    ) {
      // Click is outside of "open menu button" and menu elements
      handleClose(false);
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
      handleClose(true);
      event.preventDefault();
    }

    if (event.key === 'Tab') {
      handleClose(true);
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

    // Enter and space are handled by menu item component
  };

  const {
    refs: floatingUiRefs,
    floatingStyles,
    middlewareData,
  } = useFloating({
    open: isOpen,
    middleware: [
      offset(10),
      flip(),
      shift(),
      arrow({
        element: arrowRef,
      }),
    ],
    whileElementsMounted: autoUpdate,
    placement: 'bottom-end',
  });

  useEffect(() => {
    if (openButtonRef.current) {
      floatingUiRefs.setReference(openButtonRef.current);
    }
  }, [floatingUiRefs, openButtonRef]);

  useEffect(() => {
    if (dialogElement) {
      floatingUiRefs.setFloating(dialogElement);
    }
  }, [floatingUiRefs, dialogElement]);

  const handleClose = (moveFocus: boolean): void => {
    onClose(moveFocus);
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
    <StyledPopoverWrapper
      $floatingStyles={floatingStyles}
      $referenceWidth={referenceWidth}
      className={classnames(className, baseClassName, {
        [actionMenuClassNames.hidden]: !isOpen,
      })}
      forwardedRef={setDialogElement}
      tabIndex={-1}
      role="none"
    >
      <ActionMenuProvider
        value={{
          onItemClick: () => handleClose(true),
          onItemMouseOver(itemIndex) {
            itemMouseOver(itemIndex);
          },
          activeDescendantIndex: activeChild,
          parentId: menuId,
        }}
      >
        <HtmlDivWithRef
          role="menu"
          forwardedRef={divRef}
          id={menuId}
          aria-labelledby={buttonId}
          tabIndex={-1}
          className={actionMenuClassNames.list}
        >
          {menuItems(children)}
        </HtmlDivWithRef>
      </ActionMenuProvider>
      <StyledArrow
        forwardedRef={arrowRef}
        className={actionMenuClassNames.floatinguiArrow}
        data-floatingui-placement={middlewareData?.offset?.placement}
        aria-hidden={true}
        $arrowX={middlewareData.arrow?.x}
        $arrowY={middlewareData.arrow?.y}
      />
    </StyledPopoverWrapper>
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
