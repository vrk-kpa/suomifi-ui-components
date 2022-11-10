import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { IconClose } from 'suomifi-icons/baseIcons';
import { baseStyles } from './InputClearButton.baseStyles';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { HtmlButton, HtmlButtonProps } from '../../../reset';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';

const baseClassName = 'fi-input-clear-button';

const InputClearButtonClassNames = {
  icon: `${baseClassName}_icon`,
};

export interface InputClearButtonProps extends HtmlButtonProps {
  /** Clear button label text for screen readers. */
  label: string;
}

class BaseInputClearButton extends Component<
  InputClearButtonProps & SuomifiThemeProp
> {
  render() {
    const { className, label, theme, onClick, ...passProps } = this.props;

    return (
      <HtmlButton
        {...passProps}
        className={classnames(baseClassName, className)}
        onClick={onClick}
      >
        <VisuallyHidden>{label}</VisuallyHidden>
        <IconClose
          aria-hidden={true}
          className={InputClearButtonClassNames.icon}
        />
      </HtmlButton>
    );
  }
}

const StyledInputClearButton = styled(BaseInputClearButton)`
  ${({ theme }) => baseStyles(theme)}
`;

const InputClearButton = (props: InputClearButtonProps) => (
  <SuomifiThemeConsumer>
    {({ suomifiTheme }) => (
      <StyledInputClearButton theme={suomifiTheme} {...props} />
    )}
  </SuomifiThemeConsumer>
);

InputClearButton.displayName = 'InputClearButton';
export { InputClearButton };
