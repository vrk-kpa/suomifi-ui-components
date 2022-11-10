import React, { Component, forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { IconPreloader } from 'suomifi-icons/componentIcons';
import { baseStyles } from './LoadingSpinner.baseStyles';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../theme';
import { HtmlDiv, HtmlDivWithRef } from '../../reset';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import {
  IconCheckCircleFilled,
  IconErrorFilled,
} from 'suomifi-icons/baseIcons';

export type LoadingSpinnerStatus = 'loading' | 'success' | 'failed';
export interface LoadingSpinnerProps {
  /** Custom class name for styling and customizing */
  className?: string;
  /** Unique id */
  id?: string;
  /** Status text shown next to the icon */
  text: string;
  /** Align the text on the bottom or on the right side of the animation svg
   * @default 'bottom'
   */
  textAlign?: 'bottom' | 'right';
  /** Show or hide the status text
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
  /** Ref to be passed to the root div element. Alternative to React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLDivElement>;
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

class BaseLoadingSpinner extends Component<LoadingSpinnerProps> {
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
          <IconPreloader className={loadingSpinnerClassNames.icon} />
        )}
        {status === 'success' && (
          <IconCheckCircleFilled className={loadingSpinnerClassNames.icon} />
        )}
        {status === 'failed' && (
          <IconErrorFilled className={loadingSpinnerClassNames.icon} />
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
  (props: LoadingSpinnerProps & SuomifiThemeProp) => {
    const { theme, ...passProps } = props;
    return <BaseLoadingSpinner {...passProps} />;
  },
)`
  ${({ theme }) => baseStyles(theme)};
`;
const LoadingSpinner = forwardRef(
  (props: LoadingSpinnerProps, ref: React.Ref<HTMLDivElement>) => {
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

LoadingSpinner.displayName = 'LoadingSpinner';
export { LoadingSpinner };
