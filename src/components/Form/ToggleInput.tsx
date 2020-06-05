import React, {
  Component,
  ReactElement,
  ComponentClass,
  FunctionComponent,
} from 'react';
import classnames from 'classnames';
import { HtmlInput, HtmlLabel } from '../../reset';
import { ToggleProps, ToggleState } from './Toggle';
import styled from 'styled-components';
import { disabledCursor } from '../utils/css';

const baseClassName = 'fi-toggle';
const toggleDisabledClassName = `${baseClassName}--disabled`;

const componentOrElementWithProps = (
  component: ReactElement<any> | FunctionComponent<any> | ComponentClass<any>,
  props: object,
) => {
  if (!!component) {
    if (React.isValidElement(component)) {
      return React.cloneElement(component, props); // element
    }
    return React.createElement(
      component as FunctionComponent<any> | ComponentClass<any>,
      props,
    ); // component
  }
  return;
};

const StyledHtmlLabel = styled(HtmlLabel)`
  &.${toggleDisabledClassName} {
    ${disabledCursor}
  }
  cursor: pointer;
`;

export class ToggleInput extends Component<ToggleProps> {
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

  handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, onClick } = this.props;
    if (checked === undefined) {
      this.setState({ toggleState: event.target.checked });
    }
    if (!!onClick) {
      onClick({ toggleState: event.target.checked });
    }
  };

  render() {
    const {
      id,
      className,
      disabled = false,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      children,
      toggleInputProps,
      toggleInputComponent,
      checked: dissMissChecked,
      defaultChecked: dissMissDefaultChecked,
      onClick: dissMissOnClick,
      ...passProps
    } = this.props;
    const { toggleState } = this.state;
    const toggleClassName = `${baseClassName}--with-input`;
    const toggleInputClassName = `${baseClassName}_input`;
    const toggleLabelClassName = `${baseClassName}_label`;

    const newToggleInputProps = {
      disabled,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      checked: !!toggleState,
      className: toggleInputClassName,
      onChange: this.handleClick,
      ...toggleInputProps,
      id,
    };

    return (
      <StyledHtmlLabel
        htmlFor={id}
        className={classnames(
          toggleClassName,
          className,
          baseClassName,
          {
            [toggleDisabledClassName]: !!disabled,
          },
          toggleLabelClassName,
        )}
        {...passProps}
      >
        {!!toggleInputComponent ? (
          componentOrElementWithProps(toggleInputComponent, newToggleInputProps)
        ) : (
          <HtmlInput {...newToggleInputProps} type="checkbox" />
        )}
        {children}
      </StyledHtmlLabel>
    );
  }
}
