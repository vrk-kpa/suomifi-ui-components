import React, { useState, ReactNode, useLayoutEffect, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { default as styled } from 'styled-components';
import { usePopper } from 'react-popper';

import { withSuomifiDefaultProps } from '../theme/utils';
import { TokensProp } from '../theme';
import { baseStyles } from './Popover.baseStyles';
import { HtmlDivProps } from 'reset';

export interface PopoverProps extends TokensProp {
  children: ReactNode;
}

const useEnhancedEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const Popover = (props: PopoverProps) => {
  const [referenceElement, setReferenceElement] = useState<Element | null>(
    null,
  );
  const [showPortal, setShowPortal] = useState(false);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
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
      {showPortal &&
        ReactDOM.createPortal(
          <div
            className={'fi-portal'}
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            <div ref={setArrowElement} style={styles.arrow} />
            <StyledDiv tokens={props.tokens}>{props.children}</StyledDiv>
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
