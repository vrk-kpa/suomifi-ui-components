import React, { Component, forwardRef, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv, HtmlDivWithRef, HtmlDivWithRefProps } from '../../../reset';
import { IconError, IconWarning } from 'suomifi-icons/baseIcons';
import { AutoId } from '../../utils/AutoId/AutoId';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { baseStyles } from './InlineAlert.baseStyles';

const baseClassName = 'fi-inline-alert';
const inlineAlertClassNames = {
  styleWrapper: `${baseClassName}_style-wrapper`,
  content: `${baseClassName}_content`,
  label: `${baseClassName}_label`,
  textContentWrapper: `${baseClassName}_text-content-wrapper`,
  icon: `${baseClassName}_icon`,
  smallScreen: `${baseClassName}--small-screen`,
};

export interface InlineAlertProps extends HtmlDivWithRefProps {
  /** Style variant. Affects color and icon used.
   * @default 'neutral'
   */
  status?: 'neutral' | 'warning' | 'error';
  /** Main content of the alert */
  children?: ReactNode;
  /** Use small screen styling */
  smallScreen?: boolean;
  /** Label for the alert */
  labelText?: ReactNode;
  /** Set aria-live mode for the alert text content and label.
   * @default 'assertive'
   */
  ariaLiveMode?: 'polite' | 'assertive' | 'off';
}

interface InnerRef {
  forwardedRef: React.RefObject<HTMLDivElement>;
}

class BaseInlineAlert extends Component<InlineAlertProps & InnerRef> {
  render() {
    const {
      className,
      status = 'neutral',
      ariaLiveMode = 'assertive',
      labelText,
      children,
      smallScreen,
      id,
      ...passProps
    } = this.props;

    return (
      <HtmlDivWithRef
        as="section"
        {...passProps}
        className={classnames(baseClassName, className, {
          [`${baseClassName}--${status}`]: !!status,
          [inlineAlertClassNames.smallScreen]: !!smallScreen,
        })}
      >
        <HtmlDiv className={inlineAlertClassNames.styleWrapper}>
          {status === 'warning' && (
            <IconWarning
              className={classnames(inlineAlertClassNames.icon, {
                [`${inlineAlertClassNames.icon}--${status}`]: !!status,
              })}
            />
          )}
          {status === 'error' && (
            <IconError
              className={classnames(inlineAlertClassNames.icon, {
                [`${inlineAlertClassNames.icon}--${status}`]: !!status,
              })}
            />
          )}

          <HtmlDiv
            className={inlineAlertClassNames.textContentWrapper}
            id={id}
            aria-live={ariaLiveMode}
          >
            {labelText && (
              <HtmlDiv className={inlineAlertClassNames.label}>
                {labelText}
              </HtmlDiv>
            )}
            <HtmlDiv className={inlineAlertClassNames.content}>
              {children}
            </HtmlDiv>
          </HtmlDiv>
        </HtmlDiv>
      </HtmlDivWithRef>
    );
  }
}

const StyledInlineAlert = styled(
  (props: InlineAlertProps & InnerRef & SuomifiThemeProp) => {
    const { theme, ...passProps } = props;
    return <BaseInlineAlert {...passProps} />;
  },
)`
  ${({ theme }) => baseStyles(theme)}
`;

const InlineAlert = forwardRef(
  (props: InlineAlertProps, ref: React.RefObject<HTMLDivElement>) => {
    const { id: propId, ...passProps } = props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <AutoId id={propId}>
            {(id) => (
              <StyledInlineAlert
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

InlineAlert.displayName = 'InlineAlert';
export { InlineAlert };
