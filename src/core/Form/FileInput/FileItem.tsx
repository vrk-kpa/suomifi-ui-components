import React, { ReactNode } from 'react';
import { FileItemRefs, fileInputClassNames } from './FileInput';
import { Button } from '../../Button/Button';
import { HtmlDiv, HtmlDivWithRef } from '../../../reset/HtmlDiv/HtmlDiv';
import { IconGenericFile, IconRemove } from 'suomifi-icons';
import { Link } from '../../Link/Link/Link';
import styled from 'styled-components';
import { SuomifiThemeConsumer, SuomifiThemeProp } from '../../theme';
import { baseStyles } from './FileInput.baseStyles';
import classnames from 'classnames';

interface FileItemProps {
  file: File;
  filePreview: boolean;
  fileItemRefs: FileItemRefs;
  addedFileAriaText: string;
  removeFileText: ReactNode;
  removeFile: (file: File) => void;
}

const BaseFileItem = (props: FileItemProps) => {
  const {
    file,
    filePreview,
    fileItemRefs,
    addedFileAriaText,
    removeFileText,
    removeFile,
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

  return (
    <HtmlDiv className={fileInputClassNames.fileItem}>
      <HtmlDiv className={fileInputClassNames.fileInfo}>
        <IconGenericFile />
        {filePreview ? (
          <Link
            ref={fileItemRefs.fileNameRef as React.RefObject<HTMLAnchorElement>}
            href={URL.createObjectURL(file)}
            className={classnames(fileInputClassNames.fileName, 'is-link')}
            target="_blank"
            aria-label={`${addedFileAriaText} ${file.name}`}
            aria-describedby={fileItemRefs.fileSizeElementId}
          >
            {file.name}
          </Link>
        ) : (
          <HtmlDivWithRef
            tabIndex={0}
            forwardedRef={
              fileItemRefs.fileNameRef as React.RefObject<HTMLDivElement>
            }
            className={fileInputClassNames.fileName}
            aria-label={`${addedFileAriaText} ${file.name}`}
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
        variant="secondaryNoBorder"
        icon={<IconRemove />}
        onClick={() => removeFile(file)}
        aria-label={`${removeFileText} ${file.name}`}
        className={fileInputClassNames.removeFileButton}
      >
        {removeFileText}
      </Button>
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
