import React, { Component, forwardRef, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { baseStyles } from './LoadingSpinner.baseStyles';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../theme';
import { HtmlDiv, HtmlDivWithRef } from '../../reset';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import { ComponentIcon } from '../StaticIcon/StaticIcon';
import { Icon } from '../../core/Icon/Icon';

export interface LoadingSpinnerProps {
  /** Custom class name for styling and customizing */
  className?: string;
  /** Unique id */
  id?: string;
  /** Label text or html */
  labelText: ReactNode;
  /** Align label on bottom or on the right side of animation svg
   * @default 'bottom'
   */
  labelAlign?: 'bottom' | 'right';
  /** Is the label visible or hidden
   * @default 'visible'
   */
  labelMode?: 'visible' | 'hidden';
  /** Status that the component indicates. Affects the icon used.
   * @default 'loading'
   */
  status?: 'loading' | 'success' | 'failed';
  /** Affects the size of the icon and label text
   * @default 'normal'
   */
  variant?: 'normal' | 'small';
}
interface InnerRef {
  forwardedRef: React.RefObject<HTMLDivElement>;
}
const baseClassName = 'fi-loadingSpinner';

export const loadingSpinnerClassNames = {
  label: `${baseClassName}_label`,
  labelAlignBottom: `${baseClassName}-labelAlign--bottom`,
  labelAlignRight: `${baseClassName}-labelAlign--right`,
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
      labelText,
      labelAlign = 'bottom',
      labelMode = 'visible',
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
          [loadingSpinnerClassNames.labelAlignRight]: labelAlign === 'right',
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
        {status === 'success' && <Icon icon="checkCircleFilled" />}
        {status === 'failed' && <Icon icon="errorFilled" />}

        {labelMode === 'visible' ? (
          <HtmlDiv className={loadingSpinnerClassNames.label}>
            {labelText}
          </HtmlDiv>
        ) : (
          <VisuallyHidden>{labelText}</VisuallyHidden>
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
