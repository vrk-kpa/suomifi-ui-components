import React, { Component, RefObject, forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlButtonProps, HtmlButton } from '../../../reset';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import { baseStyles } from './InputToggleButton.baseStyles';
import { IconArrowheadDown, IconArrowheadUp } from 'suomifi-icons/baseIcons';

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

const iconProps = {
  'aria-hidden': true,
  className: InputToggleButtonClassNames.icon,
};

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
        {open ? (
          <IconArrowheadUp {...iconProps} />
        ) : (
          <IconArrowheadDown {...iconProps} />
        )}
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
