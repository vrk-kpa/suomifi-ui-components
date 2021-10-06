import React, { Component, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv, HtmlDivProps, HtmlButton } from '../../reset';
import { Icon } from '../../core/Icon/Icon';
import { AutoId } from '../utils/AutoId/AutoId';
import { getConditionalAriaProp } from '../../utils/aria';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../theme';
import { baseStyles } from './Alert.baseStyles';

const baseClassName = 'fi-alert';

const alertClassNames = {
  content: `${baseClassName}-content`,
  label: `${baseClassName}-label`,
  icon: `${baseClassName}-icon`,
  iconWrapper: `${baseClassName}-icon-wrapper`,
  closeButton: `${baseClassName}-close-button`,
  closeButtonWrapper: `${baseClassName}-close-button-wrapper`,
  contentWrapper: `${baseClassName}-content-wrapper`,
  textContentWrapper: `${baseClassName}-text-content-wrapper`,
  smallScreen: `${baseClassName}--small-screen`,
  inline: `${baseClassName}--inline`,
};

export interface AlertProps extends HtmlDivProps {
  /** Style variant. Affects color and icon used.
   * @default 'neutral'
   */
  status?: 'neutral' | 'warning' | 'error';
  /** Set `role="alert"` for the element. */
  alert?: boolean;
  /** Label for the  alert */
  labelText?: string;
  /** Use inline version of alert */
  inline?: boolean;
  /** Main content of the alert */
  children?: ReactNode;
  /** Text to to label the close button. Visible in regular size and used as `aria-label` in small screen variant */
  closeText?: string;
  /** Use small screen styling */
  smallScreen?: boolean;
  onCloseClick?: () => void;
}

// TODO: add Ref to component for closing / moving focus

class BaseAlert extends Component<AlertProps> {
  render() {
    const {
      className,
      status = 'neutral',
      alert,
      labelText,
      children,
      inline,
      closeText,
      onCloseClick,
      smallScreen,
      ...passProps
    } = this.props;

    const variantIcon = status === 'neutral' ? 'info' : status;
    return (
      <AutoId>
        {(id) => (
          <HtmlDiv
            {...passProps}
            className={classnames(baseClassName, className, {
              [`${baseClassName}--${status}`]: !!status,
              [alertClassNames.inline]: !!inline,
              [alertClassNames.smallScreen]: !!smallScreen,
            })}
          >
            <HtmlDiv className={alertClassNames.iconWrapper}>
              <Icon icon={variantIcon} className={alertClassNames.icon} />
            </HtmlDiv>
            <HtmlDiv className={alertClassNames.textContentWrapper} id={id}>
              {labelText && inline && (
                <HtmlDiv className={alertClassNames.label}>{labelText}</HtmlDiv>
              )}
              <HtmlDiv className={alertClassNames.content}>{children}</HtmlDiv>
            </HtmlDiv>
            <HtmlDiv className={alertClassNames.closeButtonWrapper}>
              {!inline && (
                <HtmlButton
                  className={alertClassNames.closeButton}
                  aria-describedby={id}
                  onClick={onCloseClick}
                  {...getConditionalAriaProp('aria-label', [closeText])}
                >
                  {!smallScreen ? closeText?.toUpperCase() : ''}
                  <Icon icon="close" />
                </HtmlButton>
              )}
            </HtmlDiv>
          </HtmlDiv>
        )}
      </AutoId>
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
