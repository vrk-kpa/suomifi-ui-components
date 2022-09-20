import React, { forwardRef, ReactNode } from 'react';
import classnames from 'classnames';
import { default as styled } from 'styled-components';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { HtmlSpan, HtmlSpanProps } from '../../../reset';
import { InputStatus, AriaLiveMode } from '../types';
import { baseStyles } from './StatusText.baseStyles';

const baseClassName = 'fi-status-text';
const statusTextClassNames = {
  error: `${baseClassName}--error`,
};

export interface StatusTextProps extends HtmlSpanProps {
  /** id */
  id?: string;
  /** StatusText element content */
  children?: ReactNode;
  /** Custom class name for styling and customizing  */
  className?: string;
  /** Disable StatusText aria live. */
  disabled?: boolean;
  /** Status */
  status?: InputStatus;
  /**
   * aria-live mode for the element
   * @default polite
   */
  ariaLiveMode?: AriaLiveMode;
  /** Ref is forwarded to the span element. Alternative for React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLSpanElement>;
}

const StyledStatusText = styled(
  ({
    className,
    children,
    disabled,
    status,
    theme,
    ariaLiveMode = 'polite',
    ...passProps
  }: StatusTextProps & SuomifiThemeProp) => {
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
      >
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
