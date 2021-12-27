import React, { Component, forwardRef, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { baseStyles } from './Toast.baseStyles';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../theme';
import { AutoId } from '../utils/AutoId/AutoId';
import { HtmlDiv, HtmlDivWithRef } from '../../reset';
import { hLevels } from '../../reset/HtmlH/HtmlH';

export interface ToastProps {
  /** Set aria-live mode for the Toast text content and label.
   * @default 'polite'
   */
  ariaLiveMode?: 'polite' | 'assertive' | 'off';
  /** Label heading for the Toast */
  labelText?: string;
  /** Main content of the Toast */
  children?: ReactNode;
  /** Custom classname to extend or customize */
  className?: string;
  /** Elements to be rendered under the Toast text. Can be e.g. buttons, links etc. */
  headingVariant?: Exclude<hLevels, 'h1'>;
  /** Use small screen styling */
  smallScreen?: boolean;
  /** Id for focus */
  id?: string;
}
interface InnerRef {
  forwardedRef: React.RefObject<HTMLDivElement>;
}
const baseClassName = 'fi-toast';
export const toastClassNames = {
  styleWrapper: `${baseClassName}_style-wrapper`,
};
class BaseToast extends Component<ToastProps & InnerRef> {
  render() {
    const {
      ariaLiveMode = 'assertive',
      children,
      className,
      forwardedRef,
      headingVariant,
      id,
      ...passProps
    } = this.props;
    return (
      <HtmlDivWithRef
        className={classnames(baseClassName, className)}
        as="section"
        {...passProps}
      >
        <HtmlDiv id={id} className={toastClassNames.styleWrapper}>
          test
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
export const Alert = forwardRef(
  (props: ToastProps, ref: React.RefObject<HTMLDivElement>) => {
    const { id: propId, ...passProps } = props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <AutoId id={propId}>
            {(id) => (
              <StyledToast
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
