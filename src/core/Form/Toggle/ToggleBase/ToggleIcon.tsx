import React from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { ComponentIcon } from '../../../StaticIcon/StaticIcon';
import { baseStyles } from './ToggleIcon.baseStyles';
import { SuomifiTheme, SuomifiThemeConsumer } from '../../../theme';

const iconBaseClassName = 'fi-toggle_icon';
const iconDisabledClassName = `${iconBaseClassName}--disabled`;
const iconCheckedClassName = `${iconBaseClassName}--checked`;

export interface ToggleIconProps {
  disabled: boolean;
  checked: boolean;
  className?: string;
}

const StyledToggleIcon = styled(
  (props: ToggleIconProps & { theme: SuomifiTheme }) => (
    <ComponentIcon
      icon="toggle"
      className={classnames(iconBaseClassName, props.className, {
        [iconDisabledClassName]: !!props.disabled,
        [iconCheckedClassName]: !!props.checked,
      })}
    />
  ),
)`
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
