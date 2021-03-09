import React, { useState, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { useEnhancedEffect } from '../../utils/common';
import { HtmlDiv, HtmlDivProps } from '../../reset/HtmlDiv/HtmlDiv';

export interface PopoverProps extends HtmlDivProps {
  sourceRef: Element | null;
  children: ReactNode;
  portalStyleProps?: React.CSSProperties;
  placement?: 'top' | 'bottom';
  matchWidth?: boolean;
  allowFlip?: boolean;
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

export const Popover = (props: PopoverProps) => {
  const {
    portalStyleProps = {},
    placement = 'bottom',
    allowFlip = false,
    matchWidth = true,
    children,
    sourceRef,
    ...passProps
  } = props;

  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);

  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  const { styles } = usePopper(sourceRef, popperElement, {
    modifiers: [
      {
        name: 'flip',
        enabled: allowFlip,
      },
      matchWidth ? sameWidth : {},
    ],
    placement,
  });

  useEnhancedEffect(() => {
    setMountNode(window.document.body);
  });

  if (!mountNode) {
    return null;
  }
  return (
    <>
      {ReactDOM.createPortal(
        <div
          className={'fi-portal'}
          ref={setPopperElement}
          style={{ ...styles.popper, ...portalStyleProps }}
        >
          <HtmlDiv {...passProps}>{children}</HtmlDiv>
        </div>,
        mountNode,
      )}
    </>
  );
};
