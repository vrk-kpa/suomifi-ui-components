import React, { Component, forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { AutoId } from '../../../utils/AutoId/AutoId';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../../theme';
import {
  spacingStyles,
  separateMarginProps,
  MarginProps,
} from '../../../theme/utils/spacing';
import { getConditionalAriaProp } from '../../../../utils/aria';
import { Text } from '../../../Text/Text';
import {
  HtmlLabel,
  HtmlSpan,
  HtmlInputProps,
  HtmlInput,
} from '../../../../reset';
import { ToggleIcon } from '../ToggleBase/ToggleIcon';
import { ToggleBaseProps, baseClassName } from '../ToggleBase/ToggleBase';
import { baseStyles } from './ToggleInput.baseStyles';

const toggleClassNames = {
  disabled: `${baseClassName}--disabled`,
  input: `${baseClassName}--input`,
  inputElement: `${baseClassName}_input-element`,
  label: `${baseClassName}_label`,
  iconContainer: `${baseClassName}_icon-container`,
};

interface ToggleState {
  toggleState: boolean;
}

export interface ToggleInputProps
  extends ToggleBaseProps,
    MarginProps,
    Omit<HtmlInputProps, 'onChange' | 'type'> {
  /** HTML name attribute for the input */
  name?: string;
  /** Callback fired on input value change */
  onChange?: (checked: boolean) => void;
  /** Ref object is forwarded to the underlying input element. Alternative to React `ref` attribute. */
  forwardedRef?: React.RefObject<HTMLInputElement>;
}

class BaseToggleInput extends Component<ToggleInputProps> {
  state: ToggleState = {
    toggleState: !!this.props.checked || !!this.props.defaultChecked,
  };

  static getDerivedStateFromProps(
    nextProps: ToggleBaseProps,
    prevState: ToggleState,
  ) {
    const { checked } = nextProps;
    if (checked !== undefined && checked !== prevState.toggleState) {
      return { toggleState: checked };
    }
    return null;
  }

  handleChange = () => {
    const { checked, onChange } = this.props;
    const { toggleState } = this.state;
    if (checked === undefined) {
      this.setState({ toggleState: !toggleState });
    }
    if (!!onChange) {
      onChange(!toggleState);
    }
  };

  render() {
    const {
      children,
      disabled = false,
      onChange,
      id,
      name,
      className,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      checked,
      defaultChecked: dissMissDefaultChecked,
      style,
      ...rest
    } = this.props;
    const [marginProps, passProps] = separateMarginProps(rest);
    const marginStyle = spacingStyles(marginProps);
    const { toggleState } = this.state;

    return (
      <HtmlSpan
        className={classnames(
          className,
          baseClassName,
          toggleClassNames.input,
          {
            [toggleClassNames.disabled]: !!disabled,
          },
        )}
        style={{ ...marginStyle, ...style }}
      >
        <HtmlLabel className={toggleClassNames.label} htmlFor={id}>
          <HtmlInput
            {...passProps}
            checked={!!toggleState}
            id={id}
            name={name}
            disabled={disabled}
            className={toggleClassNames.inputElement}
            onChange={this.handleChange}
            type="checkbox"
            {...getConditionalAriaProp('aria-label', [ariaLabel])}
            {...getConditionalAriaProp('aria-labelledby', [ariaLabelledBy])}
          />
          <HtmlSpan className={toggleClassNames.iconContainer}>
            <ToggleIcon disabled={disabled} checked={toggleState} />
          </HtmlSpan>
          <Text color={!!disabled ? 'depthBase' : 'blackBase'}>{children}</Text>
        </HtmlLabel>
      </HtmlSpan>
    );
  }
}

const StyledToggleInput = styled(
  (props: ToggleBaseProps & SuomifiThemeProp) => {
    const { theme, ...passProps } = props;
    return <BaseToggleInput {...passProps} />;
  },
)`
  ${({ theme }) => baseStyles(theme)}
`;

const ToggleInput = forwardRef(
  (props: ToggleInputProps, ref: React.RefObject<HTMLInputElement>) => {
    const { id: propId, ...passProps } = props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <AutoId id={propId}>
            {(id) => (
              <StyledToggleInput
                theme={suomifiTheme}
                id={id}
                forwardedRef={ref}
                {...passProps}
              />
            )}
          </AutoId>
        )}
      </SuomifiThemeConsumer>
    );
  },
);

ToggleInput.displayName = 'ToggleInput';
export { ToggleInput };
