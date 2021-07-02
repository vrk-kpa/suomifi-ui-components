import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { SpacingWithoutInsetProp } from '../theme/utils/spacing';
import { ColorProp } from '../theme';
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
  ({ marginBottomSpacing, className, ...passProps }: ParagraphProps) => (
    <HtmlP
      className={classnames(className, {
        [`${baseClassName}--margin-${marginBottomSpacing}`]: !!marginBottomSpacing,
      })}
      {...passProps}
    />
  ),
)`
  ${baseStyles}
`;

/**
 * Used displaying Paragraph with correct styles
 */
export class Paragraph extends Component<ParagraphProps> {
  render() {
    return <StyledParagraph {...this.props} />;
  }
}
