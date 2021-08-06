import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { SpacingWithoutInsetProp } from '../theme/utils/spacing';
import { ColorProp, SuomifiTheme, SuomifiThemeConsumer } from '../theme';
import { baseStyles } from './Paragraph.baseStyles';
import { HtmlP, HtmlPProps } from '../../reset/HtmlP/HtmlP';

const baseClassName = 'fi-paragraph';

export interface ParagraphProps extends HtmlPProps {
  /** Change color */
  color?: ColorProp;
  /** Spacing token for bottom margin */
  marginBottomSpacing?: SpacingWithoutInsetProp;
}

const StyledParagraph = styled(
  ({
    marginBottomSpacing,
    className,
    theme,
    ...passProps
  }: ParagraphProps & { theme: SuomifiTheme }) => (
    <HtmlP
      className={classnames(baseClassName, className, {
        [`${baseClassName}--margin-${marginBottomSpacing}`]: !!marginBottomSpacing,
      })}
      {...passProps}
    />
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

/**
 * Used displaying Paragraph with correct styles
 */
export class Paragraph extends Component<ParagraphProps> {
  render() {
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <StyledParagraph theme={suomifiTheme} {...this.props} />
        )}
      </SuomifiThemeConsumer>
    );
  }
}
