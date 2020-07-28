import React, { Component } from 'react';
import classnames from 'classnames';
import { HtmlDiv, HtmlSpan } from '../../reset';
import { VisuallyHidden } from '../Visually-hidden/Visually-hidden';
import { idGenerator } from '../../utils/uuid';

import { RadiobuttonProps } from './Radiobutton';

const baseClassName = 'fi-radiobuttongroup';
const radiobuttonGroupClassNames = {
  container: `${baseClassName}_container`,
  label: `${baseClassName}_label`,
  hintText: `${baseClassName}_hintText`,
};

type Label = 'hidden' | 'visible';

export interface RadiobuttonGroupProps {
  /** Custom classname to extend or customize */
  className?: string;
  /** Radiobutton or RadiobuttonDivider */
  children: Array<React.ReactElement<RadiobuttonProps>>;
  /**
   * Hint text to be displayed under the label.
   */
  hintText?: string;
  /** Label for group */
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
  /** Name for the group; this will be set to Radiobuttons */
  name: string;
  /** Value that is selected from group, should match with the value given to Radiobutton */
  value?: string;
  /** Value that is selected by default */
  defaultValue?: string;
}

export interface RadiobuttonGroupProviderState {
  onRadiobuttonChange: (value: string) => void;
}

const defaultProviderValue: RadiobuttonGroupProviderState = {
  onRadiobuttonChange: () => null,
};

const { Provider, Consumer: RadiobuttonGroupConsumer } = React.createContext(
  defaultProviderValue,
);

const RadiobuttonGroupItems = (
  children: Array<React.ReactElement<RadiobuttonProps>>,
  groupName: string,
  selectedValue?: string,
) =>
  React.Children.map(
    children,
    (child: React.ReactElement<RadiobuttonProps>) => {
      if (React.isValidElement(child) && child.props.value) {
        return React.cloneElement(child, {
          radiobuttonGroup: true,
          checked: selectedValue === child.props.value,
          name: groupName,
        });
      }
      return child;
    },
  );

export interface RadiobuttonGroupState {
  selectedValue?: string;
}

export class RadiobuttonGroup extends Component<RadiobuttonGroupProps> {
  state: RadiobuttonGroupState = {
    selectedValue: this.props.value || this.props.defaultValue,
  };

  static getDerivedStateFromProps(
    nextProps: RadiobuttonGroupProps,
    prevState: RadiobuttonGroupState,
  ) {
    const { value } = nextProps;
    if (value !== undefined && value !== prevState.selectedValue) {
      return { selectedValue: value };
    }
    return null;
  }

  handleRadiobuttonChange = (value: string) => {
    this.setState({ selectedValue: value });
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
          <HtmlSpan className={radiobuttonGroupClassNames.label} id={labelId}>
            {label}
          </HtmlSpan>
        )}
        {hintText && (
          <HtmlSpan
            className={radiobuttonGroupClassNames.hintText}
            id={hintTextId}
          >
            {hintText}
          </HtmlSpan>
        )}
        <HtmlDiv className={radiobuttonGroupClassNames.container}>
          <Provider
            value={{
              onRadiobuttonChange: this.handleRadiobuttonChange,
            }}
          >
            {RadiobuttonGroupItems(children, name, selectedValue)}
          </Provider>
        </HtmlDiv>
      </HtmlDiv>
    );
  }
}

export { RadiobuttonGroupConsumer };
