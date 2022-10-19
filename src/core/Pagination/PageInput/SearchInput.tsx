import React, {
  ChangeEvent,
  Component,
  createRef,
  FocusEvent,
  ReactNode,
} from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { AutoId } from '../../utils/AutoId/AutoId';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { getConditionalAriaProp } from '../../../utils/aria';
import {
  HtmlInput,
  HtmlInputProps,
  HtmlSpan,
  HtmlDiv,
  HtmlDivProps,
  HtmlButton,
  HtmlButtonProps,
} from '../../../reset';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import { StatusText } from '../../Form/StatusText/StatusText';
import { Label, LabelMode } from '../../Form/Label/Label';
import { Icon } from '../../Icon/Icon';
import { InputStatus, StatusTextCommonProps } from '../../Form/types';
import { baseStyles } from './SearchInput.baseStyles';

type SearchInputValue = number | string | null;

type SearchInputStatus = Exclude<InputStatus, 'success'>;

export interface SearchInputProps
  extends StatusTextCommonProps,
    Omit<
      HtmlInputProps,
      | 'type'
      | 'disabled'
      | 'onChange'
      | 'children'
      | 'onClick'
      | 'value'
      | 'defaultValue'
    > {
  /** SearchInput container div class name for custom styling. */
  className?: string;
  /** SearchInput wrapping div element props */
  wrapperProps?: Omit<HtmlDivProps, 'className'>;
  /** Label text */
  labelText: ReactNode;
  /** Hide or show label. Label element is always present, but can be visually hidden.
   * @default visible
   */
  labelMode?: LabelMode;
  /** Placeholder text for input. Use only as visual aid, not for instructions. */
  visualPlaceholder?: string;
  /** Search button label for screen readers */
  searchButtonLabel: string;
  /** SearchButtonProps */
  searchButtonProps?: Omit<HtmlButtonProps, 'onClick' | 'tabIndex'>;
  /**
   * 'default' | 'error'
   * @default default
   */
  status?: SearchInputStatus;
  /** Input name */
  name?: string;
  /** Set components width to 100% */
  fullWidth?: boolean;
  /** Controlled value */
  value?: SearchInputValue;
  /** Default value */
  defaultValue?: SearchInputValue;
  /** Callback for onBlur event */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  /** Callback for search button click */
  onSearch?: (value: SearchInputValue) => void;
  /** Maximum value */
  maxValue: number;
}

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
};

interface SearchInputState {
  value: SearchInputValue;
  status: SearchInputStatus;
  inputValue: string | number | undefined;
}

class BaseSearchInput extends Component<SearchInputProps & SuomifiThemeProp> {
  state: SearchInputState = {
    value: this.props.value || this.props.defaultValue || '',
    status: this.props.status || 'default',
    inputValue: undefined,
  };

  private inputRef = createRef<HTMLInputElement>();

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

  private getStatusText = () =>
    `"${this.state.inputValue}" ${this.props.statusText}`;

  render() {
    const {
      value,
      defaultValue,
      className,
      labelText,
      labelMode,
      searchButtonLabel,
      searchButtonProps,
      wrapperProps,
      onSearch: propOnSearch,
      children,
      status,
      statusText,
      visualPlaceholder,
      id,
      fullWidth,
      theme,
      maxValue,
      'aria-describedby': ariaDescribedBy,
      statusTextAriaLiveMode = 'assertive',
      ...passProps
    } = this.props;

    const statusTextId = `${id}-statusText`;

    const conditionalSetState = (newValue: SearchInputValue) => {
      if (!('value' in this.props)) {
        this.setState({ value: newValue });
      }
    };

    const onSearch = () => {
      if (!!propOnSearch) {
        propOnSearch(this.state.value);
      }
      console.log('on search');
      conditionalSetState('');
    };

    const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        !!this.state.value &&
        this.state.status !== 'error' &&
        event?.key === 'Enter'
      ) {
        onSearch();
      }
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event?.key === 'Escape') {
        event.preventDefault();
      }
    };

    const searchButtonDerivedProps = {
      ...searchButtonProps,
      className: classnames(
        searchButtonProps?.className,
        searchInputClassNames.button,
        searchInputClassNames.searchButton,
      ),
      ...(!!this.state.value && this.state.status !== 'error'
        ? { onClick: onSearch }
        : { tabIndex: -1, 'aria-hidden': true }),
    };

    return (
      <HtmlDiv
        {...wrapperProps}
        className={classnames(className, baseClassName, {
          [searchInputClassNames.error]: this.state.status === 'error',
          [searchInputClassNames.notEmpty]:
            !!this.state.value && this.state.status !== 'error',
          [searchInputClassNames.fullWidth]: fullWidth,
        })}
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
          <HtmlDiv className={searchInputClassNames.functionalityContainer}>
            <HtmlDiv className={searchInputClassNames.inputElementContainer}>
              <HtmlInput
                {...passProps}
                {...getConditionalAriaProp('aria-describedby', [
                  !!statusText ? statusTextId : undefined,
                  ariaDescribedBy,
                ])}
                forwardedRef={this.inputRef}
                aria-invalid={this.state.status === 'error'}
                id={id}
                className={searchInputClassNames.inputElement}
                value={this.state.value}
                placeholder={visualPlaceholder}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  // Clear status if the input is empty
                  if (event.target.value === '' || !event.target.value) {
                    this.setState({ status: 'default' });
                  }
                  // Set input value for status text
                  this.setState({ inputValue: event.target.value });
                  conditionalSetState(event.target.value);

                  console.log(event.target.value);
                  const parsedValue = parseInt(event.target.value, 10) || null;

                  console.log(parsedValue);

                  const verifiedValue =
                    parsedValue && parsedValue > 0 && parsedValue <= maxValue
                      ? parsedValue
                      : null;

                  if (verifiedValue === null && event.target.value !== '') {
                    this.setState({ status: 'error' });
                  } else {
                    this.setState({ status: 'default' });
                  }

                  /*
                  if (verifiedValue) {
                    conditionalSetState(verifiedValue);
                  } else {
                    conditionalSetState('');
                  } */
                }}
                onKeyPress={onKeyPress}
                onKeyDown={onKeyDown}
                // pattern="/[^\d+]/"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </HtmlDiv>
            <HtmlButton {...searchButtonDerivedProps}>
              <VisuallyHidden>{searchButtonLabel}</VisuallyHidden>
              <Icon
                aria-hidden={true}
                icon="search"
                className={searchInputClassNames.searchIcon}
              />
            </HtmlButton>
          </HtmlDiv>
          <StatusText
            id={statusTextId}
            className={classnames({
              [searchInputClassNames.statusTextHasContent]: !!this.state.status,
            })}
            status={this.state.status}
            ariaLiveMode={statusTextAriaLiveMode}
          >
            {this.state.status === 'error' ? this.getStatusText() : ''}
          </StatusText>
        </HtmlSpan>
      </HtmlDiv>
    );
  }
}

const StyledSearchInput = styled(BaseSearchInput)`
  ${({ theme }) => baseStyles(theme)}
`;

/**
 * <i class="semantics" />
 * Use for user inputting search text.
 * Props other than specified explicitly are passed on to underlying input element.
 */
const SearchInput = (props: SearchInputProps) => {
  const { id: propId, ...passProps } = props;
  return (
    <SuomifiThemeConsumer>
      {({ suomifiTheme }) => (
        <AutoId id={propId}>
          {(id) => (
            <StyledSearchInput theme={suomifiTheme} id={id} {...passProps} />
          )}
        </AutoId>
      )}
    </SuomifiThemeConsumer>
  );
};

SearchInput.displayName = 'SearchInput';
export { SearchInput };
