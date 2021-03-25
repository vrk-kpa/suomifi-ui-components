import React, { Component, ReactNode, MouseEvent } from 'react';
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

  private contentContainerRef: React.RefObject<HTMLDivElement>;

  private portalMountNode: HTMLElement | null = !!document
    ? document.body
    : null;

  private focusTrap: FocusTrap | null = null;

  constructor(props: ModalProps) {
    super(props);
    this.focusTrapWrapperRef = React.createRef();
    this.contentContainerRef = React.createRef();
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

  private toggleModalStylesAndControls = (visible: boolean) => {
    if (!!document && !!window) {
      if (!!visible) {
        document.body.classList.add(modalClassNames.disableBodyContent);
        window.addEventListener('keydown', this.handleKeyDown);
        if (!!this.focusTrap) this.focusTrap.activate();
      } else {
        document.body.classList.remove(modalClassNames.disableBodyContent);
        window.removeEventListener('keydown', this.handleKeyDown);
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

  private preventCursorEscape = (event: MouseEvent<HTMLDivElement>) => {
    if (!this.contentContainerRef.current?.contains(event.target as Node)) {
      event.preventDefault();
      event.stopPropagation();
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
      <div
        ref={this.focusTrapWrapperRef}
        aria-describedby={titleId}
        role="dialog"
        aria-modal="true"
        className={classnames(className, baseClassName, {
          [modalClassNames.smallScreen]: variant === 'smallScreen',
          [modalClassNames.noScroll]: scrollable === false,
          [modalClassNames.noPortal]: usePortal === false,
        })}
      >
        <HtmlDiv
          className={modalClassNames.overlay}
          onClick={this.preventCursorEscape}
          onMouseDown={this.preventCursorEscape}
        >
          <HtmlDivWithRef
            className={modalClassNames.contentContainer}
            forwardedRef={this.contentContainerRef}
            {...passProps}
          >
            <ModalProvider value={{ titleId, variant, scrollable }}>
              {children}
            </ModalProvider>
          </HtmlDivWithRef>
        </HtmlDiv>
      </div>
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
