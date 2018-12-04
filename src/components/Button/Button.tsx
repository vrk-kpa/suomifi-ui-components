import React, { Component, MouseEvent, ReactNode } from 'react';
import PropTypes from 'prop-types';

export interface IButtonProps {
  /** Custom class name to append to button */
  className?: string;
  /** Event handler to execute when clicked
   *  @default void
   */
  onClick?: (event: MouseEvent) => void;
  /** data-testid
   *  @default test
   */
  testId?: string;
  children?: ReactNode;
}

export default class Button extends Component<IButtonProps> {
  static defaultProps = {
    testId: 'button',
  };

  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    testId: PropTypes.string,
  };

  render() {
    const { testId, children, ...passProps } = this.props;
    return (
      <button {...passProps} data-testid={testId}>
        {children}
      </button>
    );
  }
}
