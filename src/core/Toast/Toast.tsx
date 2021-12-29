import React, { Component, forwardRef, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { baseStyles } from './Toast.baseStyles';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../theme';
import { Icon } from '../Icon/Icon';
import { Heading } from '../Heading/Heading';
import { HtmlDiv, HtmlDivWithRef } from '../../reset';
import { hLevels } from '../../reset/HtmlH/HtmlH';

export interface ToastProps {
  /** Set aria-live mode for the Toast text content and label.
   * @default 'polite'
   */
  ariaLiveMode?: 'polite' | 'assertive' | 'off';
  /** Label heading for the Toast */
  headingText?: string;
  /** Main content of the Toast */
  children?: ReactNode;
  /** Custom classname to extend or customize */
  className?: string;
  /** Elements to be rendered under the Toast text. Can be e.g. buttons, links etc. */
  headingVariant?: Exclude<hLevels, 'h1'>;
  /** Id for focus */
  id?: string;
}
interface InnerRef {
  forwardedRef: React.RefObject<HTMLDivElement>;
}
const baseClassName = 'fi-toast';
export const toastClassNames = {
  styleWrapper: `${baseClassName}-wrapper`,
  heading: `${baseClassName}-heading`,
  contentWrapper: `${baseClassName}-content-wrapper`,
  icon: `${baseClassName}_icon`,
  iconWrapper: `${baseClassName}_icon-wrapper`,
};
class BaseToast extends Component<ToastProps & InnerRef> {
  render() {
    const {
      ariaLiveMode = 'assertive',
      children,
      className,
      forwardedRef,
      headingText,
      headingVariant = 'h2',
      id,
      ...passProps
    } = this.props;
    return (
      <HtmlDivWithRef
        className={classnames(baseClassName, className)}
        as="section"
        {...passProps}
      >
        <HtmlDiv className={toastClassNames.styleWrapper}>
          <HtmlDiv className={toastClassNames.iconWrapper}>
            <Icon icon="checkCircle" className={toastClassNames.icon} />
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
  (props: ToastProps & InnerRef & SuomifiThemeProp) => {
    const { theme, ...passProps } = props;
    return <BaseToast {...passProps} />;
  },
)`
  ${({ theme }) => baseStyles(theme)};
`;
export const Toast = forwardRef(
  (props: ToastProps, ref: React.RefObject<HTMLDivElement>) => {
    const { ...passProps } = props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <StyledToast forwardedRef={ref} theme={suomifiTheme} {...passProps} />
        )}
      </SuomifiThemeConsumer>
    );
  },
);
