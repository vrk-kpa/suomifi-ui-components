import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { withSuomifiDefaultProps } from '../../theme/utils';
import { TokensProp, InternalTokensProp } from '../../theme';
import { baseStyles } from './Toggle.baseStyles';
import {
  Toggle as CompToggle,
  ToggleProps as CompToggleProps,
  ToggleInput,
  ToggleInputProps as CompToggleInputProps,
} from '../../../components/Form/Toggle';
import { ComponentIcon } from '../../StaticIcon/StaticIcon';
import { Text } from '../../Text/Text';
import { HtmlSpan } from '../../../reset';

export interface ToggleProps extends CompToggleProps, TokensProp {}
export interface ToggleInputProps extends CompToggleInputProps, TokensProp {}

const iconBaseClassName = 'fi-toggle_icon';
const iconContainerClassName = 'fi-toggle_icon-container';
const iconDisabledClassName = `${iconBaseClassName}--disabled`;
const iconCheckedClassName = `${iconBaseClassName}--checked`;

const StyledToggle = styled(
  ({ tokens, ...passProps }: ToggleProps & InternalTokensProp) => (
    <CompToggle {...passProps} />
  ),
)`
  ${(props) => baseStyles(props)}
`;

/**
 * <i class="semantics" />
 * Use for toggling form selection or application state
 */
class ToggleWithIcon extends Component<ToggleProps> {
  state = { toggleStatus: !!this.props.checked || !!this.props.defaultChecked };

  static getDerivedStateFromProps(
    nextProps: ToggleProps,
    prevState: { toggleStatus: boolean },
  ) {
    const { checked } = nextProps;
    if (checked !== undefined && checked !== prevState.toggleStatus) {
      return { toggleStatus: checked };
    }
    return null;
  }

  handleToggle = () => {
    const { onClick, checked } = this.props;
    const { toggleStatus } = this.state;
    if (checked === undefined) {
      this.setState({ toggleStatus: !toggleStatus });
    }
    if (!!onClick) {
      onClick({ toggleState: !toggleStatus });
    }
  };

  render() {
    const {
      children,
      disabled = false,
      onClick,
      ...passProps
    } = withSuomifiDefaultProps(this.props);
    const { toggleStatus } = this.state;

    return (
      <StyledToggle
        disabled={disabled}
        {...passProps}
        onClick={this.handleToggle}
      >
        <HtmlSpan className={iconContainerClassName}>
          <ComponentIcon
            icon="toggle"
            className={classnames(iconBaseClassName, {
              [iconDisabledClassName]: !!disabled,
              [iconCheckedClassName]: !!toggleStatus,
            })}
          />
        </HtmlSpan>
        <Text color={!!disabled ? 'depthBase' : 'blackBase'}>{children}</Text>
      </StyledToggle>
    );
  }
}

export class Toggle extends Component<ToggleProps> {
  static withInput = (props: ToggleProps) => {
    return (
      <ToggleWithIcon {...withSuomifiDefaultProps(props)} variant="withInput" />
    );
  };

  render() {
    return <ToggleWithIcon {...withSuomifiDefaultProps(this.props)} />;
  }
}

export { ToggleInput };
