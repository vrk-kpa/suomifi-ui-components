import React, { forwardRef, ReactNode } from 'react';
import classnames from 'classnames';
import { default as styled } from 'styled-components';
import {
  SuomifiThemeProp,
  SuomifiThemeConsumer,
  SpacingConsumer,
} from '../../theme';
import {
  separateMarginProps,
  MarginProps,
  GlobalMarginProps,
} from '../../theme/utils/spacing';
import { HtmlSpan, HtmlSpanProps } from '../../../reset';
import { InputStatus, AriaLiveMode } from '../types';
import { baseStyles } from './StatusText.baseStyles';
import { IconErrorFilled, IconCheckCircleFilled } from 'suomifi-icons';
import { filterDuplicateKeys } from '../../../utils/common/common';

const baseClassName = 'fi-status-text';
const statusTextClassNames = {
  error: `${baseClassName}--error`,
  success: `${baseClassName}--success`,
};

export interface StatusTextProps extends HtmlSpanProps, MarginProps {
  /** HTML id attribute */
  id?: string;
  /** Text content for the StatusText */
  children?: ReactNode;
  /** CSS class for custom styles  */
  className?: string;
  /** Disables StatusText aria-live functionality. */
  disabled?: boolean;
  /**
   * `'default'` | `'error'` | `'success'`
   *
   * Status affects the color of the text
   */
  status?: InputStatus;
  /**
   * `'assertive'` | `'polite'` | `'off'`
   *
   * aria-live mode for the element
   * @default polite
   */
  ariaLiveMode?: AriaLiveMode;
  /** Ref is forwarded to the span element. Alternative for React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLSpanElement>;
}

const getIcon = (status: InputStatus | undefined) => {
  if (status === undefined || status === 'default') return null;
  if (status === 'error') return <IconErrorFilled aria-hidden="true" />;
  if (status === 'success') {
    return <IconCheckCircleFilled aria-hidden="true" />;
  }
};

const StyledStatusText = styled(
  ({
    className,
    globalMargins,
    children,
    disabled,
    status,
    theme,
    ariaLiveMode = 'polite',
    ...rest
  }: StatusTextProps & SuomifiThemeProp & GlobalMarginProps) => {
    const [_marginProps, passProps] = separateMarginProps(rest);

    const ariaLiveProp: { 'aria-live': AriaLiveMode | undefined } = !disabled
      ? { 'aria-live': ariaLiveMode }
      : { 'aria-live': 'off' };

    return (
      <HtmlSpan
        {...passProps}
        {...ariaLiveProp}
        className={classnames(className, baseClassName, {
          [statusTextClassNames.error]: status === 'error',
          [statusTextClassNames.success]: status === 'success',
        })}
        aria-atomic="true"
        style={{ ...passProps?.style }}
      >
        {!!children && getIcon(status)}
        {children}
      </HtmlSpan>
    );
  },
)`
  ${({ theme, globalMargins, ...rest }) => {
    const [marginProps, _passProps] = separateMarginProps(rest);
    const cleanedGlobalMargins = filterDuplicateKeys(
      globalMargins.statusText,
      marginProps,
    );
    return baseStyles(theme, cleanedGlobalMargins, marginProps);
  }}
`;

const StatusText = forwardRef<HTMLSpanElement, StatusTextProps>(
  (props: StatusTextProps, ref: React.Ref<HTMLSpanElement>) => {
    const { children, ...passProps } = props;
    return (
      <SpacingConsumer>
        {({ margins }) => (
          <SuomifiThemeConsumer>
            {({ suomifiTheme }) => (
              <StyledStatusText
                forwardedRef={ref}
                globalMargins={margins}
                theme={suomifiTheme}
                {...passProps}
              >
                {children}
              </StyledStatusText>
            )}
          </SuomifiThemeConsumer>
        )}
      </SpacingConsumer>
    );
  },
);

StatusText.displayName = 'StatusText';
export { StatusText };
