import React, { Component } from 'react';
import classnames from 'classnames';
import { HtmlDiv, HtmlSpan } from '../../reset';
import { VisuallyHidden } from '../Visually-hidden/Visually-hidden';
import { idGenerator } from '../../utils/uuid';
import { logger } from '../../utils/logger';

import { RadioButtonProps } from './RadioButton';

const baseClassName = 'fi-radio-button-group';
const radioButtonGroupClassNames = {
  container: `${baseClassName}_container`,
  label: `${baseClassName}_label`,
  hintText: `${baseClassName}_hintText`,
};

type Label = 'hidden' | 'visible';

export interface RadioButtonGroupProps {
  /** Custom classname to extend or customize */
  className?: string;
  /** RadioButton or RadioButtonDivider */
  children: Array<React.ReactElement<RadioButtonProps>>;
  /** Hint text to be displayed under the label. */
  hintText?: string;
  /** Label for the group */
  label: string;
  /** Hide or show label. Label element is always present, but can be visually hidden.
   * @default visible
   */
  labelMode?: Label;
  /**
   * Unique id
   * If no id is specified, one will be generated using uuid
   * @default uuidV4
   */
  id?: string;
  /** Name for the group; this will be set to RadioButtons. Overrides RadioButton props name. */
  name: string;
  /** Controlled value of the selected RadioButton in the group. Overrides RadioButton selected values. */
  value?: string;
  /** Value of the RadioButton selected by default */
  defaultValue?: string;
  /** Callback for RadioButtonGroup selected changes. */
  onChange?: (value: string) => void;
}

export interface RadioButtonGroupProviderState {
  onRadioButtonChange: (value: string) => void;
}

const defaultProviderValue: RadioButtonGroupProviderState = {
  onRadioButtonChange: () => null,
};

const { Provider, Consumer: RadioButtonGroupConsumer } = React.createContext(
  defaultProviderValue,
);

const RadioButtonGroupItems = (
  children: Array<React.ReactElement<RadioButtonProps>>,
  groupName: string,
  selectedValue?: string,
) => {
  const radioButtonValues: string[] = [];

  return React.Children.map(
    children,
    (child: React.ReactElement<RadioButtonProps>) => {
      if (React.isValidElement(child) && child.props.value) {
        if (radioButtonValues.includes(child.props.value)) {
          logger.error('Two or more radio buttons have same value.');
        } else {
          radioButtonValues.push(child.props.value);
        }

        return React.cloneElement(child, {
          radioButtonGroup: true,
          checked: selectedValue === child.props.value,
          name: groupName,
        });
      }
      return child;
    },
  );
};

export interface RadioButtonGroupState {
  selectedValue?: string;
}

export class RadioButtonGroup extends Component<RadioButtonGroupProps> {
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
      label,
      labelMode,
      hintText,
      id: propId,
      name,
      defaultValue: dismissDefaultValue,
      onChange,
      ...passProps
    } = this.props;
    const { selectedValue } = this.state;
    const hideLabel = labelMode === 'hidden';

    const id = idGenerator(propId);
    const labelId = `${idGenerator(propId)}-label`;
    const hintTextId = `${idGenerator(propId)}-hintText`;
    const labelledBy = [labelId, ...(hintText ? [hintTextId] : [])].join(' ');

    return (
      <HtmlDiv
        className={classnames(className)}
        id={id}
        role="group"
        aria-labelledby={labelledBy}
        {...passProps}
      >
        {hideLabel ? (
          <VisuallyHidden id={labelId}>{label}</VisuallyHidden>
        ) : (
          <HtmlSpan className={radioButtonGroupClassNames.label} id={labelId}>
            {label}
          </HtmlSpan>
        )}
        {hintText && (
          <HtmlSpan
            className={radioButtonGroupClassNames.hintText}
            id={hintTextId}
          >
            {hintText}
          </HtmlSpan>
        )}
        <HtmlDiv className={radioButtonGroupClassNames.container}>
          <Provider
            value={{
              onRadioButtonChange: this.handleRadioButtonChange,
            }}
          >
            {RadioButtonGroupItems(children, name, selectedValue)}
          </Provider>
        </HtmlDiv>
      </HtmlDiv>
    );
  }
}

export { RadioButtonGroupConsumer };
