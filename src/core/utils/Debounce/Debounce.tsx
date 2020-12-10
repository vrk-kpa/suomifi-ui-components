import { Component } from 'react';

export type DebounceProps<T> = T & {
  waitFor: number;
};
export class Debounce<T extends Object> extends Component<DebounceProps<T>> {
  state: { timeout: ReturnType<typeof setTimeout> | null } = {
    timeout: null,
  };

  componentWillUnmount() {
    this.clearTimeout();
  }

  debouncer = (callback: Function, value?: T) => {
    if (!callback) {
      return;
    }

    if (this.props.waitFor === 0) {
      callback(value);
      return;
    }

    this.clearTimeout();
    const { waitFor } = this.props;
    this.setState({
      timeout: setTimeout(() => {
        callback(value);
      }, waitFor),
    });
  };

  cancelDebounce = () => {
    this.clearTimeout();
  };

  clearTimeout() {
    if (this.state.timeout !== null) {
      clearTimeout(this.state.timeout);
      this.setState({ timeout: null });
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
