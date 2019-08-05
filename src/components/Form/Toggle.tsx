import React, {
  Component,
  ReactElement,
  ReactNode,
  ComponentClass,
  FunctionComponent,
} from 'react';
import { HtmlLabel, HtmlInput, HtmlSpan } from '../../reset';
import { idGenerator } from '../../utils/uuid';
import classnames from 'classnames';

const baseClassName = 'fi-toggle';
const toggleDisabledClassName = `${baseClassName}--disabled`;
const toggleInputClassName = `${baseClassName}_input`;
const toggleLabelClassName = `${baseClassName}_label`;

export interface ToggleInputProps {
  /** State of input checkbox */
  checked?: boolean;
  /** Custom classname to extend or customize */
  className?: string;
  /** Disable Button usage */
  disabled?: boolean;
  controlled?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export class ToggleInput extends Component<ToggleInputProps> {
  render() {
    const { disabled = false, controlled, checked, ...passProps } = this.props;
    return (
      <HtmlInput
        disabled={disabled}
        {...passProps}
        type="checkbox"
        checked={!!checked}
      />
    );
  }
}

export interface ToggleProps {
  /** Controlled toggle-state, use onClick to change  */
  checked?: boolean;
  /** Default status of toggle when not using controlled 'checked' state
   * @default false
   */
  defaultChecked?: boolean;
  /** Custom classname to extend or customize */
  className?: string;
  /** Disable Button usage */
  disabled?: boolean;
  /** Event handler to execute when clicked */
  onClick?: ({ toggleState }: { toggleState: boolean }) => void;
  /**
   * Label element content
   */
  children?: ReactNode;
  /** Pass custom props to Toggle's input component/element */
  toggleInputProps?: ToggleInputProps;
  /** Customized ToggleInput-component */
  toggleInputComponent?:
    | ComponentClass<ToggleInputProps>
    | FunctionComponent<ToggleInputProps>
    | ReactElement<ToggleInputProps>;
  /**
   * aria-label for the HTML input-element,
   * alternatively you can define aria-labelledby with label-element id
   */
  'aria-label'?: string;
  'aria-labelledby'?: string;
  /** Unique id
   * @default uuidV4
   */
  id?: string;
}

interface ToggleState {
  toggleState: boolean;
}

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

export class Toggle extends Component<ToggleProps> {
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
      disabled,
      className,
      children,
      toggleInputProps,
      toggleInputComponent,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      checked: dissMissChecked,
      defaultChecked: dissMissDefaultChecked,
      onClick: dissMissOnClick,
      id: propId,
      ...passProps
    } = this.props;
    const { toggleState } = this.state;
    const id = idGenerator(propId);
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
        className={classnames(className, baseClassName, {
          [toggleDisabledClassName]: !!disabled,
        })}
      >
        {!!toggleInputComponent ? (
          componentOrElementWithProps(toggleInputComponent, newToggleInputProps) // element
        ) : (
          <ToggleInput {...newToggleInputProps} />
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
