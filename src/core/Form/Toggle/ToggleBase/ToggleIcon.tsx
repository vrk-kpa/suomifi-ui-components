import React from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { ComponentIcon } from '../../../StaticIcon/StaticIcon';
import { baseStyles } from './ToggleIcon.baseStyles';

const iconBaseClassName = 'fi-toggle_icon';
const iconDisabledClassName = `${iconBaseClassName}--disabled`;
const iconCheckedClassName = `${iconBaseClassName}--checked`;

export interface ToggleIconProps {
  disabled: boolean;
  checked: boolean;
  className?: string;
}

export const ToggleIcon = styled((props: ToggleIconProps) => (
  <ComponentIcon
    icon="toggle"
    className={classnames(iconBaseClassName, props.className, {
      [iconDisabledClassName]: !!props.disabled,
      [iconCheckedClassName]: !!props.checked,
    })}
  />
))`
  ${baseStyles}
`;
