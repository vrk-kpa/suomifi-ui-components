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
import { Label } from '../../Form/Label/Label';
import { Icon } from '../../Icon/Icon';
import { InputStatus, StatusTextCommonProps } from '../../Form/types';
import { baseStyles } from './PageInput.baseStyles';

type PageInputValue = number | string | null;

type PageInputStatus = Exclude<InputStatus, 'success'>;

export interface PageInputProps
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
  /** PageInput container div class name for custom styling. */
  className?: string;
  /** PageInput wrapping div element props */
  wrapperProps?: Omit<HtmlDivProps, 'className'>;
  /** Label text */
  labelText: ReactNode;
  /** Placeholder text for input. */
  visualPlaceholder?: string;
  /** Page button label for screen readers */
  pageInputButtonLabel: string;
  /** PageButtonProps */
  pageInputButtonProps?: Omit<HtmlButtonProps, 'onClick' | 'tabIndex'>;
  /**
   * 'default' | 'error'
   * @default default
   */
  status?: PageInputStatus;
  /** Input name */
  name?: string;
  /** Set components width to 100% */
  fullWidth?: boolean;
  /** Controlled value */
  value?: PageInputValue;
  /** Callback for onBlur event */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  /** Callback for search button click */
  onPageChange?: (value: PageInputValue) => void;
  /** Maximum value */
  maxValue: number;
}

const baseClassName = 'fi-page-input';
const pageInputClassNames = {
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
  pageInputIcon: `${baseClassName}_button-icon`,
};

interface PageInputState {
  value: PageInputValue;
  status: PageInputStatus;
  inputValue: string | number | undefined;
}

class BasePageInput extends Component<PageInputProps & SuomifiThemeProp> {
  state: PageInputState = {
    value: this.props.value || '',
    status: this.props.status || 'default',
    inputValue: undefined,
  };

  private inputRef = createRef<HTMLInputElement>();

  static getDerivedStateFromProps(
    nextProps: PageInputProps,
    prevState: PageInputState,
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
      className,
      labelText,
      pageInputButtonLabel,
      pageInputButtonProps,
      wrapperProps,
      onPageChange: propOnPageChange,
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

    const conditionalSetState = (newValue: PageInputValue) => {
      if (!('value' in this.props)) {
        this.setState({ value: newValue });
      }
    };

    const onPageChange = () => {
      if (!!propOnPageChange) {
        propOnPageChange(this.state.value);
      }
      conditionalSetState('');
    };

    const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        !!this.state.value &&
        this.state.status !== 'error' &&
        event?.key === 'Enter'
      ) {
        onPageChange();
      }
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event?.key === 'Escape') {
        event.preventDefault();
      }
    };

    const pageInputButtonDerivedProps = {
      ...pageInputButtonProps,
      className: classnames(
        pageInputButtonProps?.className,
        pageInputClassNames.button,
      ),
      ...(!!this.state.value && this.state.status !== 'error'
        ? { onClick: onPageChange }
        : { tabIndex: -1, 'aria-hidden': true }),
    };

    return (
      <HtmlDiv
        {...wrapperProps}
        className={classnames(className, baseClassName, {
          [pageInputClassNames.error]: this.state.status === 'error',
          [pageInputClassNames.notEmpty]:
            !!this.state.value && this.state.status !== 'error',
          [pageInputClassNames.fullWidth]: fullWidth,
        })}
      >
        <HtmlSpan className={pageInputClassNames.styleWrapper}>
          <Label htmlFor={id} labelMode="hidden">
            {labelText}
          </Label>
          <HtmlDiv className={pageInputClassNames.functionalityContainer}>
            <HtmlDiv className={pageInputClassNames.inputElementContainer}>
              <HtmlInput
                {...passProps}
                {...getConditionalAriaProp('aria-describedby', [
                  !!statusText ? statusTextId : undefined,
                  ariaDescribedBy,
                ])}
                forwardedRef={this.inputRef}
                size={6}
                aria-invalid={this.state.status === 'error'}
                id={id}
                className={pageInputClassNames.inputElement}
                value={this.state.value}
                placeholder={visualPlaceholder}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  // Clear status if the input is empty
                  if (event.target.value === '' || !event.target.value) {
                    this.setState({ status: 'default' });
                  }
                  // Set input value for <StatusText>
                  this.setState({ inputValue: event.target.value });
                  // Set value to state
                  conditionalSetState(event.target.value);

                  const parsedValue = parseInt(event.target.value, 10) || null;
                  const verifiedValue =
                    parsedValue && parsedValue > 0 && parsedValue <= maxValue
                      ? parsedValue
                      : null;

                  if (verifiedValue === null && event.target.value !== '') {
                    this.setState({ status: 'error' });
                  }
                }}
                onKeyPress={onKeyPress}
                onKeyDown={onKeyDown}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </HtmlDiv>
            <HtmlButton {...pageInputButtonDerivedProps}>
              <VisuallyHidden>{pageInputButtonLabel}</VisuallyHidden>
              <Icon
                aria-hidden={true}
                icon="search"
                className={pageInputClassNames.pageInputIcon}
              />
            </HtmlButton>
          </HtmlDiv>
          <StatusText
            id={statusTextId}
            className={classnames({
              [pageInputClassNames.statusTextHasContent]: !!this.state.status,
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

const StyledPageInput = styled(BasePageInput)`
  ${({ theme }) => baseStyles(theme)}
`;

/**
 * <i class="semantics" />
 * Use for user inputting page number.
 * Props other than specified explicitly are passed on to underlying input element.
 */
const PageInput = (props: PageInputProps) => {
  const { id: propId, ...passProps } = props;
  return (
    <SuomifiThemeConsumer>
      {({ suomifiTheme }) => (
        <AutoId id={propId}>
          {(id) => (
            <StyledPageInput theme={suomifiTheme} id={id} {...passProps} />
          )}
        </AutoId>
      )}
    </SuomifiThemeConsumer>
  );
};

PageInput.displayName = 'PageInput';
export { PageInput };
