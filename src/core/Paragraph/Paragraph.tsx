import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { withSuomifiDefaultProps } from '../theme/utils';
import { TokensProp, ColorProp, InternalTokensProp } from '../theme';
import {
  Paragraph as CompParagraph,
  ParagraphProps as CompParagraphProps,
} from '../../components/Paragraph/Paragraph';
import { baseStyles } from './Paragraph.baseStyles';
import { SpaceProp } from '../theme/utils/spacing';

export interface ParagraphProps extends CompParagraphProps, TokensProp {
  /** Change color */
  color?: ColorProp;
  /** Spacing token for bottom margin */
  marginBottomSpacing?: SpaceProp;
}

const StyledParagraph = styled(
  ({
    tokens,
    color,
    marginBottomSpacing,
    ...passProps
  }: ParagraphProps & InternalTokensProp) => <CompParagraph {...passProps} />,
)`
  ${props => baseStyles(props)};
`;

/**
 * Used displaying Paragraph with correct styles
 */
export class Paragraph extends Component<ParagraphProps> {
  render() {
    return <StyledParagraph {...withSuomifiDefaultProps(this.props)} />;
  }
}
