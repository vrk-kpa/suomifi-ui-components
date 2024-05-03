Use the `<FileInput>` component to upload a file to server as part of a form.

Examples:

- [Basic use](./#/Components/FileInput?id=basic-use)

<div style="margin-bottom: 40px">
  [Props & methods](./#/Components/FileInput?id=props--methods)
</div>

### Basic use

```js
import { FileInput, Button } from 'suomifi-ui-components';
import React, { useRef } from 'react';

const ref = useRef();

<>
  <FileInput
    labelText="Attachment"
    inputButtonText="Choose file"
    hintText="Maximum file size is 5MB"
    dragAreaText="Choose file or drag and drop here"
    statusText="asdasdasdasdasdkfhka"
    ref={ref}
  />
  <Button onClick={() => console.log(ref.current.files)}>Log</Button>
</>;
```
