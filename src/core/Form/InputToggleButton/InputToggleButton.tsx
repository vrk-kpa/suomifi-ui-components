import React, { Component, RefObject, forwardRef } from 'react';
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
  /** Open state of the input related menu for arrow icon direction */
  open: boolean;
}

interface InnerRef {
  forwardedRef: React.RefObject<HTMLButtonElement>;
}

class BaseInputToggleButton extends Component<
  InputToggleButtonProps & InnerRef & SuomifiThemeProp
> {
  render() {
    const {
      className,
      label,
      theme,
      open,
      forwardedRef,
      onClick,
      ...passProps
    } = this.props;

    return (
      <HtmlButton
        forwardedRef={forwardedRef}
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

const InputToggleButton = forwardRef(
  (props: InputToggleButtonProps, ref: RefObject<HTMLButtonElement>) => (
    <SuomifiThemeConsumer>
      {({ suomifiTheme }) => (
        <StyledInputToggleButton
          theme={suomifiTheme}
          forwardedRef={ref}
          {...props}
        />
      )}
    </SuomifiThemeConsumer>
  ),
);

InputToggleButton.displayName = 'InputToggleButton';
export { InputToggleButton };
