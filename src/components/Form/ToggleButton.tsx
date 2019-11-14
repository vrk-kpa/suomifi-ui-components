import React, { Component } from 'react';
import classnames from 'classnames';
import { HtmlButton } from '../../reset';
import { ToggleProps, ToggleState } from './Toggle';
import { logger } from '../../utils/logger';
import styled from 'styled-components';
import { disabledCursor } from '../utils/css';

const baseClassName = 'fi-toggle';
const toggleDisabledClassName = `${baseClassName}--disabled`;

const StyledHtmlButton = styled(HtmlButton)`
  &.${toggleDisabledClassName} {
    ${disabledCursor}
  }
`;

export class ToggleButton extends Component<ToggleProps> {
  state: ToggleState = {
    toggleState: !!this.props.checked || !!this.props.defaultChecked || false,
  };

  componentWillReceiveProps(nextProps: ToggleProps) {
    const { checked } = nextProps;
    if (!!checked) {
      this.setState({ toggleState: !!checked });
    }
  }

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
      className,
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
    const toggleClassName = `${baseClassName}--with-button`;

    if (!!toggleInputProps || !!toggleInputComponent) {
      logger.error(
        `ToggleButton does not utilize 'toggleInputProps' and 'toggleInputComponent' props.`,
      );
    }

    return (
      <StyledHtmlButton
        className={classnames(toggleClassName, className, baseClassName, {
          [toggleDisabledClassName]: !!disabled,
        })}
        aria-disabled={disabled}
        disabled={disabled}
        tabIndex={0}
        onClick={this.handleClick}
        aria-pressed={!!toggleState}
        {...passProps}
      >
        {children}
      </StyledHtmlButton>
    );
  }
}
