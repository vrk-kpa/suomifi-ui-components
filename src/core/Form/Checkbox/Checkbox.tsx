import React, { Component, forwardRef, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { InputStatus, StatusTextCommonProps } from '../types';
import { getConditionalAriaProp } from '../../../utils/aria';
import { getLogger } from '../../../utils/log';
import { AutoId } from '../../utils/AutoId/AutoId';
import {
  SuomifiThemeProp,
  SuomifiThemeConsumer,
  SpacingConsumer,
} from '../../theme';
import {
  separateMarginProps,
  MarginProps,
  GlobalMarginProps,
} from '../../theme/utils/spacing';
import { HtmlLabel, HtmlDiv, HtmlInput, HtmlInputProps } from '../../../reset';
import { StatusText } from '../StatusText/StatusText';
import { HintText } from '../HintText/HintText';
import { CheckboxGroupConsumer } from './CheckboxGroup';
import { baseStyles } from './Checkbox.baseStyles';
import { IconCheck } from 'suomifi-icons';
import { filterDuplicateKeys } from '../../../utils/common/common';

const baseClassName = 'fi-checkbox';

const checkboxClassNames = {
  container: `${baseClassName}_container`,
  input: `${baseClassName}_input`,
  label: `${baseClassName}_label`,
  statusTextHasContent: `${baseClassName}_statusText--has-content`,
  hintText: `${baseClassName}_hintText`,
  disabled: `${baseClassName}--disabled`,
  error: `${baseClassName}--error`,
  checked: `${baseClassName}--checked`,
  large: `${baseClassName}--large`,
  icon: `${baseClassName}_icon`,
};

type CheckboxStatus = Exclude<InputStatus, 'success'>;

interface InternalCheckboxProps extends StatusTextCommonProps {
  /** Controlled checked state  */
  checked?: boolean;
  /** Default status of Checkbox when not using controlled `checked` state
   * @default false
   */
  defaultChecked?: boolean;
  /** CSS class for custom styles */
  className?: string;
  /** Disables the Checkbox. Value won't be included in a form when submitting */
  disabled?: boolean;
  /** Callback fired on Checkbox click */
  onClick?: ({ checkboxState }: { checkboxState: boolean }) => void;
  /**
   * Children will be rendered as Checkbox's label. Use a short and descriptive label.
   */
  children?: ReactNode;
  /**
   * Variant of the Checkbox
   * @default small
   */
  variant?: 'small' | 'large';
  /**
   * `'default'` | `'error'`
   *
   * Status of the component. Error state creates a red border around the Checkbox.
   * Always use a descriptive `statusText` with an error status.
   * @default default
   */
  status?: CheckboxStatus;
  /**
   * Hint text to be displayed under the label
   */
  hintText?: string;
  /**
   * aria-label for the HTML input element.
   * Alternatively you can define an aria-labelledby
   */
  'aria-label'?: string;
  /**
   * aria-labelledby for the HTML input element.
   * Alternatively you can define an aria-label
   */
  'aria-labelledby'?: string;
  /**
   * aria-describedby for the HTML input element,
   */
  'aria-describedby'?: string;
  /**
   * HTML id attribute.
   * If no id is specified, one will be generated automatically
   */
  id?: string;
  /** HTML name attribute */
  name?: string;
  /** HTML value attribute */
  value?: string;
  /** Ref is passed to the underlying input element. Alternative to React `ref` attribute. */
  forwardedRef?: React.RefObject<HTMLInputElement>;
  /** Properties for the wrapping div element */
}

export interface CheckboxProps
  extends InternalCheckboxProps,
    MarginProps,
    Omit<HtmlInputProps, 'onClick' | 'value'> {
  /** Ref object to be passed to the input element */
  ref?: React.RefObject<HTMLInputElement>;
}

class BaseCheckbox extends Component<CheckboxProps> {
  state = {
    checkedState: !!this.props.checked || !!this.props.defaultChecked,
  };

  static getDerivedStateFromProps(
    nextProps: CheckboxProps,
    prevState: { checkedState: boolean },
  ) {
    const { checked } = nextProps;
    if (checked !== undefined && checked !== prevState.checkedState) {
      return { checkedState: checked };
    }
    return null;
  }

  handleClick = () => {
    const { onClick, checked } = this.props;
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
      id,
      className,
      disabled = false,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      statusTextAriaLiveMode = 'assertive',
      children,
      checked: dismissChecked,
      defaultChecked: dismissDefaultChecked,
      onClick: dismissOnClick,
      hintText,
      status,
      statusText,
      name,
      value,
      forwardedRef,
      onClick,
      variant,
      style,
      ...rest
    } = this.props;
    const [_marginProps, passProps] = separateMarginProps(rest);

    const { checkedState } = this.state;

    if (!children) {
      getLogger().error(
        'Checkbox component should have a label or a child element that acts as one. Add label content or a child element.',
      );
    }

    if (
      ('name' in this.props && (typeof name !== 'string' || name === '')) ||
      ('value' in this.props && (typeof value !== 'string' || value === ''))
    ) {
      getLogger().warn(
        'Name and value props should have non-empty values if provided.',
      );
    }

    const statusTextId = !!statusText ? `${id}-statusText` : undefined;
    const hintTextId = !!hintText ? `${id}-hintText` : undefined;

    return (
      <HtmlDiv
        className={classnames(
          checkboxClassNames.container,
          className,
          baseClassName,
          {
            [checkboxClassNames.error]: status === 'error' && !disabled,
            [checkboxClassNames.checked]: checkedState,
            [checkboxClassNames.large]: variant === 'large',
            [checkboxClassNames.disabled]: !!disabled,
          },
        )}
        style={style}
      >
        <HtmlInput
          type="checkbox"
          disabled={disabled}
          id={id}
          {...getConditionalAriaProp('aria-label', [ariaLabel])}
          {...getConditionalAriaProp('aria-labelledby', [ariaLabelledBy])}
          {...getConditionalAriaProp('aria-describedby', [
            statusTextId,
            hintTextId,
            ariaDescribedBy,
          ])}
          aria-invalid={status === 'error'}
          checked={!!checkedState}
          className={checkboxClassNames.input}
          onChange={this.handleClick}
          name={name}
          forwardedRef={forwardedRef}
          {...(value ? { value } : {})}
          {...passProps}
        />
        <HtmlLabel htmlFor={id} className={checkboxClassNames.label}>
          {!!checkedState && <IconCheck className={checkboxClassNames.icon} />}
          {children}
        </HtmlLabel>
        <HintText id={hintTextId}>{hintText}</HintText>
        <StatusText
          className={classnames({
            [checkboxClassNames.statusTextHasContent]: !!statusText,
          })}
          id={statusTextId}
          status={status}
          disabled={disabled}
          ariaLiveMode={statusTextAriaLiveMode}
        >
          {statusText}
        </StatusText>
      </HtmlDiv>
    );
  }
}

const StyledCheckbox = styled(
  ({
    theme,
    globalMargins,
    ...passProps
  }: InternalCheckboxProps &
    SuomifiThemeProp &
    GlobalMarginProps &
    MarginProps) => <BaseCheckbox {...passProps} />,
)`
  ${({ theme, globalMargins, ...rest }) => {
    const [marginProps, _passProps] = separateMarginProps(rest);
    const cleanedGlobalMargins = filterDuplicateKeys(
      globalMargins.checkbox,
      marginProps,
    );
    return baseStyles(theme, cleanedGlobalMargins, marginProps);
  }}
`;

const Checkbox = forwardRef(
  (props: CheckboxProps, ref: React.RefObject<HTMLInputElement>) => {
    const { id: propId, status: propStatus, ...passProps } = props;
    return (
      <SpacingConsumer>
        {({ margins }) => (
          <SuomifiThemeConsumer>
            {({ suomifiTheme }) => (
              <AutoId id={propId}>
                {(id) => (
                  <CheckboxGroupConsumer>
                    {({ status: groupStatus }) => (
                      <StyledCheckbox
                        theme={suomifiTheme}
                        id={id}
                        forwardedRef={ref}
                        globalMargins={margins}
                        status={!!propStatus ? propStatus : groupStatus}
                        {...passProps}
                      />
                    )}
                  </CheckboxGroupConsumer>
                )}
              </AutoId>
            )}
          </SuomifiThemeConsumer>
        )}
      </SpacingConsumer>
    );
  },
);

Checkbox.displayName = 'Checkbox';
export { Checkbox };
