import React, { Component, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import { HtmlDiv, HtmlSpan, HtmlFieldSet, HtmlLegend } from '../../../reset';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import { RadioButtonProps } from './RadioButton';
import { baseStyles } from './RadioButtonGroup.baseStyles';
import { AutoId } from '../../../utils/AutoId';
import classnames from 'classnames';

const baseClassName = 'fi-radio-button-group';
const radioButtonGroupClassNames = {
  container: `${baseClassName}_container`,
  label: `${baseClassName}_label`,
  hintText: `${baseClassName}_hintText`,
};

export interface RadioButtonGroupProps {
  /** Custom classname to extend or customize */ className?: string;
  /** RadioButton or ReactNode */
  children: Array<React.ReactElement<RadioButtonProps> | ReactNode>;
  /** Hint text to be displayed under the label. */
  hintText?: string;
  /** Label for the group */
  labelText: string;
  /** Hide or show label. Label element is always present, but can be visually hidden.
   * @default visible
   */
  labelMode?: 'hidden' | 'visible';
  /**
   * Unique id
   * If no id is specified, one will be generated
   */
  id?: string;
  /** Name for the group; this will be set to RadioButtons. Overrides RadioButton props name. */
  name: string;
  /** Controlled value of the selected RadioButton in the group. */
  value?: string;
  /** Value of the RadioButton selected by default. */
  defaultValue?: string;
  /** Callback for RadioButtonGroup selected changes. */
  onChange?: (value: string) => void;
}

export interface RadioButtonGroupProviderState {
  onRadioButtonChange?: (value: string) => void;
  name?: string;
  selectedValue?: string;
}

const defaultProviderValue: RadioButtonGroupProviderState = {};

const { Provider, Consumer: RadioButtonGroupConsumer } = React.createContext(
  defaultProviderValue,
);

export interface RadioButtonGroupState {
  selectedValue?: string;
}

class BaseRadioButtonGroup extends Component<RadioButtonGroupProps> {
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
      labelText,
      labelMode,
      hintText,
      id,
      name,
      defaultValue,
      onChange,
      ...passProps
    } = this.props;
    const hideLabel = labelMode === 'hidden';

    return (
      <HtmlDiv
        className={classnames(baseClassName, className)}
        id={id}
        {...passProps}
      >
        <HtmlFieldSet>
          <HtmlLegend>
            {hideLabel ? (
              <VisuallyHidden>{labelText}</VisuallyHidden>
            ) : (
              <HtmlSpan className={radioButtonGroupClassNames.label}>
                {labelText}
              </HtmlSpan>
            )}

            {hintText && (
              <HtmlSpan className={radioButtonGroupClassNames.hintText}>
                {hintText}
              </HtmlSpan>
            )}
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
      </HtmlDiv>
    );
  }
}

const StyledRadioButtonGroup = styled(BaseRadioButtonGroup)`
  ${baseStyles}
`;

/**
 * Use for grouping RadioButtons.<br />
 * Always overrides nested RadioButtons' name, checked and defaultChecked props.
 * Use RadioButtonGroup's name, value and defaultValue instead.
 */
export class RadioButtonGroup extends Component<RadioButtonGroupProps> {
  render() {
    const { id: propId, ...passProps } = this.props;
    return (
      <AutoId id={propId}>
        {(id) => <StyledRadioButtonGroup id={id} {...passProps} />}
      </AutoId>
    );
  }
}

export { RadioButtonGroupConsumer };
