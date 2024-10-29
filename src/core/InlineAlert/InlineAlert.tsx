import React, { Component, forwardRef, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv, HtmlDivWithRef, HtmlDivProps } from '../../reset';
import { IconError, IconWarning } from 'suomifi-icons';
import { AutoId } from '../utils/AutoId/AutoId';
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
import { baseStyles } from './InlineAlert.baseStyles';
import { filterDuplicateKeys } from '../../utils/common/common';

const baseClassName = 'fi-inline-alert';
const inlineAlertClassNames = {
  styleWrapper: `${baseClassName}_style-wrapper`,
  content: `${baseClassName}_content`,
  label: `${baseClassName}_label`,
  textContentWrapper: `${baseClassName}_text-content-wrapper`,
  icon: `${baseClassName}_icon`,
  smallScreen: `${baseClassName}--small-screen`,
};

export interface InlineAlertProps extends HtmlDivProps, MarginProps {
  /** Style variant. Affects color and icon.
   * @default 'neutral'
   */
  status?: 'neutral' | 'warning' | 'error';
  /** Main content of the alert */
  children?: ReactNode;
  /** Toggles small screen styling */
  smallScreen?: boolean;
  /** Label for the alert */
  labelText?: ReactNode;
  /** Aria-live mode for the alert's text content and label.
   * Should not be turned completely off for dynamically appearing alerts
   * @default 'assertive'
   */
  ariaLiveMode?: 'polite' | 'assertive' | 'off';
  /** Ref is placed to the outermost div element of the component. Alternative for React `ref` attribute. */
  forwardedRef?: React.RefObject<HTMLDivElement>;
}

class BaseInlineAlert extends Component<InlineAlertProps> {
  render() {
    const {
      className,
      status = 'neutral',
      ariaLiveMode = 'assertive',
      labelText,
      children,
      smallScreen,
      id,
      forwardedRef,
      ...rest
    } = this.props;
    const [_marginProps, passProps] = separateMarginProps(rest);

    return (
      <HtmlDivWithRef
        asProp="section"
        {...passProps}
        className={classnames(baseClassName, className, {
          [`${baseClassName}--${status}`]: !!status,
          [inlineAlertClassNames.smallScreen]: !!smallScreen,
        })}
        style={{ ...passProps?.style }}
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
  (props: InlineAlertProps & SuomifiThemeProp & GlobalMarginProps) => {
    const { theme, globalMargins, ...passProps } = props;
    return <BaseInlineAlert {...passProps} />;
  },
)`
  ${({ theme, globalMargins, ...rest }) => {
    const [marginProps, _passProps] = separateMarginProps(rest);
    const cleanedGlobalMargins = filterDuplicateKeys(
      globalMargins.inlineAlert,
      marginProps,
    );
    return baseStyles(theme, cleanedGlobalMargins, marginProps);
  }}
`;

const InlineAlert = forwardRef<HTMLDivElement, InlineAlertProps>(
  (props: InlineAlertProps, ref: React.RefObject<HTMLDivElement>) => {
    const { id: propId, ...passProps } = props;
    return (
      <SpacingConsumer>
        {({ margins }) => (
          <SuomifiThemeConsumer>
            {({ suomifiTheme }) => (
              <AutoId id={propId}>
                {(id) => (
                  <StyledInlineAlert
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

InlineAlert.displayName = 'InlineAlert';
export { InlineAlert };
