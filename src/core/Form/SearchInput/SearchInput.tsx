import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { DefinedTokensProp } from '../../theme';
import { withSuomifiDefaultProps } from '../../theme/utils';
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
  ({
    tokens,
    className,
    inputClassName,
    ...passProps
  }: TextInputProps & DefinedTokensProp) => (
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
 * <i class="semantics" />
 * Use for user inputting search text
 */
export class SearchInput extends Component<TextInputProps> {
  render() {
    return (
      <StyledTextInput
        labelMode="screenreader"
        {...withSuomifiDefaultProps(this.props)}
      >
        <Icon icon="search" className={iconBaseClassName} />
      </StyledTextInput>
    );
  }
}
