import React from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { unStyled } from './Button.baseStyles';
import { Button, ButtonProps } from '../../components/Button/Button';

const baseClassName = 'fi-button';

export const UnstyledButton = styled((props: ButtonProps) => {
  const { className, ...passProps } = props;
  return (
    <Button {...passProps} className={classnames(className, baseClassName)} />
  );
})`
  ${props => unStyled(props)}
`;
