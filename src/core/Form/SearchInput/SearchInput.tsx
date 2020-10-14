import React, { ChangeEvent, Component, FocusEvent } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import {
  HtmlInput,
  HtmlInputProps,
  HtmlDiv,
  HtmlDivProps,
  HtmlButton,
  HtmlButtonProps,
} from '../../../reset';
import { Omit } from '../../../utils/typescript';
import { idGenerator } from '../../../utils/uuid';
import { TokensProp, InternalTokensProp } from '../../theme';
import { withSuomifiDefaultProps } from '../../theme/utils';
import { VisuallyHidden } from '../../../components/Visually-hidden/Visually-hidden';
import { StatusText } from '../StatusText/StatusText';
import { LabelText, LabelMode } from '../LabelText/LabelText';
import { Icon } from '../../Icon/Icon';
import { baseStyles } from './SearchInput.baseStyles';

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
  /** SearchButtonProps */
  searchButtonProps?: Omit<HtmlButtonProps, 'onClick' | 'tabIndex'>;
  /**
   * 'default' | 'error'
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
  fullWidth: `${baseClassName}--full-width`,
  error: `${baseClassName}--error`,
  notEmpty: `${baseClassName}--not-empty`,
  inputElement: `${baseClassName}_input`,
  inputElementContainer: `${baseClassName}_input-element-container`,
  functionalityContainer: `${baseClassName}_functionality-container`,
  button: `${baseClassName}_button`,
  searchButton: `${baseClassName}_button-search`,
  searchIcon: `${baseClassName}_button-search-icon`,
  clearButton: `${baseClassName}_button-clear`,
  clearIcon: `${baseClassName}_button-clear-icon`,
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
      searchButtonLabel,
      searchButtonProps,
      inputContainerProps,
      onChange: propOnChange,
      onSearch: propOnSearch,
      children,
      status,
      statusText,
      visualPlaceholder,
      id: propId,
      fullWidth,
      'aria-describedby': ariaDescribedBy,
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

    const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!!this.state.value && event?.key === 'Enter') {
        onSearch();
      }
    };

    const id = `${idGenerator(propId)}`;
    const statusTextId = `${id}-statusText`;

    const searchButtonDerivedProps = {
      ...searchButtonProps,
      className: classnames(
        searchButtonProps?.className,
        searchInputClassNames.button,
        searchInputClassNames.searchButton,
      ),
      ...(!!this.state.value
        ? {
            onClick: () => onSearch(),
          }
        : { tabIndex: -1, 'aria-hidden': true }),
    };
    const clearButtonProps = {
      tabIndex: 0,
      onClick: () => conditionalSetState(''),
      className: classnames(
        searchInputClassNames.button,
        searchInputClassNames.clearButton,
      ),
    };

    const getDescribedBy = () => {
      if (statusText || ariaDescribedBy) {
        return {
          'aria-describedby': [
            ...(statusText ? [statusTextId] : []),
            ariaDescribedBy,
          ].join(' '),
        };
      }
      return {};
    };

    return (
      <HtmlDiv
        {...inputContainerProps}
        className={classnames(className, baseClassName, {
          [searchInputClassNames.error]: status === 'error',
          [searchInputClassNames.notEmpty]: !!this.state.value,
          [searchInputClassNames.fullWidth]: fullWidth,
        })}
      >
        <LabelText htmlFor={id} labelMode={labelMode} as="label">
          {labelText}
        </LabelText>
        <HtmlDiv className={searchInputClassNames.functionalityContainer}>
          <HtmlDiv className={searchInputClassNames.inputElementContainer}>
            <HtmlInput
              {...passProps}
              {...getDescribedBy()}
              aria-invalid={status === 'error'}
              id={id}
              className={searchInputClassNames.inputElement}
              type="search"
              role="searchbox"
              value={this.state.value}
              placeholder={visualPlaceholder}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                conditionalSetState(event.currentTarget.value);
              }}
              onKeyPress={onKeyPress}
            />
          </HtmlDiv>
          {!!this.state.value && (
            <HtmlButton {...clearButtonProps}>
              <VisuallyHidden>{clearButtonLabel}</VisuallyHidden>
              <Icon
                aria-hidden={true}
                icon="close"
                className={searchInputClassNames.clearIcon}
              />
            </HtmlButton>
          )}
          <HtmlButton {...searchButtonDerivedProps}>
            <VisuallyHidden>{searchButtonLabel}</VisuallyHidden>
            <Icon
              aria-hidden={true}
              icon="search"
              className={searchInputClassNames.searchIcon}
            />
          </HtmlButton>
        </HtmlDiv>
        <StatusText id={statusTextId} status={status}>
          {statusText}
        </StatusText>
      </HtmlDiv>
    );
  }
}

const StyledTextInput = styled(
  ({ tokens, ...passProps }: SearchInputProps & InternalTokensProp) => {
    return <BaseSearchInput {...passProps} />;
  },
)`
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
