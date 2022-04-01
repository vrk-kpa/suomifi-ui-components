import React, {
  Component,
  forwardRef,
  RefObject,
  ReactNode,
  MouseEvent,
  KeyboardEvent,
} from 'react';
import { default as styled } from 'styled-components';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { HtmlButton } from '../../../reset/HtmlButton/HtmlButton';
import { Icon } from '../../Icon/Icon';
import { baseStyles } from './TooltipContent.baseStyles';

const baseClassName = 'fi-tooltip';

const tooltipContentClassNames = {
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
      ...rest
    } = this.props;
    return (
      <div {...rest} ref={forwardedRef}>
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
  (props: TooltipContentProps, ref: RefObject<HTMLDivElement>) => {
    const { ...passProps } = props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <StyledTooltipContent
            theme={suomifiTheme}
            forwardedRef={ref}
            {...passProps}
          />
        )}
      </SuomifiThemeConsumer>
    );
  },
);
