import React, { Component, ReactNode } from 'react';

export interface ButtonProps {
  children?: ReactNode;
}

export default class Button extends Component<ButtonProps> {
  render() {
    const { children } = this.props;
    // DUMMY TEST Button-component
    // TODO: Replace with real component
    return <button data-testid="button">{children}</button>;
  }
}
