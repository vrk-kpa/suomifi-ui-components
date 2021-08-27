import React, { Component, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { baseStyles } from './Alert.baseStyles';
import { HtmlDiv, HtmlSpan, HtmlSpanProps } from '../../reset';
import {
  SuomifiThemeProp,
  SuomifiThemeConsumer,
  defaultSuomifiTheme,
} from '../theme';
import { Icon } from '../../core/Icon/Icon';

const baseClassName = 'fi-alert';

const alertClassNames = {
  content: `${baseClassName}-content`,
  label: `${baseClassName}-label`,
  icon: `${baseClassName}-icon`,
  closeButton: `${baseClassName}-close-button`,
  contentWrapper: `${baseClassName}-content-wrapper`,
  textContentWrapper: `${baseClassName}-text-content-wrapper`,
};

export interface AlertProps extends HtmlSpanProps {
  /** Style variant. Use maintenance for scheduled events and disturbance for urgent issues
   * @default 'disturbance'
   */
  variant?: 'maintenance' | 'disturbance';
  /** Label for the  alert */
  labelText?: string;
  inline?: boolean;
  children?: ReactNode;
  closeText: string;
}

class BaseAlert extends Component<AlertProps> {
  render() {
    const {
      className,
      variant = 'disturbance',
      labelText,
      children,
      inline,
      closeText,
      ...passProps
    } = this.props;

    const variantIcon = variant === 'maintenance' ? 'info' : 'error';
    return (
      <HtmlDiv
        {...passProps}
        className={classnames(baseClassName, className, {
          [`${baseClassName}--${variant}`]: !!variant,
          [`${baseClassName}--inline`]: !!inline,
        })}
      >
        <HtmlSpan className={classnames(alertClassNames.contentWrapper)}>
          <Icon
            icon={variantIcon}
            color={
              variant === 'maintenance'
                ? defaultSuomifiTheme.colors.brandBase
                : defaultSuomifiTheme.colors.alertBase
            }
            className={classnames(alertClassNames.icon)}
          />
          <HtmlDiv className={classnames(alertClassNames.textContentWrapper)}>
            {labelText && (
              <HtmlSpan className={classnames(alertClassNames.label)}>
                {labelText}
              </HtmlSpan>
            )}
            <HtmlSpan className={classnames(alertClassNames.content)}>
              {children}
            </HtmlSpan>
          </HtmlDiv>
          <HtmlDiv className={classnames(alertClassNames.closeButton)}>
            {closeText}
            <Icon icon="close" />
          </HtmlDiv>
        </HtmlSpan>
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
