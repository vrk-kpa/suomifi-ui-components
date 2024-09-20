Use the `<FileInput>` component to upload a file to server as part of a form.

Examples:

- [Basic use](./#/Components/FileInput?id=basic-use)
- [File preview](./#/Components/FileInput?id=file-preview)
- [Multiple files](./#/Components/FileInput?id=multiple-files)
- [Small screen](./#/Components/FileInput?id=small-screen)
- [Non-controlled validation](./#/Components/FileInput?id=non-controlled-validation)
- [Controlled state](./#/Components/FileInput?id=controlled-state)
- [Controlled items metadata](./#/Components/FileInput?id=controlled-items-metadata)
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

### Controlled items metadata

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
