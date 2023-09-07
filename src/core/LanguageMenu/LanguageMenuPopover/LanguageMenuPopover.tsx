import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import { usePopper } from 'react-popper';
import classnames from 'classnames';
import { useEnhancedEffect } from '../../../utils/common';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { HtmlDiv, HtmlDivWithRef } from '../../../reset';
import { getLogger } from '../../../utils/log';
import { baseStyles } from './LanguageMenuPopover.baseStyles';
import { MenuContent } from '../LanguageMenu';

const baseClassName = 'fi-language-menu-popover';

export const languageMenuPopoverClassNames = {
  baseClassName,
  hidden: `${baseClassName}--hidden`,
  list: `${baseClassName}_list`,
  popperArrow: `${baseClassName}_popper-arrow`,
};

export type InitialActiveDescendant = 'first' | 'last' | 'none';
export interface InternalLanguageMenuPopoverProps {
  /** Button ref for positioning dialog and closing dialog on button click */
  openButtonRef: React.RefObject<any>;
  /** Callback fired when closing popover */
  onClose: (moveFocus: boolean) => void;
  /** Styled component className */
  className?: string;
  /** Menu items. Use the `<LanguageMenuItem>` components as children */
  children?: MenuContent;
  /** Id given to menu element */
  menuId: string;
  /** Id of the parent component. Passed further to items to generate their own ids */
  parentId?: string;
  /** Initial active menu item */
  initialActiveDescendant: InitialActiveDescendant;
  /** Boolean to open or close menu */
  isOpen: boolean;
}

export interface LanguageMenuProviderState {
  /** Callback for communicating LanguageMenuItem click to parent  */
  onItemClick: (itemIndex: number) => void;
  /** Callback for communicating LanguageMenuItem mouse over to parent  */
  onItemMouseOver: (itemIndex: number) => void;
  /** Index of the child that has aria active descendant status */
  activeDescendantIndex: number;
  /** Id of the parent menu component. Used to generate child ids */
  parentId: string;
}

const defaultProviderValue: LanguageMenuProviderState = {
  onItemClick: () => null,
  onItemMouseOver: () => null,
  activeDescendantIndex: -1,
  parentId: '',
};

const { Provider: LanguageMenuProvider, Consumer: LanguageMenuConsumer } =
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

const scrollItemList = (
  elementId: string,
  wrapperRef: React.RefObject<HTMLDivElement>,
) => {
  // 10px reduction to scroll position is required due to container padding.
  const wrapperOffsetPx = 10;
  if (wrapperRef !== null && wrapperRef.current !== null) {
    const elementOffsetTop = document.getElementById(elementId)?.offsetTop || 0;
    const elementOffsetHeight =
      document.getElementById(elementId)?.offsetHeight || 0;

    if (elementOffsetTop < wrapperRef.current.scrollTop) {
      wrapperRef.current.scrollTop = elementOffsetTop - wrapperOffsetPx;
    } else {
      const offsetBottom = elementOffsetTop + elementOffsetHeight;
      const scrollBottom =
        wrapperRef.current.scrollTop + wrapperRef.current.offsetHeight;

      if (offsetBottom > scrollBottom) {
        wrapperRef.current.scrollTop =
          offsetBottom - wrapperRef.current.offsetHeight + wrapperOffsetPx;
      }
    }
  }
};

export const BaseLanguageMenuPopover = (
  props: InternalLanguageMenuPopoverProps,
) => {
  const {
    openButtonRef,
    onClose,
    className,
    children,
    menuId,
    parentId,
    initialActiveDescendant,
    isOpen,
  } = props;

  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const [dialogElement, setDialogElement] = useState<HTMLElement | null>(null);
  const [activeChild, setActiveChild] = useState<number>(-1);
  const [preventScroll, setPreventScroll] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement>(null);

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

        if (!preventScroll) {
          scrollItemList(`${parentId}-list-item-${activeChild}`, menuRef);
        }

        return () => {
          document.removeEventListener('keydown', globalKeyDownHandler, {
            capture: true,
          });
        };
      }
    }, // Event listener has to be updated on every active child change or it's always -1 inside the globalKeyDownHandler
    [activeChild],
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
    let isMounted = true;

    // Timeout is needed for iOS Safari + VoiceOver to move focus into menu item on open
    setTimeout(() => {
      if (isMounted) {
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
      isMounted = false;
    };
  }, [isOpen]);

  const globalClickHandler = (nativeEvent: MouseEvent) => {
    if (
      !menuRef.current?.contains(nativeEvent.target as Node) &&
      !openButtonRef.current?.contains(nativeEvent.target as Node)
    ) {
      // Click is outside of "open menu button" and menu elements
      handleClose(false);
    }
  };

  const globalKeyDownHandler = (event: KeyboardEvent) => {
    // First let's make sure scrolling is enabled when using keyboard
    setPreventScroll(false);
    if (event.key === 'Escape') {
      handleClose(true);
      event.preventDefault();
    }

    if (event.key === 'Tab') {
      // Close the menu
      handleClose(true);
    }

    const popoverItemsLength = React.Children.count(children);

    const getNextIndex = () =>
      activeChild < popoverItemsLength - 1 ? activeChild + 1 : 0;
    const getPreviousIndex = () =>
      activeChild !== 0 ? activeChild - 1 : popoverItemsLength - 1;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveChild(getNextIndex());
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveChild(getPreviousIndex());
    }
  };

  // Popper options modifiers
  const defaultModifiers = [
    { name: 'eventListeners', enabled: isOpen },
    {
      name: 'offset',
      options: {
        offset: [0, 15],
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
    sameWidth,
  ];

  const { styles, attributes } = usePopper(
    openButtonRef.current,
    dialogElement,
    {
      strategy: 'fixed',
      modifiers: defaultModifiers,
      placement: 'bottom-end',
    },
  );

  const handleClose = (moveFocus: boolean): void => {
    onClose(moveFocus);
  };

  if (React.Children.count(children) < 1) {
    getLogger().warn(`LanguageMenu ${menuId} does not contain items`);
    return null;
  }

  const itemMouseOver = (value: number) => {
    setActiveChild(value);
  };

  if (!mountNode) {
    return null;
  }

  const menuItems = (childs: ReactNode) =>
    React.Children.map(childs, (child, index) => {
      // Add itemIndex prop to clickable items
      if (React.isValidElement(child)) {
        return React.cloneElement(child as React.ReactElement<any>, {
          itemIndex: index,
        });
      }
      return child;
    });

  return (
    <HtmlDivWithRef
      className={classnames(className, baseClassName, {
        [languageMenuPopoverClassNames.hidden]: !isOpen,
      })}
      style={styles.popper}
      forwardedRef={setDialogElement}
    >
      <LanguageMenuProvider
        value={{
          onItemClick: () => handleClose(true),
          onItemMouseOver(itemIndex) {
            // Don't scroll the list when hovering with a mouse
            setPreventScroll(true);
            itemMouseOver(itemIndex);
          },
          activeDescendantIndex: activeChild,
          parentId: parentId || '',
        }}
      >
        <HtmlDivWithRef
          role="menu"
          id={menuId}
          tabIndex={-1}
          className={languageMenuPopoverClassNames.list}
          forwardedRef={menuRef}
        >
          {menuItems(children)}
        </HtmlDivWithRef>
      </LanguageMenuProvider>
      <HtmlDiv
        className={languageMenuPopoverClassNames.popperArrow}
        style={styles.arrow}
        data-popper-arrow
        data-popper-placement={attributes.popper?.['data-popper-placement']}
      />
    </HtmlDivWithRef>
  );
};

const StyledLanguageMenuPopover = styled(
  ({
    theme,
    ...passProps
  }: InternalLanguageMenuPopoverProps & SuomifiThemeProp) => (
    <BaseLanguageMenuPopover {...passProps} />
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

const LanguageMenuPopover = (props: InternalLanguageMenuPopoverProps) => (
  <SuomifiThemeConsumer>
    {({ suomifiTheme }) => (
      <StyledLanguageMenuPopover theme={suomifiTheme} {...props} />
    )}
  </SuomifiThemeConsumer>
);

LanguageMenuPopover.displayName = 'LanguageMenuPopover';
export { LanguageMenuPopover, LanguageMenuProvider, LanguageMenuConsumer };
