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
  fileItemDetails?: ControlledFileItem;
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
    fileItemDetails,
  } = props;

  const { fileName: metadataFileName, fileSize: metadataFileSize } =
    fileItemDetails?.metadata || {};

  const filePreviewCallBack = fileItemDetails?.filePreviewOnClick;
  const fileUrl = fileItemDetails?.fileURL;

  const getPreviewLinkHref = () => {
    if (filePreviewCallBack) return '';
    if (fileUrl) return fileUrl;
    if (file) return URL.createObjectURL(file);
    return '';
  };

  const getFileSizeText = () => {
    const fileSize = metadataFileSize || file?.size;
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
    if (fileItemDetails?.buttonText) {
      return fileItemDetails.buttonText;
    }
    return !multiFile || (multiFile && !smallScreen)
      ? removeFileText
      : undefined;
  };

  const getFileAriaLabel = () => {
    if (
      fileItemDetails?.status !== 'loading' &&
      !fileItemDetails?.ariaLoadingText
    ) {
      return `${addedFileAriaText} ${file?.name || metadataFileName} ${
        fileItemDetails?.errorText ? fileItemDetails.errorText : ''
      }`;
    }
    return `${fileItemDetails?.ariaLoadingText} ${
      file?.name || metadataFileName
    }`;
  };

  return (
    <HtmlDiv
      className={fileItemClassNames.fileItemOuterWrapper}
      role={multiFile ? 'listitem' : undefined}
    >
      <HtmlDiv className={fileItemClassNames.fileItem}>
        <HtmlDiv className={fileItemClassNames.fileInfo}>
          {fileItemDetails?.status === 'error' && (
            <IconErrorFilled className={fileItemClassNames.errorIcon} />
          )}
          {fileItemDetails?.status === 'loading' && (
            <IconPreloader className={fileItemClassNames.loadingIcon} />
          )}
          {!fileItemDetails?.status && <IconGenericFile />}
          {filePreview ? (
            <Link
              ref={
                fileItemRefs.fileNameRef as React.RefObject<HTMLAnchorElement>
              }
              href={getPreviewLinkHref()}
              className={classnames(fileItemClassNames.fileName, 'is-link')}
              target="_blank"
              aria-label={getFileAriaLabel()}
              aria-describedby={fileItemRefs.fileSizeElementId}
              onClick={(e) => {
                if (filePreviewCallBack) {
                  e.preventDefault();
                  filePreviewCallBack();
                }
              }}
            >
              {file?.name || metadataFileName}
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
              {file?.name || metadataFileName}
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
            fileItemDetails && fileItemDetails.buttonIcon ? (
              fileItemDetails.buttonIcon
            ) : (
              <IconRemove />
            )
          }
          onClick={() => {
            if (fileItemDetails?.buttonOnClick) {
              fileItemDetails.buttonOnClick();
            } else {
              removeFile(file || fileItemDetails?.metadata);
            }
          }}
          aria-label={`${
            fileItemDetails?.buttonText
              ? fileItemDetails.buttonText
              : removeFileText
          } ${file?.name || metadataFileName}`}
          className={fileItemClassNames.removeFileButton}
          ref={fileItemRefs.removeButtonRef}
        >
          {getButtonText()}
        </Button>
      </HtmlDiv>
      {fileItemDetails?.errorText && (
        <HtmlDiv className={fileItemClassNames.fileItemErrorText}>
          {fileItemDetails.errorText}
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
