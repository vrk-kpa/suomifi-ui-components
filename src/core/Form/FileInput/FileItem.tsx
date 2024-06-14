import React, { ReactNode } from 'react';
import {
  ControlledFileItem,
  FileItemRefs,
  fileInputClassNames,
} from './FileInput';
import { Button } from '../../Button/Button';
import { HtmlDiv, HtmlDivWithRef } from '../../../reset/HtmlDiv/HtmlDiv';
import {
  IconErrorFilled,
  IconGenericFile,
  IconPreloader,
  IconRemove,
} from 'suomifi-icons';
import { Link } from '../../Link/Link/Link';
import styled from 'styled-components';
import { SuomifiThemeConsumer, SuomifiThemeProp } from '../../theme';
import { baseStyles } from './FileInput.baseStyles';
import classnames from 'classnames';

interface FileItemProps {
  file: File;
  filePreview: boolean;
  multiFile: boolean;
  fileItemRefs: FileItemRefs;
  addedFileAriaText: string;
  removeFileText: ReactNode;
  removeFile: (file: File) => void;
  smallScreen: boolean;
  metaData?: ControlledFileItem;
}

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
    metaData,
  } = props;

  const getFileSizeText = () => {
    const fileSize = file.size;
    if (fileSize < 1024) {
      return `${fileSize} B`;
    }
    if (fileSize < 1024 * 1024) {
      return `${(fileSize / 1024).toFixed(1)} KB`;
    }
    return `${(fileSize / 1024 / 1024).toFixed(1)} MB`;
  };

  const getButtonText = () => {
    if (metaData?.buttonText) {
      return metaData.buttonText;
    }
    return !multiFile || (multiFile && !smallScreen)
      ? removeFileText
      : undefined;
  };

  const getFileAriaLabel = () => {
    if (metaData?.status !== 'loading' && !metaData?.ariaLoadingText) {
      return `${addedFileAriaText} ${file.name} ${
        metaData?.errorText ? metaData.errorText : ''
      }`;
    }
    return `${metaData?.ariaLoadingText} ${file.name}`;
  };

  return (
    <HtmlDiv
      className={fileInputClassNames.fileItemOuterWrapper}
      role="listitem"
    >
      <HtmlDiv className={fileInputClassNames.fileItem}>
        <HtmlDiv className={fileInputClassNames.fileInfo}>
          {metaData?.status === 'error' && (
            <IconErrorFilled className={fileInputClassNames.errorIcon} />
          )}
          {metaData?.status === 'loading' && (
            <IconPreloader className={fileInputClassNames.loadingIcon} />
          )}
          {!metaData?.status && <IconGenericFile />}
          {filePreview ? (
            <Link
              ref={
                fileItemRefs.fileNameRef as React.RefObject<HTMLAnchorElement>
              }
              href={URL.createObjectURL(file)}
              className={classnames(fileInputClassNames.fileName, 'is-link')}
              target="_blank"
              aria-label={getFileAriaLabel()}
              aria-describedby={fileItemRefs.fileSizeElementId}
            >
              {file.name}
            </Link>
          ) : (
            <HtmlDivWithRef
              tabIndex={multiFile ? 0 : -1}
              forwardedRef={
                fileItemRefs.fileNameRef as React.RefObject<HTMLDivElement>
              }
              className={fileInputClassNames.fileName}
              aria-label={getFileAriaLabel()}
              aria-describedby={fileItemRefs.fileSizeElementId}
            >
              {file.name}
            </HtmlDivWithRef>
          )}
          <HtmlDiv
            className={fileInputClassNames.fileSize}
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
            metaData && metaData.buttonIcon ? (
              metaData.buttonIcon
            ) : (
              <IconRemove />
            )
          }
          onClick={() => {
            if (metaData?.buttonOnClick) {
              metaData.buttonOnClick();
            } else {
              removeFile(file);
            }
          }}
          aria-label={`${
            metaData?.buttonText ? metaData.buttonText : removeFileText
          } ${file.name}`}
          className={fileInputClassNames.removeFileButton}
        >
          {getButtonText()}
        </Button>
      </HtmlDiv>
      {metaData?.errorText && (
        <HtmlDiv className={fileInputClassNames.fileItemErrorText}>
          {metaData.errorText}
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
