import React, {
  Component,
  forwardRef,
  RefObject,
  ReactNode,
  MouseEvent,
  KeyboardEvent,
} from 'react';
import { default as styled } from 'styled-components';
import classNames from 'classnames';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { HtmlButton } from '../../../reset/HtmlButton/HtmlButton';
import { Icon } from '../../Icon/Icon';
import { baseStyles } from './TooltipContent.baseStyles';

const baseClassName = 'fi-tooltip';

const tooltipContentClassNames = {
  content: `${baseClassName}_content`,
  closeButton: `${baseClassName}_close-button`,
  closeButtonIcon: `${baseClassName}_close-button_icon`,
};

interface TooltipContentProps {
  arrowOffsetPx: number;
  ariaCloseButtonLabelText: string;
  children: ReactNode;
  // eslint-disable-next-line react/require-default-props
  className?: string;
  onCloseButtonClick: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>,
  ) => void;
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
      <div
        {...passProps}
        ref={forwardedRef}
        className={classNames(tooltipContentClassNames.content, className)}
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
      </div>
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
