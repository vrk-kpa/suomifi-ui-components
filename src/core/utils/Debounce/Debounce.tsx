import { Component } from 'react';
export type DebounceProps<T> = T & {
  waitFor: number;
};
export class Debounce<T extends Object> extends Component<DebounceProps<T>> {
  state: { timeout: ReturnType<typeof setTimeout> | null; waitFor: number } = {
    timeout: null,
    waitFor: 0,
  };

  componentDidUpdate() {
    if (this.props.waitFor !== this.state.waitFor) {
      this.setState({ waitFor: this.props.waitFor });
    }
  }

  componentWillUnmount() {
    this.clearTimeout();
  }

  debouncer = (callback: Function, value: T) => {
    this.clearTimeout();
    const { waitFor } = this.state;
    this.setState({
      timeout: setTimeout(() => {
        callback(value);
      }, waitFor),
    });
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
    return children(this.debouncer);
  }
}
