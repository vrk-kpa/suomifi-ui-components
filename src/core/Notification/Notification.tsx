import React, { Component, forwardRef, ReactNode } from 'react';

import { default as styled } from 'styled-components';
import classnames from 'classnames';
import {
  HtmlDiv,
  HtmlDivWithRef,
  HtmlButton,
  HtmlButtonProps,
  HtmlDivWithRefProps,
} from '../../reset';
import { hLevels } from '../../reset/HtmlH/HtmlH';
import { Icon } from '../Icon/Icon';
import { Heading } from '../Heading/Heading';

import { AutoId } from '../utils/AutoId/AutoId';
import { getConditionalAriaProp } from '../../utils/aria';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../theme';
import { baseStyles } from './Notification.baseStyles';

export const baseClassName = 'fi-notification';

export const notificationClassNames = {
  styleWrapper: `${baseClassName}_style-wrapper`,
  content: `${baseClassName}_content`,
  label: `${baseClassName}_label`,
  textContentWrapper: `${baseClassName}_text-content-wrapper`,
  icon: `${baseClassName}_icon`,
  iconWrapper: `${baseClassName}_icon-wrapper`,
  closeButton: `${baseClassName}_close-button`,
  closeButtonWrapper: `${baseClassName}_close-button-wrapper`,
  smallScreen: `${baseClassName}--small-screen`,
  actionElementWrapper: `${baseClassName}_action-element-wrapper`,
};

export interface NotificationProps extends HtmlDivWithRefProps {
  /** Style variant. Affects color and icon used.
   * @default 'neutral'
   */
  status?: 'neutral' | 'success' | 'error';
  /** Set aria-live mode for the Notification text content and label.
   * @default 'polite'
   */
  ariaLiveMode?: 'polite' | 'assertive' | 'off';
  /** Label for the Notification */
  labelText?: string;
  /** Main content of the Notification */
  children?: ReactNode;
  /** Elements to be rendered under the notification text. Can be e.g. buttons, links etc. */
  actionElements?: ReactNode;
  /** Header variant for Notification */
  headingVariant?: hLevels;
  /** Text to label the close button. Visible + `aria-label` in regular size and only used as `aria-label` in small screen variant */
  closeText: string;
  /** Click handler for the close button */
  onCloseButtonClick?: () => void;
  /** Custom props passed to the close button */
  closeButtonProps?: Omit<HtmlButtonProps, 'onClick' | 'aria-label'>;
  /** Use small screen styling */
  smallScreen?: boolean;
  /** LabelText is header of component */
}
interface InnerRef {
  forwardedRef: React.RefObject<HTMLDivElement>;
}

class BaseNotification extends Component<NotificationProps & InnerRef> {
  render() {
    const {
      className,
      ariaLiveMode = 'polite',
      status = 'neutral',
      labelText,
      children,
      id,
      actionElements,
      closeText,
      onCloseButtonClick,
      smallScreen,
      closeButtonProps = {},
      headingVariant,
      ...passProps
    } = this.props;

    const {
      className: customCloseButtonClassName,
      'aria-describedby': closeButtonPropsAriaDescribedBy,
      ...closeButtonPassProps
    } = closeButtonProps;
    const variantIcon = status === 'neutral' ? 'info' : 'error';
    const buttonAriaLabelSmallScreen = smallScreen
      ? getConditionalAriaProp('aria-label', [closeText])
      : false;

    return (
      <HtmlDivWithRef
        as="section"
        {...passProps}
        className={classnames(
          baseClassName,
          `${baseClassName}--${status}`,
          className,
          {
            [notificationClassNames.smallScreen]: !!smallScreen,
          },
        )}
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
              {labelText && (
                <Heading
                  variant={headingVariant || 'h2'}
                  className={notificationClassNames.label}
                >
                  {labelText}
                </Heading>
              )}
              {children}
            </HtmlDiv>
          </HtmlDiv>
          <HtmlDiv className={notificationClassNames.closeButtonWrapper}>
            <HtmlButton
              className={classnames(
                notificationClassNames.closeButton,
                customCloseButtonClassName,
              )}
              {...buttonAriaLabelSmallScreen}
              {...getConditionalAriaProp('aria-describedby', [
                id,
                closeButtonPropsAriaDescribedBy,
              ])}
              onClick={onCloseButtonClick}
              {...closeButtonPassProps}
            >
              {!smallScreen ? closeText : ''}
              <Icon icon="close" />
            </HtmlButton>
          </HtmlDiv>
        </HtmlDiv>
        {actionElements && (
          <HtmlDiv className={notificationClassNames.actionElementWrapper}>
            {actionElements}
          </HtmlDiv>
        )}
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
