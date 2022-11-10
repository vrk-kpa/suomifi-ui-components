import React, { Component, forwardRef, RefObject, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classNames from 'classnames';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import {
  HtmlButton,
  HtmlDivWithRef,
  HtmlDivWithRefProps,
} from '../../../reset';
import { Icon } from '../../Icon/Icon';
import { baseStyles } from './TooltipContent.baseStyles';

const baseClassName = 'fi-tooltip';

const tooltipContentClassNames = {
  content: `${baseClassName}_content`,
  arrowHidden: `${baseClassName}_content--arrow-hidden`,
  closeButton: `${baseClassName}_close-button`,
  closeButtonIcon: `${baseClassName}_close-button_icon`,
};

interface TooltipContentProps extends HtmlDivWithRefProps {
  /** Offset for positioning the arrow */
  arrowOffsetPx: number;
  /** Close button label for the screen readers */
  ariaCloseButtonLabelText: string;
  /** Content to be displayed in the tooltip */
  children: ReactNode;
  /** Classname for custom styling */
  // eslint-disable-next-line react/require-default-props
  className?: string;
  /** Event to be called when close button is clicked. */
  onCloseButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface InnerRef {
  forwardedRef: RefObject<HTMLDivElement>;
}

class BaseTooltipContent extends Component<TooltipContentProps & InnerRef> {
  render() {
    const {
      children,
      arrowOffsetPx,
      onCloseButtonClick,
      forwardedRef,
      ariaCloseButtonLabelText,
      className,
      ...passProps
    } = this.props;
    return (
      <HtmlDivWithRef
        {...passProps}
        forwardedRef={forwardedRef}
        className={classNames(tooltipContentClassNames.content, className, {
          [tooltipContentClassNames.arrowHidden]: arrowOffsetPx < 1,
        })}
      >
        {children}
        <HtmlButton
          aria-label={ariaCloseButtonLabelText}
          onClick={onCloseButtonClick}
          className={tooltipContentClassNames.closeButton}
        >
          <Icon
            className={tooltipContentClassNames.closeButtonIcon}
            icon="close"
          />
        </HtmlButton>
      </HtmlDivWithRef>
    );
  }
}

const StyledTooltipContent = styled(
  ({
    theme,
    ...passProps
  }: TooltipContentProps & InnerRef & SuomifiThemeProp) => (
    <BaseTooltipContent {...passProps} />
  ),
)`
  ${({ theme, arrowOffsetPx }) => baseStyles(arrowOffsetPx, theme)}
`;

export const TooltipContent = forwardRef(
  (props: TooltipContentProps, ref: RefObject<HTMLDivElement>) => (
    <SuomifiThemeConsumer>
      {({ suomifiTheme }) => (
        <StyledTooltipContent
          theme={suomifiTheme}
          forwardedRef={ref}
          {...props}
        />
      )}
    </SuomifiThemeConsumer>
  ),
);
