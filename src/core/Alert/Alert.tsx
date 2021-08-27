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
};

export interface AlertProps extends HtmlSpanProps {
  /** Show icon */
  icon?: true;
  /** Style variant. Use maintenance for scheduled events and disturbance for urgent issues
   * @default 'maintenance'
   */
  variant?: 'maintenance' | 'disturbance';
  /** Label for the  alert */
  labelText?: string;
  children?: ReactNode;
}

class BaseAlert extends Component<AlertProps> {
  render() {
    const {
      className,
      variant,
      icon,
      labelText,
      children,
      ...passProps
    } = this.props;
    return (
      <HtmlDiv
        {...passProps}
        className={classnames(baseClassName, className, {
          [`${baseClassName}--${variant}`]: !!variant,
        })}
      >
        {icon && (
          <Icon
            icon="arrowUp"
            color={
              variant === 'maintenance'
                ? defaultSuomifiTheme.colors.brandBase
                : defaultSuomifiTheme.colors.alertBase
            }
            className={classnames(alertClassNames.icon)}
          />
        )}
        <HtmlDiv className={classnames(alertClassNames.label)}>
          {labelText}
        </HtmlDiv>
        <HtmlSpan className={classnames(alertClassNames.content)}>
          {children}
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
