import React, { useState, ReactNode, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useEnhancedEffect } from '../../utils/common';
import { HtmlDivProps, HtmlDivWithRef } from '../../reset/HtmlDiv/HtmlDiv';
import { useFloating, shift, autoUpdate, size } from '@floating-ui/react-dom';
import classNames from 'classnames';

export interface PopoverProps extends HtmlDivProps {
  /** Source ref for positioning the Popover */
  sourceRef: React.RefObject<any>;
  /** Content for the Popover */
  children: ReactNode;
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
  /** CSS class for custom styles */
  className?: string;
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
    placement = 'bottom',
    allowFlip = false,
    matchWidth = true,
    children,
    sourceRef,
    onClickOutside,
    portal = true,
    className,
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
            className={classNames('fi-portal', className)}
            ref={setFloatingElement}
            style={floatingStyles}
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
      className={className}
      ref={setFloatingElement}
      style={floatingStyles}
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
