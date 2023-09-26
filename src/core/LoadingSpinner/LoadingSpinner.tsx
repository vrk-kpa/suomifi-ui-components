import React, { Component, forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { baseStyles } from './LoadingSpinner.baseStyles';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../theme';
import {
  spacingStyles,
  separateMarginProps,
  MarginProps,
} from '../theme/utils/spacing';
import { HtmlDiv, HtmlDivWithRef } from '../../reset';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import {
  IconCheckCircleFilled,
  IconErrorFilled,
  IconPreloader,
} from 'suomifi-icons';

export type LoadingSpinnerStatus = 'loading' | 'success' | 'failed';
export interface LoadingSpinnerProps extends MarginProps {
  /** CSS class for custom styles */
  className?: string;
  /** HTML id attribute */
  id?: string;
  /** Status text shown next to the loading icon */
  text: string;
  /** Aligns the text on the bottom or on the right side of the animation svg
   * @default 'bottom'
   */
  textAlign?: 'bottom' | 'right';
  /** Shows or hides the status text
   * @default 'visible'
   */
  textVisibility?: 'visible' | 'hidden';
  /**
   * `'loading'` | `'success'` | `'failed'`;
   *
   * Status that the component indicates. Affects the icon used.
   * @default 'loading'
   */
  status?: LoadingSpinnerStatus;
  /** Component variant. Affects the size of the icon and the text
   * @default 'normal'
   */
  variant?: 'normal' | 'small';
  /** Ref is placed to the outermost div element of the component. Alternative to React `ref` attribute. */
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
      ...rest
    } = this.props;
    const [marginProps, passProps] = separateMarginProps(rest);
    const marginStyle = spacingStyles(marginProps);

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
        style={marginStyle}
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
