import React, {
  forwardRef,
  Component,
  ChangeEvent,
  FocusEvent,
  ReactNode,
  ReactElement,
} from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { AutoId } from '../../utils/AutoId/AutoId';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { Debounce } from '../../utils/Debounce/Debounce';
import { getConditionalAriaProp } from '../../../utils/aria';
import {
  HtmlInputProps,
  HtmlDiv,
  HtmlDivProps,
  HtmlSpan,
  HtmlInput,
  HtmlButton,
} from '../../../reset';
import { Label, LabelMode } from '../Label/Label';
import { StatusText } from '../StatusText/StatusText';
import { HintText } from '../HintText/HintText';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import { Icon } from '../../Icon/Icon';
import { InputStatus, StatusTextCommonProps } from '../types';
import { baseStyles } from './DateInput.baseStyles';

const baseClassName = 'fi-date-input';
export const dateInputClassNames = {
  baseClassName,
  fullWidth: `${baseClassName}--full-width`,
  hasPicker: `${baseClassName}--has-picker`,
  disabled: `${baseClassName}--disabled`,
  error: `${baseClassName}--error`,
  success: `${baseClassName}--success`,
  labelIsVisible: `${baseClassName}_label--visible`,
  inputAndPickerWrapper: `${baseClassName}_input-and-picker-wrapper`,
  inputElementContainer: `${baseClassName}_input-element-container`,
  inputElement: `${baseClassName}_input`,
  pickerElementContainer: `${baseClassName}_picker-element-container`,
  pickerButton: `${baseClassName}_picker-button`,
  pickerIcon: `${baseClassName}_picker-icon`,
  styleWrapper: `${baseClassName}_wrapper`,
  statusTextHasContent: `${baseClassName}_statusText--has-content`,
};
export interface DatePickerTextProps {
  /** Aria-label for calendar button that opens the date picker. */
  openButtonLabel?: string;
  /** Text for close button. */
  closeButtonText?: string;
  /** Text for date selection button. */
  selectButtonText?: string;
  /** Aria-label for year select. */
  yearSelectLabel?: string;
  /** Aria-label for month select. */
  monthSelectLabel?: string;
  /** Aria-label for moving to next month. */
  nextMonthButtonLabel?: string;
  /** Aria-label for moving to previous month. */
  prevMonthButtonLabel?: string;
}

const texts: {
  en: DatePickerTextProps;
  fi: DatePickerTextProps;
  sv: DatePickerTextProps;
} = {
  en: {
    openButtonLabel: 'Choose date',
    closeButtonText: 'Close',
    selectButtonText: 'Select',
    yearSelectLabel: 'Select year',
    monthSelectLabel: 'Select month',
    nextMonthButtonLabel: 'Next month',
    prevMonthButtonLabel: 'Previous month',
  },
  fi: {
    openButtonLabel: 'Valitse päivämäärä',
    closeButtonText: 'Sulje',
    selectButtonText: 'Valitse',
    yearSelectLabel: 'Valitse vuosi',
    monthSelectLabel: 'Valitse kuukausi',
    nextMonthButtonLabel: 'Seuraava kuukausi',
    prevMonthButtonLabel: 'Edellinen kuukausi',
  },
  sv: {
    openButtonLabel: 'Väjl datumn',
    closeButtonText: 'Stäng',
    selectButtonText: 'Välj',
    yearSelectLabel: 'Välj år',
    monthSelectLabel: 'Välj månad',
    nextMonthButtonLabel: 'Nästa månad',
    prevMonthButtonLabel: 'Föregående månad',
  },
};

export type DatePickerProps =
  | {
      datePickerEnabled?: false;
      datePickerTexts?: never;
      language?: never;
    }
  | {
      /** Hides date picker from date input.
       * @default false
       */
      datePickerEnabled: true;
      /**
       * Custom texts for date picker to use instead of language (fi, en, sv) texts.
       * <pre>
       * DatePickerTextProps {
       *   openButtonLabel?: string;
       *   closeButtonText?: string;
       *   selectButtonText?: string;
       *   yearSelectLabel?: string;
       *   monthSelectLabel?: string;,
       *   nextMonthButtonLabel?: string;
       *   prevMonthButtonLabel?: string;
       * }
       * </pre>
       */
      datePickerTexts?: DatePickerTextProps;
      /** Language for date picker default texts. For example 'fi'.
       * @default 'fi'
       */
      language?: 'fi' | 'en' | 'sv';
      /** Date format for the date selected with date picker, for example 'd.M.yyyy'.
       * @see date-fns format
       */
      dateFormat?: string;
      /** Minimum date user can select from date picker. Required if date picker is enabled. */
      minDate?: Date;
      /** Maximum date user can select from date picker. */
      maxDate?: Date;
      /** Initial month to show when date picker is opened. By default current month. */
      initialMonth?: Date;
    };

export interface DateInputProps
  extends StatusTextCommonProps,
    Omit<HtmlInputProps, 'onChange'> {
  /** TextInput container div class name for custom styling. */
  className?: string;
  /** TextInput wrapping div element props */
  wrapperProps?: Omit<HtmlDivProps, 'className'>;
  /** Disable input usage */
  disabled?: boolean;
  /** Event handler to execute when clicked */
  onClick?: () => void;
  /** To execute on input text change */
  onChange?: (value: string) => void;
  /** To execute on input text onBlur */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  /** Label for the input */
  labelText: ReactNode;
  /** Hide or show label. Label element is always present, but can be visually hidden.
   * @default visible
   */
  labelMode?: LabelMode;
  /** Placeholder text for input. Use only as visual aid, not for instructions. */
  visualPlaceholder?: string;
  /** Hint text for input. Date input should show hint for formatting date, for example 'Use format D.M.YYYY'. */
  hintText?: string;
  /**
   * 'default' | 'error' | 'success'
   * @default default
   */
  status?: InputStatus;
  /** Controlled value */
  value?: string;
  /** Set components width to 100% */
  fullWidth?: boolean;
  /** Text to mark a field optional. Will be wrapped in parentheses and shown after labelText. */
  optionalText?: string;
  /** Debounce time in milliseconds for onChange function. No debounce is applied if no value is given. */
  debounce?: number;
  /** Tooltip component for the input's label */
  tooltipComponent?: ReactElement;
}

class BaseDateInput extends Component<DateInputProps & DatePickerProps> {
  render() {
    const {
      className,
      labelText,
      labelMode,
      onChange: propOnChange,
      wrapperProps,
      optionalText,
      status,
      statusText,
      hintText,
      visualPlaceholder,
      id,
      fullWidth,
      forwardedRef,
      debounce,
      statusTextAriaLiveMode = 'assertive',
      'aria-describedby': ariaDescribedBy,
      datePickerEnabled = false,
      datePickerTexts,
      language = 'fi',
      tooltipComponent,
      ...passProps
    } = this.props;

    const hintTextId = `${id}-hintText`;
    const statusTextId = `${id}-statusText`;
    return (
      <HtmlDiv
        {...wrapperProps}
        className={classnames(baseClassName, className, {
          [dateInputClassNames.disabled]: !!passProps.disabled,
          [dateInputClassNames.error]: status === 'error',
          [dateInputClassNames.success]: status === 'success',
          [dateInputClassNames.fullWidth]: fullWidth,
          [dateInputClassNames.hasPicker]: datePickerEnabled,
        })}
      >
        <HtmlSpan className={dateInputClassNames.styleWrapper}>
          <Label
            htmlFor={id}
            labelMode={labelMode}
            optionalText={optionalText}
            className={classnames({
              [dateInputClassNames.labelIsVisible]: labelMode !== 'hidden',
            })}
            tooltipComponent={tooltipComponent}
          >
            {labelText}
          </Label>
          <HintText id={hintTextId}>{hintText}</HintText>
          <HtmlDiv className={dateInputClassNames.inputAndPickerWrapper}>
            <HtmlDiv className={dateInputClassNames.inputElementContainer}>
              <Debounce waitFor={debounce}>
                {(debouncer: Function) => (
                  <HtmlInput
                    {...passProps}
                    id={id}
                    className={dateInputClassNames.inputElement}
                    forwardedRef={forwardedRef}
                    placeholder={visualPlaceholder}
                    {...{ 'aria-invalid': status === 'error' }}
                    {...getConditionalAriaProp('aria-describedby', [
                      statusText ? statusTextId : undefined,
                      hintText ? hintTextId : undefined,
                      ariaDescribedBy,
                    ])}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      if (propOnChange) {
                        debouncer(propOnChange, event.currentTarget.value);
                      }
                    }}
                  />
                )}
              </Debounce>
            </HtmlDiv>
            <HtmlDiv className={dateInputClassNames.pickerElementContainer}>
              {datePickerEnabled && (
                <HtmlButton className={dateInputClassNames.pickerButton}>
                  <VisuallyHidden>
                    {datePickerTexts?.openButtonLabel ||
                      texts[language].openButtonLabel}
                  </VisuallyHidden>
                  <Icon
                    className={dateInputClassNames.pickerIcon}
                    aria-hidden={true}
                    icon="calendar"
                  />
                </HtmlButton>
              )}
            </HtmlDiv>
          </HtmlDiv>
          <StatusText
            id={statusTextId}
            className={classnames({
              [dateInputClassNames.statusTextHasContent]: !!statusText,
            })}
            status={status}
            ariaLiveMode={statusTextAriaLiveMode}
            disabled={passProps.disabled}
          >
            {statusText}
          </StatusText>
        </HtmlSpan>
      </HtmlDiv>
    );
  }
}

const StyledDateInput = styled(
  ({
    theme,
    ...passProps
  }: DateInputProps & DatePickerProps & SuomifiThemeProp) => (
    <BaseDateInput {...passProps} />
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

/**
 * <i class="semantics" />
 * Use for user inputting date.
 * Can be used as an input field or with an additional DatePicker.
 *
 * Props other than specified explicitly are passed on to underlying input element.
 * @component
 */
const DateInput = forwardRef<
  HTMLInputElement,
  DateInputProps & DatePickerProps
>(
  (
    props: DateInputProps & DatePickerProps,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const { id: propId, ...passProps } = props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <AutoId id={propId}>
            {(id) => (
              <StyledDateInput
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

DateInput.displayName = 'DateInput';
export { DateInput };
