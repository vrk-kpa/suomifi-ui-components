import React, { Component, RefObject } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlButtonProps, HtmlButton } from '../../../reset';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import { Icon } from '../../Icon/Icon';
import { baseStyles } from './InputToggleButton.baseStyles';

const baseClassName = 'fi-input-toggle-button';

const InputToggleButtonClassNames = {
  icon: `${baseClassName}_icon`,
};

export interface InputToggleButtonProps extends HtmlButtonProps {
  open: boolean;
  buttonRef?: RefObject<HTMLButtonElement>;
}

class BaseInputToggleButton extends Component<
  InputToggleButtonProps & SuomifiThemeProp
> {
  render() {
    const {
      className,
      label,
      theme,
      open,
      buttonRef,
      onClick,
      ...passProps
    } = this.props;

    return (
      <HtmlButton
        forwardedRef={buttonRef}
        {...passProps}
        className={classnames(baseClassName, className)}
        onClick={onClick}
      >
        <VisuallyHidden>{label}</VisuallyHidden>
        <Icon
          aria-hidden={true}
          icon={open ? 'arrowheadUp' : 'arrowheadDown'}
          className={InputToggleButtonClassNames.icon}
        />
      </HtmlButton>
    );
  }
}

const StyledInputToggleButton = styled(BaseInputToggleButton)`
  ${({ theme }) => baseStyles(theme)}
`;

export class InputToggleButton extends Component<InputToggleButtonProps> {
  render() {
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <StyledInputToggleButton theme={suomifiTheme} {...this.props} />
        )}
      </SuomifiThemeConsumer>
    );
  }
}
