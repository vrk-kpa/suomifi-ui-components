import React, { Component } from 'react';
import styled from '@emotion/styled';
import { withDefaultTheme } from '../../theme/utils';
import { ThemeComponent } from '../../theme';
import { baseStyles } from './TextInput.baseStyles';
import {
  TextInput as CompTextInput,
  TextInputProps as CompTextInputProps,
} from '../../../components/Form/TextInput';

const labelParagraphClassName = 'fi-text-input-label-p';
const inputContainerClassName = 'fi-text-input-container';

export interface TextInputProps extends CompTextInputProps, ThemeComponent {}

const StyledTextInput = styled(({ theme, ...passProps }: TextInputProps) => (
  <CompTextInput
    {...passProps}
    labelTextProps={{ className: labelParagraphClassName }}
    inputContainerProps={{ className: inputContainerClassName }}
  />
))`
  ${props => baseStyles(props)}
`;

/**
 * Use for user inputting text
 */
export class TextInput extends Component<TextInputProps> {
  render() {
    const { ...passProps } = withDefaultTheme(this.props);

    return <StyledTextInput {...passProps} />;
  }
}
