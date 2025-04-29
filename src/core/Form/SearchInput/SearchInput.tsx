import React, {
  ChangeEvent,
  Component,
  createRef,
  FocusEvent,
  ReactNode,
  forwardRef,
} from 'react';
import { styled } from 'styled-components';
import classnames from 'classnames';
import { AutoId } from '../../utils/AutoId/AutoId';
import {
  SuomifiThemeProp,
  SuomifiThemeConsumer,
  SpacingConsumer,
} from '../../theme';
import {
  separateMarginProps,
  MarginProps,
  GlobalMarginProps,
} from '../../theme/utils/spacing';
import { getConditionalAriaProp } from '../../../utils/aria';
import { Debounce } from '../../utils/Debounce/Debounce';
import {
  HtmlInput,
  HtmlInputProps,
  HtmlSpan,
  HtmlDiv,
  HtmlButton,
  HtmlButtonProps,
} from '../../../reset';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import { StatusText } from '../StatusText/StatusText';
import { Label, LabelMode } from '../Label/Label';
import { IconSearch } from 'suomifi-icons';
import { InputStatus, StatusTextCommonProps } from '../types';
import { baseStyles } from './SearchInput.baseStyles';
import { InputClearButton } from '../InputClearButton/InputClearButton';
import { filterDuplicateKeys } from '../../../utils/common/common';
import { Popover } from '../../Popover/Popover';
import { SelectItem } from '../Select/BaseSelect/SelectItem/SelectItem';
import { SuggestionList } from './SuggestionList/SuggestionList';

type SearchInputValue = string | number | undefined;

type SearchInputStatus = Exclude<InputStatus, 'success'>;

export type SearchSuggestionItem = {
  uniqueId: string;
  label: string;
};

export type AutosSuggestElementProps = {
  /** Callback to fetch suggestions based on input value */
  onSuggestionsFetchRequested?: (value: string) => void;
  /** Callback to clear suggestions on */
  onSuggestionsClearRequested?: () => void;
  /** Callback when a suggestion is selected */
  onSuggestionSelected: (suggestionId: string) => void;
  /** List of suggestions to show */
  suggestions: SearchSuggestionItem[];
  /** Text to show during loading state */
  suggestionsLoadingText: string;
  /** Hint text to let the users know that the suggestions will appear below the input */
  suggestionHintText: string;
  /** Text to let the user know how many suggestions are available */
  ariaOptionsAvailableText: string;
};

type AutoSuggestProps =
  | {
      /** Enable search suggestions
       * @default false
       */
      autosuggest?: false | never;
      /** Callback to fetch suggestions based on input value */
      onSuggestionsFetchRequested?: (value: string) => void;
      /** Callback to clear suggestions on */
      onSuggestionsClearRequested?: () => void;
      /** Callback when a suggestion is selected */
      onSuggestionSelected?: (suggestionId: string) => void;
      /** List of suggestions to show */
      suggestions?: SearchSuggestionItem[];
      /** Text to show during loading state */
      suggestionsLoadingText?: string;
      /** Hint text to let the users know that the suggestions will appear below the input */
      suggestionHintText?: string;
      /** Text to let the user know how many suggestions are available */
      ariaOptionsAvailableText?: string;
    }
  | {
      /** Enable search suggestions
       * @default false
       */
      autosuggest: true;
      /** Callback to fetch suggestions based on input value */
      onSuggestionsFetchRequested?: (value: string) => void;
      /** Callback to clear suggestions on */
      onSuggestionsClearRequested?: () => void;
      /** Callback when a suggestion is selected */
      onSuggestionSelected: (suggestionId: string) => void;
      /** List of suggestions to show */
      suggestions: SearchSuggestionItem[];
      /** Text to show during loading state */
      suggestionsLoadingText?: string;
      /** Hint text to let the users know that the suggestions will appear below the input */
      suggestionHintText: string;
      /** Text to let the user know how many suggestions are available */
      ariaOptionsAvailableText: string;
    };

export type SearchInputProps = StatusTextCommonProps &
  MarginProps &
  AutoSuggestProps &
  Omit<
    HtmlInputProps,
    | 'type'
    | 'disabled'
    | 'onChange'
    | 'onBlur'
    | 'onSearch'
    | 'onClick'
    | 'value'
    | 'defaultValue'
  > & {
    /** CSS class for custom styles */
    className?: string;
    /** Label text */
    labelText: ReactNode;
    /**
     * `'visible'` | `'hidden'`
     *
     * Hides or shows the label. Label element is always present, but can be visually hidden.
     * @default visible
     */
    labelMode?: LabelMode;
    /** Placeholder text for the input. Use only as visual aid, not for instructions. */
    visualPlaceholder?: string;
    /** Screen reader label for the 'Clear' button */
    clearButtonLabel: string;
    /** Screen reader label for the 'Search' button */
    searchButtonLabel: string;
    /** Props passed to the 'Search' button */
    searchButtonProps?: Omit<HtmlButtonProps, 'onClick' | 'tabIndex'>;
    /**
     * `'default'` | `'error'`
     *
     * Status of the component. Error state creates a red border around the input.
     * Always use a descriptive `statusText` with an error status.
     * @default default
     */
    status?: SearchInputStatus;
    /** HTML input attribute */
    name?: string;
    /** Sets components width to 100% */
    fullWidth?: boolean;
    /** Controlled value */
    value?: SearchInputValue;
    /** Default value */
    defaultValue?: SearchInputValue;
    /** Callback fired when input text changes */
    onChange?: (value: SearchInputValue) => void;
    /** Callback fired on input blur */
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
    /** Callback fired on search button click */
    onSearch?: (value: SearchInputValue) => void;
    /** Debounce time in milliseconds for `onChange()` function. No debounce is applied if no value is given. */
    debounce?: number;
    /** Ref is forwarded to the underlying input element. Alternative for React `ref` attribute. */
    forwardedRef?: React.RefObject<HTMLInputElement>;
  };

const baseClassName = 'fi-search-input';
const searchInputClassNames = {
  fullWidth: `${baseClassName}--full-width`,
  error: `${baseClassName}--error`,
  notEmpty: `${baseClassName}--not-empty`,
  labelIsVisible: `${baseClassName}_label--visible`,
  styleWrapper: `${baseClassName}_wrapper`,
  inputElement: `${baseClassName}_input`,
  inputElementContainer: `${baseClassName}_input-element-container`,
  functionalityContainer: `${baseClassName}_functionality-container`,
  statusTextHasContent: `${baseClassName}_statusText--has-content`,
  button: `${baseClassName}_button`,
  searchButton: `${baseClassName}_button-search`,
  searchIcon: `${baseClassName}_button-search-icon`,
  clearButton: `${baseClassName}_button-clear`,
  clearIcon: `${baseClassName}_button-clear-icon`,
  suggestions: `${baseClassName}_suggestions`,
};

interface SearchInputState {
  value: SearchInputValue;
  showPopover: boolean;
  focusedDescendantId: string | null;
}

class BaseSearchInput extends Component<SearchInputProps & SuomifiThemeProp> {
  state: SearchInputState = {
    value: this.props.value || this.props.defaultValue || '',
    showPopover: false,
    focusedDescendantId: null,
  };

  private inputRef = this.props.forwardedRef || createRef<HTMLInputElement>();

  componentDidMount() {
    if (!!this.props.autosuggest && this.props.suggestions.length > 0) {
      this.setState({ showPopover: true });
    }
  }

  componentDidUpdate(prevProps: SearchInputProps) {
    if (prevProps.autosuggest !== this.props.autosuggest) {
      this.setState({ showPopover: !!this.props.autosuggest });
    }
  }

  static getDerivedStateFromProps(
    nextProps: SearchInputProps,
    prevState: SearchInputState,
  ) {
    const { value } = nextProps;
    if ('value' in nextProps && value !== prevState.value) {
      return { value };
    }
    return null;
  }

  render() {
    const {
      value,
      defaultValue,
      className,
      labelText,
      labelMode,
      clearButtonLabel,
      searchButtonLabel,
      searchButtonProps,
      style,
      onChange: propOnChange,
      onSearch: propOnSearch,
      children,
      status,
      statusText,
      visualPlaceholder,
      id,
      fullWidth,
      debounce,
      theme,
      forwardedRef, // Taking this out so it's not passed "twice" to HtmlInput
      'aria-describedby': ariaDescribedBy,
      statusTextAriaLiveMode = 'assertive',
      autosuggest = false, // Default autosuggest to false
      suggestions,
      suggestionHintText,
      ariaOptionsAvailableText,
      onSuggestionSelected,
      ...rest
    } = this.props;
    const [_marginProps, passProps] = separateMarginProps(rest);

    const statusTextId = `${id}-statusText`;
    const suggestionHintId = `${id}-suggestionHintText`;

    const conditionalSetState = (newValue: SearchInputValue) => {
      if (!('value' in this.props)) {
        this.setState({ value: newValue });
      }
    };

    const onSearch = (searchValue: SearchInputValue) => {
      if (!!propOnSearch) {
        propOnSearch(searchValue);
      }
    };

    const onClear = () => {
      conditionalSetState('');
      if (propOnChange) {
        propOnChange('');
      }
      setTimeout(() => {
        if (this.inputRef.current) {
          this.inputRef.current.focus();
        }
      }, 100);
    };

    const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        !!this.state.value &&
        event?.key === 'Enter' &&
        this.state.focusedDescendantId === null
      ) {
        onSearch(this.state.value);
      }
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      const { focusedDescendantId } = this.state;
      const popoverItems = suggestions || [];

      const index = focusedDescendantId
        ? popoverItems.findIndex(
            ({ uniqueId }) => uniqueId === focusedDescendantId,
          )
        : -1;

      const getNextIndex = () => (index + 1) % popoverItems.length;
      const getPreviousIndex = () =>
        (index - 1 + popoverItems.length) % popoverItems.length;

      if (event.key === 'Escape') {
        event.preventDefault();
        this.setState({ showPopover: false, focusedDescendantId: null });
      }

      if (event.key === 'Enter') {
        event.preventDefault();
        if (autosuggest && focusedDescendantId) {
          const selectedItem = popoverItems.find(
            ({ uniqueId }) => uniqueId === focusedDescendantId,
          );
          if (selectedItem) {
            this.setState({ showPopover: false });
            if (onSuggestionSelected) {
              onSuggestionSelected(selectedItem.uniqueId);
            }
          }
        }
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (autosuggest && popoverItems.length > 0) {
          const nextIndex = getNextIndex();
          this.setState({
            focusedDescendantId: popoverItems[nextIndex].uniqueId,
            showPopover: true,
          });
        }
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (autosuggest && popoverItems.length > 0) {
          const previousIndex = getPreviousIndex();
          this.setState({
            focusedDescendantId: popoverItems[previousIndex].uniqueId,
            showPopover: true,
          });
        }
      }
    };

    const searchButtonDerivedProps = {
      ...searchButtonProps,
      className: classnames(
        searchButtonProps?.className,
        searchInputClassNames.button,
        searchInputClassNames.searchButton,
      ),
      ...(!!this.state.value
        ? { onClick: onSearch }
        : { tabIndex: -1, hidden: true }),
    };
    const clearButtonProps = {
      className: classnames(
        searchInputClassNames.button,
        searchInputClassNames.clearButton,
      ),
      ...(!!this.state.value
        ? { onClick: onClear }
        : { tabIndex: -1, hidden: true }),
    };

    return (
      <HtmlDiv
        className={classnames(className, baseClassName, {
          [searchInputClassNames.error]: status === 'error',
          [searchInputClassNames.notEmpty]: !!this.state.value,
          [searchInputClassNames.fullWidth]: fullWidth,
        })}
        style={style}
      >
        <HtmlSpan className={searchInputClassNames.styleWrapper}>
          <Label
            htmlFor={id}
            labelMode={labelMode}
            className={classnames({
              [searchInputClassNames.labelIsVisible]: labelMode !== 'hidden',
            })}
          >
            {labelText}
          </Label>
          <Debounce waitFor={debounce}>
            {(debouncer: Function, cancelDebounce: Function) => (
              <HtmlDiv className={searchInputClassNames.functionalityContainer}>
                <HtmlDiv
                  className={searchInputClassNames.inputElementContainer}
                >
                  <HtmlInput
                    {...passProps}
                    {...getConditionalAriaProp('aria-describedby', [
                      !!statusText ? statusTextId : undefined,
                      !!autosuggest ? suggestionHintId : undefined,
                      ariaDescribedBy,
                    ])}
                    forwardedRef={this.inputRef}
                    aria-invalid={status === 'error'}
                    id={id}
                    className={searchInputClassNames.inputElement}
                    type="search"
                    role="searchbox"
                    aria-controls={`${id}-itemlist`}
                    aria-activedescendant={this.state.focusedDescendantId}
                    autoComplete="off"
                    value={this.state.value}
                    placeholder={visualPlaceholder}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      const eventValue = event.currentTarget.value;
                      conditionalSetState(eventValue);
                      if (propOnChange) {
                        debouncer(propOnChange, eventValue);
                      }
                    }}
                    onKeyPress={onKeyPress}
                    onKeyDown={onKeyDown}
                  />
                </HtmlDiv>
                <InputClearButton
                  {...clearButtonProps}
                  label={clearButtonLabel}
                  onClick={() => {
                    onClear();
                    cancelDebounce();
                  }}
                />
                <HtmlButton {...searchButtonDerivedProps}>
                  <VisuallyHidden>{searchButtonLabel}</VisuallyHidden>
                  <IconSearch
                    aria-hidden={true}
                    className={searchInputClassNames.searchIcon}
                  />
                </HtmlButton>
              </HtmlDiv>
            )}
          </Debounce>
          <StatusText
            id={statusTextId}
            className={classnames({
              [searchInputClassNames.statusTextHasContent]: !!statusText,
            })}
            status={status}
            ariaLiveMode={statusTextAriaLiveMode}
          >
            {statusText}
          </StatusText>
          {autosuggest && (
            <>
              <VisuallyHidden aria-live="polite" aria-atomic="true">
                {this.state.showPopover ? ariaOptionsAvailableText : ''}
              </VisuallyHidden>
              <VisuallyHidden id={suggestionHintId}>
                {suggestionHintText}
              </VisuallyHidden>
            </>
          )}
        </HtmlSpan>
        {this.state.showPopover && (
          <Popover
            sourceRef={this.inputRef}
            matchWidth={true}
            onKeyDown={onKeyDown}
            onClickOutside={() => {
              this.setState({ showPopover: false });
            }}
          >
            {suggestions && suggestions.length > 0 && (
              <SuggestionList
                className={searchInputClassNames.suggestions}
                focusedDescendantId={this.state.focusedDescendantId || ''}
                id={`${id}-itemlist`}
              >
                {suggestions.map((item) => (
                  <SelectItem
                    key={item.uniqueId}
                    id={item.uniqueId}
                    hasKeyboardFocus={
                      this.state.focusedDescendantId === item.uniqueId
                    }
                    hightlightQuery={
                      !!this.state.value ? String(this.state.value) : undefined
                    }
                    checked={false}
                    onClick={() => {
                      this.setState({ showPopover: false });
                      if (onSuggestionSelected) {
                        onSuggestionSelected(item.uniqueId);
                      }
                    }}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SuggestionList>
            )}
          </Popover>
        )}
      </HtmlDiv>
    );
  }
}

const StyledSearchInput = styled(
  ({
    globalMargins,
    ...passProps
  }: SearchInputProps & SuomifiThemeProp & GlobalMarginProps) => (
    <BaseSearchInput {...passProps} />
  ),
)`
  ${({ theme, globalMargins, ...rest }) => {
    const [marginProps, _passProps] = separateMarginProps(rest);
    const cleanedGlobalMargins = filterDuplicateKeys(
      globalMargins.searchInput,
      marginProps,
    );
    return baseStyles(theme, cleanedGlobalMargins, marginProps);
  }}
`;

const SearchInput = forwardRef(
  (props: SearchInputProps, ref: React.RefObject<HTMLInputElement>) => {
    const { id: propId, ...passProps } = props;
    return (
      <SpacingConsumer>
        {({ margins }) => (
          <SuomifiThemeConsumer>
            {({ suomifiTheme }) => (
              <AutoId id={propId}>
                {(id) => (
                  <StyledSearchInput
                    theme={suomifiTheme}
                    id={id}
                    globalMargins={margins}
                    forwardedRef={ref}
                    {...passProps}
                  />
                )}
              </AutoId>
            )}
          </SuomifiThemeConsumer>
        )}
      </SpacingConsumer>
    );
  },
);

SearchInput.displayName = 'SearchInput';
export { SearchInput };
