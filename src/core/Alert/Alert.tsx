import React, { Component, forwardRef, ReactNode } from 'react';
import { styled } from 'styled-components';
import classnames from 'classnames';
import {
  HtmlDiv,
  HtmlDivWithRef,
  HtmlButton,
  HtmlButtonProps,
  HtmlDivProps,
} from '../../reset';
import { AutoId } from '../utils/AutoId/AutoId';
import { getConditionalAriaProp } from '../../utils/aria';
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
import { baseStyles } from './Alert.baseStyles';
import { IconClose, IconError, IconInfo, IconWarning } from 'suomifi-icons';
import { filterDuplicateKeys } from '../../utils/common/common';

const baseClassName = 'fi-alert';
const alertClassNames = {
  styleWrapper: `${baseClassName}_style-wrapper`,
  textContentWrapper: `${baseClassName}_text-content-wrapper`,
  content: `${baseClassName}_content`,
  icon: `${baseClassName}_icon`,
  closeButton: `${baseClassName}_close-button`,
  smallScreen: `${baseClassName}--small-screen`,
};

export interface AlertProps extends HtmlDivProps, MarginProps {
  /** Style variant. Affects color and icon.
   * @default 'neutral'
   */
  status?: 'neutral' | 'warning' | 'error';
  /** Main content of the alert */
  children?: ReactNode;
  /** Use small screen styling */
  smallScreen?: boolean;
  /** Text to label the close button.
   * Text is used as `aria-label`. Text is  is visible in regular size and hidden in small screen variant.
   */
  closeText: string;
  /** Click handler for the close button */
  onCloseButtonClick?: () => void;
  /** Custom props passed to the close button */
  closeButtonProps?: Omit<HtmlButtonProps, 'onClick' | 'aria-label'>;
  /** Ref is placed to the outermost div element of the component. Alternative for React `ref` attribute. */
  forwardedRef?: React.RefObject<HTMLDivElement>;
}

class BaseAlert extends Component<AlertProps> {
  render() {
    const {
      className,
      status = 'neutral',
      children,
      id,
      closeText,
      onCloseButtonClick,
      smallScreen,
      forwardedRef,
      closeButtonProps = {},
      ...rest
    } = this.props;
    const [_marginProps, passProps] = separateMarginProps(rest);

    const {
      className: customCloseButtonClassName,
      'aria-describedby': closeButtonPropsAriaDescribedBy,
      ...closeButtonPassProps
    } = closeButtonProps;

    return (
      <HtmlDivWithRef
        asProp="section"
        {...passProps}
        className={classnames(baseClassName, className, {
          [`${baseClassName}--${status}`]: !!status,
          [alertClassNames.smallScreen]: !!smallScreen,
        })}
        style={{ ...passProps?.style }}
      >
        <HtmlDiv className={alertClassNames.styleWrapper}>
          {status === 'warning' && (
            <IconWarning
              className={classnames(
                alertClassNames.icon,
                `${alertClassNames.icon}--${status}`,
              )}
            />
          )}
          {status === 'error' && (
            <IconError
              className={classnames(
                alertClassNames.icon,
                `${alertClassNames.icon}--${status}`,
              )}
            />
          )}
          {status === 'neutral' && (
            <IconInfo
              className={classnames(
                alertClassNames.icon,
                `${alertClassNames.icon}--${status}`,
              )}
            />
          )}

          <HtmlDiv
            className={alertClassNames.textContentWrapper}
            id={id}
            role="alert"
          >
            <HtmlDiv className={alertClassNames.content}>{children}</HtmlDiv>
          </HtmlDiv>
          <HtmlButton
            className={classnames(
              alertClassNames.closeButton,
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
            {!smallScreen ? closeText : ''}
            <IconClose />
          </HtmlButton>
        </HtmlDiv>
      </HtmlDivWithRef>
    );
  }
}

const StyledAlert = styled(
  (props: AlertProps & SuomifiThemeProp & GlobalMarginProps) => {
    const { theme, globalMargins, ...passProps } = props;
    return <BaseAlert {...passProps} />;
  },
)`
  ${({ theme, globalMargins, ...rest }) => {
    const [marginProps, _passProps] = separateMarginProps(rest);
    const cleanedGlobalMargins = filterDuplicateKeys(
      globalMargins.alert,
      marginProps,
    );
    return baseStyles(theme, cleanedGlobalMargins, marginProps);
  }}
`;

const Alert = forwardRef(
  (props: AlertProps, ref: React.RefObject<HTMLDivElement>) => {
    const { id: propId, ...passProps } = props;
    return (
      <SpacingConsumer>
        {({ margins }) => (
          <SuomifiThemeConsumer>
            {({ suomifiTheme }) => (
              <AutoId id={propId}>
                {(id) => (
                  <StyledAlert
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

Alert.displayName = 'Alert';
export { Alert };
