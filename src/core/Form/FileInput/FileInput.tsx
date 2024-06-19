import React, {
  forwardRef,
  ReactNode,
  ReactElement,
  useRef,
  useEffect,
  useState,
  ChangeEvent,
  createRef,
} from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { AutoId } from '../../utils/AutoId/AutoId';
import {
  SuomifiThemeProp,
  SuomifiThemeConsumer,
  SpacingConsumer,
} from '../../theme';
import {
  separateMarginProps,
  MarginProps,
  GlobalMargins,
} from '../../theme/utils/spacing';
import { filterDuplicateKeys, forkRefs } from '../../../utils/common/common';
import { InputStatus, StatusTextCommonProps } from '../types';
import { baseStyles } from './FileInput.baseStyles';
import { Label, LabelMode } from '../Label/Label';
import { HtmlDiv, HtmlDivWithRef } from '../../../reset/HtmlDiv/HtmlDiv';
import { getConditionalAriaProp } from '../../../utils/aria';
import { HtmlInput, HtmlInputProps, HtmlLabel } from '../../../reset';
import { HintText } from '../HintText/HintText';
import { StatusText } from '../StatusText/StatusText';
import { FileItem } from './FileItem';

const baseClassName = 'fi-file-input';
export const fileInputClassNames = {
  fullWidth: `${baseClassName}--full-width`,
  inputOuterWrapper: `${baseClassName}_input-outer-wrapper`,
  dragArea: `${baseClassName}_drag-area`,
  dragTextContainer: `${baseClassName}_drag-text-container`,
  singleFileContainer: `${baseClassName}_single-file-container`,
  multiFileContainer: `${baseClassName}_multi-file-container`,
  inputWrapper: `${baseClassName}_input-wrapper`,
  inputElement: `${baseClassName}_input-element`,
  error: `${baseClassName}--error`,
  success: `${baseClassName}--success`,
  labelIsVisible: `${baseClassName}_label--visible`,
  statusTextHasContent: `${baseClassName}_statusText--has-content`,
  hiddenUnderFile: `${baseClassName}_label--hidden-under-file`,
  dragAreaHasFile: `${baseClassName}_drag-area--has-file`,
  fileItemOuterWrapper: `${baseClassName}_file-item-outer-wrapper`,
  fileItem: `${baseClassName}_file-item`,
  fileInfo: `${baseClassName}_file-info`,
  fileName: `${baseClassName}_file-name`,
  fileSize: `${baseClassName}_file-size`,
  removeFileButton: `${baseClassName}_remove-file-button`,
  smallScreen: `${baseClassName}--small-screen`,
  errorIcon: `${baseClassName}_error-icon`,
  loadingIcon: `${baseClassName}_loading-icon`,
  fileItemErrorText: `${baseClassName}_file-item-error-text`,
};

interface BaseFileInputProps
  extends StatusTextCommonProps,
    MarginProps,
    Omit<HtmlInputProps, 'type' | 'onChange' | 'onClick' | 'onBlur' | 'value'> {
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
  /** Text to show in the button which removes a file from the input */
  removeFileText: ReactNode;
  /** Allow preview of files */
  filePreview?: boolean;
  /** Text for assistive technology to be prepended to added file names. E.g. "Added file: " */
  addedFileAriaText: string;
  /** Callback fired on input click */
  onClick?: () => void;
  /** Callback fired on input change */
  onChange?: (value: FileList) => void;
  /** Callback fired on input blur */
  onBlur?: () => void;
  /** Controlled value of the input */
  value?: ControlledFileItem[];
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
  /** Toggles small screen styling */
  smallScreen?: boolean;
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

type MultiFileProps =
  | {
      multiFile?: false;
      multiFileListHeadingText?: string;
    }
  | {
      /** Allow multiple files in the input
       * @default false
       */
      multiFile?: true;
      /** Text to show above the file listing. Required with `multiFile` */
      multiFileListHeadingText: string;
    };

export type FileInputProps = BaseFileInputProps & MultiFileProps;

export interface FileItemRefs {
  id: string;
  fileNameRef: React.RefObject<HTMLAnchorElement | HTMLDivElement>;
  fileSizeElementId: string;
}

export interface ControlledFileItem {
  file: File;
  status?: 'default' | 'error' | 'loading';
  errorText?: string;
  ariaLoadingText?: string;
  buttonText?: string;
  buttonIcon?: ReactElement;
  buttonOnClick?: () => void;
}

type InternalFileInputProps = FileInputProps & {
  globalMargins?: GlobalMargins;
};

const BaseFileInput = (props: InternalFileInputProps) => {
  const {
    className,
    labelText,
    labelMode,
    inputButtonText,
    dragAreaText,
    removeFileText,
    multiFile = false,
    multiFileListHeadingText,
    filePreview = false,
    addedFileAriaText,
    onChange: propOnChange,
    onBlur: propOnBlur,
    value: controlledValue,
    smallScreen = false,
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
    globalMargins,
    ...rest
  } = props;
  const [_marginProps, passProps] = separateMarginProps(rest);

  const dragAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const buildFileItemRefs = (fileList: FileList) => {
    const newFileItemRefs = [];
    for (let index = 0; index < fileList.length; index += 1) {
      const file = fileList[index];
      const fnRef = filePreview
        ? createRef<HTMLAnchorElement>()
        : createRef<HTMLDivElement>();
      newFileItemRefs.push({
        id: `${id}-${file.name.replace(/\s/g, '')}`,
        fileNameRef: fnRef,
        fileSizeElementId: `${id}-${file.name.replace(/\s/g, '')}-fileSize`,
      });
    }
    return newFileItemRefs;
  };

  const buildFileListFromControlledValueObjects = (
    controlledValueObjects: ControlledFileItem[],
  ) => {
    const newFileList = new DataTransfer();
    controlledValueObjects.forEach((fileItem) => {
      newFileList.items.add(fileItem.file);
    });
    return newFileList.files;
  };

  const [files, setFiles] = useState<FileList | null>(
    controlledValue
      ? buildFileListFromControlledValueObjects(controlledValue)
      : null,
  );
  const [fileItemRefs, setFileItemRefs] = useState<FileItemRefs[]>(
    controlledValue
      ? buildFileItemRefs(
          buildFileListFromControlledValueObjects(controlledValue),
        )
      : [],
  );
  const [mockInputWrapperFocus, setMockInputWrapperFocus] = useState(false);

  const labelId = `${id}-label`;
  const hintTextId = `${id}-hintText`;
  const statusTextId = `${id}-statusText`;
  const multiFileListHeadingId = `${id}-multiFileListHeading`;

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
    if (!controlledValue && filesFromInput && inputRef.current?.files) {
      addNewFiles(filesFromInput, true);
    }
    if (propOnChange) {
      propOnChange(filesFromInput || new FileList());
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

  // Manage controlled input state
  useEffect(() => {
    if (inputRef.current && controlledValue !== undefined) {
      const controlledValueAsArray = Array.from(
        buildFileListFromControlledValueObjects(controlledValue) || [],
      );
      const dataTransfer = new DataTransfer();
      controlledValueAsArray.forEach((file) => dataTransfer.items.add(file));
      setFiles(dataTransfer.files);
      setFileItemRefs(buildFileItemRefs(dataTransfer.files));
      inputRef.current.files = dataTransfer.files;
      if (
        !multiFile &&
        document.activeElement === inputRef.current &&
        dataTransfer.files.length > 0
      ) {
        setMockInputWrapperFocus(dataTransfer.files.length > 0);
      }
    }
  }, [controlledValue]);

  const addNewFiles = (
    filesToAdd: FileList,
    setInputFileListProgrammatically = false,
  ) => {
    if (multiFile && files) {
      const previousAndNewFiles = Array.from(files).concat(
        Array.from(filesToAdd || []),
      );
      const newFileList = new DataTransfer();
      previousAndNewFiles.forEach((file) => {
        newFileList.items.add(file);
      });
      const newFileItemRefs = buildFileItemRefs(newFileList.files);
      setFileItemRefs(newFileItemRefs);
      setFiles(newFileList.files);
      if (setInputFileListProgrammatically && inputRef.current?.files) {
        inputRef.current.files = newFileList.files;
      }
    } else {
      const newFileItemRefs = buildFileItemRefs(filesToAdd || new FileList());
      setFileItemRefs(newFileItemRefs);
      setFiles(filesToAdd || new FileList());
      if (filePreview) {
        setTimeout(() => {
          newFileItemRefs[0].fileNameRef.current?.focus();
        }, 100);
      }
      if (setInputFileListProgrammatically && inputRef.current?.files) {
        inputRef.current.files = filesToAdd;
      }
    }

    if (!multiFile) {
      setMockInputWrapperFocus(filesToAdd.length > 0);
    }
  };

  const removeFile = (file: File) => {
    const initialFilesArray = Array.from(files || []);
    const indexOfRemovedFile = initialFilesArray.indexOf(file);
    const modifiedFilesArray = [...initialFilesArray];
    modifiedFilesArray.splice(indexOfRemovedFile, 1);
    // Create a new FileList excluding the removed file
    const newFileList = new DataTransfer();
    modifiedFilesArray.forEach((f) => {
      newFileList.items.add(f);
    });

    // Handle focus
    // If there is only one file, set focus to the input element
    if (!multiFile || initialFilesArray.length === 1) {
      inputRef.current?.focus();
    } // In multi file mode, if the removed file was the first item, set focus to the next one
    else if (indexOfRemovedFile === 0) {
      fileItemRefs[indexOfRemovedFile + 1].fileNameRef.current?.focus();
      // Else set focus to the previous file
    } else {
      fileItemRefs[indexOfRemovedFile - 1].fileNameRef.current?.focus();
    }

    if (propOnChange) {
      propOnChange(newFileList.files);
    }
    if (controlledValue === undefined) {
      if (inputRef.current) {
        inputRef.current.files = newFileList.files;
      }
      setFiles(newFileList.files);

      // Remove file item refs object
      const newFileItemRefs = [...fileItemRefs];
      newFileItemRefs.splice(indexOfRemovedFile, 1);
      setFileItemRefs(newFileItemRefs);
    }

    if (!multiFile) {
      setMockInputWrapperFocus(false);
    }
  };

  return (
    <HtmlDiv
      className={classnames(baseClassName, className, {
        [fileInputClassNames.error]: status === 'error',
        [fileInputClassNames.success]: status === 'success',
        [fileInputClassNames.fullWidth]: fullWidth,
        [fileInputClassNames.smallScreen]: smallScreen,
      })}
      style={style}
    >
      <Label
        id={labelId}
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
      <HtmlDiv
        className={classnames(fileInputClassNames.inputOuterWrapper, {
          'appears-focused': mockInputWrapperFocus,
        })}
      >
        <HtmlDivWithRef
          className={classnames(fileInputClassNames.dragArea, {
            [fileInputClassNames.dragAreaHasFile]:
              !multiFile && files && files.length > 0,
          })}
          forwardedRef={dragAreaRef}
        >
          <HtmlDiv className={fileInputClassNames.inputWrapper}>
            <HtmlInput
              id={id}
              className={classnames(fileInputClassNames.inputElement, {
                [fileInputClassNames.hiddenUnderFile]:
                  !multiFile && files && files.length > 0,
              })}
              type="file"
              multiple={multiFile}
              forwardedRef={forkRefs(inputRef, definedRef)}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                if (propOnChange && event.target.files) {
                  propOnChange(event.target.files);
                }
                if (controlledValue === undefined) {
                  addNewFiles(event.target.files || new FileList());
                } else if (inputRef.current) {
                  const controlledValueAsArray = Array.from(
                    buildFileListFromControlledValueObjects(controlledValue) ||
                      [],
                  );
                  const dataTransfer = new DataTransfer();
                  controlledValueAsArray.forEach((file) =>
                    dataTransfer.items.add(file),
                  );
                  inputRef.current.files = dataTransfer.files;
                }
              }}
              onFocus={() => {
                if (!multiFile && files && files.length === 1) {
                  setMockInputWrapperFocus(true);
                }
              }}
              onBlur={() => {
                if (!multiFile && files && files.length === 1) {
                  setMockInputWrapperFocus(false);
                }
                if (propOnBlur) {
                  propOnBlur();
                }
              }}
              aria-invalid={status === 'error'}
              aria-labelledby={labelId}
              {...getConditionalAriaProp('aria-describedby', [
                statusText ? statusTextId : undefined,
                hintText ? hintTextId : undefined,
                ariaDescribedBy,
              ])}
              {...passProps}
            />
            <HtmlLabel htmlFor={id}>{inputButtonText}</HtmlLabel>
            <HtmlDiv className={fileInputClassNames.dragTextContainer}>
              {dragAreaText}
            </HtmlDiv>
          </HtmlDiv>
          {!multiFile && files && files.length === 1 && (
            <HtmlDiv className={fileInputClassNames.singleFileContainer}>
              <FileItem
                file={files[0]}
                filePreview={filePreview}
                multiFile={multiFile}
                fileItemRefs={fileItemRefs[0]}
                addedFileAriaText={addedFileAriaText}
                removeFileText={removeFileText}
                removeFile={removeFile}
                smallScreen={smallScreen}
                metaData={controlledValue && controlledValue[0]}
              />
            </HtmlDiv>
          )}
        </HtmlDivWithRef>
      </HtmlDiv>
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
      {multiFile && files && files.length > 0 && (
        <HtmlDiv className={fileInputClassNames.multiFileContainer}>
          <Label mb="xxs" id={multiFileListHeadingId}>
            {`${multiFileListHeadingText} (${files.length})`}
          </Label>
          {files.length === fileItemRefs.length && (
            <HtmlDiv role="list">
              {Array.from(files).map((file, index) => (
                <FileItem
                  key={file.name}
                  file={file}
                  filePreview={filePreview}
                  multiFile={multiFile}
                  fileItemRefs={fileItemRefs[index]}
                  addedFileAriaText={addedFileAriaText}
                  removeFileText={removeFileText}
                  removeFile={removeFile}
                  smallScreen={smallScreen}
                  metaData={controlledValue && controlledValue[index]}
                />
              ))}
            </HtmlDiv>
          )}
        </HtmlDiv>
      )}
    </HtmlDiv>
  );
};

const StyledFileInput = styled(
  ({
    theme,
    ...passProps
  }: FileInputProps & SuomifiThemeProp & { globalMargins: GlobalMargins }) => (
    <BaseFileInput {...passProps} />
  ),
)`
  ${({ theme, globalMargins, ...rest }) => {
    const [marginProps, _passProps] = separateMarginProps(rest);
    const cleanedGlobalMargins = filterDuplicateKeys(
      globalMargins.fileInput,
      marginProps,
    );
    return baseStyles(theme, cleanedGlobalMargins, marginProps);
  }}
`;

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (props: FileInputProps, ref: React.Ref<HTMLInputElement>) => {
    const { id: propId, ...passProps } = props;
    return (
      <SpacingConsumer>
        {({ margins }) => (
          <SuomifiThemeConsumer>
            {({ suomifiTheme }) => (
              <AutoId id={propId}>
                {(id) => (
                  <StyledFileInput
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

FileInput.displayName = 'FileInput';
export { FileInput };
