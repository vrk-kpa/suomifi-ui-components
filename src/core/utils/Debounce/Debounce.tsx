import { Component } from 'react';

export type DebounceProps<T> = T & {
  waitFor?: number;
  children?: (debouncer: Function, cancelDebounce: Function) => JSX.Element;
};
export class Debounce<T extends Object> extends Component<DebounceProps<T>> {
  timeout: ReturnType<typeof setTimeout> | null = null;

  componentWillUnmount() {
    this.cancelTimeout();
  }

  debouncer = (callback: Function, value?: T) => {
    if (!callback) {
      return;
    }

    if (!this.props.waitFor) {
      callback(value);
      return;
    }

    this.cancelTimeout();
    const { waitFor } = this.props;
    this.timeout = setTimeout(() => {
      callback(value);
    }, waitFor) as any;
  };

  cancelDebounce = () => {
    this.cancelTimeout();
  };

  cancelTimeout() {
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  render() {
    const { children } = this.props;

    if (!!children) {
      return children(this.debouncer, this.cancelDebounce);
    }
    return null;
  }
}
