import React, { Component, ReactNode, createRef, ReactElement } from 'react';
import { styled } from 'styled-components';
import { getLogger } from '../../../utils/log';
import { default as ReactModal } from 'react-modal';
import classnames from 'classnames';
import { baseStyles } from './Modal.baseStyles';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { ModalFooterProps } from '../ModalFooter/ModalFooter';
import { ModalContentProps } from '../ModalContent/ModalContent';

export type ModalVariant = 'smallScreen' | 'default';

export interface ModalProps {
  /** Shows or hides the modal */
  visible: boolean;
  /** Application root element id for setting aria-hidden appropriately.
   * Setting this ensures everything else except the modal is hidden from screen readers when the modal is open */
  appElementId: string;
  /** CSS class for custom styles */
  className?: string;
  /** Inline CSS styles for the modal */
  style?: React.CSSProperties;
  /** Use `<ModalContent>` and `<ModalFooter>` as children */
  children: ReactElement<ModalContentProps | ModalFooterProps> | ReactNode;
  /**
   * `'smallScreen'` | `'default'`
   *
   * Variant. Use smallScreen for mobile and small displays
   * @default 'default'
   */
  variant?: ModalVariant;
  /**
   * Shows vertical scroll bar if needed and shows a horizontal divider between content and footer.
   * @default true
   */
  scrollable?: boolean;
  /** Ref for a focusable element inside the modal. Focused when the modal is opened. If not provided, modal title is focused. */
  focusOnOpenRef?: React.RefObject<any>;
  /** Ref for a focusable element outside the modal. Focused when the modal is opened.
   * If not provided, previously focused element will regain focus.
   */
  focusOnCloseRef?: React.RefObject<any>;
  /** Callback fired on esc key press, i.e. closing modal */
  onEscKeyDown?: () => void;
  /**
   * Id of the element that labels the modal. Most likely the `ModalTitle`.
   */
  ariaLabelledBy?: string;
}

interface InternalModalProps extends ModalProps, SuomifiThemeProp {
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

const { Provider: ModalProvider, Consumer: ModalConsumer } =
  React.createContext(defaultProviderValue);

export const baseClassName = 'fi-modal';
const modalClassNames = {
  smallScreen: `${baseClassName}--small-screen`,
  noScroll: `${baseClassName}--no-scroll`,
  overlay: `${baseClassName}_overlay`,
  base: `${baseClassName}_base`,
  contentContainer: `${baseClassName}_content-container`,
};
class BaseModal extends Component<InternalModalProps> {
  state = { bodyScrollDisabled: false, scrollTop: 0, scrollLeft: 0 };

  private titleRef = createRef<HTMLHeadElement>();

  constructor(props: InternalModalProps) {
    super(props);
    if (props.appElementId) {
      ReactModal.setAppElement(`#${props.appElementId}`);
    }
  }

  /**
   * Disable body scrolling and persist scroll position.
   * JS-based solution is required due to iOS Safari scroll chaining behaviour.
   */
  toggleBodyScroll = () => {
    if (!!document && !!document.body && !!document.scrollingElement) {
      if (
        this.state.bodyScrollDisabled === true &&
        document.body.hasAttribute('data-fi-modal')
      ) {
        document.body.style.position = 'static';
        document.body.style.overflow = 'auto';
        document.scrollingElement.scrollTop = this.state.scrollTop;
        document.scrollingElement.scrollLeft = this.state.scrollLeft;
        document.body.removeAttribute('data-fi-modal');
        this.setState({ bodyScrollDisabled: false });
      } else if (!document.body.hasAttribute('data-fi-modal')) {
        document.body.setAttribute('data-fi-modal', '');
        const newState = {
          bodyScrollDisabled: true,
          scrollTop: document.scrollingElement?.scrollTop,
          scrollLeft: document.scrollingElement?.scrollLeft,
        };
        this.setState(newState);
        document.body.style.position =
          this.props.variant === 'smallScreen' ? 'fixed' : 'sticky';
        document.body.style.overflow = 'hidden';
        if (!!newState.scrollTop && !!newState.scrollLeft) {
          document.scrollingElement.scrollTop = newState.scrollTop;
          document.scrollingElement.scrollLeft = newState.scrollLeft;
        }
      }
    }
  };

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
      ariaLabelledBy,
    } = this.props;

    if (!appElementId) {
      getLogger().error(`Invalid or missing appElementId.`);
    }

    return (
      <ReactModal
        portalClassName={classnames(className, modalClassNames.base)}
        overlayClassName={classnames(modalClassNames.overlay)}
        className={classnames(propClassName, baseClassName, {
          [modalClassNames.smallScreen]: variant === 'smallScreen',
          [modalClassNames.noScroll]: scrollable === false,
        })}
        ariaHideApp={!!appElementId}
        aria={{ modal: false, labelledby: ariaLabelledBy }}
        isOpen={visible}
        onAfterOpen={() => {
          this.toggleBodyScroll();
          if (!!focusOnOpenRef && !!focusOnOpenRef.current) {
            focusOnOpenRef.current.focus();
          } else if (!!this.titleRef && !!this.titleRef.current) {
            this.titleRef.current.focus();
          }
        }}
        onAfterClose={() => {
          this.toggleBodyScroll();
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
  ${({ theme }) => baseStyles(theme)}
`;

const Modal = (props: ModalProps) => {
  const { className: propClassName, ...passProps } = props;
  return (
    <SuomifiThemeConsumer>
      {({ suomifiTheme }) => (
        <StyledModal
          theme={suomifiTheme}
          propClassName={propClassName}
          {...passProps}
        />
      )}
    </SuomifiThemeConsumer>
  );
};

Modal.displayName = 'Modal';

export { Modal, ModalProvider, ModalConsumer };
