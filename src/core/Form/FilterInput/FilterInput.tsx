import React, { Component, ChangeEvent, forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { InputStatus } from '../types';
import {
  HtmlInputProps,
  HtmlDiv,
  HtmlDivProps,
  HtmlInput,
} from '../../../reset';
import { AutoId } from '../../../utils/AutoId';
import { getConditionalAriaProp } from '../../../utils/aria';
import { LabelText, LabelMode } from '../LabelText/LabelText';
import { StatusText } from '../StatusText/StatusText';
import { baseStyles } from './FilterInput.baseStyles';

const baseClassName = 'fi-filter-input';
const filterInputClassNames = {
  error: `${baseClassName}--error`,
  disabled: `${baseClassName}--disabled`,
  labelAlignLeft: `${baseClassName}--label-align-left`,
  wrapper: `${baseClassName}_wrapper`,
  functionalityContainer: `${baseClassName}_functionalityContainer`,
  inputElementContainer: `${baseClassName}_input-element-container`,
  inputElement: `${baseClassName}_input`,
};

type FilterInputStatus = Exclude<InputStatus, 'success'>;

interface InternalFilterInputProps<T> extends Omit<HtmlInputProps, 'type'> {
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
  /** Align label on top or on the left side of the input field
   * @default 'top'
   */
  labelAlign?: 'top' | 'left';
  /** Items to be filtered */
  items: Array<T>;
  /** Returns the filtered items */
  onFilter: (filteredItems: Array<T>) => void;
  /** Filtering rule to be used */
  filterFunc: (item: T, query: string) => boolean;
}

interface InnerRef {
  forwardedRef: React.RefObject<HTMLInputElement>;
}

export interface FilterInputProps extends InternalFilterInputProps<any> {
  /** Ref object to be passed to the input element */
  ref?: React.RefObject<HTMLInputElement>;
}

class BaseFilterInput<T> extends Component<FilterInputProps & InnerRef> {
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
      forwardedRef,
      id,
      labelAlign,
      'aria-describedby': ariaDescribedBy,
      items: propItems,
      onFilter: propOnFiltering,
      filterFunc: propFilterRule,
      ...passProps
    } = this.props;

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const {
        items,
        onFilter: onFiltering,
        filterFunc: filterRule,
      } = this.props;
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
          [filterInputClassNames.labelAlignLeft]: labelAlign === 'left',
        })}
      >
        <HtmlDiv className={classnames(filterInputClassNames.wrapper, {})}>
          <LabelText
            htmlFor={id}
            asProp="label"
            labelMode={labelMode}
            optionalText={optionalText}
          >
            {labelText}
          </LabelText>
          <HtmlDiv className={filterInputClassNames.functionalityContainer}>
            <HtmlDiv className={filterInputClassNames.inputElementContainer}>
              <HtmlInput
                {...passProps}
                id={id}
                className={filterInputClassNames.inputElement}
                type="text"
                forwardedRef={forwardedRef}
                placeholder={visualPlaceholder}
                {...getConditionalAriaProp('aria-describedby', [
                  statusTextId,
                  ariaDescribedBy,
                ])}
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
        </HtmlDiv>
      </HtmlDiv>
    );
  }
}

const UnstyledFilterInput: <T>(
  props: InternalFilterInputProps<T> & InnerRef,
) => JSX.Element = ({
  // eslint-disable-next-line react/prop-types
  ...passProps
}) => <BaseFilterInput {...passProps} />;

const StyledFilterInput = styled(UnstyledFilterInput)`
  ${baseStyles}
`;

/**
 * <i class="semantics" />
 * Use for filtering.
 * Props other than specified explicitly are passed on to underlying input element.
 */
export const FilterInput = forwardRef(
  (props: FilterInputProps, ref: React.RefObject<HTMLInputElement>) => {
    const { id: propId, ...passProps } = props;
    return (
      <AutoId id={propId}>
        {(id) => (
          <StyledFilterInput id={id} forwardedRef={ref} {...passProps} />
        )}
      </AutoId>
    );
  },
);
