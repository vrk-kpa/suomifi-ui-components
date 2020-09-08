import React, { useState, ReactNode, useLayoutEffect, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { default as styled } from 'styled-components';
import { usePopper } from 'react-popper';

import { withSuomifiDefaultProps } from '../theme/utils';
import { TokensProp } from '../theme';
import { baseStyles } from './Popover.baseStyles';
import { HtmlDivProps } from 'reset';

export interface PopoverProps extends TokensProp {
  reference: Element;
  children: ReactNode;
  placement?: 'top' | 'bottom';
  allowFlip?: boolean;
}

const useEnhancedEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

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
  const { tokens, placement = 'bottom', allowFlip = false, children } = props;
  const [referenceElement, setReferenceElement] = useState<Element | null>(
    null,
  );
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);

  const [showPortal, setShowPortal] = useState(false);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  const { styles } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: 'flip',
        enabled: allowFlip,
      },
      sameWidth,
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
      <button
        type="button"
        ref={setReferenceElement}
        onClick={() => {
          setShowPortal(!showPortal);
        }}
      >
        Reference element
      </button>
      {console.log(styles)}
      {showPortal &&
        ReactDOM.createPortal(
          <div
            className={'fi-portal'}
            ref={setPopperElement}
            style={styles.popper}
          >
            <StyledDiv tokens={tokens}>{children}</StyledDiv>
          </div>,
          mountNode,
        )}
    </>
  );
};

const StyledDiv = styled(
  ({ tokens, children, ...passProps }: HtmlDivProps & TokensProp) => (
    <div {...passProps}>{children}</div>
  ),
)`
  ${(props) => baseStyles(withSuomifiDefaultProps(props))};
`;
