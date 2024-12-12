import React, { Component, forwardRef } from 'react';
import classnames from 'classnames';
import { styled } from 'styled-components';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { separateMarginProps, MarginProps } from '../../theme/utils/spacing';
import { HtmlButton, HtmlButtonProps } from '../../../reset';
import { baseStyles } from './TooltipToggleButton.baseStyles';
import { IconInfoFilled } from 'suomifi-icons';

const baseClassName = 'fi-tooltip';

const tooltipClassNames = {
  toggleButton: `${baseClassName}_toggle-button`,
  toggleButtonIcon: `${baseClassName}_toggle-button_icon`,
};

interface TooltipToggleButtonProps extends HtmlButtonProps, MarginProps {}

interface InnerRef {
  forwardedRef: React.RefObject<HTMLButtonElement>;
}

class BaseTooltipToggleButton extends Component<
  TooltipToggleButtonProps & InnerRef & { className?: string }
> {
  render() {
    const { className, 'aria-label': ariaLabel, style, ...rest } = this.props;
    const [_marginProps, passProps] = separateMarginProps(rest);

    return (
      <HtmlButton
        className={classnames(className, tooltipClassNames.toggleButton)}
        aria-label={ariaLabel}
        {...passProps}
        style={style}
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
