import React, { Component } from 'react';
import styled from '@emotion/styled';
import { withDefaultTheme } from '../theme/utils';
import { ThemeComponent, ColorProp } from '../theme';
import {
  Paragraph as CompParagraph,
  ParagraphProps as CompParagraphProps,
} from '../../components/Paragraph/Paragraph';
import { baseStyles } from './Paragraph.baseStyles';

export interface ParagraphProps extends CompParagraphProps, ThemeComponent {
  color?: ColorProp;
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
    const passProps = withDefaultTheme(this.props);
    return <StyledParagraph {...passProps} />;
  }
}
