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
  HtmlButtonProps,
  HtmlDivWithRef,
} from '../../../reset';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import { StatusText } from '../StatusText/StatusText';
import { Label, LabelMode } from '../Label/Label';
import { IconSearch } from 'suomifi-icons';
import { InputStatus, StatusTextCommonProps } from '../types';
import { baseStyles } from './SearchInput.baseStyles';
import { InputClearButton } from '../InputClearButton/InputClearButton';
import {
  filterDuplicateKeys,
  getOwnerDocument,
} from '../../../utils/common/common';
import { Popover, PopoverConsumer } from '../../Popover/Popover';
import { SelectItem } from '../Select/BaseSelect/SelectItem/SelectItem';
import { SuggestionList } from './SuggestionList/SuggestionList';
import { Button } from '../../Button/Button';

export type SearchInputStatus = Exclude<InputStatus, 'success'>;

export type SearchSuggestionItem = {
  uniqueId: string;
  label: string;
  [key: string]: any;
};

type AutoSuggestProps =
  | {
      /** Enable search suggestions
       * @default false
       */
      autosuggest?: false | never;
      /** Callback when a suggestion is selected */
      onSuggestionSelected?: (suggestionId: string) => void;
      /** Text to show during loading state */
      suggestionHintText?: string;
      /** Text to let the user know how many suggestions are available */
      ariaOptionsAvailableText?: string;
      /** List of suggestions to show */
      suggestions?: SearchSuggestionItem[];
      /** Popover container div CSS class for custom styles. Can be used to modify popover z-index. */
      popoverClassName?: string;
    }
  | {
      /** Enable search suggestions
       * @default false
       */
      autosuggest: true;
      /** Callback when a suggestion is selected */
      onSuggestionSelected: (suggestionId: string) => void;
      /** Hint text to let the users know that the suggestions will appear below the input */
      suggestionHintText: string;
      /** Text to let the user know how many suggestions are available */
      ariaOptionsAvailableText: string;
      /** List of suggestions to show */
      suggestions?: SearchSuggestionItem[];
      /** Popover container div CSS class for custom styles. Can be used to modify popover z-index. */
      popoverClassName?: string;
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
    /** Label for the 'Search' button. Set as aria-label by default and
     * used as visible button content when showSearchButtonLabel is set to true.
     */
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
    value?: string;
    /** Default value */
    defaultValue?: string;
    /** Callback fired when input text changes */
    onChange?: (value: string) => void;
    /** Callback fired on input blur */
    onBlur?: (event: FocusEvent<HTMLInputElement>, value: string) => void;
    /** Callback fired on search button click */
    onSearch?: (value: string) => void;
    /** Debounce time in milliseconds for `onChange()` function. No debounce is applied if no value is given. */
    debounce?: number;
    /** Ref is forwarded to the underlying input element. Alternative for React `ref` attribute. */
    forwardedRef?: React.RefObject<HTMLInputElement>;
    /** Make the button content visible
     * @default false
     */
    showSearchButtonLabel?: boolean;
    /** Show the search icon when onSearch is not used
     * @default true
     */
    showSearchIcon?: boolean;
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
  searchIcon: `${baseClassName}_search-icon`,
  clearButton: `${baseClassName}_button-clear`,
  clearIcon: `${baseClassName}_button-clear-icon`,
  suggestions: `${baseClassName}_suggestions`,
  suggestionsOpen: `${baseClassName}--suggestions-open`,
};

interface SearchInputState {
  value: string;
  showPopover: boolean;
  focusedDescendantId: string | null;
  displayValue: string;
  popoverPlacement?: string;
}

class BaseSearchInput extends Component<SearchInputProps & SuomifiThemeProp> {
  state: SearchInputState = {
    value: this.props.value || this.props.defaultValue || '',
    displayValue: this.props.value || this.props.defaultValue || '',
    showPopover: false,
    focusedDescendantId: null,
    popoverPlacement: 'bottom',
  };

  private inputRef = this.props.forwardedRef || createRef<HTMLInputElement>();

  private functionalityWrapperRef = createRef<HTMLDivElement>();

  private popoverListRef: React.RefObject<HTMLUListElement> =
    createRef<HTMLUListElement>();

  componentDidMount() {
    if (
      this.props.autosuggest &&
      this.props.suggestions &&
      this.props.suggestions?.length > 0
    ) {
      this.setState({ showPopover: true });
    }
  }

  componentDidUpdate(prevProps: SearchInputProps, prevState: SearchInputState) {
    if (!this.props.autosuggest) {
      return;
    }

    let newDisplayValue = '';
    if (this.props.value) {
      newDisplayValue = this.props.value;
    } else if (this.state.displayValue !== this.state.value) {
      newDisplayValue = this.state.displayValue;
    } else {
      newDisplayValue = this.state.value || '';
    }

    const hasSuggestions =
      this.props.suggestions && this.props.suggestions.length > 0;
    const hadSuggestions =
      prevProps.suggestions && prevProps.suggestions.length > 0;
    const focusInInput =
      this.inputRef.current && this.inputRef.current === document.activeElement;

    const suggestionsChanged =
      (hasSuggestions || hadSuggestions) &&
      JSON.stringify(prevProps.suggestions) !==
        JSON.stringify(this.props.suggestions);

    const valueChanged =
      this.props.value !== prevProps.value ||
      (this.state.value !== prevState.value &&
        this.state.displayValue !== prevState.displayValue);

    const suggestionsPresentButHidden =
      hasSuggestions && !this.state.showPopover;

    if (
      prevProps.autosuggest !== this.props.autosuggest ||
      suggestionsChanged
    ) {
      this.setState({
        showPopover:
          focusInInput &&
          (hasSuggestions || (suggestionsPresentButHidden && valueChanged)),
        displayValue: newDisplayValue,
        focusedDescendantId: null,
      });
    } else if (valueChanged && suggestionsPresentButHidden && focusInInput) {
      this.setState({
        showPopover: true,
        focusedDescendantId: null,
      });
    }
  }

  static getDerivedStateFromProps(
    nextProps: SearchInputProps,
    prevState: SearchInputState,
  ) {
    const { value } = nextProps;
    if ('value' in nextProps && value !== prevState.value) {
      return { value, displayValue: value };
    }
    return null;
  }

  conditionalSetState = (newValue: string) => {
    if (!('value' in this.props)) {
      this.setState({ value: newValue, displayValue: newValue });
    } else {
      this.setState({ displayValue: newValue });
    }
  };

  private updatePopoverPlacement = (placement: string | undefined) => {
    if (!placement) return;
    if (placement !== this.state.popoverPlacement) {
      requestAnimationFrame(() =>
        this.setState({ popoverPlacement: placement }),
      );
    }
  };

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
      autosuggest = false,
      suggestions,
      suggestionHintText,
      ariaOptionsAvailableText,
      onSuggestionSelected,
      popoverClassName,
      showSearchButtonLabel = false,
      showSearchIcon = true,
      ...rest
    } = this.props;
    const [_marginProps, passProps] = separateMarginProps(rest);

    const statusTextId = `${id}-statusText`;
    const suggestionHintId = `${id}-suggestionHintText`;

    const onSearch = (searchValue: string) => {
      if (!!propOnSearch) {
        propOnSearch(searchValue);
      }
    };

    const onClear = () => {
      this.conditionalSetState('');
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
        onSearch(this.state.displayValue);
      }
    };

    const handleOnBlur = (event: FocusEvent<HTMLInputElement>) => {
      const currentValue = this.state.displayValue;
      if (this.props.onBlur) {
        this.props.onBlur(event, currentValue);
      }
      const ownerDocument = getOwnerDocument(this.popoverListRef);
      if (!ownerDocument) {
        return;
      }
      requestAnimationFrame(() => {
        const focusInPopover = this.popoverListRef.current?.contains(
          ownerDocument.activeElement,
        );

        const focusInInput =
          ownerDocument.activeElement === this.inputRef.current;

        const focusInComponent = focusInPopover || focusInInput;
        if (!focusInComponent) {
          this.setState((prevState: SearchInputState) => {
            const inputValue = this.props.value || prevState.displayValue;
            return {
              value: inputValue,
              showPopover: false,
              focusedDescendantId: null,
            };
          });
        }
      });
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
        this.setState((prevState: SearchInputState) => ({
          showPopover: false,
          focusedDescendantId: null,
          displayValue: prevState.value,
        }));
        setTimeout(() => {
          if (this.inputRef.current) {
            this.inputRef.current.focus();
          }
        }, 100);
      }

      if (event.key === 'Enter') {
        event.preventDefault();
        if (
          autosuggest &&
          suggestions &&
          suggestions.length > 0 &&
          focusedDescendantId
        ) {
          const selectedItem = popoverItems.find(
            ({ uniqueId }) => uniqueId === focusedDescendantId,
          );
          if (selectedItem) {
            this.setState({
              showPopover: false,
              value: selectedItem.label,
              displayValue: selectedItem.label,
            });
            if (onSuggestionSelected) {
              onSuggestionSelected(selectedItem.uniqueId);
            }
          }
        } else if (!!this.state.value) {
          onSearch(this.state.displayValue);
        }
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (autosuggest && popoverItems.length > 0) {
          const nextIndex = getNextIndex();
          this.setState({
            focusedDescendantId: popoverItems[nextIndex].uniqueId,
            showPopover: true,
            displayValue: this.props.value || popoverItems[nextIndex].label,
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
            displayValue: this.props.value || popoverItems[previousIndex].label,
          });
        }
      }
    };

    const getInputContainerProps = () => {
      if (autosuggest) {
        return {
          role: 'combobox',
          'aria-owns': `${id}-itemlist`,
          'aria-expanded': this.state.showPopover,
          'aria-haspopup': 'listbox',
        };
      }
      return {};
    };

    const searchButtonDerivedProps = {
      ...searchButtonProps,
      className: classnames(
        searchInputClassNames.button,
        searchInputClassNames.searchButton,
        searchButtonProps?.className,
      ),
      onClick: this.state.value
        ? () => onSearch(this.state.displayValue)
        : undefined,
      'aria-label': showSearchButtonLabel ? undefined : searchButtonLabel,
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
          [searchInputClassNames.suggestionsOpen]: this.state.showPopover,
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
          {autosuggest && (
            <VisuallyHidden id={suggestionHintId}>
              {suggestionHintText}
            </VisuallyHidden>
          )}
          <Debounce waitFor={debounce}>
            {(debouncer: Function, cancelDebounce: Function) => (
              <HtmlDivWithRef
                className={searchInputClassNames.functionalityContainer}
                forwardedRef={this.functionalityWrapperRef}
                data-floating-ui-placement={this.state.popoverPlacement}
              >
                <HtmlDiv
                  className={searchInputClassNames.inputElementContainer}
                  {...getInputContainerProps()}
                  aria-haspopup={autosuggest ? 'listbox' : undefined}
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
                    onBlur={handleOnBlur}
                    className={searchInputClassNames.inputElement}
                    type="search"
                    aria-activedescendant={this.state.focusedDescendantId}
                    aria-controls={
                      this.state.showPopover ? `${id}-itemlist` : undefined
                    }
                    autoComplete="off"
                    value={this.state.displayValue}
                    placeholder={visualPlaceholder}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      const eventValue = event.currentTarget.value;
                      this.conditionalSetState(eventValue);
                      if (propOnChange) {
                        debouncer(propOnChange, eventValue);
                      }
                    }}
                    onKeyPress={onKeyPress}
                    onKeyDown={onKeyDown}
                  />
                  <InputClearButton
                    {...clearButtonProps}
                    label={clearButtonLabel}
                    onClick={() => {
                      onClear();
                      cancelDebounce();
                    }}
                  />
                  {!this.props.onSearch && showSearchIcon && (
                    <IconSearch className={searchInputClassNames.searchIcon} />
                  )}
                </HtmlDiv>
                {this.props.onSearch && (
                  <Button
                    {...{
                      ...searchButtonDerivedProps,
                      forwardedRef: undefined,
                    }}
                    aria-disabled={!!searchButtonDerivedProps.disabled}
                    icon={<IconSearch />}
                  >
                    {showSearchButtonLabel && searchButtonLabel}
                  </Button>
                )}
              </HtmlDivWithRef>
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
            <VisuallyHidden aria-live="polite" aria-atomic="true">
              {this.state.showPopover ? ariaOptionsAvailableText : ''}
            </VisuallyHidden>
          )}
        </HtmlSpan>
        {this.state.showPopover && (
          <Popover
            sourceRef={this.functionalityWrapperRef}
            matchWidth={true}
            onKeyDown={onKeyDown}
            onClickOutside={() => {
              this.setState({ showPopover: false, focusedDescendantId: null });
            }}
            className={popoverClassName}
          >
            <PopoverConsumer>
              {(consumer) => {
                this.updatePopoverPlacement(consumer?.popoverPlacement);
                if (suggestions && suggestions.length > 0) {
                  return (
                    <SuggestionList
                      className={searchInputClassNames.suggestions}
                      focusedDescendantId={this.state.focusedDescendantId || ''}
                      id={`${id}-itemlist`}
                      ref={this.popoverListRef}
                      popoverPlacement={consumer?.popoverPlacement}
                    >
                      {suggestions.map((item) => (
                        <SelectItem
                          key={item.uniqueId}
                          id={item.uniqueId}
                          hasKeyboardFocus={
                            this.state.focusedDescendantId === item.uniqueId
                          }
                          hightlightQuery={
                            !!this.state.value
                              ? String(this.state.value)
                              : undefined
                          }
                          checked={false}
                          onClick={() => {
                            this.setState({
                              showPopover: false,
                              value: item.label,
                              displayValue: item.label,
                            });
                            if (onSuggestionSelected) {
                              onSuggestionSelected(item.uniqueId);
                            }
                          }}
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </SuggestionList>
                  );
                }
                return null;
              }}
            </PopoverConsumer>
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
