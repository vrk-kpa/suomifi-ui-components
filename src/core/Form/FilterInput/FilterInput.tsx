import React, { Component, ChangeEvent } from 'react';
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
import classnames from 'classnames';
import { Omit } from '../../../utils/typescript';
import { LabelText, LabelMode } from '../LabelText/LabelText';
import { AutoId } from '../../../utils/AutoId';
import { InputStatus } from '../types';
import { StatusText } from '../StatusText/StatusText';

const baseClassName = 'fi-filter-input';
const filterInputClassNames = {
  error: `${baseClassName}--error`,
  disabled: `${baseClassName}--disabled`,
  inputElementContainer: `${baseClassName}_input-element-container`,
  inputElement: `${baseClassName}_input`,
};

type FilterInputStatus = Exclude<InputStatus, 'success'>;

export interface FilterInputProps<T>
  extends Omit<HtmlInputProps, 'type'>,
    TokensProp {
  /** FilterInput container div class name for custom styling. */
  className?: string;
  /** FilterInput container div props */
  inputContainerProps?: Omit<HtmlDivProps, 'className'>;
  /** Disable input usage */
  disabled?: boolean;
  /** Placeholder text for input. Use only as visual aid, not for instructions. */
  visualPlaceholder?: string;
  /** Label */
  labelText: string;
  /** Hide or show label. Label element is always present, but can be visually hidden.
   * @default visible
   */
  labelMode?: LabelMode;
  /** Text to mark a field optional. Will be wrapped in parentheses and shown after labelText. */
  optionalText?: string;
  /**
   * 'default' | 'error'
   * @default default
   */
  status?: FilterInputStatus;
  /** Status text to be shown below the component and hint text. Use e.g. for validation error */
  statusText?: string;
  /** FilterInput name */
  name?: string;
  /** Items to be filtered */
  items: Array<T>;
  /** Returns the filtered items */
  onFiltering: (filteredItems: Array<T>) => void;
  /** Filtering rule to be used */
  filterRule: (item: T, query: string) => boolean;
}

class BaseFilterInput<T> extends Component<FilterInputProps<T>> {
  render() {
    const {
      className,
      inputContainerProps,
      visualPlaceholder,
      labelText,
      labelMode,
      optionalText,
      status,
      statusText,
      id,
      'aria-describedby': ariaDescribedBy,
      items: propItems,
      onFiltering: propOnFiltering,
      filterRule: propFilterRule,
      ...passProps
    } = this.props;

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { items, onFiltering, filterRule } = this.props;
      const { value } = event.target;

      const filteredItems: T[] = items.reduce((filtered: T[], item: T) => {
        if (filterRule(item, value)) {
          filtered.push(item);
        }
        return filtered;
      }, []);

      onFiltering(filteredItems);
    };

    const statusTextId = statusText ? `${id}-statusText` : undefined;

    return (
      <HtmlDiv
        {...inputContainerProps}
        className={classnames(baseClassName, className, {
          [filterInputClassNames.disabled]: !!passProps.disabled,
          [filterInputClassNames.error]: status === 'error',
        })}
      >
        <LabelText
          htmlFor={id}
          as="label"
          labelMode={labelMode}
          optionalText={optionalText}
        >
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
            onChange={onChangeHandler}
          />
        </HtmlDiv>
        <StatusText id={statusTextId} status={status}>
          {statusText}
        </StatusText>
      </HtmlDiv>
    );
  }
}

const FilterInputWithoutTokens: <T>(
  props: FilterInputProps<T> & InternalTokensProp,
) => JSX.Element = ({
  // eslint-disable-next-line react/prop-types
  tokens,
  // eslint-disable-next-line react/prop-types
  id: propId,
  ...passProps
}) => (
  <AutoId id={propId}>
    {(id) => <BaseFilterInput id={id} {...passProps} />}
  </AutoId>
);

const StyledFilterInput = styled(FilterInputWithoutTokens)`
  ${(props) => baseStyles(props)}
`;

/**
 * <i class="semantics" />
 * Use for filtering.
 * Props other than specified explicitly are passed on to underlying input element.
 */
export class FilterInput<T> extends Component<FilterInputProps<T>> {
  render() {
    return <StyledFilterInput {...withSuomifiDefaultProps(this.props)} />;
  }
}
