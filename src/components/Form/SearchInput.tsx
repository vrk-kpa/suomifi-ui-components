import React, { Component } from 'react';
import { StyledBaseTextInput, TextInputProps } from './TextInput';
import { logger } from '../../utils/logger';

export class SearchInput extends Component<TextInputProps> {
  render() {
    const { placeholder, ...passProps } = this.props;

    if (!!placeholder) {
      logger.warn(
        'Manually set placeholder attribute is not supported, use labelText instead',
      );
    }
    const labelAsPlaceholder = this.props.labelMode === 'hidden';
    const props = {
      placeholder: labelAsPlaceholder ? this.props.labelText : undefined,
    };

    return <StyledBaseTextInput {...passProps} {...props} />;
  }
}
