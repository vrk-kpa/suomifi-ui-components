import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { withDefaultTheme } from '../../theme/utils';
import { ThemeComponent } from '../../theme';
import { baseStyles } from './Toggle.baseStyles';
import {
  Toggle as CompToggle,
  ToggleProps as CompToggleProps,
  ToggleInput,
  ToggleInputProps as CompToggleInputProps,
} from '../../../components/Form/Toggle';
import { Icon } from '../../Icon/Icon';

export interface ToggleProps extends CompToggleProps, ThemeComponent {}
export interface ToggleInputProps
  extends CompToggleInputProps,
    ThemeComponent {}

const iconBaseClassName = 'fi-toggle_icon';
const iconDisabledClassName = `${iconBaseClassName}--disabled`;
const iconCheckedClassName = `${iconBaseClassName}--checked`;

const StyledToggle = styled(({ theme, ...passProps }: ToggleProps) => (
  <CompToggle {...passProps} />
))`
  ${props => baseStyles(props)}
`;

/**
 * <i class="semantics" />
 * Use for toggling form selection or application state
 */
export class Toggle extends Component<ToggleProps> {
  state = { toggleStatus: !!this.props.checked };

  handleToggle = () => {
    const { onClick } = this.props;
    const { toggleStatus } = this.state;
    this.setState({ toggleStatus: !toggleStatus });
    if (!!onClick) {
      onClick({ toggleState: !toggleStatus });
    }
  };

  render() {
    const {
      children,
      disabled = false,
      checked: dissMissChecked,
      onClick,
      ...passProps
    } = withDefaultTheme(this.props);
    const { toggleStatus } = this.state;

    return (
      <StyledToggle {...passProps} onClick={this.handleToggle}>
        <Icon
          icon="toggle"
          className={classnames(iconBaseClassName, {
            [iconDisabledClassName]: !!disabled,
            [iconCheckedClassName]: !!toggleStatus,
          })}
          mousePointer={true}
        />
        {children}
      </StyledToggle>
    );
  }
}

export { ToggleInput };
