import React, {
  Component,
  ReactNode,
  forwardRef,
  MouseEvent,
  KeyboardEvent,
  RefObject,
  createRef,
} from 'react';
import classnames from 'classnames';
import { TooltipContent } from './TooltipContent/TooltipContent';
import { TooltipButton } from './TooltipButton/TooltipButton';
import { forkRefs } from '../../utils/common';

const baseClassName = 'fi-tooltip';

export interface TooltipProps {
  /** Tooltip content */
  children: ReactNode;
  /** Toggle button label for screen readers */
  ariaToggleButtonLabelText: string;
  /** Close button label for screen readers */
  ariaCloseButtonLabelText: string;
  /** Controlled tooltip open state */
  open?: boolean;
  /** ClassName for toggle button */
  toggleButtonClassName?: string;
  /** Classname for tooltip content */
  contentClassName?: string | undefined;
  /**
   * Anchor element for listening to resize events.
   * Used for triggering tooltip content arrow indicator reposition.
   * Should preferably be the first resizable parent container, unless there is none before document body.
   * NOTE: Does not work with inline elements as those do not support resize events.
   */
  anchorElement?: HTMLElement | null;
  /** Event handler for toggle button click */
  onToggleButtonClick?: (event: MouseEvent | KeyboardEvent) => void;
  /** Event handler for close button click */
  onCloseButtonClick?: (event: MouseEvent | KeyboardEvent) => void;
}

interface InnerRef {
  forwardedRef: React.RefObject<HTMLButtonElement>;
}

type TooltipState = {
  open: boolean;
  contentArrowOffsetPx: number;
  anchorElement: HTMLElement | null;
  anchorRefObserver: ResizeObserver | null;
};

class BaseTooltip extends Component<
  TooltipProps & InnerRef & { className?: string }
> {
  state: TooltipState = {
    open: false,
    contentArrowOffsetPx: 0,
    anchorElement: null,
    anchorRefObserver: null,
  };

  private toggleButtonRef: RefObject<HTMLButtonElement>;

  private contentRef: RefObject<HTMLDivElement>;

  constructor(props: TooltipProps & InnerRef) {
    super(props);
    this.toggleButtonRef = createRef();
    this.contentRef = createRef();
  }

  private calculateContentArrowOffset = () => {
    if (
      !!this.toggleButtonRef &&
      this.toggleButtonRef.current &&
      !!this.contentRef &&
      !!this.contentRef.current
    ) {
      /**
       * Prevent content arrow posisition outside the tooltip content box
       * The arrow is 16 px wide and has a shadow => max pos is 17px less
       */
      const pos =
        this.toggleButtonRef.current.getBoundingClientRect().left -
        this.contentRef.current.getBoundingClientRect().left;
      const max = this.contentRef.current.getBoundingClientRect().width - 17;
      return Math.min(pos, max);
    }
    return 0;
  };

  private setContentArrowOffset = () => {
    this.setState({ contentArrowOffsetPx: this.calculateContentArrowOffset() });
  };

  componentDidMount() {
    window.addEventListener('resize', this.setContentArrowOffset);
    const anchorRefObserver = new ResizeObserver(() => {
      this.setContentArrowOffset();
    });
    this.setState({ anchorRefObserver });
  }

  componentDidUpdate() {
    if (this.props.anchorElement !== this.state.anchorElement) {
      if (!!this.state.anchorRefObserver) {
        if (!!this.state.anchorElement) {
          this.state.anchorRefObserver.unobserve(this.state.anchorElement);
        }
        if (!!this.props.anchorElement) {
          this.state.anchorRefObserver.observe(this.props.anchorElement);
        }
      }
      this.setState({ anchorElement: this.props.anchorElement });
      this.setContentArrowOffset();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setContentArrowOffset);
    if (!!this.state.anchorRefObserver) {
      this.state.anchorRefObserver.disconnect();
    }
  }

  private handleToggleClick = (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (!!this.props.onToggleButtonClick) {
      this.props.onToggleButtonClick(event);
    }
    if (!('open' in this.props)) {
      this.setState((prevState: TooltipState) => ({ open: !prevState.open }));
    }
  };

  private handleCloseClick = (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (!!this.props.onCloseButtonClick) {
      this.props.onCloseButtonClick(event);
    }
    if (!('open' in this.props)) {
      this.setState({ open: false });
    }
    if (!!this.toggleButtonRef.current) {
      this.toggleButtonRef.current.focus();
    }
  };

  render() {
    const {
      open: propsOpen,
      children,
      ariaToggleButtonLabelText,
      ariaCloseButtonLabelText,
      toggleButtonClassName,
      contentClassName,
      forwardedRef,
    } = this.props;

    const open = 'open' in this.props ? propsOpen : this.state.open;

    return (
      <>
        <TooltipButton
          className={classnames(baseClassName, toggleButtonClassName)}
          ref={forkRefs(this.toggleButtonRef, forwardedRef)}
          aria-label={ariaToggleButtonLabelText}
          aria-expanded={open}
          onClick={this.handleToggleClick}
        />
        {!!open && (
          <TooltipContent
            arrowOffsetPx={this.state.contentArrowOffsetPx}
            ref={this.contentRef}
            className={contentClassName}
            onCloseButtonClick={this.handleCloseClick}
            ariaCloseButtonLabelText={ariaCloseButtonLabelText}
          >
            {children}
          </TooltipContent>
        )}
      </>
    );
  }
}

export const Tooltip = forwardRef(
  (props: TooltipProps, ref: React.RefObject<HTMLButtonElement>) => {
    const { ...passProps } = props;
    return <BaseTooltip forwardedRef={ref} {...passProps} />;
  },
);
