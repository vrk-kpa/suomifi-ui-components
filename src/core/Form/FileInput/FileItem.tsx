import React, { ReactNode } from 'react';
import { ControlledFileItem, FileItemRefs } from './FileInput';
import { Button } from '../../Button/Button';
import { HtmlDiv, HtmlDivWithRef } from '../../../reset/HtmlDiv/HtmlDiv';
import {
  IconErrorFilled,
  IconGenericFile,
  IconPreloader,
  IconRemove,
} from 'suomifi-icons';
import { Link } from '../../Link/Link/Link';
import { styled } from 'styled-components';
import { SuomifiThemeConsumer, SuomifiThemeProp } from '../../theme';
import { baseStyles } from './FileInput.baseStyles';
import classnames from 'classnames';

interface FileItemProps {
  file?: File;
  filePreview: boolean;
  multiFile: boolean;
  fileItemRefs: FileItemRefs;
  addedFileAriaText: string;
  removeFileText: ReactNode;
  removeFile: (file: any) => void;
  smallScreen: boolean;
  fileItemProps?: ControlledFileItem;
}

const baseClassName = 'fi-file-input';
const fileItemClassNames = {
  fileItemOuterWrapper: `${baseClassName}_file-item-outer-wrapper`,
  fileItem: `${baseClassName}_file-item`,
  fileInfo: `${baseClassName}_file-info`,
  fileName: `${baseClassName}_file-name`,
  fileSize: `${baseClassName}_file-size`,
  removeFileButton: `${baseClassName}_remove-file-button`,
  errorIcon: `${baseClassName}_error-icon`,
  loadingIcon: `${baseClassName}_loading-icon`,
  fileItemErrorText: `${baseClassName}_file-item-error-text`,
};

const BaseFileItem = (props: FileItemProps) => {
  const {
    file,
    filePreview,
    multiFile,
    fileItemRefs,
    addedFileAriaText,
    removeFileText,
    removeFile,
    smallScreen,
    fileItemProps,
  } = props;

  const {
    fileSize: metaDataFileName,
    fileSize: metaDataFileSize,
    fileURL: metadataFileURL,
  } = fileItemProps?.metadata || {};

  console.log('fileItemProps', fileItemProps);

  const getFileSizeText = () => {
    const fileSize = file?.size || metaDataFileSize;
    if (!fileSize) {
      return '';
    }
    if (fileSize < 1024) {
      return `${fileSize} B`;
    }
    if (fileSize < 1024 * 1024) {
      return `${(fileSize / 1024).toFixed(1)} KB`;
    }
    return `${(fileSize / 1024 / 1024).toFixed(1)} MB`;
  };

  const getButtonText = () => {
    if (fileItemProps?.buttonText) {
      return fileItemProps.buttonText;
    }
    return !multiFile || (multiFile && !smallScreen)
      ? removeFileText
      : undefined;
  };

  const getFileAriaLabel = () => {
    if (
      fileItemProps?.status !== 'loading' &&
      !fileItemProps?.ariaLoadingText
    ) {
      return `${addedFileAriaText} ${file?.name || metaDataFileName} ${
        fileItemProps?.errorText ? fileItemProps.errorText : ''
      }`;
    }
    return `${fileItemProps?.ariaLoadingText} ${
      file?.name || metaDataFileName
    }`;
  };

  return (
    <HtmlDiv
      className={fileItemClassNames.fileItemOuterWrapper}
      role={multiFile ? 'listitem' : undefined}
    >
      <HtmlDiv className={fileItemClassNames.fileItem}>
        <HtmlDiv className={fileItemClassNames.fileInfo}>
          {fileItemProps?.status === 'error' && (
            <IconErrorFilled className={fileItemClassNames.errorIcon} />
          )}
          {fileItemProps?.status === 'loading' && (
            <IconPreloader className={fileItemClassNames.loadingIcon} />
          )}
          {!fileItemProps?.status && <IconGenericFile />}
          {filePreview ? (
            <Link
              ref={
                fileItemRefs.fileNameRef as React.RefObject<HTMLAnchorElement>
              }
              href={file ? URL.createObjectURL(file) : metadataFileURL || ''}
              className={classnames(fileItemClassNames.fileName, 'is-link')}
              target="_blank"
              aria-label={getFileAriaLabel()}
              aria-describedby={fileItemRefs.fileSizeElementId}
            >
              {file?.name || metaDataFileName}
            </Link>
          ) : (
            <HtmlDivWithRef
              forwardedRef={
                fileItemRefs.fileNameRef as React.RefObject<HTMLDivElement>
              }
              className={fileItemClassNames.fileName}
              aria-label={getFileAriaLabel()}
              aria-describedby={fileItemRefs.fileSizeElementId}
            >
              {file?.name || metaDataFileName}
            </HtmlDivWithRef>
          )}
          <HtmlDiv
            className={fileItemClassNames.fileSize}
            id={filePreview ? fileItemRefs.fileSizeElementId : undefined}
          >
            {`(${getFileSizeText()})`}
          </HtmlDiv>
        </HtmlDiv>
        <Button
          variant={
            smallScreen && !multiFile ? 'secondary' : 'secondaryNoBorder'
          }
          icon={
            fileItemProps && fileItemProps.buttonIcon ? (
              fileItemProps.buttonIcon
            ) : (
              <IconRemove />
            )
          }
          onClick={() => {
            if (fileItemProps?.buttonOnClick) {
              fileItemProps.buttonOnClick(file || fileItemProps?.metadata);
            } else {
              removeFile(file || fileItemProps?.metadata);
            }
          }}
          aria-label={`${
            fileItemProps?.buttonText
              ? fileItemProps.buttonText
              : removeFileText
          } ${file?.name || metaDataFileName}`}
          className={fileItemClassNames.removeFileButton}
          ref={fileItemRefs.removeButtonRef}
        >
          {getButtonText()}
        </Button>
      </HtmlDiv>
      {fileItemProps?.errorText && (
        <HtmlDiv className={fileItemClassNames.fileItemErrorText}>
          {fileItemProps.errorText}
        </HtmlDiv>
      )}
    </HtmlDiv>
  );
};

const StyledFileItem = styled(
  ({ theme, ...passProps }: FileItemProps & SuomifiThemeProp) => (
    <BaseFileItem {...passProps} />
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

const FileItem = (props: FileItemProps) => (
  <SuomifiThemeConsumer>
    {({ suomifiTheme }) => <StyledFileItem theme={suomifiTheme} {...props} />}
  </SuomifiThemeConsumer>
);

FileItem.displayName = 'FileItem';
export { FileItem };
