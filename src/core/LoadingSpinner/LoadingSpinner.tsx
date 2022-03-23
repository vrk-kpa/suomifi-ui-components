import React, { Component, forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { baseStyles } from './LoadingSpinner.baseStyles';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../theme';
import { HtmlDiv, HtmlDivWithRef } from '../../reset';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';

export interface LoadingSpinnerProps {
  /** Custom class name for styling and customizing */
  className?: string;
  /** Unique id */
  id?: string;
  /** Label text for LoadingSpinner */
  labelText: string;
  /** Align label on bottom or on the right side of animation svg
   * @default 'bottom'
   */
  labelAlign?: 'bottom' | 'right';
  /** Is LoadingSpinners's Label visible or not
   * @default 'visible'
   */
  labelMode?: 'visible' | 'hidden';
}
interface InnerRef {
  forwardedRef: React.RefObject<HTMLDivElement>;
}
const baseClassName = 'fi-loadingSpinner';
export const loadingSpinnerClassNames = {
  label: `${baseClassName}-label`,
};
class BaseLoadingSpinner extends Component<LoadingSpinnerProps & InnerRef> {
  render() {
    const {
      className,
      id,
      labelText,
      labelAlign = 'bottom',
      labelMode = 'visible',
      ...passProps
    } = this.props;
    return (
      <HtmlDivWithRef
        className={classnames(baseClassName, className, labelAlign)}
        as="section"
        {...passProps}
      >
        <svg aria-hidden="true" viewBox="0 0 40 40" version="1.1">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <path
              d="M20,0 L20,3 C10.6111593,3 3,10.6111593 3,20 C3,29.3888407 10.6111593,37 20,37 
              C29.280923,37 36.824796,29.5628044 36.9969921,20.3230397 L37,20 L40,20 C40,31.045695 
              31.045695,40 20,40 C8.954305,40 0,31.045695 0,20 C0,9.06936433 8.76872859,0.186774951 
              19.6555106,0.00290705581 L20,0 Z"
              id="Path"
              fill="#00347A"
              fillRule="nonzero"
            />
          </g>
        </svg>
        <HtmlDiv className={loadingSpinnerClassNames.label}>
          {labelMode === 'visible' ? (
            labelText
          ) : (
            <VisuallyHidden>{labelText}</VisuallyHidden>
          )}
        </HtmlDiv>
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
