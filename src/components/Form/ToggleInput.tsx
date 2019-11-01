import React, {
  Component,
  ReactElement,
  ComponentClass,
  FunctionComponent,
} from 'react';
import classnames from 'classnames';
import { HtmlInput, HtmlLabel, HtmlSpan } from '../../reset';
import { ToggleProps, baseClassName, ToggleState } from './Toggle';

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

export class ToggleInput extends Component<ToggleProps> {
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
    const toggleClassName = `${baseClassName}--input`;
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
      <HtmlSpan
        className={classnames(toggleClassName, className, baseClassName, {
          [toggleDisabledClassName]: !!disabled,
        })}
      >
        {!!toggleInputComponent ? (
          componentOrElementWithProps(toggleInputComponent, newToggleInputProps)
        ) : (
          <HtmlInput {...newToggleInputProps} type="checkbox" />
        )}
        <HtmlLabel
          {...passProps}
          className={toggleLabelClassName}
          onClick={this.handleClick}
          htmlFor={id}
        >
          {children}
        </HtmlLabel>
      </HtmlSpan>
    );
  }
}
