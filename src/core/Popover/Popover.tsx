import React, { useState, ReactNode, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { useEnhancedEffect } from '../../utils/common';
import { HtmlDivProps, HtmlDivWithRef } from '../../reset/HtmlDiv/HtmlDiv';
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
   * Whether the popper element is rendered in a portal or not
   * @default true
   */
  portal?: boolean;
}

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

export interface PopoverProviderState {
  updatePopover: () => void;
}

const defaultProviderValue: PopoverProviderState = {
  updatePopover: () => null,
};

const { Provider, Consumer: PopoverConsumer } =
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

  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);

  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  const portalRef = useRef<HTMLDivElement>(null);

  const { update, styles } = usePopper(sourceRef.current, popperElement, {
    modifiers: [
      {
        name: 'flip',
        enabled: allowFlip,
      },
      matchWidth ? sameWidth : {},
    ],
    placement,
  });

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
            ref={setPopperElement}
            style={{ ...styles.popper, ...portalStyleProps }}
            tabIndex={-1}
            role="presentation"
          >
            <HtmlDivWithRef forwardedRef={portalRef} {...passProps}>
              <Provider
                value={{
                  updatePopover: () => update?.(),
                }}
              >
                {children}
              </Provider>
            </HtmlDivWithRef>
          </div>,
          mountNode,
        )}
      </>
    );
  }
  return (
    <div
      ref={setPopperElement}
      style={{ ...styles.popper, ...portalStyleProps }}
      tabIndex={-1}
      role="presentation"
    >
      <HtmlDivWithRef forwardedRef={portalRef} {...passProps}>
        <Provider
          value={{
            updatePopover: () => update?.(),
          }}
        >
          {children}
        </Provider>
      </HtmlDivWithRef>
    </div>
  );
};
