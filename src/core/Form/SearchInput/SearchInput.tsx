import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { InternalTokensProp } from '../../theme';
import { withSuomifiDefaultProps } from '../../theme/utils';
import { baseStyles } from './SearchInput.baseStyles';
import { TextInput, TextInputProps } from '../TextInput/TextInput';
import { Icon } from '../../Icon/Icon';
import classnames from 'classnames';
import { Omit } from '../../../utils/typescript';
import { logger } from '../../../utils/logger';

const baseClassName = 'fi-search-input';
const inputContainerBaseClassName = `${baseClassName}_input-container`;
const inputBaseClassName = `${baseClassName}_input`;
const iconBaseClassName = `${baseClassName}_icon`;
type Label = 'default' | 'screenreader';

export interface SearchInputProps extends Omit<TextInputProps, 'variant'> {
  /** Input placeholder-text if not using screenreader-labelmode */
  placeholder?: string;
  /** Label displaymode
   * default: show above, screenreader: show as placeholder
   */
  labelMode?: Label;
}

const StyledTextInput = styled(
  ({
    tokens,
    className,
    inputClassName,
    ...passProps
  }: TextInputProps & InternalTokensProp) => (
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
export class SearchInput extends Component<SearchInputProps> {
  render() {
    const { labelMode, labelText, placeholder } = this.props;

    const ifScreenreader = labelMode === 'screenreader';
    if (ifScreenreader && placeholder) {
      logger.warn(
        'Placeholder not used as label is hidden and using label instead',
      );
    }
    return (
      <StyledTextInput
        {...withSuomifiDefaultProps(this.props)}
        placeholder={ifScreenreader ? labelText : placeholder}
      >
        <Icon icon="search" className={iconBaseClassName} />
      </StyledTextInput>
    );
  }
}
