import React, { Component, forwardRef, MouseEvent, KeyboardEvent } from 'react';
import classnames from 'classnames';
import { default as styled } from 'styled-components';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { HtmlButton } from '../../../reset';
import { Icon } from '../../Icon/Icon';
import { baseStyles } from './TooltipButton.baseStyles';

const baseClassName = 'fi-tooltip';

const tooltipClassNames = {
  toggleButton: `${baseClassName}_toggle-button`,
  toggleButtonIcon: `${baseClassName}_toggle-button_icon`,
};

export interface TooltipButtonProps {
  /** Info button label for screen readers */
  ariaToggleButtonLabelText: string;
  /** ClassName for the toggle button */
  className?: string;
  /** Event handler for toggle button click */
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
}

interface InnerRef {
  forwardedRef: React.RefObject<HTMLButtonElement>;
}

class BaseTooltipButton extends Component<
  TooltipButtonProps & InnerRef & { className?: string }
> {
  render() {
    const { className, forwardedRef, ariaToggleButtonLabelText, onClick } =
      this.props;

    return (
      <HtmlButton
        className={classnames(className, tooltipClassNames.toggleButton)}
        forwardedRef={forwardedRef}
        aria-label={ariaToggleButtonLabelText}
        onClick={onClick}
      >
        <Icon
          icon="infoFilled"
          className={tooltipClassNames.toggleButtonIcon}
        />
      </HtmlButton>
    );
  }
}

const StyledTooltipButton = styled(
  ({
    theme,
    ...passProps
  }: TooltipButtonProps & InnerRef & SuomifiThemeProp) => (
    <BaseTooltipButton {...passProps} />
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

export const TooltipButton = forwardRef(
  (props: TooltipButtonProps, ref: React.RefObject<HTMLButtonElement>) => {
    const { ...passProps } = props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <StyledTooltipButton
            theme={suomifiTheme}
            forwardedRef={ref}
            {...passProps}
          />
        )}
      </SuomifiThemeConsumer>
    );
  },
);
