import React, { Component } from 'react';
import { StyledBaseTextInput, TextInputProps } from './TextInput';

export class SearchInput extends Component<TextInputProps> {
  render() {
    return <StyledBaseTextInput {...this.props} />;
  }
}
