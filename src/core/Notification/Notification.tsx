import React, { Component, forwardRef, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { IconClose, IconError, IconInfo } from 'suomifi-icons';
import { HtmlDiv, HtmlDivWithRef, HtmlDivWithRefProps } from '../../reset';
import { hLevels } from '../../reset/HtmlH/HtmlH';
import { getConditionalAriaProp } from '../../utils/aria';
import { Heading } from '../Heading/Heading';
import { AutoId } from '../utils/AutoId/AutoId';
import { Button, ButtonProps, LoadingProps } from '../Button/Button';
import {
  SuomifiThemeProp,
  SuomifiThemeConsumer,
  SpacingConsumer,
} from '../theme';
import {
  separateMarginProps,
  MarginProps,
  GlobalMarginProps,
} from '../theme/utils/spacing';
import { baseStyles } from './Notification.baseStyles';
import { filterDuplicateKeys } from '../../utils/common/common';

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

export type CloseButtonProps =
  | {
      showCloseButton: false;
      closeText?: string;
      onCloseButtonClick?: () => void;
      closeButtonProps?: Omit<ButtonProps, 'onClick' | keyof LoadingProps>;
    }
  | {
      /** Show or hide close button
       * @default true
       */
      showCloseButton?: true;
      /**
       * Text to label the close button.
       * Is visible and as `aria-label` in regular size and only used as `aria-label` in small screen variant.
       * Required when clear button is shown.
       */
      closeText: string;
      /** Callback fired on close button click */
      onCloseButtonClick?: () => void;
      /** Custom props passed to the close button */
      closeButtonProps?: Omit<ButtonProps, 'onClick'>;
    };

export type NotificationProps = HtmlDivWithRefProps &
  MarginProps &
  CloseButtonProps & {
    /** Style variant. Affects color and icon used.
     * @default 'neutral'
     */
    status?: 'neutral' | 'error';
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
    /** Toggles small screen styling */
    smallScreen?: boolean;
    /** Label for the notification region for screen reader users.
     * If one is not provided, `headingText` or finally notification content will be used as the label.
     */
    regionAriaLabel?: string;
  };

interface InnerRef {
  forwardedRef: React.RefObject<HTMLDivElement>;
}

class BaseNotification extends Component<NotificationProps & InnerRef> {
  render() {
    const {
      className,
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
      regionAriaLabel,
      showCloseButton = true,
      ...rest
    } = this.props;
    const [_marginProps, passProps] = separateMarginProps(rest);

    const {
      className: customCloseButtonClassName,
      'aria-describedby': closeButtonPropsAriaDescribedBy,
      'aria-label': closeButtonPropsAriaLabel,
      ...closeButtonPassProps
    } = closeButtonProps;
    // const variantIcon = status === 'neutral' ? 'info' : 'error';

    return (
      <HtmlDivWithRef
        as="section"
        role="region"
        aria-label={regionAriaLabel || headingText || children}
        {...passProps}
        className={classnames(
          baseClassName,
          `${baseClassName}--${status}`,
          className,
          {
            [notificationClassNames.smallScreen]: !!smallScreen,
          },
        )}
        style={style}
      >
        <HtmlDiv className={notificationClassNames.styleWrapper} style={style}>
          <HtmlDiv className={notificationClassNames.iconWrapper}>
            {status === 'error' && (
              <IconError
                className={classnames(notificationClassNames.icon, {
                  [`${notificationClassNames.icon}--${status}`]: !!status,
                })}
              />
            )}
            {status === 'neutral' && (
              <IconInfo
                className={classnames(notificationClassNames.icon, {
                  [`${notificationClassNames.icon}--${status}`]: !!status,
                })}
              />
            )}
          </HtmlDiv>

          <HtmlDiv
            className={notificationClassNames.textContentWrapper}
            id={id}
          >
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
          {showCloseButton && (
            <Button
              variant="secondaryNoBorder"
              className={classnames(
                notificationClassNames.closeButton,
                customCloseButtonClassName,
              )}
              {...getConditionalAriaProp('aria-label', [
                closeButtonPropsAriaLabel ||
                  (smallScreen ? closeText : undefined),
              ])}
              {...getConditionalAriaProp('aria-describedby', [
                closeButtonPropsAriaDescribedBy,
              ])}
              onClick={onCloseButtonClick}
              {...closeButtonPassProps}
              iconRight={<IconClose />}
            >
              {!smallScreen ? closeText : ''}
            </Button>
          )}
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
  (
    props: NotificationProps & InnerRef & SuomifiThemeProp & GlobalMarginProps,
  ) => {
    const { theme, globalMargins, ...passProps } = props;
    return <BaseNotification {...passProps} />;
  },
)`
  ${({ theme, globalMargins, ...rest }) => {
    const [marginProps, _passProps] = separateMarginProps(rest);
    const cleanedGlobalMargins = filterDuplicateKeys(
      globalMargins.notification,
      marginProps,
    );
    return baseStyles(theme, cleanedGlobalMargins, marginProps);
  }}
`;

const Notification = forwardRef(
  (props: NotificationProps, ref: React.RefObject<HTMLDivElement>) => {
    const { id: propId, ...passProps } = props;
    return (
      <SpacingConsumer>
        {({ margins }) => (
          <SuomifiThemeConsumer>
            {({ suomifiTheme }) => (
              <AutoId id={propId}>
                {(id) => (
                  <StyledNotification
                    forwardedRef={ref}
                    theme={suomifiTheme}
                    globalMargins={margins}
                    id={id}
                    {...passProps}
                  />
                )}
              </AutoId>
            )}
          </SuomifiThemeConsumer>
        )}
      </SpacingConsumer>
    );
  },
);

Notification.displayName = 'Notification';
export { Notification };
