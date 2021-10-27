import React, { Component, forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import {
  HtmlDiv,
  HtmlDivWithRef,
  HtmlButton,
  HtmlButtonProps,
} from '../../../reset';
import { Icon } from '../../Icon/Icon';
import {
  BaseNotificationProps,
  notificationClassNames,
  baseClassName,
} from '../BaseNotification/BaseNotification';
import { AutoId } from '../../utils/AutoId/AutoId';
import { getConditionalAriaProp } from '../../../utils/aria';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { baseStyles } from './Notification.baseStyles';

export interface NotificationProps extends BaseNotificationProps {
  /** Text to label the close button. Visible + `aria-label` in regular size and only used as `aria-label` in small screen variant */
  closeText: string;
  /** Click handler for the close button */
  onCloseButtonClick?: () => void;
  /** Custom props passed to the close button */
  closeButtonProps?: Omit<HtmlButtonProps, 'onClick' | 'aria-label'>;
  /** Use small screen styling */
  smallScreen?: boolean;
}

interface InnerRef {
  forwardedRef: React.RefObject<HTMLDivElement>;
}

class BaseNotification extends Component<NotificationProps & InnerRef> {
  render() {
    const {
      className,
      status = 'neutral',
      ariaLiveMode = 'assertive',
      labelText,
      children,
      id,
      closeText,
      onCloseButtonClick,
      smallScreen,
      closeButtonProps = {},
      ...passProps
    } = this.props;

    const {
      className: customCloseButtonClassName,
      'aria-describedby': closeButtonPropsAriaDescribedBy,
      ...closeButtonPassProps
    } = closeButtonProps;

    const variantIcon = status === 'neutral' ? 'info' : status;
    return (
      <HtmlDivWithRef
        as="section"
        {...passProps}
        className={classnames(baseClassName, className, {
          [`${baseClassName}--${status}`]: !!status,
          [notificationClassNames.smallScreen]: !!smallScreen,
        })}
      >
        <HtmlDiv className={notificationClassNames.styleWrapper}>
          <HtmlDiv className={notificationClassNames.iconWrapper}>
            <Icon icon={variantIcon} className={notificationClassNames.icon} />
          </HtmlDiv>

          <HtmlDiv
            className={notificationClassNames.textContentWrapper}
            id={id}
            aria-live={ariaLiveMode}
          >
            <HtmlDiv className={notificationClassNames.content}>
              {children}
            </HtmlDiv>
          </HtmlDiv>
          <HtmlDiv className={notificationClassNames.closeButtonWrapper}>
            <HtmlButton
              className={classnames(
                notificationClassNames.closeButton,
                customCloseButtonClassName,
              )}
              {...getConditionalAriaProp('aria-describedby', [
                id,
                closeButtonPropsAriaDescribedBy,
              ])}
              onClick={onCloseButtonClick}
              {...getConditionalAriaProp('aria-label', [closeText])}
              {...closeButtonPassProps}
            >
              {!smallScreen ? closeText?.toUpperCase() : ''}
              <Icon icon="close" />
            </HtmlButton>
          </HtmlDiv>
        </HtmlDiv>
      </HtmlDivWithRef>
    );
  }
}

const StyledNotification = styled(
  (props: NotificationProps & InnerRef & SuomifiThemeProp) => {
    const { theme, ...passProps } = props;
    return <BaseNotification {...passProps} />;
  },
)`
  ${({ theme }) => baseStyles(theme)};
`;

export const Notification = forwardRef(
  (props: NotificationProps, ref: React.RefObject<HTMLDivElement>) => {
    const { id: propId, ...passProps } = props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <AutoId id={propId}>
            {(id) => (
              <StyledNotification
                forwardedRef={ref}
                theme={suomifiTheme}
                id={id}
                {...passProps}
              />
            )}
          </AutoId>
        )}
      </SuomifiThemeConsumer>
    );
  },
);
