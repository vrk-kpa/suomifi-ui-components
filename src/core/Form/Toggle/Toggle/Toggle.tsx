import React, { Component, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { InternalTokensProp } from '../../../theme';
import { AutoId } from '../../../../utils/AutoId';
import { baseStyles } from './Toggle.baseStyles';
import { ComponentIcon } from '../../../StaticIcon/StaticIcon';
import { Text } from '../../../Text/Text';
import { HtmlLabel, HtmlSpan, HtmlInput, HtmlButton } from '../../../../reset';
import { disabledCursor } from '../../../../components/utils/css';

const baseClassName = 'fi-toggle';
const toggleDisabledClassName = `${baseClassName}--disabled`;
const toggleInputClassName = `${baseClassName}--input`;
const toggleButtonClassName = `${baseClassName}--button`;
const toggleInputElementClassName = `${baseClassName}_input-element`;
const toggleLabelClassName = `${baseClassName}_label`;
const iconBaseClassName = 'fi-toggle_icon';
const iconContainerClassName = 'fi-toggle_icon-container';
const iconDisabledClassName = `${iconBaseClassName}--disabled`;
const iconCheckedClassName = `${iconBaseClassName}--checked`;

export interface ToggleProps {
  /** Controlled toggle-state - if provided, component will update only when this is explicitly changed */
  checked?: boolean;
  /** Default status of toggle when not using controlled 'checked' state
   * @default false
   */
  defaultChecked?: boolean;
  /** Custom classname to extend or customize */
  className?: string;
  /** Disable usage */
  disabled?: boolean;
  /** Input name */
  name?: string;
  /** Event handler to execute when clicked */
  onClick?: ({ toggleState }: { toggleState: boolean }) => void;
  /**
   * Label element content
   */
  children?: ReactNode;
  /**
   * aria-label for the HTML input-element,
   */
  'aria-label'?: string;
  /**
   * alternatively to aria-label you can define aria-labelledby with label-element id
   */
  'aria-labelledby'?: string;
  /** Unique id
   * @default uuidV4
   */
  id?: string;
}

interface InternalToggleProps extends ToggleProps {
  variant: 'input' | 'button';
}

export interface ToggleState {
  toggleState: boolean;
}

function ToggleIcon({
  disabled,
  children,
  toggleState,
}: {
  disabled: boolean;
  children: ReactNode;
  toggleState: boolean;
}) {
  return (
    <>
      <HtmlSpan className={iconContainerClassName}>
        <ComponentIcon
          icon="toggle"
          className={classnames(iconBaseClassName, {
            [iconDisabledClassName]: !!disabled,
            [iconCheckedClassName]: !!toggleState,
          })}
        />
      </HtmlSpan>
      <Text color={!!disabled ? 'depthBase' : 'blackBase'}>{children}</Text>
    </>
  );
}

/**
 * <i class="semantics" />
 * Use for toggling form selection or application state
 */
class BaseToggle extends Component<InternalToggleProps> {
  state: ToggleState = {
    toggleState: !!this.props.checked || !!this.props.defaultChecked,
  };

  static getDerivedStateFromProps(
    nextProps: ToggleProps,
    prevState: ToggleState,
  ) {
    const { checked } = nextProps;
    if (checked !== undefined && checked !== prevState.toggleState) {
      return { toggleState: checked };
    }
    return null;
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
      variant,
      children,
      disabled = false,
      onClick,
      id,
      name,
      className,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      checked,
      defaultChecked: dissMissDefaultChecked,
      ...passProps
    } = this.props;

    const { toggleState } = this.state;

    const inputOrButtonProps = {
      id,
      name,
      disabled,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      checked: toggleState,
    };

    return (
      <HtmlSpan
        className={classnames(
          className,
          baseClassName,
          {
            [toggleDisabledClassName]: !!disabled,
            [toggleInputClassName]: variant === 'input',
            [toggleButtonClassName]: variant === 'button',
          },
          toggleLabelClassName,
        )}
        {...passProps}
      >
        {variant === 'input' ? (
          <HtmlLabel htmlFor={id}>
            <HtmlInput
              {...inputOrButtonProps}
              className={toggleInputElementClassName}
              onChange={this.handleClick}
              type="checkbox"
            />
            <ToggleIcon disabled={disabled} toggleState={toggleState}>
              {children}
            </ToggleIcon>
          </HtmlLabel>
        ) : (
          <HtmlButton
            {...inputOrButtonProps}
            onClick={this.handleClick}
            aria-pressed={!!toggleState}
            tabIndex={0}
          >
            <ToggleIcon disabled={disabled} toggleState={toggleState}>
              {children}
            </ToggleIcon>
          </HtmlButton>
        )}
      </HtmlSpan>
    );
  }
}

export const StyledToggle = styled(
  ({
    tokens,
    id: propId,
    ...passProps
  }: InternalToggleProps & InternalTokensProp) => (
    <AutoId id={propId}>{(id) => <BaseToggle id={id} {...passProps} />}</AutoId>
  ),
)`
  ${(props) => baseStyles(props)}
  &.${toggleDisabledClassName} {
    ${disabledCursor}
  }
  cursor: pointer;
`;
