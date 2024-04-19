import React, { forwardRef, ReactNode } from 'react';
import classnames from 'classnames';
import { default as styled } from 'styled-components';
import {
  SuomifiThemeProp,
  SuomifiThemeConsumer,
  SuomifiTheme,
} from '../../theme';
import {
  spacingStyles,
  separateMarginProps,
  MarginProps,
} from '../../theme/utils/spacing';
import { HtmlSpan, HtmlSpanProps } from '../../../reset';
import { InputStatus, AriaLiveMode } from '../types';
import { baseStyles } from './StatusText.baseStyles';
import { IconErrorFilled, IconCheckCircleFilled } from 'suomifi-icons';

const baseClassName = 'fi-status-text';
const statusTextClassNames = {
  error: `${baseClassName}--error`,
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

const getIcon = (status: InputStatus | undefined, theme: SuomifiTheme) => {
  if (status === undefined || status === 'default') return null;
  if (status === 'error') return <IconErrorFilled aria-hidden="true" />;
  if (status === 'success') {
    return (
      <IconCheckCircleFilled
        aria-hidden="true"
        color={theme.colors.successBase}
      />
    );
  }
};

const StyledStatusText = styled(
  ({
    className,
    children,
    disabled,
    status,
    theme,
    ariaLiveMode = 'polite',
    ...rest
  }: StatusTextProps & SuomifiThemeProp) => {
    const [marginProps, passProps] = separateMarginProps(rest);
    const marginStyle = spacingStyles(marginProps);
    const ariaLiveProp = !disabled
      ? { 'aria-live': ariaLiveMode }
      : { 'aria-live': 'off' };

    return (
      <HtmlSpan
        {...passProps}
        {...ariaLiveProp}
        className={classnames(className, baseClassName, {
          [statusTextClassNames.error]: status === 'error',
        })}
        aria-atomic="true"
        style={{ ...marginStyle, ...passProps?.style }}
      >
        {!!children && getIcon(status, theme)}
        {children}
      </HtmlSpan>
    );
  },
)`
  ${({ theme }) => baseStyles(theme)}
`;

const StatusText = forwardRef<HTMLSpanElement, StatusTextProps>(
  (props: StatusTextProps, ref: React.Ref<HTMLSpanElement>) => {
    const { children, ...passProps } = props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <StyledStatusText
            forwardedRef={ref}
            theme={suomifiTheme}
            {...passProps}
          >
            {children}
          </StyledStatusText>
        )}
      </SuomifiThemeConsumer>
    );
  },
);

StatusText.displayName = 'StatusText';
export { StatusText };
