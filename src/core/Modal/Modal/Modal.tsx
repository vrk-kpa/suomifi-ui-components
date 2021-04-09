import React, { Component, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { default as styled } from 'styled-components';
import { createFocusTrap, FocusTrap } from 'focus-trap';
import classnames from 'classnames';
import { HtmlDiv, HtmlDivProps, HtmlDivWithRef } from '../../../reset';
import { AutoId } from '../../../utils/AutoId';
import { windowAvailable } from '../../../utils/common';
import { ModalContent, ModalFooter } from '../';
/* Styles for disabling scrolling. See file for more info. */
import './Modal.globals.scss';
import { baseStyles } from './Modal.baseStyles';

export type ModalVariant = 'smallScreen' | 'default';

export interface ModalProps
  extends Omit<HtmlDivProps, 'children' | 'className' | 'title' | 'ref'> {
  /** Show or hide the modal */
  visible: boolean;
  /** Modal container div class name for custom styling. */
  className?: string;
  /** Children */
  children: ModalContent | ModalFooter | ReactNode;
  /**
   * Variant. Use smallScreen for mobile and small displays
   * @default 'default'
   */
  variant?: ModalVariant;
  /**
   * Show vertical scroll bar if needed and show horizontal divider between content and footer.
   * @default true
   */
  scrollable?: boolean;
  /**
   * Use portal instead of injecting content inside the Modal component
   * @default true
   * Portal is never used when rendering on server or when modal mount node is not available.
   */
  usePortal?: boolean;
  /** Focusable element ref when modal is opened. If not provided, first focusable element is focused */
  focusOnOpenRef?: React.RefObject<any>;
  /** Focusable element ref when modal is closed. If not provided, browser default behaviour will occur (e.g. body gains focus) */
  focusOnCloseRef?: React.RefObject<any>;
  /** Callback for handling esc key press, e.g. close modal */
  onEscKeyDown?: () => void;
}

export interface ModalProviderState {
  variant: ModalVariant;
  titleId: string | undefined;
  scrollable: boolean;
}

type PrevState = { [key: string]: any };

interface HiddenDOMNode {
  element: HTMLElement;
  prevState: PrevState | null;
}

const defaultProviderValue: ModalProviderState = {
  /** Modal's smallScreen setting */
  variant: 'default',
  /** Id for title to connect it to modal for screen readers */
  titleId: 'id',
  /** If modal should have scrollable content and size */
  scrollable: true,
};

const {
  Provider: ModalProvider,
  Consumer: ModalConsumer,
} = React.createContext(defaultProviderValue);

export const baseClassName = 'fi-modal';
const modalClassNames = {
  noPortal: `${baseClassName}--no-portal`,
  smallScreen: `${baseClassName}--small-screen`,
  overlay: `${baseClassName}_overlay`,
  contentContainer: `${baseClassName}_content-container`,
  content: `${baseClassName}_content`,
  noScroll: `${baseClassName}--no-scroll`,
  heading: `${baseClassName}_heading`,
  footer: `${baseClassName}_footer`,
  button: `${baseClassName}_button`,
  disableBodyContent: `${baseClassName}--disable-body-content`,
};

class BaseModal extends Component<ModalProps> {
  private previouslyFocusedElement: any;

  private focusTrapWrapperRef: React.RefObject<HTMLDivElement>;

  private portalMountNode: HTMLElement | null = !!document
    ? document.body
    : null;

  private focusTrap: FocusTrap | null = null;

  private disabledNodes: HiddenDOMNode[] = [];

  constructor(props: ModalProps) {
    super(props);
    this.focusTrapWrapperRef = React.createRef();
    if (windowAvailable()) {
      this.previouslyFocusedElement = document.activeElement;
    }
  }

  componentDidMount() {
    const { visible, focusOnOpenRef } = this.props;
    this.focusTrap = createFocusTrap(
      this.focusTrapWrapperRef.current as HTMLElement,
      {
        escapeDeactivates: false,
        returnFocusOnDeactivate: false,
        ...(focusOnOpenRef ? { initialFocus: focusOnOpenRef.current } : {}),
      },
    );
    this.toggleModalStylesAndControls(visible);
  }

  componentDidUpdate(prevProps: ModalProps) {
    const { visible } = this.props;
    if (prevProps.visible !== visible) {
      this.toggleModalStylesAndControls(visible);
    }
  }

  componentWillUnmount() {
    this.toggleModalStylesAndControls(false);
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27) {
      if (!!this.props.onEscKeyDown) this.props.onEscKeyDown();
    }
  };

  // set aria-hidden for Modal sibling DOM nodes when necessary and add role none presentations to parent nodes
  private disableNonModalDOMNodes = (
    node: HTMLElement,
    modalMountNode: HTMLElement,
  ): HiddenDOMNode[] => {
    if (node === modalMountNode) {
      return [];
    }
    let hiddenNodes: HiddenDOMNode[] = [];
    for (let i = 0; i < node.children.length; i += 1) {
      if (node.children[i].contains(modalMountNode)) {
        const role = (node.children[i] as HTMLElement).getAttribute('role');
        (node.children[i] as HTMLElement).setAttribute(
          'role',
          'none presentation',
        );
        hiddenNodes.push({
          element: node.children[i] as HTMLElement,
          prevState:
            typeof role === 'string' && role?.length > 0 ? { role } : null,
        });
        hiddenNodes = hiddenNodes.concat(
          this.disableNonModalDOMNodes(
            node.children[i] as HTMLElement,
            modalMountNode,
          ),
        );
      } else {
        const currentAriaHiddenState = node.children[i].getAttribute(
          'aria-hidden',
        );
        // only hide nodes that are not yet hidden
        if (currentAriaHiddenState !== 'true') {
          (node.children[i] as HTMLElement).setAttribute('aria-hidden', 'true');
          hiddenNodes.push({
            element: node.children[i] as HTMLElement,
            prevState:
              currentAriaHiddenState === 'false'
                ? { 'aria-hidden': 'false' }
                : null,
          });
        }
      }
    }
    return hiddenNodes;
  };

  // revert Modal sibling DOM node aria-hidden state when closing
  private showSiblingDOMNodes = (nodes: HiddenDOMNode[]) => {
    nodes.forEach((node) => {
      if (node.prevState !== null) {
        const key = Object.keys(node.prevState)[0];
        node.element.setAttribute(key, node.prevState[key]);
      } else {
        node.element.removeAttribute('aria-hidden');
        node.element.removeAttribute('role');
      }
    });
  };

  private toggleModalStylesAndControls = (visible: boolean) => {
    if (!!document && !!window) {
      if (!!visible) {
        document.body.classList.add(modalClassNames.disableBodyContent);
        window.addEventListener('keydown', this.handleKeyDown);
        if (!!this.focusTrapWrapperRef.current) {
          this.disabledNodes = this.disableNonModalDOMNodes(
            document.body,
            this.focusTrapWrapperRef.current,
          );
        }
        if (!!this.focusTrap) this.focusTrap.activate();
      } else {
        document.body.classList.remove(modalClassNames.disableBodyContent);
        window.removeEventListener('keydown', this.handleKeyDown);
        this.showSiblingDOMNodes(this.disabledNodes);
        this.disabledNodes = [];
        if (!!this.focusTrap) this.focusTrap.deactivate();
        if (!!this.props.focusOnCloseRef) {
          this.props.focusOnCloseRef.current.focus();
        } else if (
          !!this.previouslyFocusedElement &&
          this.previouslyFocusedElement.focus
        ) {
          this.previouslyFocusedElement.focus();
        }
      }
    }
  };

  render() {
    const {
      visible,
      id,
      className,
      children,
      variant = 'default',
      scrollable = true,
      usePortal = true,
      focusOnOpenRef,
      focusOnCloseRef = null,
      onEscKeyDown,
      ...passProps
    } = this.props;

    const titleId = `${id}_title`;
    const content = (
      <HtmlDiv
        role="presentation none"
        className={classnames(className, baseClassName, {
          [modalClassNames.smallScreen]: variant === 'smallScreen',
          [modalClassNames.noScroll]: scrollable === false,
          [modalClassNames.noPortal]: usePortal === false,
        })}
      >
        <HtmlDiv role="presentation none" className={modalClassNames.overlay}>
          <HtmlDivWithRef
            forwardedRef={this.focusTrapWrapperRef}
            aria-describedby={titleId}
            role="dialog"
            aria-modal="true"
            className={modalClassNames.contentContainer}
            {...passProps}
          >
            <ModalProvider value={{ titleId, variant, scrollable }}>
              {children}
            </ModalProvider>
          </HtmlDivWithRef>
        </HtmlDiv>
      </HtmlDiv>
    );
    // Skip portal if no mount node is available, if we are on a server or if explicitly requested
    if (!this.portalMountNode || !windowAvailable() || usePortal === false) {
      return content;
    }

    return <>{ReactDOM.createPortal(content, this.portalMountNode)}</>;
  }
}

const StyledModal = styled(BaseModal)`
  ${baseStyles}
`;

/**
 * <i class="semantics" />
 * Use for showing modal content.
 * Props other than specified explicitly are passed on to outermost content div.
 * NOTE: Modal modifies body element styles and sibling DOM element aria-hidden properties.
 * It assumes aria-hidden for sibling DOM nodes remains unchanged while Modal is visilbe.
 */
export class Modal extends Component<ModalProps> {
  render() {
    const { id: propId, visible, ...passProps } = this.props;
    if (!visible) return null;
    return (
      <AutoId id={propId}>
        {(id) => <StyledModal id={id} visible={visible} {...passProps} />}
      </AutoId>
    );
  }
}

export { ModalProvider, ModalConsumer };
