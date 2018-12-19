import React, { Component, MouseEvent, ReactNode } from 'react';
import HtmlButton from '../../reset/HtmlButton';

type ButtonType = 'default' | 'primary' | 'secondary';
export interface IButtonProps {
  /** Custom classname to extend or customize */
  className?: string;
  /** Disable Button usage */
  disabled?: boolean;
  /** Event handler to execute when clicked
   *  @default void
   */
  onClick?: (event: MouseEvent) => void;
  /** data-testid attribute
   *  @default button
   */
  testId?: string;
  /**
   * Button type
   * @default default
   */
  type?: ButtonType;
  /**
   * Button element content
   */
  children?: ReactNode;
}

export default class Button extends Component<IButtonProps> {
  static defaultProps = {
    disabled: false,
    testId: 'button',
    type: 'default',
  };

  render() {
    const { testId, ...passProps } = this.props;
    return <HtmlButton {...passProps} data-testid={testId} />;
  }
}
