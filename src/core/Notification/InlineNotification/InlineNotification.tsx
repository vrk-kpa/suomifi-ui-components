import React, { Component, forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv, HtmlDivWithRef } from '../../../reset';
import { Icon } from '../../Icon/Icon';
import {
  BaseNotificationProps,
  notificationClassNames,
  baseClassName,
} from '../BaseNotification/BaseNotification';
import { AutoId } from '../../utils/AutoId/AutoId';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { baseStyles } from './InlineNotification.baseStyles';

export interface InlineNotificationProps extends BaseNotificationProps {
  /** Label for the Notification */
  labelText?: string;
}

interface InnerRef {
  forwardedRef: React.RefObject<HTMLDivElement>;
}

class BaseInlineNotification extends Component<
  InlineNotificationProps & InnerRef
> {
  render() {
    const {
      className,
      status = 'neutral',
      ariaLiveMode = 'assertive',
      labelText,
      children,
      id,
      ...passProps
    } = this.props;

    const variantIcon = status === 'neutral' ? 'info' : status;
    return (
      <HtmlDivWithRef
        as="section"
        {...passProps}
        className={classnames(
          baseClassName,
          notificationClassNames.inline,
          className,
          {
            [`${baseClassName}--${status}`]: !!status,
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
            {labelText && (
              <HtmlDiv className={notificationClassNames.label}>
                {labelText}
              </HtmlDiv>
            )}
            <HtmlDiv className={notificationClassNames.content}>
              {children}
            </HtmlDiv>
          </HtmlDiv>
        </HtmlDiv>
      </HtmlDivWithRef>
    );
  }
}

const StyledInlineNotification = styled(
  (props: InlineNotificationProps & InnerRef & SuomifiThemeProp) => {
    const { theme, ...passProps } = props;
    return <BaseInlineNotification {...passProps} />;
  },
)`
  ${({ theme }) => baseStyles(theme)};
`;

export const InlineNotification = forwardRef(
  (props: InlineNotificationProps, ref: React.RefObject<HTMLDivElement>) => {
    const { id: propId, ...passProps } = props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <AutoId id={propId}>
            {(id) => (
              <StyledInlineNotification
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
