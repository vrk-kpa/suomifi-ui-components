import React, {
  Component,
  ChangeEvent,
  forwardRef,
  ReactNode,
  ReactElement,
} from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { InputStatus, StatusTextCommonProps } from '../types';
import {
  HtmlInputProps,
  HtmlDiv,
  HtmlDivProps,
  HtmlInput,
} from '../../../reset';
import { AutoId } from '../../utils/AutoId/AutoId';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { getConditionalAriaProp } from '../../../utils/aria';
import { Label, LabelMode } from '../Label/Label';
import { HintText } from '../HintText/HintText';
import { StatusText } from '../StatusText/StatusText';
import { baseStyles } from './FilterInput.baseStyles';

const baseClassName = 'fi-filter-input';
const filterInputClassNames = {
  error: `${baseClassName}--error`,
  disabled: `${baseClassName}--disabled`,
  labelAlignLeft: `${baseClassName}--label-align-left`,
  labelIsVisible: `${baseClassName}_label--visible`,
  wrapper: `${baseClassName}_wrapper`,
  functionalityContainer: `${baseClassName}_functionalityContainer`,
  inputElementContainer: `${baseClassName}_input-element-container`,
  inputElement: `${baseClassName}_input`,
  actionElementsContainer: `${baseClassName}_action-elements-container`,
  statusTextHasContent: `${baseClassName}_statusText--has-content`,
};

export type FilterInputStatus = Exclude<InputStatus, 'success'>;

interface InternalFilterInputProps<T>
  extends Omit<HtmlInputProps, 'type' | 'onChange'>,
    StatusTextCommonProps {
  /** FilterInput container div class name for custom styling. */
  className?: string;
  /** FilterInput container div props */
  inputContainerProps?: Omit<HtmlDivProps, 'className'>;
  /** FilterInput element container div props, e.g. for widget roles */
  inputElementContainerProps?: Omit<HtmlDivProps, 'className'>;
  /** Disable input usage */
  disabled?: boolean;
  /** Placeholder text for input. Use only as visual aid, not for instructions. */
  visualPlaceholder?: string;
  /** Label */
  labelText: ReactNode;
  /** Hide or show label. Label element is always present, but can be visually hidden.
   * @default visible
   */
  labelMode?: LabelMode;
  /** Text to mark a field optional. Will be wrapped in parentheses and shown after labelText. */
  optionalText?: string;
  /** Hint text to be shown below the label */
  hintText?: string;
  /**
   * 'default' | 'error'
   * @default default
   */
  status?: FilterInputStatus;
  /** FilterInput name */
  name?: string;
  /** Align label on top or on the left side of the input field
   * @default 'top'
   */
  labelAlign?: 'top' | 'left';
  /** Items to be filtered */
  items: Array<T>;
  /** Callback for items filtering event  */
  onFilter: (filteredItems: Array<T>) => void;
  /** Filtering rule to be used */
  filterFunc: (item: T, query: string) => boolean;
  /** Input value onChange handler */
  onChange?: (value: string) => void;
  /** Children for the input container element. Renders inside and on top of the input. Aligns to right. */
  children?: ReactNode;
  /** Tooltip component for the input's label */
  tooltipComponent?: ReactElement;
  shouldFilter?: boolean;
}

interface InnerRef {
  forwardedRef: React.RefObject<HTMLInputElement>;
}

export interface FilterInputProps extends InternalFilterInputProps<any> {
  /** Ref object for the input element */
  ref?: React.RefObject<HTMLInputElement>;
}

class BaseFilterInput<T> extends Component<FilterInputProps & InnerRef> {
  componentDidUpdate(prevProps: FilterInputProps) {
    if (
      (!!this.props.onFilter &&
        prevProps.value !== this.props.value &&
        this.props.shouldFilter) ||
      prevProps.items !== this.props.items
    ) {
      const value = !!this.props.value ? this.props.value.toString() : '';
      this.props.onFilter(
        this.filterItems(this.props.items, this.props.filterFunc, value),
      );
    }
  }

  private filterItems = (
    items: Array<T>,
    filterFunc: (item: T, query: string) => boolean,
    value: string,
  ) =>
    items.reduce((filtered: T[], item: T) => {
      if (filterFunc(item, value)) {
        filtered.push(item);
      }
      return filtered;
    }, []);

  render() {
    const {
      className,
      inputContainerProps,
      inputElementContainerProps,
      visualPlaceholder,
      labelText,
      labelMode,
      hintText,
      optionalText,
      status,
      statusText,
      id,
      labelAlign,
      'aria-describedby': ariaDescribedBy,
      statusTextAriaLiveMode = 'assertive',
      items: propItems,
      onFilter: propOnFiltering,
      filterFunc: propFilterRule,
      forwardedRef,
      onChange: propOnChange,
      children,
      tooltipComponent,
      shouldFilter,
      ...passProps
    } = this.props;

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { items, onFilter, filterFunc } = this.props;
      const { value: eventValue } = event.target;

      const filteredItems: T[] = this.filterItems(
        items,
        filterFunc,
        eventValue,
      );

      onFilter(filteredItems);
      if (propOnChange) {
        propOnChange(eventValue);
      }
    };

    const labelId = `${id}-label`;
    const hintTextId = hintText ? `${id}-hintText` : undefined;
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
          <Label
            id={labelId}
            labelMode={labelMode}
            optionalText={optionalText}
            className={classnames({
              [filterInputClassNames.labelIsVisible]: labelMode !== 'hidden',
            })}
            tooltipComponent={tooltipComponent}
            htmlFor={id}
          >
            {labelText}
          </Label>
          <HintText id={hintTextId}>{hintText}</HintText>
          <HtmlDiv className={filterInputClassNames.functionalityContainer}>
            <HtmlDiv
              className={filterInputClassNames.inputElementContainer}
              {...inputElementContainerProps}
            >
              <HtmlInput
                {...passProps}
                aria-labelledby={labelId}
                aria-invalid={status === 'error'}
                id={id}
                className={filterInputClassNames.inputElement}
                type="text"
                forwardedRef={forwardedRef}
                placeholder={visualPlaceholder}
                {...getConditionalAriaProp('aria-describedby', [
                  statusTextId,
                  hintTextId,
                  ariaDescribedBy,
                ])}
                autoComplete="off"
                aria-autocomplete="list"
                autoCapitalize="none"
                spellCheck="false"
                onChange={onChangeHandler}
                aria-multiline={false}
              />
            </HtmlDiv>
            {React.Children.count(children) > 0 && (
              <HtmlDiv
                className={filterInputClassNames.actionElementsContainer}
                onMouseDownCapture={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                }}
              >
                {children}
              </HtmlDiv>
            )}
            <StatusText
              id={statusTextId}
              className={classnames({
                [filterInputClassNames.statusTextHasContent]: !!statusText,
              })}
              status={status}
              disabled={passProps.disabled}
              ariaLiveMode={statusTextAriaLiveMode}
            >
              {statusText}
            </StatusText>
          </HtmlDiv>
        </HtmlDiv>
      </HtmlDiv>
    );
  }
}
/** This wrapper is needed to make TypeScript work with styled components and generics */
const BaseFilterInputWrapper: <T>(
  props: InternalFilterInputProps<T> & InnerRef & SuomifiThemeProp,
) => JSX.Element = ({
  // eslint-disable-next-line react/prop-types
  theme,
  ...passProps
}) => <BaseFilterInput {...passProps} />;

const StyledFilterInput = styled(BaseFilterInputWrapper)`
  ${({ theme }) => baseStyles(theme)}
`;

/**
 * <i class="semantics" />
 * Use for filtering.
 * Props other than specified explicitly are passed on to underlying input element.
 */
const FilterInput = forwardRef(
  (props: FilterInputProps, ref: React.RefObject<HTMLInputElement>) => {
    const { id: propId, ...passProps } = props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <AutoId id={propId}>
            {(id) => (
              <StyledFilterInput
                theme={suomifiTheme}
                id={id}
                forwardedRef={ref}
                {...passProps}
              />
            )}
          </AutoId>
        )}
      </SuomifiThemeConsumer>
    );
  },
);

FilterInput.displayName = 'FilterInput';
export { FilterInput };
