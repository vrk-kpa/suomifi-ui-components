import React, {
  forwardRef,
  ChangeEvent,
  FocusEvent,
  ReactNode,
  ReactElement,
  useState,
  useRef,
  useEffect,
} from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { AutoId } from '../../utils/AutoId/AutoId';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import {
  separateMarginProps,
  MarginProps,
  GlobalMargins,
} from '../../theme/utils/spacing';
import { SpacingConsumer } from '../../theme/SpacingProvider/SpacingProvider';
import { Debounce } from '../../utils/Debounce/Debounce';
import { getConditionalAriaProp } from '../../../utils/aria';
import { forkRefs, filterDuplicateKeys } from '../../../utils/common/common';
import { HtmlInputProps, HtmlDiv, HtmlSpan, HtmlInput } from '../../../reset';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import { Label, LabelMode } from '../Label/Label';
import { StatusText } from '../StatusText/StatusText';
import { HintText } from '../HintText/HintText';
import {
  characterCounterProps,
  InputStatus,
  StatusTextCommonProps,
} from '../types';
import { baseStyles } from './TextInput.baseStyles';

const baseClassName = 'fi-text-input';
export const textInputClassNames = {
  baseClassName,
  fullWidth: `${baseClassName}--full-width`,
  disabled: `${baseClassName}--disabled`,
  error: `${baseClassName}--error`,
  success: `${baseClassName}--success`,
  labelIsVisible: `${baseClassName}_label--visible`,
  icon: `${baseClassName}_with-icon`,
  inputElementContainer: `${baseClassName}_input-element-container`,
  inputElement: `${baseClassName}_input`,
  styleWrapper: `${baseClassName}_wrapper`,
  statusTextHasContent: `${baseClassName}_statusText--has-content`,
  bottomWrapper: `${baseClassName}_bottom-wrapper`,
  characterCounter: `${baseClassName}_character-counter`,
  characterCounterError: `${baseClassName}_character-counter--error`,
};

export type TextInputValue = string | number | undefined;

interface BaseTextInputProps
  extends StatusTextCommonProps,
    MarginProps,
    Omit<HtmlInputProps, 'type' | 'onChange' | 'onClick' | 'onBlur'> {
  /** CSS class for custom styles */
  className?: string;
  /** Disables the input */
  disabled?: boolean;
  /** Callback fired on input click */
  onClick?: () => void;
  /** Callback fired on input change */
  onChange?: (value: TextInputValue) => void;
  /** Callback fired on input blur */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  /** Label for the input */
  labelText: ReactNode;
  /** Hides or shows the label. Label element is always present, but can be visually hidden.
   * @default visible
   */
  labelMode?: LabelMode;
  /** Placeholder text for the input. Use only as visual aid, not for instructions. */
  visualPlaceholder?: string;
  /** Hint text to be shown below the component's label */
  hintText?: string;
  /**
   * `'default'` | `'error'`
   *
   * Status of the component. Error state creates a red border around the input.
   * Always use a descriptive `statusText` with an error status.
   * @default default
   */
  status?: InputStatus;
  /**
   * Type of the input
   * @default text
   */
  type?: 'text' | 'email' | 'number' | 'password' | 'tel' | 'url';
  /** HTML name attribute for the input */
  name?: string;
  /** Controlled value */
  value?: TextInputValue;
  /** Sets component's width to 100% of its parent */
  fullWidth?: boolean;
  /** Text to mark the field optional. Will be wrapped in parentheses and shown after `labelText` */
  optionalText?: string;
  /** Debounce time in milliseconds for onChange function. No debounce is applied if no value is given. */
  debounce?: number;
  /** Suomi.fi icon to be shown inside the input field */
  icon?: ReactElement;
  /** Tooltip component for the input's label */
  tooltipComponent?: ReactElement;
}

export type TextInputProps = characterCounterProps & BaseTextInputProps;

type InternalTextInputProps = TextInputProps & {
  globalMargins?: GlobalMargins;
};

const BaseTextInput = (props: InternalTextInputProps) => {
  const [charCount, setCharCount] = useState(0);
  const [characterCounterAriaText, setCharacterCounterAriaText] = useState('');
  const [typingTimer, setTypingTimer] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  const {
    className,
    labelText,
    labelMode,
    onChange: propOnChange,
    style,
    optionalText,
    status,
    statusText,
    hintText,
    visualPlaceholder,
    id,
    type = 'text',
    fullWidth,
    icon,
    forwardedRef,
    globalMargins,
    debounce,
    statusTextAriaLiveMode = 'assertive',
    'aria-describedby': ariaDescribedBy,
    tooltipComponent,
    characterLimit,
    ariaCharactersRemainingText,
    ariaCharactersExceededText,
    ...rest
  } = props;
  const [_marginProps, passProps] = separateMarginProps(rest);

  useEffect(() => {
    if (characterLimit !== undefined && inputRef.current?.value.length) {
      setCharCount(inputRef.current?.value.length);
    }
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnChange = (
    event: ChangeEvent<HTMLInputElement>,
    debouncer: Function,
  ) => {
    if (typingTimer) {
      clearTimeout(typingTimer);
    }
    if (
      characterLimit !== undefined &&
      ariaCharactersRemainingText &&
      ariaCharactersExceededText
    ) {
      const charCountInInput = event.target.value.length;
      setCharCount(charCountInInput);
      const newTypingTimer = setTimeout(() => {
        if (isMounted) {
          setCharacterCounterAriaText(
            charCountInInput <= characterLimit
              ? ariaCharactersRemainingText(characterLimit - charCountInInput)
              : ariaCharactersExceededText(charCountInInput - characterLimit),
          );
        }
      }, 1500);
      setTypingTimer(newTypingTimer);
    }

    if (!!propOnChange) {
      debouncer(propOnChange, event.target.value);
    }
  };

  const definedRef = forwardedRef || null;

  const hintTextId = `${id}-hintText`;
  const statusTextId = `${id}-statusText`;
  return (
    <HtmlDiv
      className={classnames(baseClassName, className, {
        [textInputClassNames.disabled]: !!passProps.disabled,
        [textInputClassNames.icon]: !!icon,
        [textInputClassNames.error]: status === 'error',
        [textInputClassNames.success]: status === 'success',
        [textInputClassNames.fullWidth]: fullWidth,
      })}
      style={style}
    >
      <HtmlSpan className={textInputClassNames.styleWrapper}>
        <Label
          htmlFor={id}
          labelMode={labelMode}
          optionalText={optionalText}
          className={classnames({
            [textInputClassNames.labelIsVisible]: labelMode !== 'hidden',
          })}
          tooltipComponent={tooltipComponent}
        >
          {labelText}
        </Label>
        <HintText id={hintTextId}>{hintText}</HintText>
        <HtmlDiv className={textInputClassNames.inputElementContainer}>
          <Debounce waitFor={debounce}>
            {(debouncer: Function) => (
              <HtmlInput
                {...passProps}
                id={id}
                className={textInputClassNames.inputElement}
                type={type}
                forwardedRef={forkRefs(inputRef, definedRef)}
                placeholder={visualPlaceholder}
                {...{ 'aria-invalid': status === 'error' }}
                {...getConditionalAriaProp('aria-describedby', [
                  statusText ? statusTextId : undefined,
                  hintText ? hintTextId : undefined,
                  ariaDescribedBy,
                ])}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  handleOnChange(event, debouncer);
                }}
              />
            )}
          </Debounce>
          {icon}
        </HtmlDiv>
        <HtmlDiv className={textInputClassNames.bottomWrapper}>
          <StatusText
            id={statusTextId}
            className={classnames({
              [textInputClassNames.statusTextHasContent]: !!statusText,
            })}
            status={status}
            ariaLiveMode={statusTextAriaLiveMode}
            disabled={passProps.disabled}
          >
            {characterLimit && (
              <VisuallyHidden>{characterCounterAriaText}</VisuallyHidden>
            )}
            {statusText}
          </StatusText>
          {characterLimit && (
            <HtmlDiv
              className={classnames(textInputClassNames.characterCounter, {
                [textInputClassNames.characterCounterError]:
                  charCount > characterLimit,
              })}
            >
              {`${charCount}/${characterLimit}`}
            </HtmlDiv>
          )}
        </HtmlDiv>
      </HtmlSpan>
    </HtmlDiv>
  );
};

const StyledTextInput = styled(
  ({
    theme,
    ...passProps
  }: TextInputProps & SuomifiThemeProp & { globalMargins: GlobalMargins }) => (
    <BaseTextInput {...passProps} />
  ),
)`
  ${({ theme, globalMargins, ...rest }) => {
    const [marginProps, _passProps] = separateMarginProps(rest);
    const cleanedGlobalMargins = filterDuplicateKeys(
      globalMargins.textInput,
      marginProps,
    );
    return baseStyles(theme, cleanedGlobalMargins, marginProps);
  }}
`;

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (props: TextInputProps, ref: React.Ref<HTMLInputElement>) => {
    const { id: propId, ...passProps } = props;
    return (
      <SpacingConsumer>
        {({ margins }) => (
          <SuomifiThemeConsumer>
            {({ suomifiTheme }) => (
              <AutoId id={propId}>
                {(id) => (
                  <StyledTextInput
                    theme={suomifiTheme}
                    id={id}
                    forwardedRef={ref}
                    globalMargins={margins}
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

TextInput.displayName = 'TextInput';
export { TextInput };
