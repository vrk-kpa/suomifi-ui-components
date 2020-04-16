import React, { Component, ReactNode } from 'react';
import classnames from 'classnames';
import { HtmlInput, HtmlLabel, HtmlSpan, HtmlDiv } from '../../reset';

import { idGenerator } from '../../utils/uuid';

const baseClassName = 'fi-checkbox';

const checkboxBaseClassNames = {
  disabled: `${baseClassName}--disabled`,
  container: `${baseClassName}_container`,
  input: `${baseClassName}_input`,
  label: `${baseClassName}_label`,
  statusText: `${baseClassName}_status`,
  hintText: `${baseClassName}_hintText`,
};

type CheckboxVariant = 'small' | 'large';
type CheckboxStatus = 'default' | 'error' | 'disabled';

export interface CheckboxInputProps {
  /** State of input checkbox */
  checked?: boolean;
  /** Custom classname for the container */
  className?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export interface CheckboxProps {
  /** Controlled checked-state - user actions use onClick to change  */
  checked?: boolean;
  /** Default status of Checkbox when not using controlled 'checked' state
   * @default false
   */
  defaultChecked?: boolean;
  /** Custom classname to extend or customize */
  className?: string;
  /** Disable Checkbox. Value won't be included when submitting */
  disabled?: boolean;
  /** Event handler to execute when clicked */
  onClick?: ({ checkboxState }: { checkboxState: boolean }) => void;
  /**
   * Label element content
   */
  children?: ReactNode;
  /**
   * 'small' | 'large'
   * @default small
   */
  variant?: CheckboxVariant;
  /**
   * 'default' | 'error' | 'disabled'
   * @default default
   */
  status?: CheckboxStatus;
  /**
   * Status text to be displayed in the status text element.
   */
  statusText?: string;
  /**
   * Hint text to be displayed under the label.
   */
  hintText?: string;
  /** Pass custom props to Checkbox's input component/element */
  checkboxInputProps?: CheckboxInputProps;
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

export interface CheckboxState {
  checkboxState: boolean;
}

export class Checkbox extends Component<CheckboxProps> {
  state = {
    checkboxState: !!this.props.checked || !!this.props.defaultChecked || false,
  };

  /**
   * This is deprecated and should be replaced
   */
  componentWillReceiveProps(nextProps: CheckboxProps) {
    const { checked } = nextProps;
    if (!!checked) {
      this.setState({ checkboxState: !!checked });
    }
  }

  handleClick = () => {
    const { checked, onClick } = this.props;
    const { checkboxState } = this.state;
    if (checked === undefined) {
      this.setState({ checkboxState: !checkboxState });
    }
    if (!!onClick) {
      onClick({ checkboxState: !checkboxState });
    }
  };

  render() {
    const {
      id: propId,
      className,
      disabled = false,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      children,
      checkboxInputProps,
      checked: dismissChecked,
      defaultChecked: dismissDefaultChecked,
      onClick: dismissOnClick,
      hintText,
      status,
      statusText,
      ...passProps
    } = this.props;
    const { checkboxState } = this.state;

    const id = idGenerator(propId);
    const statusTextId = `${idGenerator(propId)}-statusText`;
    const hintTextId = `${idGenerator(propId)}-hintText`;

    const newCheckboxInputProps = {
      disabled,
      id,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      checked: !!checkboxState,
      className: checkboxBaseClassNames.input,
      onChange: this.handleClick,
      ...checkboxInputProps,
    };

    return (
      <HtmlDiv
        className={classnames(checkboxBaseClassNames.container, className, {
          [checkboxBaseClassNames.disabled]: !!disabled,
        })}
      >
        <HtmlInput {...newCheckboxInputProps} type="checkbox" />
        <HtmlLabel
          htmlFor={id}
          className={classnames(className, checkboxBaseClassNames.label)}
          {...passProps}
        >
          {children}
        </HtmlLabel>
        {hintText && (
          <HtmlSpan className={checkboxBaseClassNames.hintText} id={hintTextId}>
            {hintText}
          </HtmlSpan>
        )}

        {statusText && (
          <HtmlSpan
            className={checkboxBaseClassNames.statusText}
            id={statusTextId}
          >
            {statusText}
          </HtmlSpan>
        )}
      </HtmlDiv>
    );
  }
}
