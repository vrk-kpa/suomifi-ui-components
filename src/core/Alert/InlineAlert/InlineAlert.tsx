import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv, HtmlDivWithRef } from '../../../reset';
import { Icon } from '../../../core/Icon/Icon';
import { BaseAlertProps, alertClassNames } from '../BaseAlert/BaseAlert';
import { AutoId } from '../../utils/AutoId/AutoId';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { baseStyles } from './InlineAlert.baseStyles';

const baseClassName = 'fi-alert';

export interface InlineAlertProps extends BaseAlertProps {
  /** Label for the  alert */
  labelText?: string;
}

class BaseInlineAlert extends Component<InlineAlertProps> {
  render() {
    const {
      className,
      status = 'neutral',
      ariaLiveMode = 'assertive',
      labelText,
      children,
      id,
      ...passProps
    } = this.props;

    const variantIcon = status === 'neutral' ? 'info' : status;
    return (
      <HtmlDivWithRef
        as="section"
        {...passProps}
        className={classnames(
          baseClassName,
          alertClassNames.inline,
          className,
          {
            [`${baseClassName}--${status}`]: !!status,
          },
        )}
      >
        <HtmlDiv className={alertClassNames.iconWrapper}>
          <Icon icon={variantIcon} className={alertClassNames.icon} />
        </HtmlDiv>

        <HtmlDiv
          className={alertClassNames.textContentWrapper}
          id={id}
          aria-live={ariaLiveMode}
        >
          {labelText && (
            <HtmlDiv className={alertClassNames.label}>{labelText}</HtmlDiv>
          )}
          <HtmlDiv className={alertClassNames.content}>{children}</HtmlDiv>
        </HtmlDiv>
      </HtmlDivWithRef>
    );
  }
}

const StyledInlineAlert = styled(
  (props: InlineAlertProps & SuomifiThemeProp) => {
    const { theme, ...passProps } = props;
    return <BaseInlineAlert {...passProps} />;
  },
)`
  ${({ theme }) => baseStyles(theme)};
`;

export class InlineAlert extends Component<InlineAlertProps> {
  // lisää ref logiikka
  render() {
    const { id: propId, ...passProps } = this.props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <AutoId id={propId}>
            {(id) => (
              <StyledInlineAlert theme={suomifiTheme} id={id} {...passProps} />
            )}
          </AutoId>
        )}
      </SuomifiThemeConsumer>
    );
  }
}
