import React, { Component } from 'react';
import styled from '@emotion/styled';
import { withDefaultTheme } from '../../theme/utils';
import { baseStyles } from './SearchInput.baseStyles';
import { TextInput, TextInputProps } from '../TextInput/TextInput';
import { Icon } from '../../Icon/Icon';
import classnames from 'classnames';
import { Omit } from '../../../utils/typescript';

const baseClassName = 'fi-search-input';
const inputContainerBaseClassName = `${baseClassName}_input-container`;
const inputBaseClassName = `${baseClassName}_input`;
const iconBaseClassName = `${baseClassName}_icon`;

export interface SearchInputProps extends Omit<TextInputProps, 'variant'> {}

const StyledTextInput = styled(
  ({ theme, className, inputClassName, ...passProps }: TextInputProps) => (
    <TextInput
      {...passProps}
      className={classnames(className, baseClassName)}
      inputClassName={classnames(inputClassName, inputBaseClassName)}
      inputContainerProps={{ className: inputContainerBaseClassName }}
    />
  ),
)`
  ${props => baseStyles(props)}
`;

/**
 * Use for user inputting search text
 */
export class SearchInput extends Component<TextInputProps> {
  render() {
    return (
      <StyledTextInput
        labelMode="screenreader"
        {...withDefaultTheme(this.props)}
      >
        <Icon icon="search" className={iconBaseClassName} />
      </StyledTextInput>
    );
  }
}
