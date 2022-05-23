import React, { Component, forwardRef, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlLabel, HtmlSpan, HtmlDiv, HtmlInput } from '../../../reset';
import { getLogger } from '../../../utils/log';
import { AutoId } from '../../utils/AutoId/AutoId';
import { SuomifiThemeConsumer, SuomifiThemeProp } from '../../theme';
import { getConditionalAriaProp } from '../../../utils/aria';
import { HintText } from '../HintText/HintText';
import { ComponentIcon } from '../../StaticIcon/StaticIcon';
import { RadioButtonGroupConsumer } from './RadioButtonGroup';
import { baseStyles } from './RadioButton.baseStyles';

const baseClassName = 'fi-radio-button';
const radioButtonClassNames = {
  container: `${baseClassName}_container`,
  input: `${baseClassName}_input`,
  iconWrapper: `${baseClassName}_icon_wrapper`,
  icon: `${baseClassName}_icon`,
  label: `${baseClassName}_label`,
  hintText: `${baseClassName}_hintText`,
  disabled: `${baseClassName}--disabled`,
  large: `${baseClassName}--large`,
  checked: `${baseClassName}--checked`,
};

interface InternalRadioButtonProps {
  /** Custom classname to extend or customize */
  className?: string;
  /** Label for element content */
  children?: ReactNode;
  /** Group multiple RadioButtons in a selection group, overridden by RadioButtonGroup. */
  name?: string;
  /** Value for this item. Must be unique inside a RadioButtonGroup. */
  value: string;
  /**
   * Unique id. If no id is specified, one will be generated
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
  variant?: 'small' | 'large';
  /** Checked state, overridden by RadioButtonGroup. */
  checked?: boolean;
  /** Default checked state for uncontrolled use, overridden by RadioButtonGroup. */
  defaultChecked?: boolean;
  /** Callback for RadioButton checked state changes. */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Label id for screen readers when using external label element.
   * Screen readers will ignore children as label if id is provided.
   */
  'aria-labelledby'?: string;
}

interface RadioButtonState {
  checkedState: boolean;
}

interface InnerRef {
  forwardedRef: React.RefObject<HTMLInputElement>;
}

export interface RadioButtonProps extends InternalRadioButtonProps {
  /** Ref object to be passed to the input element */
  ref?: React.RefObject<HTMLInputElement>;
}

class BaseRadioButton extends Component<RadioButtonProps & InnerRef> {
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
      defaultChecked,
      children,
      value,
      hintText,
      className,
      forwardedRef,
      onChange,
      disabled = false,
      ...passProps
    } = this.props;

    if (!children) {
      getLogger().error(
        'RadioButton component should have a label or a child element that acts as one. Add label content or a child element.',
      );
    }
    if ('value' in this.props && value.trim().length === 0) {
      getLogger().error('RadioButton value can not be empty.');
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
          forwardedRef={forwardedRef}
          onChange={onChange}
          {...(checked !== undefined
            ? { checked: checkedState }
            : { defaultChecked })}
          {...getConditionalAriaProp('aria-describedby', [
            hintText ? hintTextId : undefined,
          ])}
          {...(value ? { value } : {})}
          {...passProps}
        />
        <HtmlSpan className={radioButtonClassNames.iconWrapper}>
          <ComponentIcon
            className={radioButtonClassNames.icon}
            icon={variant === 'large' ? 'radioButtonLarge' : 'radioButton'}
          />
        </HtmlSpan>
        <HtmlLabel htmlFor={id} className={radioButtonClassNames.label}>
          {children}
        </HtmlLabel>
        <HintText className={radioButtonClassNames.hintText} id={hintTextId}>
          {hintText}
        </HintText>
      </HtmlDiv>
    );
  }
}

const StyledRadioButton = styled(
  ({
    theme,
    ...passProps
  }: InternalRadioButtonProps & InnerRef & SuomifiThemeProp) => (
    <BaseRadioButton {...passProps} />
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

export const RadioButton = forwardRef(
  (props: RadioButtonProps, ref: React.RefObject<HTMLInputElement>) => {
    const { id: propId, onChange, ...passProps } = props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <AutoId id={propId}>
            {(id) => (
              <RadioButtonGroupConsumer>
                {({ onRadioButtonChange, selectedValue, name }) => (
                  <StyledRadioButton
                    theme={suomifiTheme}
                    id={id}
                    forwardedRef={ref}
                    {...passProps}
                    {...(!!onRadioButtonChange
                      ? {
                          checked: selectedValue === passProps.value,
                          name,
                        }
                      : {})}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      if (!!onRadioButtonChange) {
                        onRadioButtonChange(event.target.value);
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
        )}
      </SuomifiThemeConsumer>
    );
  },
);
