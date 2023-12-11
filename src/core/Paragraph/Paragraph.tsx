import React, { forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import {
  spacingStyles,
  separateMarginProps,
  MarginProps,
} from '../theme/utils/spacing';
import { ColorProp, SuomifiThemeProp, SuomifiThemeConsumer } from '../theme';
import { baseStyles } from './Paragraph.baseStyles';
import { HtmlP, HtmlPProps } from '../../reset/HtmlP/HtmlP';

const baseClassName = 'fi-paragraph';

export interface ParagraphProps extends HtmlPProps, MarginProps {
  /** Sets a color for the text. Colors from SuomifiTheme are available */
  color?: ColorProp;
  /** Ref object is forwarded to the paragraph element. Alternative to React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLParagraphElement>;
}

const StyledParagraph = styled(
  ({ className, theme, style, ...rest }: ParagraphProps & SuomifiThemeProp) => {
    const [marginProps, passProps] = separateMarginProps(rest);
    const marginStyle = spacingStyles(marginProps);

    return (
      <HtmlP
        className={classnames(baseClassName, className)}
        {...passProps}
        style={{ ...marginStyle, ...style }}
      />
    );
  },
)`
  ${({ theme }) => baseStyles(theme)}
`;

const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  (props, ref) => (
    <SuomifiThemeConsumer>
      {({ suomifiTheme }) => (
        <StyledParagraph theme={suomifiTheme} forwardedRef={ref} {...props} />
      )}
    </SuomifiThemeConsumer>
  ),
);

Paragraph.displayName = 'Paragraph';
export { Paragraph };
