import React, { Component, ReactNode } from 'react';
import classnames from 'classnames';
import { HtmlDiv, HtmlSpan } from '../../reset';
import { VisuallyHidden } from '../Visually-hidden/Visually-hidden';
import { idGenerator } from '../../utils/uuid';

/* import { Radiobutton } from './Radiobutton'; */

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
  /* children: Radiobutton[]; */
  children: ReactNode;
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

export class RadiobuttonGroup extends Component<RadiobuttonGroupProps> {
  render() {
    const {
      children,
      className,
      label,
      labelMode,
      hintText,
      id: propId,
    } = this.props;
    const hideLabel = labelMode === 'hidden';

    const id = idGenerator(propId);
    const hintTextId = `${idGenerator(propId)}-hintText`;

    return (
      <HtmlDiv className={classnames(className)} id={id}>
        {hideLabel ? (
          <VisuallyHidden>{label}</VisuallyHidden>
        ) : (
          <HtmlSpan className={radiobuttonGroupClassNames.label}>
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
          {children}
        </HtmlDiv>
      </HtmlDiv>
    );
  }
}
