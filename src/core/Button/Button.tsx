import React, { Component, ComponentType } from 'react';
import styled from '@emotion/styled';
import { defaultPropsTheme } from '../utils';
import { IThemeComponent } from '../theme';
import { baseStyles } from './Button.baseStyles';
import {
  Button as CompButton,
  IButtonProps as ICompButtonProps,
} from '../../components/Button';

export interface IButtonProps extends ICompButtonProps, IThemeComponent {}

const StyledButton = styled<ComponentType<any>, IButtonProps>(CompButton)`
  label: ${({ disabled }) => (disabled ? 'button--disabled' : 'button')};
  ${props => baseStyles(props)}
`;

/**
 * Use for inside Application onClick events
 */
export default class Button extends Component<IButtonProps> {
  static defaultProps = defaultPropsTheme(CompButton);

  render() {
    return <StyledButton {...this.props} />;
  }
}
