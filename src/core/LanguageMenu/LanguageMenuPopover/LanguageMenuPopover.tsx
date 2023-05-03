import React, { useState, useEffect, useRef, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { default as styled } from 'styled-components';
import { usePopper } from 'react-popper';
import classnames from 'classnames';
import { useEnhancedEffect } from '../../../utils/common';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { HtmlDivWithRef, HtmlUlWithRef } from '../../../reset';
import { getLogger } from '../../../utils/log';
import { baseStyles } from './LanguageMenuPopover.baseStyles';

const baseClassName = 'fi-language-menu-popover';

export const LanguageMenuClassNames = {
  baseClassName,
  list: `${baseClassName}_list`,
  popperArrow: `${baseClassName}_popper-arrow`,
};

export type InitialActiveDescendant = 'first' | 'last' | 'none';
export interface InternalLanguageMenuPopoverProps {
  /** Button ref for positioning dialog and closing dialog on button click */
  openButtonRef: React.RefObject<any>;
  /** Callback fired when closing popover */
  onClose: () => void;
  /** Styled component className */
  className?: string;
  /** Menu items. Use the `<LanguageMenuItem>` or  `<LanguageMenuDivider>` components as children */
  children?: ReactNode;
  /** Id given to menu `<ul>` element */
  menuId: string;
  /** Id of the menu opne button */
  buttonId: string;
  /** Initial active menu item */
  initialActiveDescendant: InitialActiveDescendant;
}

export interface LanguageMenuProviderState {
  /** Callback for communicating LanguageMenuItem click to parent  */
  onItemClick: (itemIndex: number) => void;
  /** Callback for communicating LanguageMenuItem mouse over to parent  */
  onItemMouseOver: (itemIndex: number) => void;
  /** Index of the child that has aria active descendant status */
  activeDescendantIndex: number;
}

const defaultProviderValue: LanguageMenuProviderState = {
  onItemClick: () => null,
  onItemMouseOver: () => null,
  activeDescendantIndex: -1,
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

export const BaseLanguageMenuPopover = (
  props: InternalLanguageMenuPopoverProps,
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
      !portalRef.current?.contains(nativeEvent.target as Node) &&
      !openButtonRef.current?.contains(nativeEvent.target as Node)
    ) {
      // Click is outside of "open menu button" and menu elements
      handleClose();
    }
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

    const popoverItems = React.Children.toArray(children);

    const getNextIndex = () =>
      activeChild !== null ? (activeChild + 1) % popoverItems.length : 0;
    const getPreviousIndex = () =>
      activeChild !== null && activeChild !== -1
        ? (activeChild - 1 + popoverItems.length) % popoverItems.length
        : popoverItems.length - 1;

    if (event.key === 'Enter' || event.key === ' ') {
      // Call action of the child item
      const currentChild = popoverItems[activeChild];

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
      setActiveChild(() => getNextIndex());
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveChild(() => getPreviousIndex());
    }
  };

  // Popper options modifiers
  const defaultModifiers = [
    { name: 'eventListeners', enabled: true },
    {
      name: 'offset',
      options: {
        offset: [0, 12],
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

  const handleClose = (): void => {
    onClose();
  };

  if (React.Children.count(children) < 1) {
    getLogger().warn(`Action Menu does not contain items`);
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
    <>
      {ReactDOM.createPortal(
        <HtmlDivWithRef
          role="menu"
          className={classnames(className, baseClassName)}
          style={styles.popper}
          forwardedRef={setDialogElement}
        >
          <div ref={portalRef}>
            <LanguageMenuProvider
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
                className={LanguageMenuClassNames.list}
                forwardRef={ulRef}
              >
                {menuItems(children)}
              </HtmlUlWithRef>
            </LanguageMenuProvider>
            <div
              className={LanguageMenuClassNames.popperArrow}
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
