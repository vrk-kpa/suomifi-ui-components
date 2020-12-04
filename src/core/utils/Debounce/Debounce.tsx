import React from 'react';

export type DebounceProps<T> = T & {
  waitFor: number;
};

export class Debounce<T extends Object> extends React.PureComponent<
  DebounceProps<T>,
  T
> {
  timeout: ReturnType<typeof setTimeout> | null = null;

  waitFor: number;

  constructor(props: DebounceProps<T>) {
    super(props);
    this.waitFor = props.waitFor;
    console.log(`hello from constructor. Waitfor value is ${this.waitFor}`);
  }

  componentDidUpdate() {
    // casted to any due to https://github.com/Microsoft/TypeScript/issues/10727

    this.clearTimeout();
    this.waitFor = this.props.waitFor;
  }

  componentWillUnmount() {
    this.clearTimeout();
  }

  debouncer = (callback: Function, value: any) => {
    this.clearTimeout();
    this.timeout = setTimeout(callback(value), this.waitFor);
    console.log(
      `hello from debouncer func. Waitfor value is ${this.waitFor}, callBack is ${callback} and value is ${value}`,
    );
  };

  clearTimeout() {
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  render() {
    // casted to any due to https://github.com/Microsoft/TypeScript/issues/10727
    const { children } = this.props as any;
    return children(this.debouncer);
  }
}
