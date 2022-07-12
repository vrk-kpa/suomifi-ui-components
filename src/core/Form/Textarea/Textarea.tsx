import React, { Component, ChangeEvent, FocusEvent, forwardRef } from 'react';
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
import { Label } from '../Label/Label';
import { HintText } from '../HintText/HintText';
import { StatusText } from '../StatusText/StatusText';
import { InputStatus, StatusTextCommonProps } from '../types';
import { baseStyles } from './Textarea.baseStyles';

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
};

type TextareaStatus = Exclude<InputStatus, 'success'>;

interface InternalTextareaProps
  extends StatusTextCommonProps,
    Omit<HtmlTextareaProps, 'placeholder'> {
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
  labelText: string;
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
}

interface InnerRef {
  forwardedRef: React.RefObject<HTMLTextAreaElement>;
}

export interface TextareaProps extends InternalTextareaProps {
  /** Ref object to be passed to the textarea element */
  ref?: React.RefObject<HTMLTextAreaElement>;
}

class BaseTextarea extends Component<TextareaProps & InnerRef> {
  render() {
    const {
      id,
      className,
      disabled = false,
      children,
      onClick,
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
      ...passProps
    } = this.props;

    const onClickProps = !!disabled ? {} : { onMouseDown: onClick };
    const statusTextId = statusText ? `${id}-statusText` : undefined;
    const hintTextId = hintText ? `${id}-hintText` : undefined;

    return (
      <HtmlDiv
        {...containerProps}
        className={classnames(baseClassName, className, {
          [textareaClassNames.disabled]: !!disabled,
          [textareaClassNames.error]: status === 'error' && !disabled,
          [textareaClassNames.fullWidth]: fullWidth,
        })}
      >
        <Label htmlFor={id} labelMode={labelMode} optionalText={optionalText}>
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
            forwardedRef={forwardedRef}
            placeholder={visualPlaceholder}
            aria-invalid={status === 'error'}
            {...getConditionalAriaProp('aria-describedby', [
              statusTextId,
              hintTextId,
              ariaDescribedBy,
            ])}
            {...passProps}
            {...onClickProps}
          />
        </HtmlDiv>
        <StatusText
          id={statusTextId}
          className={classnames({
            [textareaClassNames.statusTextHasContent]: !!statusText,
          })}
          status={status}
          disabled={disabled}
          ariaLiveMode={statusTextAriaLiveMode}
        >
          {statusText}
        </StatusText>
      </HtmlDiv>
    );
  }
}

const StyledTextarea = styled(
  ({
    theme,
    ...passProps
  }: InternalTextareaProps & InnerRef & SuomifiThemeProp) => (
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
