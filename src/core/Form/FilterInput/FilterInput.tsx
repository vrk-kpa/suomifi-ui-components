import React, { Component, ChangeEvent, FocusEvent } from 'react';
import { default as styled } from 'styled-components';
import { withSuomifiDefaultProps } from '../../theme/utils';
import {
  HtmlInput,
  HtmlInputProps,
  HtmlDiv,
  HtmlDivProps,
} from '../../../reset';
import { TokensProp, InternalTokensProp } from '../../theme';
import { baseStyles } from './FilterInput.baseStyles';
import { LabelText, LabelMode } from '../LabelText/LabelText';
import classnames from 'classnames';
import { Omit } from '../../../utils/typescript';

const baseClassName = 'fi-filter-input';

export const filterInputClassNames = {
  baseClassName,
  fullWidth: `${baseClassName}--full-width`,
  disabled: `${baseClassName}--disabled`,
  inputElementContainer: `${baseClassName}_input-element-container`,
  inputElement: `${baseClassName}_input`,
};

type FilterInputItem = {
  label: string;
  value: string;
};

export interface FilterInputProps
  extends Omit<HtmlInputProps, 'type'>,
    TokensProp {
  /** FilterInput container div class name for custom styling. */
  className?: string;
  /** FilterInput container div props */
  inputContainerProps?: Omit<HtmlDivProps, 'className'>;
  /** Disable input usage */
  disabled?: boolean;
  /** Event handler to execute when clicked */
  onClick?: () => void;
  /** To execute on input text change */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  /** To execute on input text onBlur */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  /** Label */
  labelText: string;
  /** Hide or show label. Label element is always present, but can be visually hidden.
   * @default visible
   */
  labelMode?: LabelMode;
  /** Placeholder text for input. Use only as visual aid, not for instructions. */
  visualPlaceholder?: string;
  /** FilterInput name */
  name?: string;
  /** Set components width to 100% */
  fullWidth?: boolean;
  items: FilterInputItem[];
}

class BaseFilterInput extends Component<FilterInputProps> {
  render() {
    const {
      className,
      labelText,
      labelMode,
      inputContainerProps,
      visualPlaceholder,
      id,
      fullWidth,
      'aria-describedby': ariaDescribedBy,
      ...passProps
    } = this.props;

    return (
      <HtmlDiv
        {...inputContainerProps}
        className={classnames(baseClassName, className, {
          [filterInputClassNames.disabled]: !!passProps.disabled,
          [filterInputClassNames.fullWidth]: fullWidth,
        })}
      >
        <LabelText htmlFor={id} labelMode={labelMode} as="label">
          {labelText}
        </LabelText>
        <HtmlDiv className={filterInputClassNames.inputElementContainer}>
          <HtmlInput
            {...passProps}
            id={id}
            className={filterInputClassNames.inputElement}
            type="text"
            placeholder={visualPlaceholder}
            aria-describedby={ariaDescribedBy}
            autoComplete="off"
            aria-autocomplete="list"
            auto-capitalize="false"
            spellCheck="false"
            aria-controls="really-good-id"
          />
        </HtmlDiv>
      </HtmlDiv>
    );
  }
}

const StyledFilterInput = styled(
  ({ tokens, ...passProps }: FilterInputProps & InternalTokensProp) => {
    return <BaseFilterInput {...passProps} />;
  },
)`
  ${(props) => baseStyles(props)}
`;

/**
 * <i class="semantics" />
 * Use for filtering.
 * Props other than specified explicitly are passed on to underlying input element.
 */
export class FilterInput extends Component<FilterInputProps> {
  render() {
    return <StyledFilterInput {...withSuomifiDefaultProps(this.props)} />;
  }
}
