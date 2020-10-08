import React, { ChangeEvent, Component, FocusEvent } from 'react';
import { default as styled } from 'styled-components';
import {
  HtmlLabel,
  HtmlLabelProps,
  HtmlInput,
  HtmlInputProps,
  HtmlDiv,
  HtmlDivProps,
} from '../../../reset';
import { StatusText } from '../StatusText/StatusText';
import { LabelText, LabelMode } from '../LabelText/LabelText';
import { TokensProp, InternalTokensProp } from '../../theme';
import { withSuomifiDefaultProps } from '../../theme/utils';
import { baseStyles } from './SearchInput.baseStyles';
import { baseStyles as inputBaseStyles } from '../TextInput/TextInput.baseStyles';
import { Icon } from '../../Icon/Icon';
import classnames from 'classnames';
import { Omit } from '../../../utils/typescript';
import { idGenerator } from '../../../utils/uuid';

export interface TextInputLabelProps extends HtmlLabelProps {}

type StateValue = string | number | string[] | undefined;

type SearchInputStatus = 'default' | 'error';

export interface SearchInputProps
  extends Omit<
      HtmlInputProps,
      'type' | 'disabled' | 'onChange' | 'children' | 'onClick'
    >,
    TokensProp {
  /** SearchInput container div class name for custom styling. */
  className?: string;
  /** SearchInput container div props */
  inputContainerProps?: Omit<HtmlDivProps, 'className'>;
  /** Label text */
  labelText: string;
  /** Hide or show label. Label element is always present, but can be visually hidden.
   * @default visible
   */
  labelMode?: LabelMode;
  /** Placeholder text for input. Use only as visual aid, not for instructions. */
  visualPlaceholder?: string;
  /** Clear button label for screen readers */
  clearButtonLabel: string;
  /** Search button label for screen readers */
  searchButtonLabel: string;
  /**
   * 'default' | 'error' | 'success'
   * @default default
   */
  status?: SearchInputStatus;
  /** Status text to be shown below the component and hint text. Use e.g. for validation error */
  statusText?: string;
  /** Input name */
  name?: string;
  /** Set components width to 100% */
  fullWidth?: boolean;
  /** Callback for input text change */
  onChange?: (value: StateValue) => void;
  /** Callback for onBlur event */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  /** Callback for search button click */
  onSearch?: (value: StateValue) => void;
}

const baseClassName = 'fi-search-input';
const searchInputClassNames = {
  label: `${baseClassName}_label`,
  inputElement: `${baseClassName}_input`,
  inputElementContainer: `${baseClassName}_input-element-container`,
  inputFocusWrapper: `${baseClassName}_input-focus-wrapper`,
  statusTextContainer: `${baseClassName}_statusText_container`,
  button: `${baseClassName}_button`,
  searchButton: `${baseClassName}_button-search`,
  searchButtonEnabled: `${baseClassName}_button-search-enabled`,
  searchIcon: `${baseClassName}_button-search-icon`,
  clearButton: `${baseClassName}_button-clear`,
  clearIcon: `${baseClassName}_button-clear-icon`,
  error: `${baseClassName}--error`,
};

interface SearchInputState {
  value: string | number | string[] | undefined;
}

class BaseSearchInput extends Component<SearchInputProps> {
  state: SearchInputState = {
    value: this.props.value || this.props.defaultValue || '',
  };

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
      searchButtonLabel: searchText,
      inputContainerProps,
      onChange: propOnChange,
      onSearch: propOnSearch,
      children,
      status,
      statusText,
      visualPlaceholder,
      id: propId,
      fullWidth,
      ...passProps
    } = this.props;

    const conditionalSetState = (newValue: StateValue) => {
      if (!('value' in this.props)) {
        this.setState({ value: newValue });
      }
      if (propOnChange) {
        propOnChange(newValue);
      }
    };

    const onSearch = () => {
      if (!!propOnSearch) {
        propOnSearch(this.state.value);
      }
    };

    const generatedStatusTextId = `${idGenerator(propId)}-statusText`;

    return (
      <HtmlDiv
        {...inputContainerProps}
        className={classnames(className, baseClassName, {
          [searchInputClassNames.error]: status === 'error',
        })}
      >
        <HtmlLabel className={searchInputClassNames.label}>
          <LabelText labelMode={labelMode}>{labelText}</LabelText>
          <HtmlDiv className={searchInputClassNames.statusTextContainer}>
            <HtmlDiv className={searchInputClassNames.inputElementContainer}>
              <HtmlDiv className={searchInputClassNames.inputFocusWrapper}>
                <HtmlInput
                  {...passProps}
                  type="text"
                  value={this.state.value}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    conditionalSetState(event.currentTarget.value);
                  }}
                  id={propId}
                  className={searchInputClassNames.inputElement}
                  placeholder={visualPlaceholder}
                  {...{ 'aria-invalid': status === 'error' }}
                />
              </HtmlDiv>
              {!!this.state.value && (
                <HtmlDiv
                  onClick={() => conditionalSetState('')}
                  className={classnames(
                    searchInputClassNames.button,
                    searchInputClassNames.clearButton,
                  )}
                  role="button"
                  tabIndex={0}
                >
                  <Icon
                    ariaLabel={clearButtonLabel}
                    icon="close"
                    className={searchInputClassNames.clearIcon}
                  />
                </HtmlDiv>
              )}
              <HtmlDiv
                role="button"
                {...(!!this.state.value
                  ? {
                      tabIndex: 0,
                      onClick: onSearch,
                    }
                  : {})}
                className={classnames(
                  searchInputClassNames.button,
                  searchInputClassNames.searchButton,
                  {
                    [searchInputClassNames.searchButtonEnabled]: !!this.state
                      .value,
                  },
                )}
              >
                <Icon
                  icon="search"
                  ariaLabel={searchText}
                  className={searchInputClassNames.searchIcon}
                />
              </HtmlDiv>
            </HtmlDiv>
            <StatusText id={generatedStatusTextId} status={status}>
              {statusText}
            </StatusText>
          </HtmlDiv>
        </HtmlLabel>
      </HtmlDiv>
    );
  }
}

const StyledTextInput = styled(
  ({ tokens, ...passProps }: SearchInputProps & InternalTokensProp) => {
    return <BaseSearchInput {...passProps} />;
  },
)`
  ${(props) => inputBaseStyles(props)}
  ${(props) => baseStyles(props)}
`;

/**
 * <i class="semantics" />
 * Use for user inputting search text.
 * Props other than specified explicitly are passed on to underlying input element.
 */
export class SearchInput extends Component<SearchInputProps> {
  render() {
    return <StyledTextInput {...withSuomifiDefaultProps(this.props)} />;
  }
}
