import React from 'react';
import { AriaLiveMode } from '../../types';
import { VisuallyHidden } from '../../../VisuallyHidden/VisuallyHidden';

const debounce = (func: Function, waitFor: number) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return function anonymous(...args: any[]): void {
    const later = function anononymous(): void {
      timeoutId = null;
      func.apply(this, args);
    };
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    timeoutId = setTimeout(later, waitFor);
    if (!timeoutId) {
      func.apply(this, args);
    }
  };
};

export interface AriaAnnounceTextProps {
  id: string;
  announceText: string;
  ariaLiveMode?: AriaLiveMode;
  waitFor?: number;
}

interface AriaAnnounceTextState {
  debounced: boolean;
  toggle: boolean;
  announceText: string;
}

export class AriaAnnounceText extends React.Component<AriaAnnounceTextProps> {
  private debounceStatusUpdate: () => void;

  state: AriaAnnounceTextState = {
    debounced: false,
    toggle: false,
    announceText: '',
  };

  componentDidMount() {
    this.debounceStatusUpdate = debounce(
      () => {
        if (!this.state.debounced) {
          this.setState((prevState: AriaAnnounceTextState) => ({
            debounced: true,
            toggle: !prevState.toggle,
          }));
        }
      },
      this.props.waitFor ? this.props.waitFor : 1000,
    );
  }

  static getDerivedStateFromProps(
    nextProps: AriaAnnounceTextProps,
    prevState: AriaAnnounceTextState,
  ) {
    if (nextProps.announceText !== prevState.announceText) {
      return { debounced: false, announceText: nextProps.announceText };
    }
    return null;
  }

  render() {
    const { id, announceText, ariaLiveMode = 'polite' } = this.props;
    const { debounced, toggle } = this.state;
    if (this.debounceStatusUpdate) {
      this.debounceStatusUpdate();
    }
    return (
      <VisuallyHidden
        aria-live={ariaLiveMode}
        aria-atomic="true"
        id={id}
        key={`${toggle}`}
      >
        {debounced ? announceText : ''}
      </VisuallyHidden>
    );
  }
}
