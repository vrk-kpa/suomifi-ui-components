import React, { Component, MouseEvent, ReactNode } from 'react';
import { HtmlButton } from '../../reset';

type ButtonType = 'default' | 'primary' | 'secondary';
export interface IButtonProps {
  /** Custom classname to append to button */
  className?: string;
  disabled?: boolean;
  /** Event handler to execute when clicked
   *  @default void
   */
  onClick?: (event: MouseEvent) => void;
  /** data-testid attribute
   *  @default button
   */
  testId?: string;
  type?: ButtonType;
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
