import React from 'react';
import { styled } from 'styled-components';
import classnames from 'classnames';
import { IconToggle } from 'suomifi-icons';
import { baseStyles } from './ToggleIcon.baseStyles';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../../theme';

const iconBaseClassName = 'fi-toggle_icon';
const iconDisabledClassName = `${iconBaseClassName}--disabled`;
const iconCheckedClassName = `${iconBaseClassName}--checked`;

export interface ToggleIconProps {
  disabled: boolean;
  checked: boolean;
  className?: string;
}

const StyledToggleIcon = styled((props: ToggleIconProps & SuomifiThemeProp) => (
  <IconToggle
    className={classnames(iconBaseClassName, props.className, {
      [iconDisabledClassName]: !!props.disabled,
      [iconCheckedClassName]: !!props.checked,
    })}
  />
))`
  ${({ theme }) => baseStyles(theme)}
`;

export class ToggleIcon extends React.Component<ToggleIconProps> {
  render() {
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <StyledToggleIcon theme={suomifiTheme} {...this.props} />
        )}
      </SuomifiThemeConsumer>
    );
  }
}
