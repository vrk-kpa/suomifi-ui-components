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
  /**
   * Unique id
   * If no id is specified, one will be generated using uuid
   * @default uuidV4
   */
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
  selectedValue?: string,
) =>
  React.Children.map(
    children,
    (child: React.ReactElement<RadiobuttonProps>) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          radiobuttonGroup: true,
          checked: selectedValue === child.props.value,
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
    selectedValue: undefined,
  };

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
            {RadiobuttonGroupItems(children, selectedValue)}
          </Provider>
        </HtmlDiv>
      </HtmlDiv>
    );
  }
}

export { RadiobuttonGroupConsumer };
