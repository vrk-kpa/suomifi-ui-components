import React, { Component, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlInput, HtmlLabel, HtmlSpan, HtmlDiv } from '../../../reset';
import { TokensProp, InternalTokensProp } from '../../theme';
import { logger } from '../../../utils/logger';
import { withSuomifiDefaultProps } from '../../theme/utils';
import { AutoId } from '../../../utils/AutoId';
import { RadioButtonGroupConsumer } from './RadioButtonGroup';
import { baseStyles } from './RadioButton.baseStyles';

const baseClassName = 'fi-radio-button';
const radioButtonClassNames = {
  container: `${baseClassName}_container`,
  input: `${baseClassName}_input`,
  label: `${baseClassName}_label`,
  hintText: `${baseClassName}_hintText`,
  disabled: `${baseClassName}--disabled`,
  large: `${baseClassName}--large`,
  checked: `${baseClassName}--checked`,
};

type RadioButtonVariant = 'small' | 'large';

export interface RadioButtonProps extends TokensProp {
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
  /** Checked state, overridden by RadioButtonGroup. */
  checked?: boolean;
  /** Callback for RadioButton checked state changes. */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Additional label id for screen readers. */
  'aria-labelledby'?: string;
}

interface RadioButtonState {
  checkedState: boolean;
}

class BaseRadioButton extends Component<RadioButtonProps> {
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

  render() {
    const {
      id,
      name,
      variant,
      checked,
      children,
      value,
      hintText,
      className,
      onChange,
      disabled = false,
      ...passProps
    } = this.props;

    if (!children) {
      logger.error(
        'RadioButton component should have a label or a child element that acts as one. Add label content or a child element.',
      );
    }
    if ('value' in this.props && value.trim().length === 0) {
      logger.error('RadioButton value can not be empty.');
    }

    const { checkedState } = this.state;
    const hintTextId = `${id}-hintText`;
    return (
      <HtmlDiv
        className={classnames(
          baseClassName,
          radioButtonClassNames.container,
          className,
          {
            [radioButtonClassNames.disabled]: disabled,
            [radioButtonClassNames.large]: variant === 'large',
            [radioButtonClassNames.checked]: checked,
          },
        )}
      >
        <HtmlInput
          className={radioButtonClassNames.input}
          type="radio"
          name={name}
          id={id}
          disabled={disabled}
          onChange={onChange}
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

const StyledRadioButton = styled(
  ({ tokens, ...passProps }: RadioButtonProps & InternalTokensProp) => (
    <BaseRadioButton {...passProps} />
  ),
)`
  ${(tokens) => baseStyles(tokens)}
`;

export class RadioButton extends Component<RadioButtonProps> {
  render() {
    const { id: propId, onChange, ...passProps } = this.props;
    return (
      <AutoId id={propId}>
        {(id) => (
          <RadioButtonGroupConsumer>
            {(consumer) => (
              <StyledRadioButton
                {...withSuomifiDefaultProps(passProps)}
                {...(!!consumer.selectedValue
                  ? { checked: consumer.selectedValue === passProps.value }
                  : {})}
                {...(!!consumer.name ? { name: consumer.name } : {})}
                id={id}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (!!consumer.onRadioButtonChange) {
                    consumer.onRadioButtonChange(event.target.value);
                  }
                  if (!!onChange) {
                    onChange(event);
                  }
                }}
              />
            )}
          </RadioButtonGroupConsumer>
        )}
      </AutoId>
    );
  }
}
