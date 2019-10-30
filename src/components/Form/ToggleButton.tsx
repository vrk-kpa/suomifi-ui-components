import React, { Component } from 'react';
import { HtmlButton } from '../../reset';
import { ToggleProps, baseClassName, ToggleState } from './Toggle';
import { logger } from '../../utils/logger';

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
      toggleInputProps,
      toggleInputComponent,
      ...passProps
    } = this.props;
    const { toggleState } = this.state;
    const toggleButtonClassName = `${baseClassName}_button`;

    if (!!toggleInputProps || !!toggleInputComponent) {
      logger.error(
        `ToggleButton does not utilize 'toggleInputProps' and 'toggleInputComponent' props.`,
      );
    }

    return (
      <HtmlButton
        className={toggleButtonClassName}
        aria-disabled={disabled}
        disabled={disabled}
        tabIndex={0}
        onClick={this.handleClick}
        aria-pressed={!!toggleState}
        {...passProps}
      >
        {children}
      </HtmlButton>
    );
  }
}
