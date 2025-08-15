import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { css, styled } from 'styled-components';
import classnames from 'classnames';
import { useEnhancedEffect } from '../../../utils/common';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { HtmlDivWithRef } from '../../../reset';
import { getLogger } from '../../../utils/log';
import { baseStyles } from './LanguageMenuPopover.baseStyles';
import { MenuContent } from '../LanguageMenu';
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  arrow,
} from '@floating-ui/react-dom';

const baseClassName = 'fi-language-menu-popover';

export const languageMenuPopoverClassNames = {
  baseClassName,
  hidden: `${baseClassName}--hidden`,
  list: `${baseClassName}_list`,
  floatinguiArrow: `${baseClassName}_floatingui-arrow`,
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

/* eslint-disable no-param-reassign */
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

// These styled components are a workaround to make floating UI work without inline styles
const StyledPopoverWrapper = styled(HtmlDivWithRef)<{
  $floatingStyles: React.CSSProperties;
}>`
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: max-content !important;

  ${({ $floatingStyles: { position, left, top, transform } }) => css`
    ${position && `position: ${position} !important;`}
    ${left !== undefined && `left: ${left}px !important;`}
    ${top !== undefined && `top: ${top}px !important;`}
    ${transform && `transform: ${transform} !important;`}
  `}
`;

const StyledArrow = styled(HtmlDivWithRef)<{
  $arrowX?: number;
  $arrowY?: number;
}>`
  position: absolute !important;
  ${({ $arrowX }) => $arrowX !== undefined && `left: ${$arrowX}px !important;`}
  ${({ $arrowY }) => $arrowY !== undefined && `top: ${$arrowY}px !important;`}
`;

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
  const arrowRef = useRef<HTMLDivElement>(null);

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
    <StyledPopoverWrapper
      className={classnames(className, baseClassName, {
        [languageMenuPopoverClassNames.hidden]: !isOpen,
      })}
      $floatingStyles={floatingStyles}
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
      <StyledArrow
        forwardedRef={arrowRef}
        className={languageMenuPopoverClassNames.floatinguiArrow}
        data-floatingui-placement={middlewareData?.offset?.placement}
        aria-hidden={true}
        $arrowX={middlewareData?.arrow?.x}
        $arrowY={middlewareData?.arrow?.y}
      />
    </StyledPopoverWrapper>
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
