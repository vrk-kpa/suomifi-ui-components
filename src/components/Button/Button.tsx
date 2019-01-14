import React, { Component, MouseEvent, ReactNode } from 'react';
import HtmlButton from '../../reset/HtmlButton';

export interface IButtonProps {
  /** Custom classname to extend or customize */
  className?: string;
  /** Disable Button usage */
  disabled?: boolean;
  /** Event handler to execute when clicked
   *  @default void
   */
  onClick?: (event: MouseEvent) => void;
  /**
   * Button element content
   */
  children?: ReactNode;
}

export default class Button extends Component<IButtonProps> {
  static defaultProps = {
    disabled: false,
  };

  render() {
    return <HtmlButton {...this.props} />;
  }
}
