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
import { styled } from 'styled-components';
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
  GlobalMarginProps,
} from '../../theme/utils/spacing';
import { filterDuplicateKeys, forkRefs } from '../../../utils/common/common';
import { InputStatus, StatusTextCommonProps } from '../types';
import { baseStyles } from './FileInput.baseStyles';
import { Label, LabelMode } from '../Label/Label';
import { HtmlDiv, HtmlDivWithRef } from '../../../reset/HtmlDiv/HtmlDiv';
import { getConditionalAriaProp } from '../../../utils/aria';
import {
  HtmlFieldSet,
  HtmlInput,
  HtmlInputProps,
  HtmlLabel,
  HtmlLegend,
} from '../../../reset';
import { HintText } from '../HintText/HintText';
import { StatusText } from '../StatusText/StatusText';
import { FileItem } from './FileItem';

const baseClassName = 'fi-file-input';
const fileInputClassNames = {
  fullWidth: `${baseClassName}--full-width`,
  inputOuterWrapper: `${baseClassName}_input-outer-wrapper`,
  dragArea: `${baseClassName}_drag-area`,
  dragTextContainer: `${baseClassName}_drag-text-container`,
  singleFileContainer: `${baseClassName}_single-file-container`,
  multiFileContainer: `${baseClassName}_multi-file-container`,
  inputWrapper: `${baseClassName}_input-wrapper`,
  inputWrapperHidden: `${baseClassName}_input-wrapper--hidden`,
  inputLabel: `${baseClassName}_input-label`,
  inputElement: `${baseClassName}_input-element`,
  error: `${baseClassName}--error`,
  success: `${baseClassName}--success`,
  labelIsVisible: `${baseClassName}_label--visible`,
  statusTextHasContent: `${baseClassName}_statusText--has-content`,
  hiddenUnderFile: `${baseClassName}_label--hidden-under-file`,
  dragAreaHasFile: `${baseClassName}_drag-area--has-file`,
  smallScreen: `${baseClassName}--small-screen`,
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
  removeButtonRef: React.RefObject<HTMLButtonElement>;
}

export interface ControlledFileItem {
  /**
   * The actual file object.
   */
  file?: File;
  /**
   * Additional metadata for the file.
   */
  metadata?: Metadata;
  /**
   * Status of the element. Affects styling.
   */
  status?: 'default' | 'error' | 'loading';
  /**
   * Red text to display under the file item.
   */
  errorText?: string;
  /**
   * Additional text for screen readers when using loading status. E.g "Loading".
   */
  ariaLoadingText?: string;
  /**
   * Override default remove button text. Also used as aria-label for the button as thus: `${buttonText} ${file.name}`.
   */
  buttonText?: string;
  /**
   * Override default remove button icon.
   */
  buttonIcon?: ReactElement;
  /**
   * Override default remove button behavior.
   */
  buttonOnClick?: () => void;
}

type Metadata = {
  /**
   * The size of the file in bytes.
   */
  fileSize: number;
  /**
   * The name of the file.
   */
  fileName: string;
  /**
   * The type of the file
   */
  fileType: string;
  /**
   * URL to the file
   */
  fileURL?: string;
  /**
   * id of the file
   */
  id?: string;
  /**
   * Callback for when file preview link is clicked
   */
  filePreviewCallBack?: () => void;
};

type InternalFileInputProps = FileInputProps & GlobalMarginProps;

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
      const removeButtonRef = createRef<HTMLButtonElement>();
      newFileItemRefs.push({
        id: `${id}-${file.name.replace(/\s/g, '')}`,
        fileNameRef: fnRef,
        fileSizeElementId: `${id}-${file.name.replace(/\s/g, '')}-fileSize`,
        removeButtonRef,
      });
    }
    return newFileItemRefs;
  };

  const buildFileListFromControlledValueObjects = (
    controlledValueObjects: ControlledFileItem[],
  ) => {
    const newFileList = new DataTransfer();
    controlledValueObjects.forEach((fileItem) => {
      if (fileItem.file) {
        newFileList.items.add(fileItem.file);
      } else if (fileItem.metadata) {
        // Create a new mock file from metadata
        const { fileName, fileType } = fileItem.metadata;
        const blob = new Blob([], { type: fileType });
        const file = new File([blob], fileName, {
          type: fileType,
          lastModified: Date.now(),
        });
        newFileList.items.add(file);
      }
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

  const labelId = `${id}-label`;
  const hintTextId = `${id}-hintText`;
  const statusTextId = `${id}-statusText`;
  const multiFileListHeadingId = `${id}-multiFileListHeading`;

  // Remove the possibility to have undefined forwardedRef as a parameter for forkRefs
  const definedRef = forwardedRef || null;

  const generalDragEventHandler = (
    e: DragEvent,
    highLight: 'add' | 'remove',
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (highLight === 'add') {
      dragAreaRef.current?.classList.add('highlight');
    } else {
      dragAreaRef.current?.classList.remove('highlight');
    }
  };

  const dragEnterEventHandler = (e: DragEvent) => {
    generalDragEventHandler(e, 'add');
  };
  const dragOverEventHandler = (e: DragEvent) => {
    generalDragEventHandler(e, 'add');
  };
  const dragLeaveEventHandler = (e: DragEvent) => {
    generalDragEventHandler(e, 'remove');
  };
  const dropEventHandler = (e: DragEvent) => {
    generalDragEventHandler(e, 'remove');
    const dt = e.dataTransfer;
    const filesFromInput = dt?.files;
    const previousAndNewFiles = Array.from(
      inputRef.current?.files || [],
    ).concat(Array.from(filesFromInput || []));
    const newFileList = new DataTransfer();
    previousAndNewFiles.forEach((file) => {
      newFileList.items.add(file);
    });
    if (!controlledValue && filesFromInput) {
      setFilesToStateAndInput(newFileList.files);
    }
    if (propOnChange) {
      propOnChange(newFileList.files || new FileList());
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
      const newFileItemRefs = buildFileItemRefs(dataTransfer.files);
      setFileItemRefs(newFileItemRefs);
      inputRef.current.files = dataTransfer.files;
      if (
        !multiFile &&
        document.activeElement === inputRef.current &&
        dataTransfer.files.length > 0 &&
        !filePreview
      ) {
        setTimeout(() => {
          newFileItemRefs[0].removeButtonRef.current?.focus();
        }, 100);
      }
    }
  }, [controlledValue]);

  const setFilesToStateAndInput = (filesToAdd: FileList) => {
    const newFileItemRefs = buildFileItemRefs(filesToAdd || new FileList());
    setFileItemRefs(newFileItemRefs);
    setFiles(filesToAdd || new FileList());
    if (inputRef.current) {
      inputRef.current.files = filesToAdd;
    }
    if (!multiFile && filePreview) {
      setTimeout(() => {
        newFileItemRefs[0].fileNameRef.current?.focus();
      }, 100);
    }

    if (!multiFile && !filePreview) {
      setTimeout(() => {
        newFileItemRefs[0].removeButtonRef.current?.focus();
      }, 100);
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
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
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
    if (!controlledValue) {
      if (inputRef.current) {
        inputRef.current.files = newFileList.files;
      }
      setFiles(newFileList.files);

      // Remove file item refs object
      const newFileItemRefs = [...fileItemRefs];
      newFileItemRefs.splice(indexOfRemovedFile, 1);
      setFileItemRefs(newFileItemRefs);
    }
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newFileList = new DataTransfer();
    const filesFromEvent = event.target.files;
    if (!controlledValue) {
      if (multiFile) {
        const previousAndNewFiles = Array.from(files || []).concat(
          Array.from(filesFromEvent || []),
        );
        previousAndNewFiles.forEach((file) => {
          newFileList.items.add(file);
        });
      } else {
        const filesFromEventArr = Array.from(filesFromEvent || []);
        filesFromEventArr.forEach((file) => {
          newFileList.items.add(file);
        });
      }
      setFilesToStateAndInput(newFileList.files);
    } else if (inputRef.current) {
      const controlledValueAsArray = Array.from(
        buildFileListFromControlledValueObjects(controlledValue) || [],
      );
      const controlledFileList = new DataTransfer();
      controlledValueAsArray.forEach((file) => {
        controlledFileList.items.add(file);
        newFileList.items.add(file);
      });
      inputRef.current.files = controlledFileList.files;
      const filesFromEventArr = Array.from(filesFromEvent || []);
      filesFromEventArr.forEach((file) => {
        newFileList.items.add(file);
      });
    }
    if (propOnChange) {
      propOnChange(newFileList.files);
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
      <HtmlFieldSet>
        <HtmlLegend>
          <Label
            id={labelId}
            labelMode={labelMode}
            optionalText={optionalText}
            className={classnames({
              [fileInputClassNames.labelIsVisible]: labelMode !== 'hidden',
            })}
            tooltipComponent={tooltipComponent}
            onClick={() => inputRef.current?.focus()}
            asProp="span"
          >
            {labelText}
          </Label>
        </HtmlLegend>
        <HintText id={hintTextId}>{hintText}</HintText>
        <HtmlDiv className={classnames(fileInputClassNames.inputOuterWrapper)}>
          <HtmlDivWithRef
            className={classnames(fileInputClassNames.dragArea, {
              [fileInputClassNames.dragAreaHasFile]:
                !multiFile && files && files.length > 0,
            })}
            forwardedRef={dragAreaRef}
          >
            <HtmlDiv
              className={classnames(fileInputClassNames.inputWrapper, {
                [fileInputClassNames.inputWrapperHidden]:
                  !multiFile && files && files.length > 0,
              })}
            >
              <HtmlInput
                id={id}
                className={classnames(fileInputClassNames.inputElement, {
                  [fileInputClassNames.hiddenUnderFile]:
                    !multiFile && files && files.length > 0,
                })}
                type="file"
                multiple={multiFile}
                forwardedRef={forkRefs(inputRef, definedRef)}
                onChange={handleOnChange}
                onBlur={() => {
                  if (propOnBlur) {
                    propOnBlur();
                  }
                }}
                aria-invalid={status === 'error'}
                {...getConditionalAriaProp('aria-describedby', [
                  statusText ? statusTextId : undefined,
                  hintText ? hintTextId : undefined,
                  ariaDescribedBy,
                ])}
                tabIndex={!multiFile && files && files.length > 0 ? -1 : 0}
                {...passProps}
              />
              <HtmlLabel
                htmlFor={id}
                className={fileInputClassNames.inputLabel}
              >
                {inputButtonText}
              </HtmlLabel>
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
                  fileItemDetails={controlledValue && controlledValue[0]}
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
      </HtmlFieldSet>
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
                  fileItemDetails={controlledValue && controlledValue[index]}
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
