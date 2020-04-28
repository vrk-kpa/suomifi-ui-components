import React, { Component, ReactNode } from 'react';
import classnames from 'classnames';
import {
  HtmlInput,
  HtmlLabel,
  HtmlSpan,
  HtmlDiv,
  HtmlInputProps,
} from '../../reset';

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
type CheckboxStatus = 'default' | 'error' | 'disabled';

export interface CheckboxInputProps extends HtmlInputProps {
  /** State of input checkbox */
  checked?: boolean;
  /** Custom classname for the input */
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
  /**
   * Unique id
   * If no id is specified, one will be generated using uuid
   * @default uuidV4
   */
  id?: string;
}

export interface CheckboxState {
  checkedState: boolean;
}

export class Checkbox extends Component<CheckboxProps> {
  state = {
    checkedState: !!this.props.checked || !!this.props.defaultChecked || false,
  };

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps: CheckboxProps) {
    const { checked } = nextProps;
    if (!!checked) {
      this.setState({ checkedState: !!checked });
    }
  }

  handleClick = () => {
    const { checked, onClick } = this.props;
    const { checkedState } = this.state;
    if (checked === undefined) {
      this.setState({ checkedState: !checkedState });
    }
    if (!!onClick) {
      onClick({ checkboxState: !checkedState });
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
    const { checkedState } = this.state;

    const hasLabel =
      children ||
      ariaLabel ||
      ariaLabelledBy ||
      checkboxInputProps?.['aria-label'] ||
      checkboxInputProps?.['aria-labelledby'];

    if (!hasLabel) {
      logger.error(
        'Checkbox component should have a label or at least an aria-label or aria-labelledby attribute.',
      );
    }

    const id = idGenerator(propId);
    const statusTextId = `${idGenerator(propId)}-statusText`;
    const hintTextId = `${idGenerator(propId)}-hintText`;

    const newCheckboxInputProps = {
      disabled,
      id,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      checked: !!checkedState,
      className: checkboxBaseClassNames.input,
      onChange: this.handleClick,
      ...checkboxInputProps,
    };

    return (
      <HtmlDiv
        className={classnames(checkboxBaseClassNames.container, className, {})}
      >
        <HtmlInput {...newCheckboxInputProps} type="checkbox" />
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
