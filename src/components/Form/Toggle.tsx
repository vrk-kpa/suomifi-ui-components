import React, {
  Component,
  ReactElement,
  ReactNode,
  ComponentClass,
  FunctionComponent,
} from 'react';
import { idGenerator } from '../../utils/uuid';
import { ToggleInput } from './ToggleInput';
import { ToggleButton } from './ToggleButton';

export { ToggleButton, ToggleInput };
export const baseClassName = 'fi-toggle';

export interface ToggleInputProps {
  /** State of input checkbox */
  checked?: boolean;
  /** Custom classname to extend or customize */
  className?: string;
  /** Disable Button usage */
  disabled?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export interface ToggleProps {
  /** Controlled toggle-state, use onClick to change  */
  checked?: boolean;
  /** Default status of toggle when not using controlled 'checked' state
   * @default false
   */
  defaultChecked?: boolean;
  /** Custom classname to extend or customize */
  className?: string;
  /** Disable usage */
  disabled?: boolean;
  /** Event handler to execute when clicked */
  onClick?: ({ toggleState }: { toggleState: boolean }) => void;
  /**
   * Label element content
   */
  children?: ReactNode;
  /** Use input instead of button */
  withInput?: boolean;
  /** Pass custom props to Toggle's input component/element */
  toggleInputProps?: ToggleInputProps;
  /** Customized ToggleInput-component */
  toggleInputComponent?:
    | ComponentClass<ToggleInputProps>
    | FunctionComponent<ToggleInputProps>
    | ReactElement<ToggleInputProps>;
  /**
   * aria-label for the HTML input-element,
   * alternatively you can define aria-labelledby with label-element id
   */
  'aria-label'?: string;
  'aria-labelledby'?: string;
  /** Unique id
   * @default uuidV4
   */
  id?: string;
}

export interface ToggleState {
  toggleState: boolean;
}

export class Toggle extends Component<ToggleProps> {
  render() {
    const { withInput, id: propId, ...passProps } = this.props;
    const id = idGenerator(propId);
    const newToggleProps = {
      id,
      ...passProps,
    };

    return !!withInput ? (
      <ToggleInput {...newToggleProps} />
    ) : (
      <ToggleButton {...newToggleProps} />
    );
  }
}
