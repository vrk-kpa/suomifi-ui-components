import React, { Component } from 'react';
import classnames from 'classnames';
import { HtmlDiv, HtmlSpan } from '../../reset';
import { VisuallyHidden } from '../Visually-hidden/Visually-hidden';
import { idGenerator } from '../../utils/uuid';
import { logger } from '../../utils/logger';

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
  /** Name for the group; this will be set to Radiobuttons. Overrides Radiobutton props name. */
  name: string;
  /** Controlled value of the selected Radiobutton in the group. Overrides Radiobutton selected values. */
  value?: string;
  /** Value of the Radiobutton selected by default */
  defaultValue?: string;
  /** Callback for RadiobuttonGroup selected changes. */
  onChange?: (value: string) => void;
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
) => {
  const radiobuttonValues: string[] = [];

  return React.Children.map(
    children,
    (child: React.ReactElement<RadiobuttonProps>) => {
      if (React.isValidElement(child) && child.props.value) {
        if (radiobuttonValues.includes(child.props.value)) {
          logger.error('Two or more radiobuttons have same value.');
        } else {
          radiobuttonValues.push(child.props.value);
        }

        return React.cloneElement(child, {
          radiobuttonGroup: true,
          checked: selectedValue === child.props.value,
          name: groupName,
        });
      }
      return child;
    },
  );
};

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
