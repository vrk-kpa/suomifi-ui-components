import React, { Component } from 'react';
import styled from '@emotion/styled';
import { withDefaultTheme } from '../theme/utils';
import { ThemeComponent, ColorProp } from '../theme';
import {
  Paragraph as CompParagraph,
  ParagraphProps as CompParagraphProps,
} from '../../components/Paragraph/Paragraph';
import { baseStyles } from './Paragraph.baseStyles';
import { SpaceProp } from '../theme/utils/spacing';

export interface ParagraphProps extends CompParagraphProps, ThemeComponent {
  /** Change color */
  color?: ColorProp;
  /** Spacing token for bottom margin */
  marginBottomSpacing?: SpaceProp;
}

const StyledParagraph = styled(
  ({ theme, color, ...passProps }: ParagraphProps) => (
    <CompParagraph {...passProps} />
  ),
)`
  ${props => baseStyles(props)};
`;

/**
 * Used displaying Paragraph with correct styles
 */
export class Paragraph extends Component<ParagraphProps> {
  render() {
    return <StyledParagraph {...withDefaultTheme(this.props)} />;
  }
}
