import React, { Component, forwardRef } from 'react';
import classnames from 'classnames';
import { default as styled } from 'styled-components';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { HtmlButton, HtmlButtonProps } from '../../../reset';
import { baseStyles } from './TooltipToggleButton.baseStyles';
import { IconInfoFilled } from 'suomifi-icons/baseIcons';

const baseClassName = 'fi-tooltip';

const tooltipClassNames = {
  toggleButton: `${baseClassName}_toggle-button`,
  toggleButtonIcon: `${baseClassName}_toggle-button_icon`,
};

interface TooltipToggleButtonProps extends HtmlButtonProps {}

interface InnerRef {
  forwardedRef: React.RefObject<HTMLButtonElement>;
}

class BaseTooltipToggleButton extends Component<
  TooltipToggleButtonProps & InnerRef & { className?: string }
> {
  render() {
    const { className, 'aria-label': ariaLabel, ...passProps } = this.props;

    return (
      <HtmlButton
        className={classnames(className, tooltipClassNames.toggleButton)}
        aria-label={ariaLabel}
        {...passProps}
      >
        <IconInfoFilled className={tooltipClassNames.toggleButtonIcon} />
      </HtmlButton>
    );
  }
}

const StyledTooltipButton = styled(
  ({
    theme,
    ...passProps
  }: TooltipToggleButtonProps & InnerRef & SuomifiThemeProp) => (
    <BaseTooltipToggleButton {...passProps} />
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

export const TooltipToggleButton = forwardRef(
  (
    props: TooltipToggleButtonProps,
    ref: React.RefObject<HTMLButtonElement>,
  ) => (
    <SuomifiThemeConsumer>
      {({ suomifiTheme }) => (
        <StyledTooltipButton
          theme={suomifiTheme}
          forwardedRef={ref}
          {...props}
        />
      )}
    </SuomifiThemeConsumer>
  ),
);
