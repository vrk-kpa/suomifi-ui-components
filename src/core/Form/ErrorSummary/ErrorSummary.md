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
  Button
} from 'suomifi-ui-components';
import { useState, useRef, useEffect } from 'react';

const [errorItems, setErrorItems] = useState([]);
const [firstNameErrorMessage, setFirstNameErrorMessage] =
  useState('');
const [lastNameErrorMessage, setLastNameErrorMessage] = useState('');
const [emailAddressErrorMessage, setEmailAddressErrorMessage] =
  useState('');

const [errorSummaryItems, setErrorSummaryItems] = useState([]);
const [
  shouldFocusOnErrorSummaryHeading,
  setShouldFocusOnErrorSummaryHeading
] = useState(false);

const errorSummaryHeadingRef = useRef(null);
const firstNameInputRef = useRef(null);
const lastNameInputRef = useRef(null);
const emailAddressInputRef = useRef(null);

useEffect(() => {
  if (shouldFocusOnErrorSummaryHeading) {
    errorSummaryHeadingRef.current.focus();
  }
}, [shouldFocusOnErrorSummaryHeading]);

const validateForm = () => {
  const emailRegex =
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  let formHasErrors = true;

  let firstNameError = '';
  let lastNameError = '';
  let emailAddressError = '';

  if (firstNameInputRef.current.value === '') {
    firstNameError = 'First name is a required field';
    formHasErrors = true;
  }
  if (lastNameInputRef.current.value === '') {
    lastNameError = 'Last name is a required field';
    formHasErrors = true;
  }
  if (emailAddressInputRef.current.value === '') {
    emailAddressError = 'Email address is a required field';
    formHasErrors = true;
  } else if (!emailRegex.test(emailAddressInputRef.current.value)) {
    emailAddressError = 'Email address is not valid';
    formHasErrors = true;
  }

  const errorItems = [];
  if (firstNameError !== '') {
    errorItems.push({
      text: firstNameError,
      inputId: 'first-name'
    });
  }
  if (lastNameError !== '') {
    errorItems.push({
      text: lastNameError,
      inputId: 'last-name'
    });
  }
  if (emailAddressError !== '') {
    errorItems.push({
      text: emailAddressError,
      inputId: 'email-address'
    });
  }
  setErrorSummaryItems(errorItems);
  setFirstNameErrorMessage(firstNameError);
  setLastNameErrorMessage(lastNameError);
  setEmailAddressErrorMessage(emailAddressError);
  setShouldFocusOnErrorSummaryHeading(formHasErrors);
};

<>
  <ErrorSummary
    headingText="The following problems were found in the form"
    headingVariant="h4"
    headingRef={errorSummaryHeadingRef}
    items={errorSummaryItems}
    style={{
      display: errorSummaryItems.length > 0 ? 'block' : 'none'
    }}
  />
  <TextInput
    labelText="First name"
    id="first-name"
    status={firstNameErrorMessage !== '' ? 'error' : 'default'}
    statusText={firstNameErrorMessage}
    statusTextAriaLiveMode="off"
    ref={firstNameInputRef}
  />
  <TextInput
    labelText="Last name"
    id="last-name"
    status={lastNameErrorMessage !== '' ? 'error' : 'default'}
    statusText={lastNameErrorMessage}
    statusTextAriaLiveMode="off"
    ref={lastNameInputRef}
  />
  <TextInput
    labelText="Email address"
    id="email-address"
    status={emailAddressErrorMessage !== '' ? 'error' : 'default'}
    statusText={emailAddressErrorMessage}
    statusTextAriaLiveMode="off"
    ref={emailAddressInputRef}
  />
  <Button onClick={validateForm}>Submit</Button>
</>;
```

### Props & methods
