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
  /**
   * Label element content
   */
  children?: ReactNode;
  /** Group multiple Radiobuttons to be inside same selection group */
  name?: string;
  /** Unique value to be used inside Radiobutton group for this item */
  value?: string;
  /**
   * Unique id
   * If no id is specified, one will be generated using uuid
   * @default uuidV4
   */
  id?: string;
  /**
   * Hint text to be displayed under the label.
   */
  hintText?: string;
  /** Disable Radiobutton. Value won't be included when submitting */
  disabled?: boolean;
  event: React.ChangeEvent<HTMLInputElement>;
  /**
   * 'small' | 'large'
   * @default small
   */
  variant?: RadiobuttonVariant;
  radiobuttonGroup?: boolean;
  consumer?: RadiobuttonGroupProviderState;
  checked?: boolean;
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

  handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      radiobuttonGroup,
      consumer: { onRadiobuttonChange } = { onRadiobuttonChange: undefined },
    } = this.props;
    if (!!radiobuttonGroup && !!onRadiobuttonChange) {
      onRadiobuttonChange(event.target.value);
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
      disabled = false,
      ...passProps
    } = this.props;
    const { checkedState } = this.state;

    if (!children) {
      logger.error(
        'Radiobutton component should have a label or a child element that acts as one. Add label content or a child element.',
      );
    }

    const id = idGenerator(propId);
    const hintTextId = `${idGenerator(propId)}-hintText`;

    return (
      <HtmlDiv
        className={classnames(radiobuttonClassNames.container, className)}
      >
        <HtmlInput
          className={radiobuttonClassNames.input}
          type="radio"
          name={name}
          value={value}
          id={id}
          disabled={disabled}
          onChange={this.handleClick}
          checked={checkedState}
        />
        <HtmlLabel
          className={radiobuttonClassNames.label}
          htmlFor={id}
          {...passProps}
        >
          {children}
        </HtmlLabel>
        <HtmlSpan className={radiobuttonClassNames.hintText} id={hintTextId}>
          {hintText}
        </HtmlSpan>
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
