import React, { Component, ReactNode, createRef } from 'react';
import { default as styled } from 'styled-components';
import { default as ReactModal } from 'react-modal';
import classnames from 'classnames';
import { ModalContent, ModalFooter } from '../';
/* Styles for disabling scrolling. See file for more info. */
import './Modal.globals.scss';
import { baseStyles } from './Modal.baseStyles';

export type ModalVariant = 'smallScreen' | 'default';

export interface ModalProps {
  /** Show or hide the modal */
  visible: boolean;
  /** Application root element id for setting aria-hidden when necessary */
  appElementId?: string;
  /** Modal container div classname for custom styling. */
  className?: string;
  /** Modal content wrapper styles */
  style?: React.CSSProperties;
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
  /** Focusable element ref when modal is opened. If not provided, modal title is focused. */
  focusOnOpenRef?: React.RefObject<any>;
  /** Focusable element ref when modal is closed. If not provided, previously focused element will regain focus. */
  focusOnCloseRef?: React.RefObject<any>;
  /** Callback for handling esc key press, e.g. close modal */
  onEscKeyDown?: () => void;
}

interface InternalModalProps extends ModalProps {
  /**
   * Used to capture user provided classname for use with BaseModal.
   * Passed on to the BaseModal inner element with fi-modal classname to allow custom styles.
   * className is internally reserved for BaseModal root element to allow styled component style injection.
   */
  propClassName?: string;
}

export interface ModalProviderState {
  titleRef: React.RefObject<HTMLHeadElement> | null;
  focusTitleOnOpen: boolean;
  variant: ModalVariant;
  scrollable: boolean;
}

const defaultProviderValue: ModalProviderState = {
  /** Focus title on open for resolving title tab index */
  focusTitleOnOpen: true,
  /** Modal title ref for focusing */
  titleRef: null,
  /** Modal's smallScreen setting */
  variant: 'default',
  /** If modal should have scrollable content and size */
  scrollable: true,
};

const {
  Provider: ModalProvider,
  Consumer: ModalConsumer,
} = React.createContext(defaultProviderValue);

export const baseClassName = 'fi-modal';
const modalClassNames = {
  disableBodyContent: `${baseClassName}--disable-body-content`,
  smallScreen: `${baseClassName}--small-screen`,
  noScroll: `${baseClassName}--no-scroll`,
  overlay: `${baseClassName}_overlay`,
  base: `${baseClassName}_base`,
  contentContainer: `${baseClassName}_content-container`,
};

class BaseModal extends Component<InternalModalProps> {
  private titleRef = createRef<HTMLHeadElement>();

  constructor(props: InternalModalProps) {
    super(props);
    if (props.appElementId) {
      ReactModal.setAppElement(`#${props.appElementId}`);
    }
  }

  render() {
    const {
      visible,
      style,
      appElementId,
      propClassName,
      className,
      children,
      variant = 'default',
      scrollable = true,
      focusOnOpenRef,
      focusOnCloseRef = null,
      onEscKeyDown,
    } = this.props;

    return (
      <ReactModal
        bodyOpenClassName={modalClassNames.disableBodyContent}
        portalClassName={classnames(className, modalClassNames.base)}
        overlayClassName={classnames(modalClassNames.overlay)}
        className={classnames(propClassName, baseClassName, {
          [modalClassNames.smallScreen]: variant === 'smallScreen',
          [modalClassNames.noScroll]: scrollable === false,
        })}
        ariaHideApp={!!appElementId}
        isOpen={visible}
        onAfterOpen={() => {
          if (!!focusOnOpenRef && !!focusOnOpenRef.current) {
            focusOnOpenRef.current.focus();
          } else if (!!this.titleRef && !!this.titleRef.current) {
            this.titleRef.current.focus();
          }
        }}
        onAfterClose={() => {
          if (!!focusOnCloseRef && !!focusOnCloseRef.current) {
            focusOnCloseRef.current.focus();
          }
        }}
        onRequestClose={() => {
          if (!!onEscKeyDown) onEscKeyDown();
        }}
        shouldFocusAfterRender={true}
        shouldReturnFocusAfterClose={!focusOnCloseRef}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={true}
        {...(!!style ? { style: { content: { ...style } } } : {})}
      >
        <ModalProvider
          value={{
            focusTitleOnOpen: !focusOnOpenRef,
            titleRef: this.titleRef,
            variant,
            scrollable,
          }}
        >
          {children}
        </ModalProvider>
      </ReactModal>
    );
  }
}

const StyledModal = styled(BaseModal)`
  ${baseStyles}
`;

/**
 * <i class="semantics" />
 * Use for showing modal content.
 * NOTE: Modal hides the application root node from screen readers using the provided appElementId.
 */
export class Modal extends Component<ModalProps> {
  render() {
    const { className: propClassName, ...passProps } = this.props;
    return <StyledModal propClassName={propClassName} {...passProps} />;
  }
}

export { ModalProvider, ModalConsumer };
