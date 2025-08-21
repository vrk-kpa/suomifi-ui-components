import React, { useState, ReactNode, useEffect, useRef, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useEnhancedEffect } from '../../utils/common';
import { HtmlDivProps, HtmlDivWithRef } from '../../reset/HtmlDiv/HtmlDiv';
import {
  useFloating,
  shift,
  autoUpdate,
  flip,
  offset,
} from '@floating-ui/react-dom';
import classNames from 'classnames';
import styled, { css } from 'styled-components';

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
  popoverPlacement: string | undefined;
}

const defaultProviderValue: PopoverProviderState = {
  updatePopover: () => null,
  popoverPlacement: 'bottom',
};

// This styled component is a workaround to make floating UI work without inline styles
const StyledPopoverWrapper = styled(HtmlDivWithRef)<{
  $floatingStyles: React.CSSProperties;
  $referenceWidth?: number;
}>`
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: ${({ $referenceWidth }) =>
    $referenceWidth
      ? `${$referenceWidth}px !important`
      : 'max-content !important'};

  ${({ $floatingStyles }) => css`
    position: ${$floatingStyles.position || 'absolute'} !important;
    left: ${$floatingStyles.left ?? 0}px !important;
    top: ${$floatingStyles.top ?? 0}px !important;
    transform: ${$floatingStyles.transform || 'none'} !important;
  `}
`;

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

  // Track reference width without inline styles (CSP-safe)
  const [referenceWidth, setReferenceWidth] = useState<number>();
  const lastWidthRef = useRef<number | undefined>(undefined);

  const {
    refs: floatingUiRefs,
    floatingStyles,
    update,
    placement: resolvedPlacement,
  } = useFloating({
    open: true,
    middleware: [offset(0), flip(), shift()],
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

  // Safe ResizeObserver that defers state and avoids redundant updates
  useEffect(() => {
    if (!matchWidth || !sourceRef.current) return;

    const ro = new ResizeObserver(() => {
      const node = sourceRef.current;
      if (!node) return;
      const width = node.offsetWidth;
      if (width === lastWidthRef.current) return;
      requestAnimationFrame(() => {
        lastWidthRef.current = width;
        setReferenceWidth(width);
      });
    });

    ro.observe(sourceRef.current);
    return () => ro.disconnect();
  }, [matchWidth, sourceRef]);

  // ✨ Critical fix: defer placement propagation to consumers until next frame
  const [consumerPlacement, setConsumerPlacement] = useState<
    string | undefined
  >(undefined);
  useEffect(() => {
    const id = requestAnimationFrame(() =>
      setConsumerPlacement(resolvedPlacement),
    );
    return () => cancelAnimationFrame(id);
  }, [resolvedPlacement]);

  const providerValue = useMemo(
    () => ({
      updatePopover: () => update?.(),
      popoverPlacement: consumerPlacement,
    }),
    [update, consumerPlacement],
  );

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
          <StyledPopoverWrapper
            className={classNames('fi-portal', className, {
              'fi-popover-match-width': matchWidth,
            })}
            forwardedRef={setFloatingElement}
            $floatingStyles={floatingStyles}
            $referenceWidth={referenceWidth}
            tabIndex={-1}
            role="presentation"
          >
            <HtmlDivWithRef forwardedRef={portalRef} {...passProps}>
              <PopoverProvider value={providerValue}>
                {children}
              </PopoverProvider>
            </HtmlDivWithRef>
          </StyledPopoverWrapper>,
          mountNode,
        )}
      </>
    );
  }
  return (
    <StyledPopoverWrapper
      className={classNames(className, {
        'fi-popover-match-width': matchWidth,
      })}
      forwardedRef={setFloatingElement}
      $floatingStyles={floatingStyles}
      $referenceWidth={referenceWidth}
      tabIndex={-1}
      role="presentation"
    >
      <HtmlDivWithRef forwardedRef={portalRef} {...passProps}>
        <PopoverProvider value={providerValue}>{children}</PopoverProvider>
      </HtmlDivWithRef>
    </StyledPopoverWrapper>
  );
};
