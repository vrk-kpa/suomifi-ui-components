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
import { getConditionalAriaProp } from '../../utils/aria';
import { Icon } from '../Icon/Icon';
import { Heading } from '../Heading/Heading';
import { AutoId } from '../utils/AutoId/AutoId';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../theme';
import { baseStyles } from './Notification.baseStyles';
import { VisuallyHidden } from '../..';

export const baseClassName = 'fi-notification';
export const notificationClassNames = {
  styleWrapper: `${baseClassName}_style-wrapper`,
  content: `${baseClassName}_content`,
  contentWrapper: `${baseClassName}_contentWrapper`,
  heading: `${baseClassName}_heading`,
  textContentWrapper: `${baseClassName}_text-content-wrapper`,
  icon: `${baseClassName}_icon`,
  iconWrapper: `${baseClassName}_icon-wrapper`,
  closeButton: `${baseClassName}_close-button`,
  smallScreen: `${baseClassName}--small-screen`,
  actionElementWrapper: `${baseClassName}_action-element-wrapper`,
};

export interface NotificationProps extends HtmlDivWithRefProps {
  /** Style variant. Affects color and icon used.
   * @default 'neutral'
   */
  status?: 'neutral' | 'error';
  /** Set aria-live mode for the Notification text content and heading.
   * @default 'polite'
   */
  ariaLiveMode?: 'polite' | 'assertive' | 'off';
  /** Heading for the Notification */
  headingText?: string;
  /** Main content of the Notification */
  children?: ReactNode;
  /** Elements to be rendered under the notification text. Can be e.g. buttons, links etc. */
  actionElements?: ReactNode;
  /** Heading variant for Notification.
   * @default 'h2'
   */
  headingVariant?: Exclude<hLevels, 'h1'>;
  /** Text to label the close button. Visible + `aria-label` in regular size and only used as `aria-label` in small screen variant */
  closeText: string;
  /** Click handler for the close button */
  onCloseButtonClick?: () => void;
  /** Custom props passed to the close button */
  closeButtonProps?: Omit<HtmlButtonProps, 'onClick' | 'aria-label'>;
  /** Use small screen styling */
  smallScreen?: boolean;
  /** A label to help screen reader users distinguish notification from the rest of the page content.
   * Should simply be the localized word "notification". Will be followed by string ": " */
  accessibilityLabel?: string;
}
interface InnerRef {
  forwardedRef: React.RefObject<HTMLDivElement>;
}

class BaseNotification extends Component<NotificationProps & InnerRef> {
  render() {
    const {
      className,
      accessibilityLabel,
      ariaLiveMode = 'polite',
      status = 'neutral',
      headingText,
      children,
      id,
      actionElements,
      closeText,
      onCloseButtonClick,
      smallScreen,
      closeButtonProps = {},
      headingVariant = 'h2',
      style,
      ...passProps
    } = this.props;

    const {
      className: customCloseButtonClassName,
      'aria-describedby': closeButtonPropsAriaDescribedBy,
      ...closeButtonPassProps
    } = closeButtonProps;
    const variantIcon = status === 'neutral' ? 'info' : 'error';

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
        {actionElements && (
          <HtmlDiv className={notificationClassNames.actionElementWrapper}>
            {actionElements}
          </HtmlDiv>
        )}
        <HtmlDiv className={notificationClassNames.styleWrapper} style={style}>
          <HtmlDiv className={notificationClassNames.iconWrapper}>
            <Icon icon={variantIcon} className={notificationClassNames.icon} />
          </HtmlDiv>

          <HtmlDiv
            className={notificationClassNames.textContentWrapper}
            id={id}
            aria-live={ariaLiveMode}
          >
            <VisuallyHidden>{`${accessibilityLabel}: `}</VisuallyHidden>
            <HtmlDiv className={notificationClassNames.content}>
              {headingText && (
                <Heading
                  variant={headingVariant}
                  className={notificationClassNames.heading}
                >
                  {headingText}
                </Heading>
              )}
              <HtmlDiv className={notificationClassNames.contentWrapper}>
                {children}
              </HtmlDiv>
            </HtmlDiv>
          </HtmlDiv>
          <HtmlButton
            className={classnames(
              notificationClassNames.closeButton,
              customCloseButtonClassName,
            )}
            {...getConditionalAriaProp('aria-label', [
              smallScreen ? closeText : undefined,
            ])}
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
  ${({ theme }) => baseStyles(theme)}
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
