import React, {
  forwardRef,
  ReactNode,
  ReactElement,
  useRef,
  useEffect,
  useState,
  ChangeEvent,
} from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { AutoId } from '../../utils/AutoId/AutoId';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import {
  spacingStyles,
  separateMarginProps,
  MarginProps,
} from '../../theme/utils/spacing';
import { forkRefs } from '../../../utils/common/common';
import { InputStatus, StatusTextCommonProps } from '../types';
import { baseStyles } from './FileInput.baseStyles';
import { Label, LabelMode } from '../Label/Label';
import { HtmlDiv, HtmlDivWithRef } from '../../../reset/HtmlDiv/HtmlDiv';
import { getConditionalAriaProp } from '../../../utils/aria';
import { HtmlInput, HtmlInputProps, HtmlLabel } from '../../../reset';
import { HintText } from '../HintText/HintText';
import { StatusText } from '../StatusText/StatusText';
import { FileInputFileList } from './FileInputFileList/FileInputFileList';

const baseClassName = 'fi-file-input';
const fileInputClassNames = {
  fullWidth: `${baseClassName}--full-width`,
  inputOuterWrapper: `${baseClassName}_input-outer-wrapper`,
  dragArea: `${baseClassName}_drag-area`,
  dragTextContainer: `${baseClassName}_drag-text-container`,
  singleFileContainer: `${baseClassName}_single-file-container`,
  inputWrapper: `${baseClassName}_input-wrapper`,
  inputElement: `${baseClassName}_input-element`,
  error: `${baseClassName}--error`,
  success: `${baseClassName}--success`,
  labelIsVisible: `${baseClassName}_label--visible`,
  statusTextHasContent: `${baseClassName}_statusText--has-content`,
};

export interface FileInputProps
  extends StatusTextCommonProps,
    MarginProps,
    Omit<HtmlInputProps, 'type' | 'onChange' | 'onClick' | 'onBlur'> {
  /** CSS class for custom styles */
  className?: string;
  /** Label for the input */
  labelText: ReactNode;
  /** Hides or shows the label. Label element is always present, but can be visually hidden.
   * @default visible
   */
  labelMode?: LabelMode;
  /** Text to show in the file selection button. Example: "Choose file" */
  inputButtonText: ReactNode;
  /** Text to show inside the file drag area */
  dragAreaText: ReactNode;
  /** Allow multiple files to the input. When true, renders a separate list of files below the input
   * @default false
   */
  multiFile?: boolean;
  /** Callback fired on input click */
  onClick?: () => void;
  /** Callback fired on input change */
  onChange?: (value: FileList) => void;
  /** Callback fired on input blur */
  onBlur?: (event: FocusEvent) => void;
  /** Hint text to be shown below the component's label. Should be used to give file format instructions */
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
   * HTML id attribute.
   * If no id is specified, one will be generated automatically
   */
  id?: string;
  /** HTML name attribute for the input */
  name?: string;
  /**
   * aria-describedby for the HTML input element,
   */
  'aria-describedby'?: string;
  /** Sets component's width to 100% of its parent */
  fullWidth?: boolean;
  /** Text to mark the field optional. Will be wrapped in parentheses and shown after `labelText` */
  optionalText?: string;
  /** Inline CSS styles for the component's outer layer */
  style?: React.CSSProperties;
  /** Tooltip component for the input's label */
  tooltipComponent?: ReactElement;
}

const BaseFileInput = (props: FileInputProps) => {
  const {
    className,
    labelText,
    labelMode,
    inputButtonText,
    dragAreaText,
    multiFile = false,
    onChange: propOnChange,
    style,
    optionalText,
    status,
    statusText,
    hintText,
    id,
    fullWidth,
    forwardedRef,
    statusTextAriaLiveMode = 'assertive',
    'aria-describedby': ariaDescribedBy,
    tooltipComponent,
    ...rest
  } = props;
  const [marginProps, passProps] = separateMarginProps(rest);
  const marginStyle = spacingStyles(marginProps);

  const dragAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<FileList | null>(null);

  const hintTextId = `${id}-hintText`;
  const statusTextId = `${id}-statusText`;

  // Remove the possibility to have undefined forwardedRef as a parameter for forkRefs
  const definedRef = forwardedRef || null;

  const dragEnterEventHandler = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragAreaRef.current?.classList.add('highlight');
  };
  const dragOverEventHandler = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragAreaRef.current?.classList.add('highlight');
  };
  const dragLeaveEventHandler = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragAreaRef.current?.classList.remove('highlight');
  };
  const dropEventHandler = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragAreaRef.current?.classList.remove('highlight');
    const dt = e.dataTransfer;
    const filesFromInput = dt?.files;
    if (filesFromInput && inputRef.current?.files) {
      inputRef.current.files = filesFromInput;
    }
  };

  // Initialise and remove drag & drop event handlers
  useEffect(() => {
    dragAreaRef.current?.addEventListener(
      'dragenter',
      dragEnterEventHandler,
      false,
    );
    dragAreaRef.current?.addEventListener(
      'dragover',
      dragOverEventHandler,
      false,
    );
    dragAreaRef.current?.addEventListener(
      'dragleave',
      dragLeaveEventHandler,
      false,
    );
    dragAreaRef.current?.addEventListener('drop', dropEventHandler, false);
    return () => {
      dragAreaRef.current?.removeEventListener(
        'dragenter',
        dragEnterEventHandler,
      );
      dragAreaRef.current?.removeEventListener(
        'dragover',
        dragOverEventHandler,
      );
      dragAreaRef.current?.removeEventListener(
        'dragleave',
        dragLeaveEventHandler,
      );
      dragAreaRef.current?.removeEventListener('drop', dropEventHandler);
    };
  }, []);

  return (
    <HtmlDiv
      className={classnames(baseClassName, className, {
        [fileInputClassNames.error]: status === 'error',
        [fileInputClassNames.success]: status === 'success',
        [fileInputClassNames.fullWidth]: fullWidth,
      })}
      style={{ ...marginStyle, ...style }}
      {...passProps}
    >
      <Label
        labelMode={labelMode}
        optionalText={optionalText}
        className={classnames({
          [fileInputClassNames.labelIsVisible]: labelMode !== 'hidden',
        })}
        tooltipComponent={tooltipComponent}
        onClick={() => inputRef.current?.focus()}
      >
        {labelText}
      </Label>
      <HintText id={hintTextId}>{hintText}</HintText>
      <HtmlDiv className={fileInputClassNames.inputOuterWrapper}>
        <HtmlDivWithRef
          className={fileInputClassNames.dragArea}
          forwardedRef={dragAreaRef}
        >
          <HtmlDiv className={fileInputClassNames.inputWrapper}>
            <HtmlInput
              id={id}
              className={fileInputClassNames.inputElement}
              type="file"
              forwardedRef={forkRefs(inputRef, definedRef)}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                if (propOnChange && event.target.files) {
                  propOnChange(event.target.files);
                }
                setFiles(event.target.files);
              }}
              {...getConditionalAriaProp('aria-describedby', [
                statusText ? statusTextId : undefined,
                hintText ? hintTextId : undefined,
                ariaDescribedBy,
              ])}
            />
            <HtmlLabel htmlFor={id}>{inputButtonText}</HtmlLabel>
            <HtmlDiv className={fileInputClassNames.dragTextContainer}>
              {dragAreaText}
            </HtmlDiv>
          </HtmlDiv>
          {!multiFile &&
            inputRef.current?.files &&
            inputRef.current?.files.length > 0 && (
              <HtmlDiv className={fileInputClassNames.singleFileContainer}>
                <pre>Hassusjee</pre>
              </HtmlDiv>
            )}
        </HtmlDivWithRef>
        <StatusText
          id={statusTextId}
          className={classnames({
            [fileInputClassNames.statusTextHasContent]: !!statusText,
          })}
          status={status}
          ariaLiveMode={statusTextAriaLiveMode}
        >
          {statusText}
        </StatusText>
      </HtmlDiv>
      {multiFile && files && <FileInputFileList files={files} />}
    </HtmlDiv>
  );
};

const StyledFileInput = styled(
  ({ theme, ...passProps }: FileInputProps & SuomifiThemeProp) => (
    <BaseFileInput {...passProps} />
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (props: FileInputProps, ref: React.Ref<HTMLInputElement>) => {
    const { id: propId, ...passProps } = props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <AutoId id={propId}>
            {(id) => (
              <StyledFileInput
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

FileInput.displayName = 'FileInput';
export { FileInput };
