import React, { Component, ReactNode } from 'react';
import classnames from 'classnames';
import { default as styled } from 'styled-components';
import { HtmlSpan, HtmlSpanProps } from '../../../reset';
import { SuomifiTheme, SuomifiThemeConsumer } from '../../theme';
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
  }: HintTextProps & { theme: SuomifiTheme }) => (
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
export class HintText extends Component<HintTextProps> {
  render() {
    const { children, ...passProps } = this.props;
    if (!children) {
      return null;
    }
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <StyledHintText theme={suomifiTheme} {...passProps}>
            {children}
          </StyledHintText>
        )}
      </SuomifiThemeConsumer>
    );
  }
}
