import React from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { unStyled } from './Button.baseStyles';
import { DefinedTokensProp } from '../theme';
import { Button, ButtonProps } from '../../components/Button/Button';

const baseClassName = 'fi-button';

export const UnstyledButton = styled(
  (props: ButtonProps & DefinedTokensProp) => {
    const { className, ...passProps } = props;
    return (
      <Button {...passProps} className={classnames(className, baseClassName)} />
    );
  },
)`
  ${props => unStyled(props)}
`;
