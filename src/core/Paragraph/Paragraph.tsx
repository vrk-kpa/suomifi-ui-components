import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { ColorProp } from '../theme';
import {
  Paragraph as CompParagraph,
  ParagraphProps as CompParagraphProps,
  baseClassName,
} from '../../components/Paragraph/Paragraph';
import { baseStyles } from './Paragraph.baseStyles';
import { SpacingWithoutInsetProp } from '../theme/utils/spacing';

export interface ParagraphProps extends CompParagraphProps {
  /** Change color */
  color?: ColorProp;
  /** Spacing token for bottom margin */
  marginBottomSpacing?: SpacingWithoutInsetProp;
}

const StyledParagraph = styled(
  ({ marginBottomSpacing, className, ...passProps }: ParagraphProps) => (
    <CompParagraph
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
