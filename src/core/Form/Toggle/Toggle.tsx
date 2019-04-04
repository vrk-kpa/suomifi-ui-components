import React, { Component } from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { withDefaultTheme } from '../../theme/utils/defaultTheme';
import { ThemeComponent } from '../../theme';
import {
  baseStyles,
  inputBaseStyles,
  iconBaseStyles,
} from './Toggle.baseStyles';
import {
  Toggle as CompToggle,
  ToggleProps as CompToggleProps,
  ToggleInput,
  ToggleInputProps as CompToggleInputProps,
} from '../../../components/Form/Toggle';
import { Icon, IconProps } from '../../Icon/Icon';

export interface ToggleProps extends CompToggleProps, ThemeComponent {}
export interface ToggleInputProps
  extends CompToggleInputProps,
    ThemeComponent {}
interface ToggleIconProps extends IconProps, ThemeComponent {
  disabled: boolean;
  checked: boolean;
}

const baseClassName = 'fi-toggle';
const inputBaseClassName = `${baseClassName}-input`;
const iconBaseClassName = `${baseClassName}-icon`;

const StyledToggle = styled(
  ({ theme, className, ...passProps }: ToggleProps) => (
    <CompToggle
      {...passProps}
      className={classnames(className, {
        [`${baseClassName}--disabled`]: !!passProps.disabled,
      })}
    />
  ),
)`
  ${props => baseStyles(props)}
`;

const StyledInput = styled(({ theme, ...passProps }: ToggleInputProps) => (
  <ToggleInput {...passProps} className={inputBaseClassName} />
))`
  ${props => inputBaseStyles(props)}
`;

const StyledIcon = styled(
  ({ theme, className, disabled, checked, ...passProps }: ToggleIconProps) => (
    <Icon
      {...passProps}
      icon="toggle"
      className={classnames(className, {
        [`${iconBaseClassName}--disabled`]: !!disabled,
        [`${iconBaseClassName}--checked`]: !!checked,
      })}
    />
  ),
)`
  ${props => iconBaseStyles(props)}
`;

/**
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
    const iconProps = {
      disabled,
      checked: toggleStatus,
      theme: passProps.theme,
    };
    return (
      <StyledToggle
        {...passProps}
        toggleInputComponent={<StyledInput theme={passProps.theme} />}
        onClick={this.handleToggle}
      >
        <StyledIcon {...iconProps} mousePointer={true} />
        {children}
      </StyledToggle>
    );
  }
}

export { ToggleInput };
