import React, { Component, ChangeEvent } from 'react';
// import { default as styled } from 'styled-components';
// import { withSuomifiDefaultProps } from '../../theme/utils';
import {
  HtmlInput,
  HtmlInputProps,
  HtmlDiv,
  HtmlDivProps,
} from '../../../reset';
import { TokensProp } from '../../theme';
// import { TokensProp, InternalTokensProp } from '../../theme';
// import { baseStyles } from './FilterInput.baseStyles';
import classnames from 'classnames';
import { Omit } from '../../../utils/typescript';

const baseClassName = 'fi-filter-input';

const filterInputClassNames = {
  baseClassName,
  disabled: `${baseClassName}--disabled`,
  inputElementContainer: `${baseClassName}_input-element-container`,
  inputElement: `${baseClassName}_input`,
};

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
      id,
      'aria-describedby': ariaDescribedBy,
      items: propItems,
      onFiltering: propOnFiltering,
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

    return (
      <HtmlDiv
        {...inputContainerProps}
        className={classnames(baseClassName, className, {
          [filterInputClassNames.disabled]: !!passProps.disabled,
        })}
      >
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
      </HtmlDiv>
    );
  }
}

// NOTE: somewhat working..
// function StyledFilterInput<T>() {
//   return styled(
//     ({ tokens, ...passProps }: FilterInputProps<T> & InternalTokensProp) => {
//       return <BaseFilterInput<T> {...passProps} />;
//     },
//   )`
//     ${(props) => baseStyles(props)}
//   `;
// }

/**
 * <i class="semantics" />
 * Use for filtering.
 * Props other than specified explicitly are passed on to underlying input element.
 */
export class FilterInput<T> extends Component<FilterInputProps<T>> {
  render() {
    const { tokens, ...passProps } = this.props;
    return <BaseFilterInput {...passProps} />;
  }
}

// export class FilterInput<T> extends Component<
//   FilterInputProps<T> & TokensProp
// > {
//   render() {
//     return (
//       <StyledFilterInput<React.FC<FilterInputProps<T>>>
//         {...withSuomifiDefaultProps(this.props)}
//       />
//     );
//   }
// }
