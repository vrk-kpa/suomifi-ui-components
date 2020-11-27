import React from 'react';

export type DebounceProps<T> = T & {
  waitFor: number;
  children(attr: T): React.ReactChild | Array<React.ReactChild> | null;
};

export class Debounce<T extends Object> extends React.PureComponent<
  DebounceProps<T>,
  T
> {
  timeout: ReturnType<typeof setTimeout> | null = null;

  componentDidUpdate() {
    // casted to any due to https://github.com/Microsoft/TypeScript/issues/10727
    const { children, waitFor, ...propsToDebounce } = this.props as any;

    this.clearTimeout();

    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.setState(propsToDebounce);
      const { debouncedCallback } = propsToDebounce;
      debouncedCallback();
    }, waitFor);
  }

  componentWillUnmount() {
    this.clearTimeout();
  }

  clearTimeout() {
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  render() {
    // casted to any due to https://github.com/Microsoft/TypeScript/issues/10727
    const { children, waitFor, ...propsToDebounce } = this.props as any;
    return children(this.state || (propsToDebounce as T));
  }
}
