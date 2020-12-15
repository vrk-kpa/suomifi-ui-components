import { Component } from 'react';

export type DebounceProps<T> = T & {
  waitFor: number | undefined;
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
    }, waitFor);
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
    // casted to any due to https://github.com/Microsoft/TypeScript/issues/10727
    const { children } = this.props as any;
    if (!!children) {
      return children(this.debouncer, this.cancelDebounce);
    }
    return null;
  }
}
