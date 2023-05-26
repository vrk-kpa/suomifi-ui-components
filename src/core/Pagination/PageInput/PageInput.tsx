import React, { ChangeEvent, Component, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { getConditionalAriaProp } from '../../../utils/aria';
import {
  HtmlInput,
  HtmlInputProps,
  HtmlSpan,
  HtmlDiv,
  HtmlButton,
} from '../../../reset';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import { StatusText } from '../../Form/StatusText/StatusText';
import { Label } from '../../Form/Label/Label';
import { Icon } from '../../Icon/Icon';
import { InputStatus, StatusTextCommonProps } from '../../Form/types';
import { baseStyles } from './PageInput.baseStyles';

export type PageInputValue = number | string | undefined;

type PageInputStatus = Exclude<InputStatus, 'success'>;

export interface InternalPageInputProps
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
  /** Label text */
  labelText: ReactNode;
  /** Placeholder text for input. */
  visualPlaceholder?: string;
  /** Page button label for screen readers */
  pageInputButtonLabel: string;
  /** Callback for page input button click */
  onPageChange?: (value: PageInputValue) => void;
  /** Maximum value */
  maxValue: number;
  /** Error text shown when the input is invalid */
  invalidValueErrorText: (value: PageInputValue) => string;
}

const baseClassName = 'fi-page-input';
const pageInputClassNames = {
  error: `${baseClassName}--error`,
  notEmpty: `${baseClassName}--not-empty`,
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
  inputValue: PageInputValue;
}

class BasePageInput extends Component<
  InternalPageInputProps & SuomifiThemeProp
> {
  state: PageInputState = {
    value: '',
    status: 'default',
    inputValue: undefined,
  };

  private inputRef = React.createRef<HTMLInputElement>();

  render() {
    const {
      className,
      labelText,
      pageInputButtonLabel,
      onPageChange: propOnPageChange,
      children,
      statusText,
      visualPlaceholder,
      id,
      theme,
      maxValue,
      invalidValueErrorText,
      'aria-describedby': ariaDescribedBy,
      statusTextAriaLiveMode = 'assertive',
      ...passProps
    } = this.props;

    const statusTextId = `${id}-statusText`;

    const setValue = (newValue: PageInputValue) => {
      this.setState({ value: newValue });
    };

    const onPageChange = () => {
      if (!!propOnPageChange) {
        propOnPageChange(this.state.value);
      }
      setValue('');
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      // Clear status if the input is empty
      if (event.target.value === '' || !event.target.value) {
        this.setState({ status: 'default' });
      }
      // Set input value for <StatusText>
      this.setState({ inputValue: event.target.value });
      // Set value to state
      setValue(event.target.value);

      const parsedValue = parseInt(event.target.value, 10) || null;
      const verifiedValue =
        parsedValue && parsedValue > 0 && parsedValue <= maxValue
          ? parsedValue
          : null;

      if (
        event.target.value !== '' &&
        (event.target.value?.length !== verifiedValue?.toString.length ||
          verifiedValue === null)
      ) {
        this.setState({ status: 'error' });
      } else {
        this.setState({ status: 'default' });
      }
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

    const buttonClick = () => {
      /* Get the current input value */
      const tempValue = this.state.value;
      /* Clear the input field so screenreader wont read the "old" number again */
      setValue('');

      /**
       * When the action comes from button it still has the focus. Button will be hidden when input (and state)
       * are cleared so the focus must be moved back to the input. Otherwise screen readers (NVDA) will have focus issues.
       * Timeout is needed so the input field has enough time to clear.
       * Without this the screenreader is too fast and reads the old number.
       */
      setTimeout(() => {
        if (this.inputRef.current) {
          this.inputRef.current.focus();
        }
      }, 100);

      /* Call prop with the new value after a timeout. Now the "page change text" is the last one to be read.
      Without the timeout NVDA skips it.
      */
      setTimeout(() => {
        if (!!propOnPageChange) {
          propOnPageChange(tempValue);
        }
      }, 200);
    };

    const pageInputButtonDerivedProps = {
      className: pageInputClassNames.button,
      ...(!!this.state.value && this.state.status !== 'error'
        ? { onClick: buttonClick }
        : { tabIndex: -1, hidden: true }),
    };

    return (
      <HtmlDiv
        className={classnames(className, baseClassName, {
          [pageInputClassNames.error]: this.state.status === 'error',
          [pageInputClassNames.notEmpty]:
            !!this.state.value && this.state.status !== 'error',
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
                size={6}
                aria-invalid={this.state.status === 'error'}
                id={id}
                forwardedRef={this.inputRef}
                className={pageInputClassNames.inputElement}
                value={this.state.value}
                placeholder={visualPlaceholder}
                onChange={onChange}
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
            {this.state.status === 'error'
              ? invalidValueErrorText(this.state.inputValue)
              : ''}
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
const PageInput = (props: InternalPageInputProps) => (
  <SuomifiThemeConsumer>
    {({ suomifiTheme }) => <StyledPageInput theme={suomifiTheme} {...props} />}
  </SuomifiThemeConsumer>
);

PageInput.displayName = 'PageInput';
export { PageInput };
