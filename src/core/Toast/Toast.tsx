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
  /** Heading for the Toast */
  headingText?: string;
  /** Main content of the Toast. */
  children?: ReactNode;
  /** Custom class name for styling and customizing */
  className?: string;
  /** Heading variant for Toast.
   * @default 'h2'
   */
  headingVariant?: Exclude<hLevels, 'h1'>;
  /** Unique id */
  id?: string;
  /** Ref to be passed to the wrapping div element. Alternative to React `ref` attribute. */
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
const StyledToast = styled((props: ToastProps & SuomifiThemeProp) => {
  const { theme, ...passProps } = props;
  return <BaseToast {...passProps} />;
})`
  ${({ theme }) => baseStyles(theme)};
`;

const Toast = forwardRef(
  (props: ToastProps, ref: React.Ref<HTMLDivElement>) => {
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

Toast.displayName = 'Toast';
export { Toast };
