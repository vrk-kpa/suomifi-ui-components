import React, { Component, forwardRef, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import {
  HtmlLabel,
  HtmlSpan,
  HtmlDiv,
  HtmlInput,
  HtmlInputProps,
} from '../../../reset';
import { getLogger } from '../../../utils/log';
import { AutoId } from '../../utils/AutoId/AutoId';
import { SuomifiThemeConsumer, SuomifiThemeProp } from '../../theme';
import {
  spacingStyles,
  separateMarginProps,
  MarginProps,
} from '../../theme/utils/spacing';
import { getConditionalAriaProp } from '../../../utils/aria';
import { HintText } from '../HintText/HintText';
import { RadioButtonGroupConsumer } from './RadioButtonGroup';
import { baseStyles } from './RadioButton.baseStyles';
import { IconRadioButton, IconRadioButtonLarge } from 'suomifi-icons';

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

export interface RadioButtonProps
  extends MarginProps,
    Omit<HtmlInputProps, 'onChange'> {
  /** CSS class for custom styles */
  className?: string;
  /** RadioButton text content (label) */
  children?: ReactNode;
  /** HTML name attribute. Groups multiple RadioButtons in a selection group, overridden by RadioButtonGroup. */
  name?: string;
  /** Value for the item. Must be unique inside a `<RadioButtonGroup>` */
  value: string;
  /**
   * HTML id attribute. If no id is specified, one will be generated
   */
  id?: string;
  /** Hint text. Displayed under the label. */
  hintText?: string;
  /** Disables the RadioButton. Value not included in a form when submitting. */
  disabled?: boolean;
  /**
   * RadioButton variant
   * @default small
   */
  variant?: 'small' | 'large';
  /** Checked state, overridden by RadioButtonGroup. */
  checked?: boolean;
  /** Default checked state for uncontrolled use, overridden by RadioButtonGroup. */
  defaultChecked?: boolean;
  /** Callback fired when RadioButton checked state changes */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Id of an external label for screen readers.
   * Screen readers will ignore children as label if this is provided.
   */
  'aria-labelledby'?: string;

  /** Ref object is forwarded to the underlying input element. Alternative to React `ref` attribute. */
  forwardedRef?: React.RefObject<HTMLInputElement>;
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
      defaultChecked,
      children,
      value,
      hintText,
      className,
      forwardedRef,
      onChange,
      disabled = false,
      style,
      ...rest
    } = this.props;
    const [marginProps, passProps] = separateMarginProps(rest);
    const marginStyle = spacingStyles(marginProps);

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
        style={{ ...marginStyle, ...style }}
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
          {variant === 'large' ? (
            <IconRadioButtonLarge className={radioButtonClassNames.icon} />
          ) : (
            <IconRadioButton className={radioButtonClassNames.icon} />
          )}
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
  ({ theme, ...passProps }: RadioButtonProps & SuomifiThemeProp) => (
    <BaseRadioButton {...passProps} />
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

const RadioButton = forwardRef(
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

RadioButton.displayName = 'RadioButton';
export { RadioButton };
