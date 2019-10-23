import React, { Component } from 'react';
import { HtmlButton } from '../../reset';
import { ToggleProps, baseClassName, ToggleState } from './Toggle';

export class ToggleButton extends Component<ToggleProps> {
  state: ToggleState = {
    toggleState: !!this.props.checked || !!this.props.defaultChecked || false,
  };

  handleClick = () => {
    const { checked, onClick } = this.props;
    const { toggleState } = this.state;
    if (checked === undefined) {
      this.setState({ toggleState: !toggleState });
    }
    if (!!onClick) {
      onClick({ toggleState: !toggleState });
    }
  };

  render() {
    const {
      disabled = false,
      children,
      checked: dissMissChecked,
      defaultChecked: dissMissDefaultChecked,
      onClick: dissMissOnClick,
      ...passProps
    } = this.props;
    const { toggleState } = this.state;
    const toggleButtonClassName = `${baseClassName}_button`;

    return (
      <HtmlButton
        className={toggleButtonClassName}
        {...passProps}
        aria-disabled={disabled}
        tabIndex={0}
        onClick={this.handleClick}
        checked={!!toggleState}
        aria-pressed={!!toggleState}
      >
        {children}
      </HtmlButton>
    );
  }
}
