import React, { Component, forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { baseStyles } from './LoadingSpinner.baseStyles';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../theme';
import { HtmlDiv, HtmlDivWithRef } from '../../reset';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import { ComponentIcon } from '../StaticIcon/StaticIcon';
import { Icon } from '../../core/Icon/Icon';

export type LoadingSpinnerStatus = 'loading' | 'success' | 'failed';
export interface LoadingSpinnerProps {
  /** Custom class name for styling and customizing */
  className?: string;
  /** Unique id */
  id?: string;
  /** Status text */
  text: string;
  /** Align text on bottom or on the right side of animation svg
   * @default 'bottom'
   */
  textAlign?: 'bottom' | 'right';
  /** Is the text visible or hidden
   * @default 'visible'
   */
  textVisibility?: 'visible' | 'hidden';
  /** Status that the component indicates. Affects the icon used.
   * @default 'loading'
   */
  status?: LoadingSpinnerStatus;
  /** Affects the size of the icon and the text
   * @default 'normal'
   */
  variant?: 'normal' | 'small';
}
interface InnerRef {
  forwardedRef: React.RefObject<HTMLDivElement>;
}
const baseClassName = 'fi-loadingSpinner';

export const loadingSpinnerClassNames = {
  text: `${baseClassName}_text`,
  textAlignBottom: `${baseClassName}-textAlign--bottom`,
  textAlignRight: `${baseClassName}-textAlign--right`,
  small: `${baseClassName}--small`,
  failed: `${baseClassName}--failed`,
  loading: `${baseClassName}--loading`,
  success: `${baseClassName}--success`,
  icon: `${baseClassName}_icon`,
};

class BaseLoadingSpinner extends Component<LoadingSpinnerProps & InnerRef> {
  render() {
    const {
      className,
      id,
      text,
      textAlign = 'bottom',
      textVisibility = 'visible',
      variant = 'normal',
      status = 'loading',
      ...passProps
    } = this.props;

    return (
      <HtmlDivWithRef
        className={classnames(baseClassName, className, {
          [loadingSpinnerClassNames.loading]: status === 'loading',
          [loadingSpinnerClassNames.failed]: status === 'failed',
          [loadingSpinnerClassNames.success]: status === 'success',
          [loadingSpinnerClassNames.small]: variant === 'small',
          [loadingSpinnerClassNames.textAlignRight]: textAlign === 'right',
        })}
        as="section"
        id={id}
        {...passProps}
      >
        {status === 'loading' && (
          <ComponentIcon
            icon="preloader"
            className={loadingSpinnerClassNames.icon}
          />
        )}
        {status === 'success' && (
          <Icon
            icon="checkCircleFilled"
            className={loadingSpinnerClassNames.icon}
          />
        )}
        {status === 'failed' && (
          <Icon icon="errorFilled" className={loadingSpinnerClassNames.icon} />
        )}

        {textVisibility === 'visible' ? (
          <HtmlDiv className={loadingSpinnerClassNames.text}>{text}</HtmlDiv>
        ) : (
          <VisuallyHidden>{text}</VisuallyHidden>
        )}
      </HtmlDivWithRef>
    );
  }
}
const StyledLoadingSpinner = styled(
  (props: LoadingSpinnerProps & InnerRef & SuomifiThemeProp) => {
    const { theme, ...passProps } = props;
    return <BaseLoadingSpinner {...passProps} />;
  },
)`
  ${({ theme }) => baseStyles(theme)};
`;
export const LoadingSpinner = forwardRef(
  (props: LoadingSpinnerProps, ref: React.RefObject<HTMLDivElement>) => {
    const { ...passProps } = props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <StyledLoadingSpinner
            forwardedRef={ref}
            theme={suomifiTheme}
            {...passProps}
          />
        )}
      </SuomifiThemeConsumer>
    );
  },
);
