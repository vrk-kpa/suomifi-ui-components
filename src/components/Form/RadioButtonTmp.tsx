import React, { Component, ReactNode } from 'react';
import classnames from 'classnames';
import { HtmlInput, HtmlLabel, HtmlSpan, HtmlDiv } from '../../reset';
import { idGenerator } from '../../utils/uuid';
import { logger } from '../../utils/logger';
import {
  RadioButtonGroupConsumer,
  RadioButtonGroupProviderState,
} from './RadioButtonGroup';

const baseClassName = 'fi-radio-button';

const radioButtonClassNames = {
  container: `${baseClassName}_container`,
  input: `${baseClassName}_input`,
  label: `${baseClassName}_label`,
  hintText: `${baseClassName}_hintText`,
};

type RadioButtonVariant = 'small' | 'large';

export interface RadioButtonProps {
  /** Custom classname to extend or customize */
  className?: string;
  /** Label for element content */
  children?: ReactNode;
  /** Group multiple RadioButtons in a selection group, overridden by RadioButtonGroup. */
  name?: string;
  /** Value for this item. Must be unique inside a RadioButtonGroup. */
  value: string;
  /**
   * Unique id
   * If no id is specified, one will be generated using uuid
   * @default uuidV4
   */
  id?: string;
  /** Hint text. Displayed under the label. */
  hintText?: string;
  /** Disable RadioButton. Value not included when submitting. */
  disabled?: boolean;
  /**
   * 'small' | 'large'
   * @default small
   */
  variant?: RadioButtonVariant;
  radioButtonGroup?: boolean;
  consumer?: RadioButtonGroupProviderState;
  /** Checked state, overridden by RadioButtonGroup. */
  checked?: boolean;
  /** Callback for RadioButton checked state changes. */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Additional label id for screen readers. */
  'aria-labelledby'?: string;
}

export interface RadioButtonState {
  checkedState: boolean;
}

class RadioButtonItem extends Component<RadioButtonProps> {
  state = {
    checkedState: !!this.props.checked,
  };

  static getDerivedStateFromProps(
    nextProps: RadioButtonProps,
    prevState: RadioButtonState,
  ) {
    const { checked } = nextProps;
    if (checked !== undefined && checked !== prevState.checkedState) {
      return { checkedState: checked };
    }
    return null;
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      radioButtonGroup,
      onChange,
      consumer: { onRadioButtonChange } = {
        onRadioButtonChange: undefined,
      },
    } = this.props;
    if (!!radioButtonGroup && !!onRadioButtonChange) {
      onRadioButtonChange(event.target.value);
    }
    if (!!onChange) {
      onChange(event);
    }
  };

  render() {
    const {
      id: propId,
      name,
      children,
      value,
      hintText,
      className,
      onChange: dismissOnChange,
      disabled = false,
      consumer,
      radioButtonGroup,
      ...passProps
    } = this.props;
    const { checkedState } = this.state;

    if (!children) {
      logger.error(
        'RadioButton component should have a label or a child element that acts as one. Add label content or a child element.',
      );
    }
    if ('value' in this.props && value.trim().length === 0) {
      logger.error('RadioButton value can not be empty.');
    }

    const id = idGenerator(propId);
    const hintTextId = `${id}-hintText`;

    return (
      <HtmlDiv
        className={classnames(radioButtonClassNames.container, className)}
      >
        <HtmlInput
          className={radioButtonClassNames.input}
          type="radio"
          name={name}
          id={id}
          disabled={disabled}
          onChange={this.handleChange}
          checked={checkedState}
          {...(hintText ? { 'aria-describedby': hintTextId } : {})}
          {...(value ? { value } : {})}
          {...passProps}
        />
        <HtmlLabel htmlFor={id} className={radioButtonClassNames.label}>
          {children}
        </HtmlLabel>
        {hintText && (
          <HtmlSpan className={radioButtonClassNames.hintText} id={hintTextId}>
            {hintText}
          </HtmlSpan>
        )}
      </HtmlDiv>
    );
  }
}

export class RadioButton extends Component<RadioButtonProps> {
  render() {
    return !!this.props.radioButtonGroup ? (
      <RadioButtonGroupConsumer>
        {(consumer) => <RadioButtonItem {...this.props} consumer={consumer} />}
      </RadioButtonGroupConsumer>
    ) : (
      <RadioButtonItem {...this.props} />
    );
  }
}
