import React, { Component, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { default as styled } from 'styled-components';
import { createFocusTrap, FocusTrap } from 'focus-trap';
import classnames from 'classnames';
import './Modal.globals.scss';
import { HtmlDiv, HtmlDivProps, HtmlSpan } from '../../reset';
import { AutoId } from '../../utils/AutoId';
import { windowAvailable } from '../../utils/common';
import { VisuallyHidden } from '../../components/Visually-hidden/Visually-hidden';
import { Button, ButtonProps } from '../Button/Button';
import { baseStyles } from './Modal.baseStyles';
import { Heading } from '../Heading/Heading';

export interface ModalProps
  extends Omit<HtmlDivProps, 'children' | 'className' | 'title' | 'ref'> {
  /** Show or hide the modal */
  visible: boolean;
  /** Modal container div class name for custom styling. */
  className?: string;
  /** Title content */
  title: ReactNode;
  /** Children */
  children: ReactNode;
  /**
   * Show vertical scroll bar if needed and show horizontal divider before buttons.
   * @default true
   */
  scrollable?: boolean;
  /**
   * Variant. Use smallScreen for mobile and small displays
   * @default 'default'
   */
  variant?: 'smallScreen' | 'default';
  /**
   * Use portal instead of injecting content inside the Modal component
   * @default true
   * Portal is never used when rendering on server or modal mount node is not available.
   */
  usePortal?: boolean;
  /** Focusable emenent ref when modal is opened, if not provided, first focusable element is focused */
  focusOnOpenRef?: React.RefObject<any>;
  /** Focusable element when dialog is closed, if not provided, browser default behaviour will occur (e.g. body gains focus) */
  focusOnCloseRef?: React.RefObject<any>;
  /** Primary button label */
  primaryButtonLabel: string;
  /** Primary button label for screen readers, if not provided, primaryButtonLabel will be used */
  ariaPrimaryButtonLabel?: string;
  /** Primary button props */
  primaryButtonProps?: ButtonProps;
  /** Secondary button label, if not provided, no button will be shown */
  secondaryButtonLabel?: string;
  /** Secondary button label for screen readers, if not provided, primaryButtonLabel will be used */
  ariaSecondaryButtonLabel?: string;
  /** Secondary button props */
  secondaryButtonProps?: ButtonProps;
  /** Callback for handling esc key press, e.g. close modal */
  onEscKeyDown?: () => void;
}

const baseClassName = 'fi-modal';
const modalClassNames = {
  noPortal: `${baseClassName}--no-portal`,
  smallScreen: `${baseClassName}--small-screen`,
  overlay: `${baseClassName}_overlay`,
  contentContainer: `${baseClassName}_content-container`,
  content: `${baseClassName}_content`,
  noScroll: `${baseClassName}_content--no-scroll`,
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

  render() {
    const {
      visible,
      id,
      className,
      title,
      children,
      scrollable,
      variant,
      usePortal = true,
      focusOnOpenRef,
      focusOnCloseRef = null,
      primaryButtonLabel,
      ariaPrimaryButtonLabel,
      primaryButtonProps,
      secondaryButtonLabel,
      ariaSecondaryButtonLabel,
      secondaryButtonProps,
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
          [modalClassNames.noPortal]: usePortal === false,
        })}
      >
        <HtmlDiv className={modalClassNames.overlay}>
          <HtmlDiv className={modalClassNames.contentContainer} {...passProps}>
            <HtmlDiv
              className={classnames(modalClassNames.content, {
                [modalClassNames.noScroll]: scrollable === false,
              })}
            >
              <Heading
                className={modalClassNames.heading}
                id={titleId}
                variant="h3"
                as={'h2'}
              >
                {title}
              </Heading>
              {children}
            </HtmlDiv>
            <HtmlDiv className={modalClassNames.footer}>
              <Button
                {...primaryButtonProps}
                className={classnames(
                  modalClassNames.button,
                  primaryButtonProps?.className,
                )}
              >
                <HtmlSpan aria-hidden={!!ariaPrimaryButtonLabel}>
                  {primaryButtonLabel}
                </HtmlSpan>
                {!!ariaPrimaryButtonLabel && (
                  <VisuallyHidden>{ariaPrimaryButtonLabel}</VisuallyHidden>
                )}
              </Button>
              {!!secondaryButtonLabel && (
                <Button
                  variant="secondary"
                  {...secondaryButtonProps}
                  className={classnames(
                    modalClassNames.button,
                    secondaryButtonProps?.className,
                  )}
                >
                  <HtmlSpan aria-hidden={!!ariaSecondaryButtonLabel}>
                    {secondaryButtonLabel}
                  </HtmlSpan>
                  {!!ariaSecondaryButtonLabel && (
                    <VisuallyHidden>{ariaSecondaryButtonLabel}</VisuallyHidden>
                  )}
                </Button>
              )}
            </HtmlDiv>
          </HtmlDiv>
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
