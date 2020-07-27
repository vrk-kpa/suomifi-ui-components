import React, { Component, ReactNode } from 'react';
import classnames from 'classnames';
import { HtmlInput, HtmlLabel, HtmlSpan, HtmlDiv } from '../../reset';

import { idGenerator } from '../../utils/uuid';
import { logger } from '../../utils/logger';

const baseClassName = 'fi-checkbox';

const checkboxBaseClassNames = {
  container: `${baseClassName}_container`,
  input: `${baseClassName}_input`,
  label: `${baseClassName}_label`,
  statusText: `${baseClassName}_status`,
  hintText: `${baseClassName}_hintText`,
};

type CheckboxVariant = 'small' | 'large';
type CheckboxStatus = 'default' | 'error';

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
   * 'default' | 'error'
   * @default default
   */
  status?: CheckboxStatus;
  /**
   * Status text to be displayed in the status text element. Will not be displayed when element is disabled.
   */
  statusText?: string;
  /**
   * Hint text to be displayed under the label.
   */
  hintText?: string;
  /**
   * aria-label for the HTML input-element,
   * alternatively you can define aria-labelledby with label-element id
   */
  'aria-label'?: string;
  'aria-labelledby'?: string;
  /**
   * Unique id
   * If no id is specified, one will be generated using uuid
   * @default uuidV4
   */
  id?: string;
  name?: string;
  value?: string;
}

export interface CheckboxState {
  checkedState: boolean;
}

export class Checkbox extends Component<CheckboxProps> {
  state = {
    checkedState: !!this.props.checked || !!this.props.defaultChecked || false,
  };

  static getDerivedStateFromProps(
    nextProps: CheckboxProps,
    prevState: CheckboxState,
  ) {
    const { checked } = nextProps;
    if (checked !== undefined && checked !== prevState.checkedState) {
      return { checkedState: checked };
    }
    return null;
  }

  handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, onClick } = this.props;
    if (checked === undefined) {
      this.setState({ checkedState: event.target.checked });
    }
    if (!!onClick) {
      onClick({ checkboxState: event.target.checked });
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
      checked: dismissChecked,
      defaultChecked: dismissDefaultChecked,
      onClick: dismissOnClick,
      hintText,
      status,
      statusText,
      name,
      value,
      ...passProps
    } = this.props;
    const { checkedState } = this.state;

    if (!children) {
      logger.error(
        'Checkbox component should have a label or a child element that acts as one. Add label content or a child element.',
      );
    }

    const id = idGenerator(propId);
    const statusTextId = `${idGenerator(propId)}-statusText`;
    const hintTextId = `${idGenerator(propId)}-hintText`;

    const infoElementIds =
      statusText || hintText ? [statusTextId, hintTextId].join(' ') : '';

    const newCheckboxInputProps = {
      disabled,
      id,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      checked: !!checkedState,
      className: checkboxBaseClassNames.input,
      onChange: this.handleClick,
      name,
      value,
    };

    return (
      <HtmlDiv
        className={classnames(checkboxBaseClassNames.container, className, {})}
      >
        <HtmlInput
          {...newCheckboxInputProps}
          type="checkbox"
          aria-describedby={infoElementIds}
        />
        <HtmlLabel
          htmlFor={id}
          className={checkboxBaseClassNames.label}
          {...passProps}
        >
          {children}
        </HtmlLabel>
        {hintText && (
          <HtmlSpan className={checkboxBaseClassNames.hintText} id={hintTextId}>
            {hintText}
          </HtmlSpan>
        )}

        {statusText && !disabled && (
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
