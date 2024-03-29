import React, { Component, forwardRef, ReactElement, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import {
  spacingStyles,
  separateMarginProps,
  MarginProps,
} from '../../theme/utils/spacing';
import {
  HtmlDiv,
  HtmlDivWithRef,
  HtmlDivWithRefProps,
  HtmlFieldSet,
  HtmlLegend,
} from '../../../reset';
import { Label } from '../Label/Label';
import { HintText } from '../HintText/HintText';
import { RadioButtonProps } from './RadioButton';
import { baseStyles } from './RadioButtonGroup.baseStyles';
import { AutoId } from '../../utils/AutoId/AutoId';
import classnames from 'classnames';

const baseClassName = 'fi-radio-button-group';
const radioButtonGroupClassNames = {
  legend: `${baseClassName}_legend`,
  labelWithMargin: `${baseClassName}_label--with-margin`,
  container: `${baseClassName}_container`,
};

export interface RadioButtonGroupProps
  extends MarginProps,
    Omit<HtmlDivWithRefProps, 'onChange'> {
  /** CSS class for custom styles */
  className?: string;
  /** Use `<RadioButton>` components as children */
  children: Array<React.ReactElement<RadioButtonProps> | ReactNode>;
  /** Hint text to be displayed under the group label. */
  groupHintText?: string;
  /** Label for the group */
  labelText: ReactNode;
  /** Hides or shows the  group label. Label element is always present, but can be visually hidden.
   * @default visible
   */
  labelMode?: 'hidden' | 'visible';
  /** Text to mark a selection in the group as optional. Will be wrapped in parentheses and shown after labelText. */
  optionalText?: string;
  /**
   * HTML id attribute
   * If no id is specified, one will be generated
   */
  id?: string;
  /** Name for the group. Is set to children RadioButtons. Overrides individual RadioButton names. */
  name: string;
  /** Controlled value of the selected RadioButton in the group. */
  value?: string;
  /** Value of the RadioButton selected by default. */
  defaultValue?: string;
  /** Callback fired when RadioButtonGroup selected value changes. */
  onChange?: (value: string) => void;
  /** Tooltip component for the group's label */
  tooltipComponent?: ReactElement;
  /** Ref is placed to the outermost div element of the component. Alternative for React `ref` attribute. */
  forwardedRef?: React.RefObject<HTMLDivElement>;
}

export interface RadioButtonGroupProviderState {
  onRadioButtonChange?: (value: string) => void;
  name?: string;
  selectedValue?: string;
}

const defaultProviderValue: RadioButtonGroupProviderState = {};

const { Provider, Consumer: RadioButtonGroupConsumer } =
  React.createContext(defaultProviderValue);

export interface RadioButtonGroupState {
  selectedValue?: string;
}

class BaseRadioButtonGroup extends Component<
  RadioButtonGroupProps & SuomifiThemeProp
> {
  state: RadioButtonGroupState = {
    selectedValue: this.props.value || this.props.defaultValue,
  };

  static getDerivedStateFromProps(
    nextProps: RadioButtonGroupProps,
    prevState: RadioButtonGroupState,
  ) {
    const { value } = nextProps;
    if (value !== undefined && value !== prevState.selectedValue) {
      return { selectedValue: value };
    }
    return null;
  }

  handleRadioButtonChange = (value: string) => {
    if (!!this.props.onChange) {
      this.props.onChange(value);
    }
    if (!('value' in this.props)) {
      this.setState({ selectedValue: value });
    }
  };

  render() {
    const {
      children,
      className,
      theme,
      labelText,
      labelMode,
      optionalText,
      groupHintText,
      id,
      name,
      defaultValue,
      onChange,
      tooltipComponent,
      style,
      ...rest
    } = this.props;
    const [marginProps, passProps] = separateMarginProps(rest);
    const marginStyle = spacingStyles(marginProps);

    return (
      <HtmlDivWithRef
        className={classnames(baseClassName, className)}
        id={id}
        {...passProps}
        style={{ ...marginStyle, ...style }}
      >
        <HtmlFieldSet>
          <HtmlLegend className={radioButtonGroupClassNames.legend}>
            <Label
              htmlFor={id}
              labelMode={labelMode}
              optionalText={optionalText}
              className={classnames({
                [radioButtonGroupClassNames.labelWithMargin]: groupHintText,
              })}
              tooltipComponent={tooltipComponent}
            >
              {labelText}
            </Label>

            <HintText>{groupHintText}</HintText>
          </HtmlLegend>
          <HtmlDiv className={radioButtonGroupClassNames.container}>
            <Provider
              value={{
                onRadioButtonChange: this.handleRadioButtonChange,
                selectedValue: this.state.selectedValue,
                name,
              }}
            >
              {children}
            </Provider>
          </HtmlDiv>
        </HtmlFieldSet>
      </HtmlDivWithRef>
    );
  }
}

const StyledRadioButtonGroup = styled(BaseRadioButtonGroup)`
  ${({ theme }) => baseStyles(theme)}
`;

const RadioButtonGroup = forwardRef(
  (props: RadioButtonGroupProps, ref: React.RefObject<HTMLDivElement>) => {
    const { id: propId, ...passProps } = props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <AutoId id={propId}>
            {(id) => (
              <StyledRadioButtonGroup
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

RadioButtonGroup.displayName = 'RadioButtonGroup';

export { RadioButtonGroup, RadioButtonGroupConsumer };
