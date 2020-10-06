import React, { ChangeEvent, Component, ReactNode, FocusEvent } from 'react';
import { default as styled } from 'styled-components';
import {
  HtmlLabel,
  HtmlLabelProps,
  HtmlInput,
  HtmlInputProps,
  HtmlDiv,
  HtmlDivProps,
  HtmlSpan,
} from '../../../reset';
import { VisuallyHidden } from '../../../components/Visually-hidden/Visually-hidden';
import {
  Paragraph,
  ParagraphProps,
} from '../../../components/Paragraph/Paragraph';
import { TokensProp, InternalTokensProp } from '../../theme';
import { withSuomifiDefaultProps } from '../../theme/utils';
import { baseStyles } from './SearchInput.baseStyles';
import { baseStyles as inputBaseStyles } from '../TextInput/TextInput.baseStyles';
import { Icon } from '../../Icon/Icon';
import classnames from 'classnames';
import { Omit } from '../../../utils/typescript';
import { disabledCursor } from '../../../components/utils/css';
import { idGenerator } from '../../../utils/uuid';

export interface TextInputLabelProps extends HtmlLabelProps {}

type Label = 'hidden' | 'visible';

type InputType = 'text' | 'email' | 'number' | 'password' | 'tel' | 'url';

type SearchInputStatus = 'default' | 'error';

export interface SearchInputProps
  extends Omit<HtmlInputProps, 'type'>,
    TokensProp {
  /** TextInput container div class name for custom styling. */
  className?: string;
  /** TextInput container div props */
  inputContainerProps?: Omit<HtmlDivProps, 'className'>;
  /** Disable input usage */
  disabled?: boolean;
  /** Event handler to execute when clicked */
  onClick?: () => void;
  /** Pass custom props to label container */
  labelProps?: TextInputLabelProps;
  /** Pass custom props to Label text element */
  labelTextProps?: ParagraphProps;
  /** To execute on input text change */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  /** To execute on input text onBlur */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  /** Label */
  labelText: string;
  /** Hide or show label. Label element is always present, but can be visually hidden.
   * @default visible
   */
  labelMode?: Label;
  /** Placeholder text for input. Use only as visual aid, not for instructions. */
  visualPlaceholder?: string;
  /** A custom element to be passed to the component. Will be rendered after the input */
  children?: ReactNode;
  /** Hint text to be shown below the component */
  hintText?: string;
  /**
   * 'default' | 'error' | 'success'
   * @default default
   */
  status?: SearchInputStatus;
  /** Status text to be shown below the component and hint text. Use e.g. for validation error */
  statusText?: string;
  /** 'text' | 'email' | 'number' | 'password' | 'tel' | 'url'
   * @default text
   */
  type?: InputType;
  /** Input name */
  name?: string;
  /** Set components width to 100% */
  fullWidth?: boolean;
}

const baseClassName = 'fi-search-input';
const searchInputClassNames = {
  disabled: `${baseClassName}--disabled`,
  label: `${baseClassName}_label`,
  inputElement: `${baseClassName}_input`,
  inputElementContainer: `${baseClassName}_input-element-container`,
  inputFocusWrapper: `${baseClassName}_input-focus-wrapper`,
  statusText: `${baseClassName}_statusText`,
  statusTextContainer: `${baseClassName}_statusText_container`,
  hintText: `${baseClassName}_hintText`,
  searchButton: `${baseClassName}_button-search`,
  searchButtonEmpty: `${baseClassName}_button-search-empty`,
  clearButton: `${baseClassName}_button-clear`,
  clearIcon: `${baseClassName}_button-clear-icon`,
  searchIcon: `${baseClassName}_button-search-icon`,
  labelParagraph: `${baseClassName}_label-p`,
  error: `${baseClassName}--error`,
};

interface SearchInputState {
  inputEmpty: boolean;
}

class BaseSearchInput extends Component<SearchInputProps> {
  state: SearchInputState = {
    inputEmpty: !!!this.props.value && !!!this.props.defaultValue,
  };

  render() {
    const {
      className,
      labelText,
      labelMode,
      labelProps,
      labelTextProps = { className: undefined },
      inputContainerProps,
      onChange: userOnChange,
      children,
      status,
      statusText,
      hintText,
      visualPlaceholder,
      id: propId,
      type = 'text',
      fullWidth,
      ...passProps
    } = this.props;

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      this.setState({ inputEmpty: event.target.value === '' });
      if (!!userOnChange) {
        userOnChange(event);
      }
    };

    const hideLabel = labelMode === 'hidden';
    const generatedStatusTextId = `${idGenerator(propId)}-statusText`;
    const generatedHintTextId = `${idGenerator(propId)}-hintText`;

    return (
      <HtmlDiv
        {...inputContainerProps}
        className={classnames(className, baseClassName, {
          [searchInputClassNames.disabled]: !!passProps.disabled,
          [searchInputClassNames.error]: status === 'error',
        })}
      >
        <HtmlLabel
          {...labelProps}
          className={classnames(
            searchInputClassNames.label,
            labelProps?.className,
          )}
        >
          {hideLabel ? (
            <VisuallyHidden>{labelText}</VisuallyHidden>
          ) : (
            <Paragraph
              {...labelTextProps}
              className={classnames(
                labelTextProps.className,
                searchInputClassNames.labelParagraph,
              )}
            >
              {labelText}
            </Paragraph>
          )}
          {hintText && (
            <Paragraph
              className={searchInputClassNames.hintText}
              id={generatedHintTextId}
            >
              {hintText}
            </Paragraph>
          )}
          <HtmlDiv className={searchInputClassNames.statusTextContainer}>
            <HtmlDiv className={searchInputClassNames.inputElementContainer}>
              <HtmlDiv className={searchInputClassNames.inputFocusWrapper}>
                <HtmlInput
                  {...passProps}
                  onChange={onChange}
                  id={propId}
                  className={searchInputClassNames.inputElement}
                  type={type}
                  placeholder={visualPlaceholder}
                  {...{ 'aria-invalid': status === 'error' }}
                />
              </HtmlDiv>
              {!this.state.inputEmpty && (
                <HtmlDiv
                  className={classnames(searchInputClassNames.clearButton)}
                  role="button"
                  tabIndex={0}
                >
                  <Icon
                    icon="close"
                    className={searchInputClassNames.clearIcon}
                  />
                </HtmlDiv>
              )}
              <HtmlDiv
                role="button"
                tabIndex={this.state.inputEmpty ? -1 : 0}
                className={classnames(searchInputClassNames.searchButton, {
                  [searchInputClassNames.searchButtonEmpty]: this.state
                    .inputEmpty,
                })}
              >
                <Icon
                  icon="search"
                  className={searchInputClassNames.searchIcon}
                />
              </HtmlDiv>
            </HtmlDiv>
            {statusText && (
              <HtmlSpan
                className={searchInputClassNames.statusText}
                id={generatedStatusTextId}
              >
                {statusText}
              </HtmlSpan>
            )}
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
  &.${searchInputClassNames.disabled} {
    ${disabledCursor}
  }
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
