Use the `<FileInput>` component to upload a file to server as part of a form.

Examples:

- [Basic use](./#/Components/FileInput?id=basic-use)
- [File preview](./#/Components/FileInput?id=file-preview)
- [Multiple files](./#/Components/FileInput?id=multiple-files)
- [Small screen](./#/Components/FileInput?id=small-screen)
- [Non-controlled validation](./#/Components/FileInput?id=non-controlled-validation)
- [Controlled state](./#/Components/FileInput?id=controlled-state)
- [Controlled items status](./#/Components/FileInput?id=controlled-items-status)
- [Controlled items with custom data handling](./#/FileInput?id=controlled-items-with-custom-data-handling)
- [Accessing the input with ref](./#/Components/FileInput?id=accessing-the-input-with-ref)
- [Full width](./#/Components/FileInput?id=full-width)
- [Hidden label](./#/Components/FileInput?id=hidden-label)
- [Optional input](./#/Components/FileInput?id=optional-input)
- [Tooltip](./#/Components/FileInput?id=tooltip)

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
    labelText="Resume"
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
    labelText="Resume"
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
    labelText="Resume"
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
    labelText="Resume"
    inputButtonText="Choose file"
    dragAreaText="Choose file or drag and drop here"
    removeFileText="Remove"
    addedFileAriaText="Added file: "
    hintText="Allowed file formats are: pdf and docx. Maximum file size is 5 MB"
    smallScreen
  />
</div>;
```

### Non-controlled validation

Use the `onChange()` function to detect changes in the input. After that you can manually perform any validation logic and set the component's `status` and `statusText` accordingly.

```jsx
import { FileInput } from 'suomifi-ui-components';
import React, { useState } from 'react';

const [statusText, setStatusText] = useState('');
const [status, setStatus] = useState('default');

const validateFiles = (newFileList) => {
  const filesAsArray = Array.from(newFileList);
  let invalidFileFound = false;
  for (let i = 0; i < filesAsArray.length; i++) {
    const file = filesAsArray[i];
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
    labelText="Resume"
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

### Controlled state

Use the `value` prop to programmatically control the value of the input. Use the `onChange()` function to detect changes and run any validation logic necessary, then set the state again as needed.

The `value` prop accepts an array of objects with the following schema. See the [next example below](./#/Components/FileInput?id=controlled-items-metadata) for detailed use of the optional properties.

```jsx static
interface ControlledFileItem {
  // The actual file object
  file: File;
  // Status of the element. Affects styling
  status?: 'default' | 'error' | 'loading';
  // Red text to display under the file item
  errorText?: string;
  // Additional text for screen readers when using loading status. E.g "Loading"
  ariaLoadingText?: string;
  // Override default remove button text. Also used as aria-label for the button as thus: `${buttonText} ${file.name}`
  buttonText?: string;
  // Override default remove button icon
  buttonIcon?: ReactElement;
  // Override default remove button behavior
  buttonOnClick?: (file) => void;
  // File metadata for when you want to save the file outside the component state
  metadata: Metadata;
}
```

```jsx
import { FileInput } from 'suomifi-ui-components';
import React, { useState } from 'react';

const [statusText, setStatusText] = useState('');
const [status, setStatus] = useState('default');
const [controlledValue, setControlledValue] = useState([]);

const validateFiles = (newFileList) => {
  console.log(newFileList);
  const filesAsArray = Array.from(newFileList);
  let invalidFileFound = false;
  let errorText = '';
  if (filesAsArray.length > 0) {
    const file = filesAsArray[0];
    if (file.type !== 'application/pdf') {
      errorText += 'Provide files in pdf format. ';
      invalidFileFound = true;
    }
    if (file.size > 1000000) {
      errorText += 'File size must be less than 1 megabytes.';
      invalidFileFound = true;
    }
  }
  if (invalidFileFound) {
    setStatus('error');
    setStatusText(errorText);
  } else {
    setStatus('default');
    setStatusText('');
    setControlledValue(
      filesAsArray.length > 0 ? [{ file: filesAsArray[0] }] : []
    );
  }
};

<div style={{ width: 600 }}>
  <FileInput
    labelText="Resume"
    inputButtonText="Choose file"
    dragAreaText="Choose file or drag and drop here"
    removeFileText="Remove"
    addedFileAriaText="Added file: "
    hintText="Use the pdf file format. Maximum file size is 1 MB"
    status={status}
    statusText={statusText}
    onChange={validateFiles}
    value={controlledValue}
  />
</div>;
```

### Controlled items status

Below is a static example of the different, more granularly controlled items that can be provided as controlled value.

- When element `status === 'error'`
  - If `multiFile` is enabled, always provide the `errorText` property to the controlled value as well
  - If the component is in single file mode, use the component's regular `status` and `statusText` only
- When element `status === 'loading`
  - Always provide the `ariaLoadingText` property

```jsx
import {
  FileInput,
  IconSwapRounded,
  IconClose
} from 'suomifi-ui-components';
import React, { useState } from 'react';

const mockedItems = [
  {
    file: new File(['Content of the first mock file'], 'mock-1.txt', {
      type: 'text/plain'
    }),
    status: 'error',
    errorText: 'Uploading file failed. Please try again',
    buttonText: 'Try again',
    buttonIcon: <IconSwapRounded />,
    buttonOnClick: (file) =>
      console.log('File 1 button clicked!', file)
  },
  {
    file: new File(
      ['Content of the second mock file'],
      'mock-2.txt',
      {
        type: 'text/plain'
      }
    ),
    status: 'loading',
    ariaLoadingText: 'Loading',
    buttonText: 'Cancel',
    buttonIcon: <IconClose />,
    buttonOnClick: (file) =>
      console.log('File 2 button clicked!', file)
  },
  {
    file: new File(['Content of the third mock file'], 'mock-3.txt', {
      type: 'text/plain'
    })
  }
];

<div style={{ width: 600 }}>
  <FileInput
    labelText="Attachments"
    inputButtonText="Choose file"
    dragAreaText="Choose file or drag and drop here"
    removeFileText="Remove"
    addedFileAriaText="Added file: "
    hintText="Use the txt file format. Maximum file size is 1 MB"
    value={mockedItems}
    status="error"
    statusText="Something went wrong while adding files"
    multiFile
    multiFileListHeadingText="Added files"
  />
  <FileInput
    mt="xl"
    labelText="Attachments"
    inputButtonText="Choose file"
    dragAreaText="Choose file or drag and drop here"
    removeFileText="Remove"
    addedFileAriaText="Added file: "
    hintText="Use the txt file format. Maximum file size is 1 MB"
    value={[
      {
        file: new File(
          ['Content of the mock file'],
          'mock-file.txt',
          {
            type: 'text/plain'
          }
        ),
        buttonText: 'Try again',
        buttonIcon: <IconSwapRounded />,
        buttonOnClick: (file) =>
          console.log('Custom click handler!', file)
      }
    ]}
    status="error"
    statusText="Something went wrong while uploading the file. Please try again"
  />
</div>;
```

### Controlled items with custom data handling

If you want to handle the file data without saving it to the component state, you can opt to provide only the necessary metadata to show the file in the component/list. You can then handle the file data as you want when saving the form.

Provide at least `fileName`, `fileType` and `fileSize` as the metadata of the controlled value object. File previews can also be handled either by providing a `fileURL` in the metadata or a `filePreviewOnClick` in the `ControlledFileItem` object.

The interface for the metadata is as follows:

```jsx static
export interface Metadata {
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
   * id of the file
   */
  id?: string;
}
```

```jsx
import { FileInput } from 'suomifi-ui-components';
import React, { useState } from 'react';

const [statusText, setStatusText] = useState('');
const [status, setStatus] = useState('default');
const [controlledValue, setControlledValue] = useState([]);

const validateFiles = (newFileList) => {
  const filesArray = Array.from(newFileList);
  let invalidFileFound = false;
  let errorText = 'File size must be less than 1 megabytes ';

  filesArray.forEach((file) => {
    if (file.size > 1000000) {
      errorText += `(${file.name}) `;
      invalidFileFound = true;
    }
  });

  if (invalidFileFound) {
    setStatus('error');
    setStatusText(errorText);
  } else {
    setStatus('default');
    setStatusText('');
    filesArray.length > 0
      ? customSaveFunction(filesArray)
      : setControlledValue([]);
  }
};

const customSaveFunction = (files) => {
  const pseudoFiles = [];
  files.forEach((file) => {
    const fileItemData = {
      metadata: {
        id: `${Math.random().toString(36).substring(2, 15)}`,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type
      },
      buttonOnClick: (file) => {
        // Filter out the item based on id
        setControlledValue((prevValue) =>
          prevValue.filter(
            (item) => item.metadata.id !== fileItemData.metadata.id
          )
        );
      },
      filePreviewOnClick: () =>
        // Fetch the file from wherever you store it
        console.log(`Fetching file ${file.name} from backend`),
      wrapperRef:
        files.indexOf(file) === files.length - 1 ? testRef : undefined
    };
    pseudoFiles.push(
      controlledValue.find(
        (item) => item.metadata.fileName === file.name
      ) || fileItemData
    );
    // Save actual file data however you want
  });
  setControlledValue(pseudoFiles);
};

<div style={{ width: 600 }}>
  <FileInput
    labelText="Resume"
    inputButtonText="Choose file"
    dragAreaText="Choose file or drag and drop here"
    removeFileText="Remove"
    addedFileAriaText="Added file: "
    hintText="Use the pdf file format. Maximum file size is 1 MB"
    status={status}
    statusText={statusText}
    onChange={validateFiles}
    value={controlledValue}
    filePreview
    multiFile
  />
</div>;
```

### Accessing the input with ref

The component's ref points to the underlying `<input type="file">` element and can thus be used to access the component's value as well as setting focus to it.

```jsx
import { FileInput, Button } from 'suomifi-ui-components';
import React, { useRef } from 'react';

const fileInputRef = useRef();

<div style={{ width: 950 }}>
  <FileInput
    labelText="Resume"
    inputButtonText="Choose file"
    dragAreaText="Choose file or drag and drop here"
    removeFileText="Remove"
    addedFileAriaText="Added file: "
    hintText="Allowed file formats are: pdf and docx. Maximum file size is 5 MB"
    ref={fileInputRef}
  />
  <Button
    mt="xl"
    onClick={() => {
      console.log(fileInputRef.current.files);
      fileInputRef.current.focus();
    }}
  >
    Focus on input
  </Button>
</div>;
```

### Full width

Use the `fullWidth` prop to make the element take all available horizontal space

```jsx
import { FileInput } from 'suomifi-ui-components';
import React from 'react';

<div style={{ width: 950 }}>
  <FileInput
    labelText="Resume"
    inputButtonText="Choose file"
    dragAreaText="Choose file or drag and drop here"
    removeFileText="Remove"
    addedFileAriaText="Added file: "
    hintText="Allowed file formats are: pdf and docx. Maximum file size is 5 MB"
    fullWidth
  />
</div>;
```

### Hidden label

Label can be visually hidden with the `labelMode="hidden"` prop.

```jsx
import { FileInput } from 'suomifi-ui-components';
import React from 'react';

<div style={{ width: 950 }}>
  <FileInput
    labelText="Resume"
    inputButtonText="Choose file"
    dragAreaText="Choose file or drag and drop here"
    removeFileText="Remove"
    addedFileAriaText="Added file: "
    hintText="Allowed file formats are: pdf and docx. Maximum file size is 5 MB"
    labelMode="hidden"
  />
</div>;
```

### Optional input

Suomi.fi inputs are required by default, but can be marked optional using the `optionalText` property.

```jsx
import { FileInput } from 'suomifi-ui-components';
import React from 'react';

<div style={{ width: 950 }}>
  <FileInput
    labelText="Resume"
    inputButtonText="Choose file"
    dragAreaText="Choose file or drag and drop here"
    removeFileText="Remove"
    addedFileAriaText="Added file: "
    hintText="Allowed file formats are: pdf and docx. Maximum file size is 5 MB"
    optionalText="optional"
  />
</div>;
```

### Tooltip

A `<Tooltip>` component can be used with DateInput to provide additional information.

Do not use Tooltip for file size or file format instructions. Tooltip can be used for other nice-to-know information.

For instructions regarding how to ensure your Tooltip is accessible, please refer to the [Tooltip documentation](./#/Components/Tooltip).

```jsx
import {
  FileInput,
  Tooltip,
  Heading,
  Text
} from 'suomifi-ui-components';
import React from 'react';

const labelText = 'Resume';

<div style={{ width: 950 }}>
  <FileInput
    labelText={labelText}
    inputButtonText="Choose file"
    dragAreaText="Choose file or drag and drop here"
    removeFileText="Remove"
    addedFileAriaText="Added file: "
    hintText="Allowed file formats are: pdf and docx. Maximum file size is 5 MB"
    tooltipComponent={
      <Tooltip
        ariaToggleButtonLabelText={`${labelText}, show additional information`}
        ariaCloseButtonLabelText={`${labelText}, close additional information`}
      >
        <Heading variant="h5" as="h2">
          About the resume
        </Heading>
        <Text>
          Your resume should contain lorem ipsum dolor sit amet
        </Text>
      </Tooltip>
    }
  />
</div>;
```
