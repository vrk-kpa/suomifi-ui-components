import React, {
  ChangeEvent,
  FocusEvent,
  forwardRef,
  ReactNode,
  ReactElement,
  useState,
  useEffect,
  useRef,
} from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { getConditionalAriaProp } from '../../../utils/aria';
import { AutoId } from '../../utils/AutoId/AutoId';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import {
  HtmlTextarea,
  HtmlTextareaProps,
  HtmlDiv,
  HtmlDivProps,
} from '../../../reset';
import { forkRefs } from '../../../utils/common/common';
import { Label } from '../Label/Label';
import { HintText } from '../HintText/HintText';
import { StatusText } from '../StatusText/StatusText';
import { InputStatus, StatusTextCommonProps } from '../types';
import { baseStyles } from './Textarea.baseStyles';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import {
  spacingStyles,
  separateMarginProps,
  MarginProps,
} from '../../theme/utils/spacing';

const baseClassName = 'fi-textarea';
const textareaClassNames = {
  fullWidth: `${baseClassName}--full-width`,
  textareaContainer: `${baseClassName}_textarea-element-container`,
  textarea: `${baseClassName}_textarea`,
  resizeHorizontal: `${baseClassName}_textarea-resize--horizontal`,
  resizeBoth: `${baseClassName}_textarea-resize--both`,
  resizeNone: `${baseClassName}_textarea-resize--none`,
  disabled: `${baseClassName}--disabled`,
  error: `${baseClassName}--error`,
  statusTextHasContent: `${baseClassName}_statusText--has-content`,
  bottomWrapper: `${baseClassName}_bottom-wrapper`,
  characterCounter: `${baseClassName}_character-counter`,
  characterCounterError: `${baseClassName}_character-counter--error`,
};

type TextareaStatus = Exclude<InputStatus, 'success'>;

type characterCounterProps =
  | {
      characterLimit?: never;
      ariaCharactersRemainingText?: never;
      ariaCharactersExceededText?: never;
    }
  | {
      /** Maximun amount of characters allowed in the textarea.
       * Using this prop adds a visible character counter to the bottom right corner of the textarea.
       */
      characterLimit?: number;
      /** Returns a text which screen readers read to indicate how many characters can still be written to the textarea.
       * Required with `characterLimit`
       */
      ariaCharactersRemainingText: (amount: number) => string;
      /** Returns a text which screen readers read to indicate how many characters are over the maximum allowed chracter amount.
       * Required with `characterLimit`
       */
      ariaCharactersExceededText: (amount: number) => string;
    };

interface BaseTextareaProps
  extends StatusTextCommonProps,
    MarginProps,
    Omit<HtmlTextareaProps, 'placeholder' | 'forwardedRef'> {
  /** CSS class for custom styles */
  className?: string;
  /** Disables the input */
  disabled?: boolean;
  /** Callback fired on click */
  onClick?: () => void;
  /** Callback fired on text change */
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  /** Callback fired on input blur */
  onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  /** Label for the input */
  labelText: ReactNode;
  /** Hides or shows the label. Label element is always present, but can be visually hidden.
   * @default visible
   */
  labelMode?: 'hidden' | 'visible';
  /** Placeholder text for the input. Use only as visual aid, not for instructions. */
  visualPlaceholder?: string;
  /** Initial text content for textarea */
  children?: string;
  /** Hint text to be shown below the component */
  hintText?: string;
  /**
   * `'default'` | `'error'`
   *
   * Status of the component. Error state creates a red border around the input. Always use a descriptive `statusText` with an error status.
   * @default default
   */
  status?: TextareaStatus;
  /**
   * Resize mode of the textarea
   *  @default 'vertical'
   */
  resize?: 'both' | 'vertical' | 'horizontal' | 'none';
  /** Text to mark the field as optional. Will be wrapped in parentheses after `labelText` */
  optionalText?: string;
  /**
   * HTML id attribute.
   * If no id is specified, one will be generated automatically
   */
  id?: string;
  /** HTML name attribute for the input */
  name?: string;
  /** Sets the component's width to 100% of its parent */
  fullWidth?: boolean;
  /** Props passed to the outermost div element of the component */
  containerProps?: Omit<HtmlDivProps, 'className'>;
  /** Tooltip component for the input's label */
  tooltipComponent?: ReactElement;
  /** Ref is forwarded to the underlying input element. Alternative for React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLTextAreaElement>;
}

export type TextareaProps = characterCounterProps & BaseTextareaProps;

const BaseTextarea = (props: TextareaProps) => {
  const {
    id,
    className,
    disabled = false,
    children,
    onClick,
    onChange: onChangeProp,
    labelMode,
    labelText,
    hintText,
    status,
    statusText,
    visualPlaceholder,
    resize,
    optionalText,
    'aria-describedby': ariaDescribedBy,
    fullWidth,
    containerProps,
    forwardedRef,
    statusTextAriaLiveMode = 'assertive',
    tooltipComponent,
    characterLimit,
    ariaCharactersRemainingText,
    ariaCharactersExceededText,
    ...rest
  } = props;

  const [marginProps, passProps] = separateMarginProps(rest);
  const marginStyle = spacingStyles(marginProps);

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

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const onClickProps = !!disabled ? {} : { onMouseDown: onClick };
  const statusTextId = statusText ? `${id}-statusText` : undefined;
  const hintTextId = hintText ? `${id}-hintText` : undefined;

  useEffect(() => {
    if (characterLimit !== undefined && inputRef.current?.value.length) {
      setCharCount(inputRef.current?.value.length);
    }
  }, []);

  const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
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

    if (!!onChangeProp) {
      onChangeProp(event);
    }
  };

  // Remove the possibility to have undefined forwardedRef as a parameter for forkRefs
  const definedRef = forwardedRef || null;

  return (
    <HtmlDiv
      {...containerProps}
      className={classnames(baseClassName, className, {
        [textareaClassNames.disabled]: !!disabled,
        [textareaClassNames.error]: status === 'error' && !disabled,
        [textareaClassNames.fullWidth]: fullWidth,
      })}
      style={{ ...marginStyle, ...containerProps?.style }}
    >
      <Label
        htmlFor={id}
        labelMode={labelMode}
        optionalText={optionalText}
        tooltipComponent={tooltipComponent}
      >
        {labelText}
      </Label>
      <HintText id={hintTextId}>{hintText}</HintText>
      <HtmlDiv className={textareaClassNames.textareaContainer}>
        <HtmlTextarea
          id={id}
          className={classnames(textareaClassNames.textarea, {
            [textareaClassNames.resizeBoth]: resize === 'both',
            [textareaClassNames.resizeHorizontal]: resize === 'horizontal',
            [textareaClassNames.resizeNone]: resize === 'none',
          })}
          disabled={disabled}
          defaultValue={children}
          forwardedRef={forkRefs(inputRef, definedRef)}
          placeholder={visualPlaceholder}
          aria-invalid={status === 'error'}
          {...getConditionalAriaProp('aria-describedby', [
            statusTextId,
            hintTextId,
            ariaDescribedBy,
          ])}
          onChange={handleOnChange}
          {...passProps}
          {...onClickProps}
        />
      </HtmlDiv>
      <HtmlDiv className={textareaClassNames.bottomWrapper}>
        <StatusText
          id={statusTextId}
          className={classnames({
            [textareaClassNames.statusTextHasContent]: !!statusText,
          })}
          status={status}
          disabled={disabled}
          ariaLiveMode={statusTextAriaLiveMode}
        >
          {characterLimit && (
            <VisuallyHidden>{characterCounterAriaText}</VisuallyHidden>
          )}
          {statusText}
        </StatusText>
        {characterLimit && (
          <HtmlDiv
            className={classnames(textareaClassNames.characterCounter, {
              [textareaClassNames.characterCounterError]:
                charCount > characterLimit,
            })}
          >
            {`${charCount}/${characterLimit}`}
          </HtmlDiv>
        )}
      </HtmlDiv>
    </HtmlDiv>
  );
};

const StyledTextarea = styled(
  ({ theme, ...passProps }: TextareaProps & SuomifiThemeProp) => (
    <BaseTextarea {...passProps} />
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

const Textarea = forwardRef(
  (props: TextareaProps, ref: React.Ref<HTMLTextAreaElement>) => {
    const { id: propId, ...passProps } = props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <AutoId id={propId}>
            {(id) => (
              <StyledTextarea
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

Textarea.displayName = 'Textarea';
export { Textarea };
