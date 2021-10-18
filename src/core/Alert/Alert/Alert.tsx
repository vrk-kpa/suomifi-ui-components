import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import {
  HtmlDiv,
  HtmlDivWithRef,
  HtmlButton,
  HtmlButtonProps,
} from '../../../reset';
import { Icon } from '../../../core/Icon/Icon';
import { BaseAlertProps, alertClassNames } from '../BaseAlert/BaseAlert';
import { AutoId } from '../../utils/AutoId/AutoId';
import { getConditionalAriaProp } from '../../../utils/aria';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { baseStyles } from './Alert.baseStyles';

const baseClassName = 'fi-alert';

export interface AlertProps extends BaseAlertProps {
  /** Text to to label the close button. Visible + `aria-label` in regular size and only used as `aria-label` in small screen variant */
  closeText: string;
  /** Click handler for the close button */
  onCloseButtonClick?: () => void;
  /** Custom props passed to the close button */
  closeButtonProps?: Omit<HtmlButtonProps, 'onClick' | 'aria-label'>;
  /** Use small screen styling */
  smallScreen?: boolean;
}

class BaseAlert extends Component<AlertProps> {
  render() {
    const {
      className,
      status = 'neutral',
      ariaLiveMode = 'assertive',
      labelText,
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

    const variantIcon = status === 'neutral' ? 'info' : status;
    return (
      <HtmlDivWithRef
        as="section"
        {...passProps}
        className={classnames(baseClassName, className, {
          [`${baseClassName}--${status}`]: !!status,
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
          <HtmlDiv className={alertClassNames.content}>{children}</HtmlDiv>
        </HtmlDiv>
        <HtmlDiv className={alertClassNames.closeButtonWrapper}>
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
            {!smallScreen ? closeText?.toUpperCase() : ''}
            <Icon icon="close" />
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
  ${({ theme }) => baseStyles(theme)};
`;

export class Alert extends Component<AlertProps> {
  // lisää ref logiikka
  render() {
    const { id: propId, ...passProps } = this.props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <AutoId id={propId}>
            {(id) => (
              <StyledAlert theme={suomifiTheme} id={id} {...passProps} />
            )}
          </AutoId>
        )}
      </SuomifiThemeConsumer>
    );
  }
}
