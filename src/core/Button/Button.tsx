import React, { Component } from 'react';
import styled from '@emotion/styled';
import { Button as CompButton, IButtonProps } from '../../components/Button';
export { IButtonProps };

const StyledButton = styled<any, IButtonProps>(CompButton)`
  color: hotpink;
`;

/**
 * Use for inside Application onClick events
 */
export default class Button extends Component<IButtonProps> {
  render() {
    return <StyledButton {...this.props} />;
  }
}
