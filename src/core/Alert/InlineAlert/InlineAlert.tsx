import React, { Component, forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv, HtmlDivWithRef } from '../../../reset';
import { Icon } from '../../../core/Icon/Icon';
import {
  BaseAlertProps,
  alertClassNames,
  baseClassName,
} from '../BaseAlert/BaseAlert';
import { AutoId } from '../../utils/AutoId/AutoId';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { baseStyles } from './InlineAlert.baseStyles';

export interface InlineAlertProps extends BaseAlertProps {
  /** Label for the alert */
  labelText?: string;
  /** Set aria-live mode for the alert text content and label.
   * @default 'assertive'
   */
  ariaLiveMode?: 'polite' | 'assertive' | 'off';
}

interface InnerRef {
  forwardedRef: React.RefObject<HTMLDivElement>;
}

class BaseInlineAlert extends Component<InlineAlertProps & InnerRef> {
  render() {
    const {
      className,
      status = 'neutral',
      ariaLiveMode = 'assertive',
      labelText,
      children,
      smallScreen,
      id,
      ...passProps
    } = this.props;

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
            [alertClassNames.smallScreen]: !!smallScreen,
          },
        )}
      >
        <HtmlDiv className={alertClassNames.styleWrapper}>
          {status !== 'neutral' && (
            <Icon icon={status} className={alertClassNames.icon} />
          )}

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
        </HtmlDiv>
      </HtmlDivWithRef>
    );
  }
}

const StyledInlineAlert = styled(
  (props: InlineAlertProps & InnerRef & SuomifiThemeProp) => {
    const { theme, ...passProps } = props;
    return <BaseInlineAlert {...passProps} />;
  },
)`
  ${({ theme }) => baseStyles(theme)}
`;

const InlineAlert = forwardRef(
  (props: InlineAlertProps, ref: React.RefObject<HTMLDivElement>) => {
    const { id: propId, ...passProps } = props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <AutoId id={propId}>
            {(id) => (
              <StyledInlineAlert
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

InlineAlert.displayName = 'InlineAlert';
export { InlineAlert };
