import React, { Component, forwardRef, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { baseStyles } from './Toast.baseStyles';
import {
  SuomifiThemeProp,
  SuomifiThemeConsumer,
  SpacingConsumer,
} from '../theme';
import {
  spacingStyles,
  separateMarginProps,
  MarginProps,
  GlobalMarginProps,
} from '../theme/utils/spacing';
import { IconCheckCircle } from 'suomifi-icons';
import { Heading } from '../Heading/Heading';
import { HtmlDiv, HtmlDivWithRef, HtmlDivWithRefProps } from '../../reset';
import { hLevels } from '../../reset/HtmlH/HtmlH';

export interface ToastProps extends MarginProps, HtmlDivWithRefProps {
  /** Sets aria-live mode for the Toast text content and label.
   * @default 'polite'
   */
  ariaLiveMode?: 'polite' | 'assertive' | 'off';
  /** Heading for the Toast */
  headingText?: string;
  /** Main content of the Toast. */
  children?: ReactNode;
  /** CSS class for custom styles */
  className?: string;
  /** Heading variant for Toast.
   * @default 'h2'
   */
  headingVariant?: Exclude<hLevels, 'h1'>;
  /** HTML id attribute */
  id?: string;
  /** Ref is placed on the outermost div element of the component. Alternative to React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLDivElement>;
}

const baseClassName = 'fi-toast';
export const toastClassNames = {
  styleWrapper: `${baseClassName}-wrapper`,
  heading: `${baseClassName}-heading`,
  contentWrapper: `${baseClassName}-content-wrapper`,
  icon: `${baseClassName}_icon`,
  iconWrapper: `${baseClassName}_icon-wrapper`,
};
class BaseToast extends Component<ToastProps> {
  render() {
    const {
      ariaLiveMode = 'polite',
      children,
      className,
      headingText,
      headingVariant = 'h2',
      id,
      style,
      ...rest
    } = this.props;
    const [marginProps, passProps] = separateMarginProps(rest);
    const marginStyle = spacingStyles(marginProps);
    return (
      <HtmlDivWithRef
        className={classnames(baseClassName, className)}
        as="section"
        {...passProps}
        style={{ ...marginStyle, ...style }}
      >
        <HtmlDiv className={toastClassNames.styleWrapper}>
          <HtmlDiv className={toastClassNames.iconWrapper}>
            <IconCheckCircle className={toastClassNames.icon} />
          </HtmlDiv>

          <HtmlDiv
            className={toastClassNames.contentWrapper}
            id={id}
            aria-live={ariaLiveMode}
          >
            {headingText && (
              <Heading
                variant={headingVariant}
                className={toastClassNames.heading}
              >
                {headingText}
              </Heading>
            )}
            {children}
          </HtmlDiv>
        </HtmlDiv>
      </HtmlDivWithRef>
    );
  }
}
const StyledToast = styled(
  (props: ToastProps & SuomifiThemeProp & GlobalMarginProps) => {
    const { theme, globalMargins, ...passProps } = props;
    return <BaseToast {...passProps} />;
  },
)`
  ${({ theme, globalMargins }) => baseStyles(theme, globalMargins.toast)};
`;

const Toast = forwardRef(
  (props: ToastProps, ref: React.Ref<HTMLDivElement>) => {
    const { ...passProps } = props;
    return (
      <SpacingConsumer>
        {({ margins }) => (
          <SuomifiThemeConsumer>
            {({ suomifiTheme }) => (
              <StyledToast
                forwardedRef={ref}
                theme={suomifiTheme}
                globalMargins={margins}
                {...passProps}
              />
            )}
          </SuomifiThemeConsumer>
        )}
      </SpacingConsumer>
    );
  },
);

Toast.displayName = 'Toast';
export { Toast };
