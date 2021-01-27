import React, { Component } from 'react';
import { withSuomifiDefaultProps } from '../../../theme/utils';
import { TokensProp } from '../../../theme';
import { StyledToggle, ToggleProps } from '../Toggle/Toggle';

export class ToggleButton extends Component<ToggleProps & TokensProp> {
  render() {
    return (
      <StyledToggle variant="button" {...withSuomifiDefaultProps(this.props)} />
    );
  }
}
