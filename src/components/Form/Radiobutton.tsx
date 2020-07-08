import React, { Component, ReactNode } from 'react';
import classnames from 'classnames';
import { HtmlInput, HtmlLabel, HtmlSpan, HtmlDiv } from '../../reset';
import { idGenerator } from '../../utils/uuid';

const baseClassName = 'fi-radiobutton';

const radiobuttonClassNames = {
  container: `${baseClassName}_container`,
  input: `${baseClassName}_input`,
  label: `${baseClassName}_label`,
  hintText: `${baseClassName}_hintText`,
};

export interface RadiobuttonProps {
  /** Custom classname to extend or customize */
  className?: string;
  /**
   * Label element content
   */
  children?: ReactNode;
  name: string;
  value: string;
  /**
   * Unique id
   * If no id is specified, one will be generated using uuid
   * @default uuidV4
   */
  id?: string;
  /**
   * Hint text to be displayed under the label.
   */
  hintText?: string;
}

export class Radiobutton extends Component<RadiobuttonProps> {
  render() {
    const {
      id: propId,
      name,
      children,
      value,
      hintText,
      className,
    } = this.props;

    const id = idGenerator(propId);
    const hintTextId = `${idGenerator(propId)}-hintText`;

    return (
      <HtmlDiv
        className={classnames(radiobuttonClassNames.container, className)}
      >
        <HtmlInput
          className={radiobuttonClassNames.input}
          type="radio"
          name={name}
          value={value}
          id={id}
        />
        <HtmlLabel className={radiobuttonClassNames.label} htmlFor={id}>
          {children}
        </HtmlLabel>
        <HtmlSpan className={radiobuttonClassNames.hintText} id={hintTextId}>
          {hintText}
        </HtmlSpan>
      </HtmlDiv>
    );
  }
}
