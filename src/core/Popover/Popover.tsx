import React, {
  useState,
  ReactNode,
  useLayoutEffect,
  useEffect,
  useRef,
} from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { HtmlDiv, HtmlDivProps } from '../../reset/HtmlDiv/HtmlDiv';

export interface PopoverProps extends HtmlDivProps {
  sourceRef: Element | null;
  children: ReactNode;
  portalStyleProps?: React.CSSProperties;
  placement?: 'top' | 'bottom';
  matchWidth?: boolean;
  allowFlip?: boolean;
}

const useEnhancedEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const PopoverTest = () => {
  const [referenceElement, setReferenceElement] = useState<Element | null>(
    null,
  );
  const firstChildRef = useRef<HTMLUListElement>(null);
  const [showPortal, setShowPortal] = useState(false);

  useEnhancedEffect(() => {
    if (
      firstChildRef !== null &&
      firstChildRef.current !== null &&
      showPortal
    ) {
      firstChildRef.current.focus();
    }
  }, [showPortal]);

  return (
    <>
      <button
        type="button"
        ref={setReferenceElement}
        onClick={() => {
          setShowPortal(!showPortal);
        }}
        {...{
          'aria-haspopup': true,
          'aria-expanded': showPortal,
          'aria-controls': 'popover-test',
          tabIndex: 0,
        }}
      >
        Reference element
      </button>
      <Popover
        sourceRef={referenceElement}
        matchWidth={true}
        id="popover-test"
        tabIndex={-1}
        portalStyleProps={{ backgroundColor: 'white' }}
      >
        {showPortal && (
          <ul tabIndex={-1} ref={firstChildRef}>
            <li>
              <button role="menuitem" tabIndex={0}>
                One
              </button>
            </li>
            <li>
              <button role="menuitem">Two</button>
            </li>
            <li>
              <button role="menuitem">Three</button>
            </li>
          </ul>
        )}
      </Popover>
    </>
  );
};

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
