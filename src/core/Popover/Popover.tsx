import React, { useState, ReactNode, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useEnhancedEffect } from '../../utils/common';
import { HtmlDivProps, HtmlDivWithRef } from '../../reset/HtmlDiv/HtmlDiv';
import {
  useFloating,
  flip,
  shift,
  autoUpdate,
  size,
} from '@floating-ui/react-dom';

export interface PopoverProps extends HtmlDivProps {
  /** Source ref for positioning the Popover */
  sourceRef: React.RefObject<any>;
  /** Content for the Popover */
  children: ReactNode;
  /** Style props for portal element */
  portalStyleProps?: React.CSSProperties;
  /**
   * Menu placement, top or bottom
   * @default bottom
   */
  placement?: 'top' | 'bottom';
  /** Match the width of the popoever with the source ref element */
  matchWidth?: boolean;
  /** Allow flipping the popover to top or bottom when necessary due to lack of available space */
  allowFlip?: boolean;
  /** Event hanlder for clicks outside the popover element */
  onClickOutside?: (event: MouseEvent) => void;
  /**
   * Whether the popover element is rendered in a portal or not
   * @default true
   */
  portal?: boolean;
}

export interface PopoverProviderState {
  updatePopover: () => void;
}

const defaultProviderValue: PopoverProviderState = {
  updatePopover: () => null,
};

const { Provider: PopoverProvider, Consumer: PopoverConsumer } =
  React.createContext(defaultProviderValue);

export { PopoverConsumer };

export const Popover = (props: PopoverProps) => {
  const {
    portalStyleProps = {},
    placement = 'bottom',
    allowFlip = false,
    matchWidth = true,
    children,
    sourceRef,
    onClickOutside,
    portal = true,
    ...passProps
  } = props;

  const [floatingElement, setFloatingElement] = useState<HTMLElement | null>(
    null,
  );

  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  const portalRef = useRef<HTMLDivElement>(null);

  const {
    refs: floatingUiRefs,
    floatingStyles,

    update,
  } = useFloating({
    open: true,
    middleware: [
      flip(),
      shift(),
      ...(matchWidth
        ? [
            size({
              apply({
                rects,
                elements,
              }: {
                rects: { reference: { width: number } };
                elements: { floating: HTMLElement };
              }) {
                const floatingEl = elements.floating;
                floatingEl.style.width = `${rects.reference.width}px`;
              },
            }),
          ]
        : []),
    ],
    whileElementsMounted: autoUpdate,
    placement: 'bottom',
  });

  useEffect(() => {
    if (sourceRef.current) {
      floatingUiRefs.setReference(sourceRef.current);
    }
  }, [floatingUiRefs, sourceRef]);

  useEffect(() => {
    if (floatingElement) {
      floatingUiRefs.setFloating(floatingElement);
    }
  }, [floatingUiRefs, floatingElement]);

  useEffect(() => {
    const globalClickHandler = (nativeEvent: MouseEvent) => {
      if (
        !portalRef.current?.contains(nativeEvent.target as Node) &&
        !sourceRef?.current?.contains(nativeEvent.target as Node) &&
        !!onClickOutside
      ) {
        onClickOutside(nativeEvent);
      }
    };

    document.addEventListener('click', globalClickHandler, {
      capture: true,
    });
    return () => {
      document.removeEventListener('click', globalClickHandler, {
        capture: true,
      });
    };
  }, [onClickOutside, sourceRef]);

  useEnhancedEffect(() => {
    setMountNode(window.document.body);
  });

  if (portal && !mountNode) {
    return null;
  }
  if (portal && mountNode) {
    return (
      <>
        {ReactDOM.createPortal(
          <div
            className={'fi-portal'}
            ref={setFloatingElement}
            style={{ ...floatingStyles, ...portalStyleProps }}
            tabIndex={-1}
            role="presentation"
          >
            <HtmlDivWithRef forwardedRef={portalRef} {...passProps}>
              <PopoverProvider
                value={{
                  updatePopover: () => update?.(),
                }}
              >
                {children}
              </PopoverProvider>
            </HtmlDivWithRef>
          </div>,
          mountNode,
        )}
      </>
    );
  }
  return (
    <div
      ref={setFloatingElement}
      style={{ ...floatingStyles, ...portalStyleProps }}
      tabIndex={-1}
      role="presentation"
    >
      <HtmlDivWithRef forwardedRef={portalRef} {...passProps}>
        <PopoverProvider
          value={{
            updatePopover: () => update?.(),
          }}
        >
          {children}
        </PopoverProvider>
      </HtmlDivWithRef>
    </div>
  );
};
