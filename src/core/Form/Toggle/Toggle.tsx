import React, { Component } from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { defaultPropsTheme } from '../../utils';
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
import toggleSvg from './toggle.svg';

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
const svgBaseClassName = `${baseClassName}-icon-svg`;

const StyledToggle = styled(({ theme, className, ...props }: ToggleProps) => (
  <CompToggle
    {...props}
    className={classnames(className, {
      [`${baseClassName}--disabled`]: !!props.disabled,
    })}
  />
))`
  label: ${baseClassName};
  ${props => baseStyles(props)}
`;

const StyledInput = styled(({ theme, ...props }: ToggleInputProps) => (
  <ToggleInput {...props} />
))`
  label: ${inputBaseClassName};
  ${props => inputBaseStyles(props)}
`;

const StyledIcon = styled(
  ({ theme, className, disabled, checked, ...props }: ToggleIconProps) => (
    <Icon
      {...props}
      src={toggleSvg}
      className={classnames(className, {
        [`${iconBaseClassName}--disabled`]: !!disabled,
        [`${iconBaseClassName}--checked`]: !!checked,
      })}
    />
  ),
)`
  label: ${iconBaseClassName};
  ${props => iconBaseStyles(props)}
`;

/**
 * Use for toggling form selection or application state
 */
export class Toggle extends Component<ToggleProps> {
  static defaultProps = defaultPropsTheme(CompToggle);

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
    } = this.props;
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
        <StyledIcon
          {...iconProps}
          pointer={true}
          svgClassName={svgBaseClassName}
        />
        {children}
      </StyledToggle>
    );
  }
}

export { ToggleInput };
