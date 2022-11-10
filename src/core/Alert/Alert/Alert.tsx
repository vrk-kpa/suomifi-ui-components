import React, { Component, forwardRef, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import {
  HtmlDiv,
  HtmlDivWithRef,
  HtmlButton,
  HtmlButtonProps,
  HtmlDivWithRefProps,
} from '../../../reset';
import { AutoId } from '../../utils/AutoId/AutoId';
import { getConditionalAriaProp } from '../../../utils/aria';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { baseStyles } from './Alert.baseStyles';
import {
  IconClose,
  IconError,
  IconInfo,
  IconWarning,
} from 'suomifi-icons/baseIcons';

const baseClassName = 'fi-alert';
const alertClassNames = {
  styleWrapper: `${baseClassName}_style-wrapper`,
  textContentWrapper: `${baseClassName}_text-content-wrapper`,
  content: `${baseClassName}_content`,
  icon: `${baseClassName}_icon`,
  closeButton: `${baseClassName}_close-button`,
  smallScreen: `${baseClassName}--small-screen`,
};

export interface AlertProps extends HtmlDivWithRefProps {
  /** Style variant. Affects color and icon used.
   * @default 'neutral'
   */
  status?: 'neutral' | 'warning' | 'error';
  /** Main content of the alert */
  children?: ReactNode;
  /** Use small screen styling */
  smallScreen?: boolean;
  /** Text to label the close button. Visible + `aria-label` in regular size and only used as `aria-label` in small screen variant */
  closeText: string;
  /** Click handler for the close button */
  onCloseButtonClick?: () => void;
  /** Custom props passed to the close button */
  closeButtonProps?: Omit<HtmlButtonProps, 'onClick' | 'aria-label'>;
  /** Ref is passed to the root div element. Alternative for React `ref` attribute. */
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
      closeButtonProps = {},
      ...passProps
    } = this.props;

    const {
      className: customCloseButtonClassName,
      'aria-describedby': closeButtonPropsAriaDescribedBy,
      ...closeButtonPassProps
    } = closeButtonProps;

    // const variantIcon = status === 'neutral' ? 'info' : status;
    return (
      <HtmlDivWithRef
        as="section"
        {...passProps}
        className={classnames(baseClassName, className, {
          [`${baseClassName}--${status}`]: !!status,
          [alertClassNames.smallScreen]: !!smallScreen,
        })}
      >
        <HtmlDiv className={alertClassNames.styleWrapper}>
          {status === 'warning' && (
            <IconWarning
              className={classnames(alertClassNames.icon, {
                [`${alertClassNames.icon}--${status}`]: !!status,
              })}
            />
          )}
          {status === 'error' && (
            <IconError
              className={classnames(alertClassNames.icon, {
                [`${alertClassNames.icon}--${status}`]: !!status,
              })}
            />
          )}
          {status === 'neutral' && (
            <IconInfo
              className={classnames(alertClassNames.icon, {
                [`${alertClassNames.icon}--${status}`]: !!status,
              })}
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
            {!smallScreen ? closeText.toUpperCase() : ''}
            <IconClose />
          </HtmlButton>
        </HtmlDiv>
      </HtmlDivWithRef>
    );
  }
}

const StyledAlert = styled((props: AlertProps & SuomifiThemeProp) => {
  const { theme, ...passProps } = props;
  return <BaseAlert {...passProps} />;
})`
  ${({ theme }) => baseStyles(theme)}
`;

const Alert = forwardRef(
  (props: AlertProps, ref: React.RefObject<HTMLDivElement>) => {
    const { id: propId, ...passProps } = props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <AutoId id={propId}>
            {(id) => (
              <StyledAlert
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

Alert.displayName = 'Alert';
export { Alert };
