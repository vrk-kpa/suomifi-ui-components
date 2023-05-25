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
  characterCounterNonError: `${baseClassName}_characterCounter--non-error`,
};

type TextareaStatus = Exclude<InputStatus, 'success'>;

export interface TextareaProps
  extends StatusTextCommonProps,
    Omit<HtmlTextareaProps, 'placeholder' | 'forwardedRef'> {
  /** Custom classname to extend or customize */
  className?: string;
  /** Disable usage */
  disabled?: boolean;
  /** Event handler to execute when clicked */
  onClick?: () => void;
  /** To execute on textarea text change */
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  /** To execute on textarea text onBlur */
  onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  /** Label */
  labelText: ReactNode;
  /** Hide or show label. Label element is always present, but can be visually hidden.
   * @default visible
   */
  labelMode?: 'hidden' | 'visible';
  /** Placeholder text for input. Use only as visual aid, not for instructions. */
  visualPlaceholder?: string;
  /** Text content for textarea */
  children?: string;
  /** Hint text to be shown below the component */
  hintText?: string;
  /**
   * 'default' | 'error'
   * @default default
   */
  status?: TextareaStatus;
  /** Resize mode of the textarea
      'both' | 'vertical' | 'horizontal' | 'none'
      @default 'vertical' 
   */
  resize?: 'both' | 'vertical' | 'horizontal' | 'none';
  /** Optional text that is shown after labelText. Will be wrapped in parentheses. */
  optionalText?: string;
  /**
   * Unique id
   * If no id is specified, one will be generated automatically
   */
  id?: string;
  /** Input name */
  name?: string;
  /** Set components width to 100% */
  fullWidth?: boolean;
  /** Textarea container div props */
  containerProps?: Omit<HtmlDivProps, 'className'>;
  /** Tooltip component for the input's label */
  tooltipComponent?: ReactElement;
  maxLength?: number;
  ariaCharactersRemainingText?: (amount: number) => string;
  ariaCharactersExceededText?: (amount: number) => string;
  /** Ref is passed to the textarea element. Alternative for React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLTextAreaElement>;
}

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
    maxLength,
    ariaCharactersRemainingText,
    ariaCharactersExceededText,
    ...passProps
  } = props;

  const [charCount, setCharCount] = useState(0);
  const [characterLimitExceeded, setCharacterLimitExceeded] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const onClickProps = !!disabled ? {} : { onMouseDown: onClick };
  const statusTextId = statusText ? `${id}-statusText` : undefined;
  const hintTextId = hintText ? `${id}-hintText` : undefined;
  const characterCounterScreenReaderTextId = maxLength
    ? `${id}-characterCounter`
    : undefined;

  useEffect(() => {
    if (maxLength !== undefined && inputRef.current?.value.length) {
      setCharCount(inputRef.current?.value.length);
    }
  }, []);

  const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (maxLength !== undefined) {
      const charCountInInput = event.target.value.length;
      setCharCount(charCountInInput);
      if (charCountInInput > maxLength) {
        setCharacterLimitExceeded(true);
      } else if (characterLimitExceeded) {
        setCharacterLimitExceeded(false);
      }
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
        [textareaClassNames.error]:
          (characterLimitExceeded || status === 'error') && !disabled,
        [textareaClassNames.fullWidth]: fullWidth,
      })}
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
          aria-invalid={characterLimitExceeded || status === 'error'}
          {...getConditionalAriaProp('aria-describedby', [
            statusTextId,
            hintTextId,
            ariaDescribedBy,
            characterCounterScreenReaderTextId,
          ])}
          onChange={handleOnChange}
          {...passProps}
          {...onClickProps}
        />
      </HtmlDiv>
      <HtmlDiv style={{ display: 'flex', justifyContent: 'space-between' }}>
        <StatusText
          id={statusTextId}
          className={classnames({
            [textareaClassNames.statusTextHasContent]: !!statusText,
          })}
          status={characterLimitExceeded ? 'error' : status}
          disabled={disabled}
          ariaLiveMode={statusTextAriaLiveMode}
        >
          {characterLimitExceeded
            ? 'Description must be 30 characters or less'
            : statusText}
        </StatusText>
        {maxLength &&
          ariaCharactersRemainingText &&
          ariaCharactersExceededText && (
            <>
              <StatusText
                className={classnames({
                  [textareaClassNames.characterCounterNonError]:
                    charCount <= maxLength,
                  [textareaClassNames.statusTextHasContent]: !!maxLength,
                })}
                status={charCount <= maxLength ? 'default' : 'error'}
                ariaLiveMode="off"
              >
                {`${charCount}/${maxLength}`}
              </StatusText>
              <VisuallyHidden
                aria-live="polite"
                aria-atomic="true"
                id={characterCounterScreenReaderTextId}
              >
                {charCount <= maxLength
                  ? ariaCharactersRemainingText(maxLength - charCount)
                  : ariaCharactersExceededText(charCount - maxLength)}
              </VisuallyHidden>
            </>
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
