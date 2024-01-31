Use the `<ErrorSummary>` component to display form errors in a centralized manner.

Examples:

- [Basic use](./#/Components/ErrorSummary?id=basic-use)

<div style="margin-bottom: 40px">
  [Props & methods](./#/Components/ErrorSummary?id=props--methods)
</div>

### Basic use

```js
import {
  ErrorSummary,
  TextInput,
  Button,
  Block
} from 'suomifi-ui-components';
import { useState, useRef, useEffect } from 'react';

const [firstNameErrorMessage, setFirstNameErrorMessage] =
  useState('');
const [lastNameErrorMessage, setLastNameErrorMessage] = useState('');
const [emailAddressErrorMessage, setEmailAddressErrorMessage] =
  useState('');

const [errorSummaryItems, setErrorSummaryItems] = useState([]);

const errorSummaryHeadingRef = useRef(null);
const firstNameInputRef = useRef(null);
const lastNameInputRef = useRef(null);
const emailAddressInputRef = useRef(null);

useEffect(() => {
  const errorItems = [];
  if (firstNameErrorMessage !== '') {
    errorItems.push({
      text: firstNameErrorMessage,
      //inputId: 'first-name', <-- This can be given instead of ref
      inputRef: firstNameInputRef
    });
  }
  if (lastNameErrorMessage !== '') {
    errorItems.push({
      text: lastNameErrorMessage,
      //inputId: 'last-name', <-- This can be given instead of ref
      inputRef: lastNameInputRef
    });
  }
  if (emailAddressErrorMessage !== '') {
    errorItems.push({
      text: emailAddressErrorMessage,
      // inputId: 'email-address', <-- This can be given instead of ref
      inputRef: emailAddressInputRef
    });
  }
  setErrorSummaryItems(errorItems);
}, [
  firstNameErrorMessage,
  lastNameErrorMessage,
  emailAddressErrorMessage
]);

const validateForm = () => {
  const emailRegex =
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  let firstNameError = '';
  let lastNameError = '';
  let emailAddressError = '';

  if (firstNameInputRef.current.value === '') {
    firstNameError = 'First name is a required field';
  }
  if (lastNameInputRef.current.value === '') {
    lastNameError = 'Last name is a required field';
  }
  if (emailAddressInputRef.current.value === '') {
    emailAddressError = 'Email address is a required field';
  } else if (!emailRegex.test(emailAddressInputRef.current.value)) {
    emailAddressError = 'Email address is not valid';
  }

  setFirstNameErrorMessage(firstNameError);
  setLastNameErrorMessage(lastNameError);
  setEmailAddressErrorMessage(emailAddressError);

  if (
    firstNameError !== '' ||
    lastNameError !== '' ||
    emailAddressError !== ''
  ) {
    // Timeout is used to make sure ErrorSummary component has had time to render before
    setTimeout(() => {
      errorSummaryHeadingRef.current.focus();
    }, 100);
  }
};

<Block style={{ width: '700px' }}>
  {errorSummaryItems.length > 0 && (
    <ErrorSummary
      headingText="The following problems were found in the form"
      headingVariant="h4"
      headingRef={errorSummaryHeadingRef}
      items={errorSummaryItems}
      mb="xl"
    />
  )}
  <TextInput
    labelText="First name"
    id="first-name"
    status={firstNameErrorMessage !== '' ? 'error' : 'default'}
    statusText={firstNameErrorMessage}
    statusTextAriaLiveMode="off"
    ref={firstNameInputRef}
    mb="l"
  />
  <TextInput
    labelText="Last name"
    id="last-name"
    status={lastNameErrorMessage !== '' ? 'error' : 'default'}
    statusText={lastNameErrorMessage}
    statusTextAriaLiveMode="off"
    ref={lastNameInputRef}
    mb="l"
  />
  <TextInput
    labelText="Email address"
    id="email-address"
    status={emailAddressErrorMessage !== '' ? 'error' : 'default'}
    statusText={emailAddressErrorMessage}
    statusTextAriaLiveMode="off"
    ref={emailAddressInputRef}
    mb="l"
  />
  <Button onClick={validateForm}>Submit</Button>
</Block>;
```

### Props & methods
