import React, { forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { SpacingWithoutInsetProp, spacingStyles } from '../theme/utils/spacing';
import { ColorProp, SuomifiThemeProp, SuomifiThemeConsumer } from '../theme';
import { baseStyles } from './Paragraph.baseStyles';
import { HtmlP, HtmlPProps } from '../../reset/HtmlP/HtmlP';

const baseClassName = 'fi-paragraph';

export interface ParagraphProps extends HtmlPProps {
  /** Sets a color for the text. Colors from SuomifiTheme are available */
  color?: ColorProp;
  /** Spacing token for bottom margin */
  marginBottomSpacing?: SpacingWithoutInsetProp;
  /** Ref object is forwarded to the paragraph element. Alternative to React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLParagraphElement>;
}

const StyledParagraph = styled(
  ({
    marginBottomSpacing,
    className,
    theme,
    style,
    ...passProps
  }: ParagraphProps & SuomifiThemeProp) => (
    <HtmlP
      className={classnames(baseClassName, className)}
      style={{ ...spacingStyles({ mb: marginBottomSpacing }), ...style }}
      {...passProps}
    />
  ),
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
