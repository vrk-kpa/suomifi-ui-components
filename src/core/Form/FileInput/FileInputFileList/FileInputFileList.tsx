import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../../theme';
import React from 'react';
import { default as styled } from 'styled-components';
import { baseStyles } from './FileInputFileList.baseStyles';

export interface FileInputFileListProps {
  files: FileList;
}

export const BaseFileInputFileList = (props: FileInputFileListProps) => {
  const { files } = props;

  return <pre>{files}</pre>;
};

const StyledFileInputFileList = styled(
  ({ theme, ...passProps }: FileInputFileListProps & SuomifiThemeProp) => (
    <BaseFileInputFileList {...passProps} />
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

const FileInputFileList = (props: FileInputFileListProps) => (
  <SuomifiThemeConsumer>
    {({ suomifiTheme }) => (
      <StyledFileInputFileList theme={suomifiTheme} {...props} />
    )}
  </SuomifiThemeConsumer>
);

FileInputFileList.displayName = 'FileInputFileList';
export { FileInputFileList };
