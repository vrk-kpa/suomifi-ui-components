import React, { Component, forwardRef } from 'react';
import classnames from 'classnames';
import { default as styled } from 'styled-components';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { HtmlButton, HtmlButtonProps } from '../../../reset';
import { Icon } from '../../Icon/Icon';
import { baseStyles } from './TooltipButton.baseStyles';

const baseClassName = 'fi-tooltip';

const tooltipClassNames = {
  toggleButton: `${baseClassName}_toggle-button`,
  toggleButtonIcon: `${baseClassName}_toggle-button_icon`,
};

interface TooltipButtonProps extends HtmlButtonProps {}

interface InnerRef {
  forwardedRef: React.RefObject<HTMLButtonElement>;
}

class BaseTooltipButton extends Component<
  TooltipButtonProps & InnerRef & { className?: string }
> {
  render() {
    const { className, 'aria-label': ariaLabel, ...passProps } = this.props;

    return (
      <HtmlButton
        className={classnames(className, tooltipClassNames.toggleButton)}
        aria-label={ariaLabel}
        {...passProps}
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
  (props: TooltipButtonProps, ref: React.RefObject<HTMLButtonElement>) => (
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
