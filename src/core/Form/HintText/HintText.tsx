import React, { forwardRef, ReactNode } from 'react';
import classnames from 'classnames';
import { default as styled } from 'styled-components';
import { HtmlSpan, HtmlSpanProps } from '../../../reset';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { baseStyles } from './HintText.baseStyles';

const baseClassName = 'fi-hint-text';

export interface HintTextProps extends HtmlSpanProps {
  /** id */
  id?: string;
  /** HintText element content */
  children?: ReactNode;
  /** Custom class name for styling and customizing  */
  className?: string;
}

const StyledHintText = styled(
  ({
    className,
    theme,
    children,
    ...passProps
  }: HintTextProps & SuomifiThemeProp) => (
    <HtmlSpan
      {...passProps}
      className={classnames(className, baseClassName, {})}
    >
      {children}
    </HtmlSpan>
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

const HintText = forwardRef(
  (props: HintTextProps, ref: React.RefObject<HTMLSpanElement>) => {
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
