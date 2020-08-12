import React, { Component, ReactNode } from 'react';
import classnames from 'classnames';
import { HtmlInput, HtmlLabel, HtmlSpan, HtmlDiv } from '../../reset';
import { idGenerator } from '../../utils/uuid';
import { logger } from '../../utils/logger';
import {
  RadiobuttonGroupConsumer,
  RadiobuttonGroupProviderState,
} from './RadiobuttonGroup';

const baseClassName = 'fi-radiobutton';

const radiobuttonClassNames = {
  container: `${baseClassName}_container`,
  input: `${baseClassName}_input`,
  label: `${baseClassName}_label`,
  hintText: `${baseClassName}_hintText`,
};

type RadiobuttonVariant = 'small' | 'large';

export interface RadiobuttonProps {
  /** Custom classname to extend or customize */
  className?: string;
  /** Label for element content */
  children?: ReactNode;
  /** Group multiple Radiobuttons in a selection group, overridden by RadiobuttonGroup. */
  name?: string;
  /** Value for this item. Must be unique inside a Radiobutton group. */
  value: string;
  /**
   * Unique id
   * If no id is specified, one will be generated using uuid
   * @default uuidV4
   */
  id?: string;
  /** Hint text. Displayed under the label. */
  hintText?: string;
  /** Disable Radiobutton. Value not included when submitting. */
  disabled?: boolean;
  /**
   * 'small' | 'large'
   * @default small
   */
  variant?: RadiobuttonVariant;
  radiobuttonGroup?: boolean;
  consumer?: RadiobuttonGroupProviderState;
  /** Checked state, overridden by RadiobuttonGroup. */
  checked?: boolean;
  /** Callback for Radiobutton checked state changes. */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Additional label id for screen readers. */
  'aria-labelledby'?: string;
}

export interface RadiobuttonState {
  checkedState: boolean;
}

class RadiobuttonItem extends Component<RadiobuttonProps> {
  state = {
    checkedState: !!this.props.checked,
  };

  static getDerivedStateFromProps(
    nextProps: RadiobuttonProps,
    prevState: RadiobuttonState,
  ) {
    const { checked } = nextProps;
    if (checked !== undefined && checked !== prevState.checkedState) {
      return { checkedState: checked };
    }
    return null;
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      radiobuttonGroup,
      onChange,
      consumer: { onRadiobuttonChange } = { onRadiobuttonChange: undefined },
    } = this.props;
    if (!!radiobuttonGroup && !!onRadiobuttonChange) {
      onRadiobuttonChange(event.target.value);
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
      radiobuttonGroup,
      ...passProps
    } = this.props;
    const { checkedState } = this.state;

    if (!children) {
      logger.error(
        'Radiobutton component should have a label or a child element that acts as one. Add label content or a child element.',
      );
    }
    if ('value' in this.props && value.trim().length === 0) {
      logger.error('Radiobutton value can not be empty.');
    }

    const id = idGenerator(propId);
    const hintTextId = `${id}-hintText`;

    return (
      <HtmlDiv
        className={classnames(radiobuttonClassNames.container, className)}
      >
        <HtmlInput
          className={radiobuttonClassNames.input}
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
        <HtmlLabel htmlFor={id} className={radiobuttonClassNames.label}>
          {children}
        </HtmlLabel>
        {hintText && (
          <HtmlSpan className={radiobuttonClassNames.hintText} id={hintTextId}>
            {hintText}
          </HtmlSpan>
        )}
      </HtmlDiv>
    );
  }
}

export class Radiobutton extends Component<RadiobuttonProps> {
  render() {
    return !!this.props.radiobuttonGroup ? (
      <RadiobuttonGroupConsumer>
        {(consumer) => <RadiobuttonItem {...this.props} consumer={consumer} />}
      </RadiobuttonGroupConsumer>
    ) : (
      <RadiobuttonItem {...this.props} />
    );
  }
}
