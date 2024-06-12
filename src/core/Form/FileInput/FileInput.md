Use the `<FileInput>` component to upload a file to server as part of a form.

Examples:

- [Basic use](./#/Components/FileInput?id=basic-use)
- [File preview](./#/Components/FileInput?id=file-preview)
- [Multiple files](./#/Components/FileInput?id=multiple-files)
- [Small screen](./#/Components/FileInput?id=small-screen)
- [Non-controlled validation](./#/Components/FileInput?id=non-controlled-validation)

<div style="margin-bottom: 40px">
  [Props & methods](./#/Components/FileInput?id=props--methods)
</div>

### Basic use

- Provide a descriptive `labelText` for the input
- Provide a text for the input button using `inputButtonText`
- Provide a text for the drag & drop area using `dragAreaText`
- Provide a text for the button which removes a file using `removeFileText`
- Use the `addedFileAriaText` prop to provide an additional screen reader text attached to an added file's name
- Use `hintText` to give instructions regarding allowed file formats and sizes

```jsx
import { FileInput } from 'suomifi-ui-components';
import React from 'react';

<div style={{ width: 600 }}>
  <FileInput
    labelText="Application attachment"
    inputButtonText="Choose file"
    dragAreaText="Choose file or drag and drop here"
    removeFileText="Remove"
    addedFileAriaText="Added file: "
    hintText="Allowed file formats are: pdf and docx. Maximum file size is 5 MB"
  />
</div>;
```

### File preview

When the `filePreview` prop is given, an added file's name will be rendered as a blob link. This allows preview of some file types in the browser (and download of others).

```jsx
import { FileInput } from 'suomifi-ui-components';
import React from 'react';

<div style={{ width: 600 }}>
  <FileInput
    labelText="Application attachment"
    inputButtonText="Choose file"
    dragAreaText="Choose file or drag and drop here"
    removeFileText="Remove"
    addedFileAriaText="Added file: "
    hintText="Allowed file formats are: pdf and docx. Maximum file size is 5 MB"
    filePreview
  />
</div>;
```

### Multiple files

Use the `multiFile` prop to allow multiple files to be added to the input. Also provide a `multiFileListHeadingText`.

```jsx
import { FileInput } from 'suomifi-ui-components';
import React from 'react';

<div style={{ width: 600 }}>
  <FileInput
    labelText="Application attachment"
    inputButtonText="Choose file"
    dragAreaText="Choose file or drag and drop here"
    removeFileText="Remove"
    addedFileAriaText="Added file: "
    hintText="Allowed file formats are: pdf and docx. Maximum file size is 5 MB"
    multiFile
    multiFileListHeadingText="Added files"
  />
</div>;
```

### Small screen

Apply the `smallScreen` prop to display a mobile optimized variant of the component

```jsx
import { FileInput } from 'suomifi-ui-components';
import React from 'react';

<div style={{ width: 350 }}>
  <FileInput
    labelText="Application attachment"
    inputButtonText="Choose file"
    dragAreaText="Choose file or drag and drop here"
    removeFileText="Remove"
    addedFileAriaText="Added file: "
    hintText="Allowed file formats are: pdf and docx. Maximum file size is 5 MB"
    smallScreen
    multiFile
    multiFileListHeadingText="Added files"
  />
</div>;
```

### Non-controlled validation

Use the `onChange()` function to detect changes in the input. After that you can manually perform any validation logic and set the component's `status` and `statusText` accordingly.

```jsx
import { FileInput } from 'suomifi-ui-components';
import React, { useState } from 'react';

const [statusText, setStatusText] = React.useState('');
const [status, setStatus] = React.useState('default');

const validateFiles = (newFileList) => {
  const filesAsArray = Array.from(newFileList);
  let invalidFileFound = false;
  for (let i = 0; i < filesAsArray.length; i++) {
    const file = filesAsArray[i];
    console.log(file);
    let errorText = '';
    if (file.type !== 'application/pdf') {
      errorText += 'Provide files in pdf format. ';
      invalidFileFound = true;
    }
    if (file.size > 1000000) {
      errorText += 'File size must be less than 1 megabytes.';
      invalidFileFound = true;
    }
    if (invalidFileFound) {
      setStatus('error');
      setStatusText(errorText);
      return;
    }
  }
  if (!invalidFileFound) {
    setStatus('default');
    setStatusText('');
  }
};

<div style={{ width: 600 }}>
  <FileInput
    labelText="Application attachment"
    inputButtonText="Choose file"
    dragAreaText="Choose file or drag and drop here"
    removeFileText="Remove"
    addedFileAriaText="Added file: "
    hintText="Use the pdf file format. Maximum file size is 1 MB"
    status={status}
    statusText={statusText}
    onChange={validateFiles}
  />
</div>;
```
