import React, { forwardRef, ReactNode } from 'react';
import classnames from 'classnames';
import { default as styled } from 'styled-components';
import { HtmlSpan, HtmlSpanProps } from '../../../reset';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import {
  spacingStyles,
  separateMarginProps,
  MarginProps,
} from '../../theme/utils/spacing';
import { baseStyles } from './HintText.baseStyles';

const baseClassName = 'fi-hint-text';

export interface HintTextProps extends HtmlSpanProps, MarginProps {
  /** HTML id attribute */
  id?: string;
  /** HintText element content */
  children?: ReactNode;
  /** Custom class name to extend or customize  */
  className?: string;
  /** Ref is forwarded to the span element. Alternative for React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLSpanElement>;
}

const StyledHintText = styled(
  ({
    className,
    theme,
    children,
    ...rest
  }: HintTextProps & SuomifiThemeProp) => {
    const [marginProps, passProps] = separateMarginProps(rest);
    const marginStyle = spacingStyles(marginProps);
    return (
      <HtmlSpan
        {...passProps}
        className={classnames(className, baseClassName, {})}
        style={{ ...marginStyle, ...passProps?.style }}
      >
        {children}
      </HtmlSpan>
    );
  },
)`
  ${({ theme }) => baseStyles(theme)}
`;

const HintText = forwardRef(
  (props: HintTextProps, ref: React.Ref<HTMLSpanElement>) => {
    const { children, ...passProps } = props;
    if (!children) {
      return null;
    }
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <StyledHintText
            forwardedRef={ref}
            theme={suomifiTheme}
            {...passProps}
          >
            {children}
          </StyledHintText>
        )}
      </SuomifiThemeConsumer>
    );
  },
);

HintText.displayName = 'HintText';
export { HintText };
