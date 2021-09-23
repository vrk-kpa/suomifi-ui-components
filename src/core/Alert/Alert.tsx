import React, { Component, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { baseStyles } from './Alert.baseStyles';
import { HtmlDiv, HtmlSpan, HtmlSpanProps } from '../../reset';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../theme';
import { Icon } from '../../core/Icon/Icon';

const baseClassName = 'fi-alert';

const alertClassNames = {
  content: `${baseClassName}-content`,
  label: `${baseClassName}-label`,
  icon: `${baseClassName}-icon`,
  iconWrapper: `${baseClassName}-icon-wrapper`,
  closeButton: `${baseClassName}-close-button`,
  contentWrapper: `${baseClassName}-content-wrapper`,
  textContentWrapper: `${baseClassName}-text-content-wrapper`,
  smallScreen: `${baseClassName}--small-screen`,
  inline: `${baseClassName}--inline`,
};

export interface AlertProps extends HtmlSpanProps {
  /** Style variant. Affects color and icon used.
   * @default 'notification'
   */
  variant?: 'notification' | 'warning' | 'error';
  /** Label for the  alert */
  labelText?: string;
  /** Use inline version of alert */
  inline?: boolean;
  /** Main content of the alert */
  children?: ReactNode;
  /** Text to show next to the closing icon. Not shown when small screen styles are in use. */
  closeText?: string;
  /** Use small screen styling */
  smallScreen?: boolean;
}

class BaseAlert extends Component<AlertProps> {
  render() {
    const {
      className,
      variant = 'notification',
      labelText,
      children,
      inline,
      closeText,
      smallScreen,
      ...passProps
    } = this.props;

    const variantIcon = variant === 'notification' ? 'info' : variant;
    return (
      <HtmlDiv
        {...passProps}
        className={classnames(baseClassName, className, {
          [`${baseClassName}--${variant}`]: !!variant,
          [alertClassNames.inline]: !!inline,
          [alertClassNames.smallScreen]: !!smallScreen,
        })}
      >
        <HtmlSpan className={alertClassNames.iconWrapper}>
          <Icon icon={variantIcon} className={alertClassNames.icon} />
        </HtmlSpan>
        <HtmlDiv className={alertClassNames.textContentWrapper}>
          {labelText && inline && (
            <HtmlDiv className={alertClassNames.label}>{labelText}</HtmlDiv>
          )}
          <HtmlDiv className={alertClassNames.content}>{children}</HtmlDiv>
        </HtmlDiv>

        {/** Needs to be an actual button */}
        {!inline && (
          <HtmlDiv className={alertClassNames.closeButton}>
            {!smallScreen ? closeText : ''}
            <Icon icon="close" />
          </HtmlDiv>
        )}
      </HtmlDiv>
    );
  }
}

const StyledAlert = styled((props: AlertProps & SuomifiThemeProp) => {
  const { theme, ...passProps } = props;
  return <BaseAlert {...passProps} />;
})`
  ${({ theme }) => baseStyles(theme)};
`;

/**
 * Used displaying Alert with correct styles
 */
export class Alert extends Component<AlertProps> {
  render() {
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <StyledAlert theme={suomifiTheme} {...this.props} />
        )}
      </SuomifiThemeConsumer>
    );
  }
}
