import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { InternalTokensProp } from '../../theme';
import { withSuomifiDefaultProps } from '../../theme/utils';
import { baseStyles } from './SearchInput.baseStyles';
import { baseStyles as inputBaseStyles } from '../TextInput/TextInput.baseStyles';
import { BaseTextInput } from '../../../components/Form/TextInput';
import { TextInputProps, textInputClassNames } from '../TextInput/TextInput';
import { Icon } from '../../Icon/Icon';
import classnames from 'classnames';
import { Omit } from '../../../utils/typescript';
import { logger } from '../../../utils/logger';

const baseClassName = 'fi-search-input';
const inputContainerBaseClassName = `${baseClassName}_input-container`;
const inputBaseClassName = `${baseClassName}_input`;
const iconBaseClassName = `${baseClassName}_icon`;

export interface SearchInputProps extends Omit<TextInputProps, 'variant'> {}

const StyledTextInput = styled(
  ({
    tokens,
    className,
    labelTextProps = { className: undefined },
    inputContainerProps = { className: inputContainerBaseClassName },
    inputClassName,
    ...passProps
  }: TextInputProps & InternalTokensProp) => (
    <BaseTextInput
      {...passProps}
      labelTextProps={{
        ...labelTextProps,
        className: classnames(
          labelTextProps.className,
          textInputClassNames.labelParagraph,
        ),
      }}
      inputContainerProps={{
        ...inputContainerProps,
        className: classnames(
          inputContainerProps.className,
          textInputClassNames.inputContainer,
        ),
      }}
      {...passProps}
      className={classnames(className, baseClassName)}
      inputClassName={classnames(inputClassName, inputBaseClassName)}
    />
  ),
)`
  ${props => baseStyles(props)}
  ${props => inputBaseStyles(props)}
`;

/**
 * <i class="semantics" />
 * Use for user inputting search text
 */
export class SearchInput extends Component<SearchInputProps> {
  render() {
    const { labelText, placeholder } = this.props;

    if (!!placeholder && labelText !== placeholder) {
      logger.warn(
        'Placeholder different than label is not supported, using labelText instead',
      );
    }

    return (
      <StyledTextInput {...withSuomifiDefaultProps(this.props)}>
        <Icon icon="search" className={iconBaseClassName} />
      </StyledTextInput>
    );
  }
}
