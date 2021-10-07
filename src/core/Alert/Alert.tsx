import React, { Component, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import {
  HtmlDiv,
  HtmlDivWithRef,
  HtmlDivWithRefProps,
  HtmlButton,
  HtmlButtonProps,
} from '../../reset';
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
  textContentWrapper: `${baseClassName}-text-content-wrapper`,
  smallScreen: `${baseClassName}--small-screen`,
  inline: `${baseClassName}--inline`,
};

export interface AlertProps extends HtmlDivWithRefProps {
  /** Style variant. Affects color and icon used.
   * @default 'neutral'
   */
  status?: 'neutral' | 'warning' | 'error';
  /** Set aria-live mode for the alert text content and label.
   * @default 'assertive'
   */
  ariaLiveMode?: 'polite' | 'assertive' | 'off';
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
  /** Click handler for the close button */
  onCloseButtonClick?: () => void;
  /** Custom props passed to the close button */
  closeButtonProps?: Omit<HtmlButtonProps, 'onClick'>;
}

// TODO: add Ref to component for closing / moving focus - check Chip for reference

class BaseAlert extends Component<AlertProps> {
  render() {
    const {
      className,
      status = 'neutral',
      ariaLiveMode = 'assertive',
      labelText,
      children,
      inline,
      closeText,
      onCloseButtonClick,
      smallScreen,
      closeButtonProps = {},
      ...passProps
    } = this.props;

    const {
      className: customCloseButtonClassName,
      'aria-describedby': closeButtonPropsAriaDescribedBy,
      ...trimmedCloseButtonProps
    } = closeButtonProps;

    const variantIcon = status === 'neutral' ? 'info' : status;
    return (
      <AutoId>
        {(id) => (
          <HtmlDivWithRef
            as="section"
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

            <HtmlDiv
              className={alertClassNames.textContentWrapper}
              id={id}
              aria-live={ariaLiveMode}
            >
              {labelText && inline && (
                <HtmlDiv className={alertClassNames.label}>{labelText}</HtmlDiv>
              )}
              <HtmlDiv className={alertClassNames.content}>{children}</HtmlDiv>
            </HtmlDiv>
            <HtmlDiv className={alertClassNames.closeButtonWrapper}>
              {!inline && (
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
                  {...trimmedCloseButtonProps}
                >
                  {!smallScreen ? closeText?.toUpperCase() : ''}
                  <Icon icon="close" />
                </HtmlButton>
              )}
            </HtmlDiv>
          </HtmlDivWithRef>
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
