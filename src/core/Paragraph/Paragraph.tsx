import React, { forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { SpacingWithoutInsetProp } from '../theme/utils/spacing';
import { ColorProp, SuomifiThemeProp, SuomifiThemeConsumer } from '../theme';
import { baseStyles } from './Paragraph.baseStyles';
import { HtmlP, HtmlPProps } from '../../reset/HtmlP/HtmlP';

const baseClassName = 'fi-paragraph';

export interface ParagraphProps extends HtmlPProps {
  /** Change color */
  color?: ColorProp;
  /** Spacing token for bottom margin */
  marginBottomSpacing?: SpacingWithoutInsetProp;
  /** Ref object is passed to the paragraph element. Alternative to React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLParagraphElement>;
}

const StyledParagraph = styled(
  ({
    marginBottomSpacing,
    className,
    theme,
    ...passProps
  }: ParagraphProps & SuomifiThemeProp) => (
    <HtmlP
      className={classnames(baseClassName, className, {
        [`${baseClassName}--margin-${marginBottomSpacing}`]:
          !!marginBottomSpacing,
      })}
      {...passProps}
    />
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

/**
 * Used for displaying a &lt;p&gt; element with correct styles
 */
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
