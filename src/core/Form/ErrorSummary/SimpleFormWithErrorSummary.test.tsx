import React, { useState, useRef, useEffect } from 'react';
import {
  ErrorSummary,
  TextInput,
  Button,
  ErrorSummaryItemProps,
} from '../../../index';
import { render } from '@testing-library/react';

const SimpleFormWithErrorSummary: React.FC = () => {
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState('');
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState('');
  const [emailAddressErrorMessage, setEmailAddressErrorMessage] = useState('');

  const [errorSummaryItems, setErrorSummaryItems] = useState<
    Array<ErrorSummaryItemProps>
  >([]);
  const [
    shouldFocusOnErrorSummaryHeading,
    setShouldFocusOnErrorSummaryHeading,
  ] = useState(false);

  const errorSummaryHeadingRef = useRef<HTMLHeadingElement>(null);
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const emailAddressInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (shouldFocusOnErrorSummaryHeading && errorSummaryHeadingRef.current) {
      errorSummaryHeadingRef.current.focus();
    }
  }, [shouldFocusOnErrorSummaryHeading]);

  const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let formHasErrors = true;

    let firstNameError = '';
    let lastNameError = '';
    let emailAddressError = '';

    if (firstNameInputRef.current?.value === '') {
      firstNameError = 'First name is a required field';
      formHasErrors = true;
    }
    if (lastNameInputRef.current?.value === '') {
      lastNameError = 'Last name is a required field';
      formHasErrors = true;
    }
    if (emailAddressInputRef.current?.value === '') {
      emailAddressError = 'Email address is a required field';
      formHasErrors = true;
    } else if (!emailRegex.test(emailAddressInputRef.current?.value || '')) {
      emailAddressError = 'Email address is not valid';
      formHasErrors = true;
    }

    const errorItems = [];
    if (firstNameError !== '') {
      errorItems.push({
        text: firstNameError,
        inputId: 'first-name',
      });
    }
    if (lastNameError !== '') {
      errorItems.push({
        text: lastNameError,
        inputId: 'last-name',
      });
    }
    if (emailAddressError !== '') {
      errorItems.push({
        text: emailAddressError,
        inputId: 'email-address',
      });
    }
    setErrorSummaryItems(errorItems);
    setFirstNameErrorMessage(firstNameError);
    setLastNameErrorMessage(lastNameError);
    setEmailAddressErrorMessage(emailAddressError);
    setShouldFocusOnErrorSummaryHeading(formHasErrors);
  };

  return (
    <>
      <ErrorSummary
        headingText="The following problems were found in the form"
        headingVariant="h4"
        headingRef={errorSummaryHeadingRef}
        items={errorSummaryItems}
        style={{
          display: errorSummaryItems.length > 0 ? 'block' : 'none',
        }}
      />
      <TextInput
        labelText="First name"
        id="first-name"
        data-testid="first-name"
        status={firstNameErrorMessage !== '' ? 'error' : 'default'}
        statusText={firstNameErrorMessage}
        statusTextAriaLiveMode="off"
        ref={firstNameInputRef}
      />
      <TextInput
        labelText="Last name"
        id="last-name"
        data-testid="last-name"
        status={lastNameErrorMessage !== '' ? 'error' : 'default'}
        statusText={lastNameErrorMessage}
        statusTextAriaLiveMode="off"
        ref={lastNameInputRef}
      />
      <TextInput
        labelText="Email address"
        id="email-address"
        data-testid="email-address"
        status={emailAddressErrorMessage !== '' ? 'error' : 'default'}
        statusText={emailAddressErrorMessage}
        statusTextAriaLiveMode="off"
        ref={emailAddressInputRef}
      />
      <Button onClick={validateForm}>Submit</Button>
    </>
  );
};

describe('funcionality', () => {
  it('should render ErrorSummary and focus on the heading when empty inputs are submitted', () => {
    const { getByText, getAllByText } = render(<SimpleFormWithErrorSummary />);
    const submitButton = getByText('Submit');
    submitButton.click();
    expect(
      getByText('The following problems were found in the form'),
    ).toBeInTheDocument();
    expect(
      getByText('The following problems were found in the form'),
    ).toHaveFocus();

    // ErrorSummary items and the corresponding inputs' statusText should have the same text
    expect(getAllByText('First name is a required field')).toHaveLength(2);
    expect(getAllByText('Last name is a required field')).toHaveLength(2);
    expect(getAllByText('Email address is a required field')).toHaveLength(2);
  });

  it('should focus on corresponding inputs when ErrorSummary items are clicked', () => {
    const { getByText, getByRole, getByTestId } = render(
      <SimpleFormWithErrorSummary />,
    );
    const submitButton = getByText('Submit');
    submitButton.click();

    const firstNameLink = getByRole('link', {
      name: 'First name is a required field',
    });
    firstNameLink.click();
    const firstNameInput = getByTestId('first-name');
    expect(firstNameInput).toHaveFocus();

    const lastNameLink = getByRole('link', {
      name: 'Last name is a required field',
    });
    lastNameLink.click();
    const lastNameInput = getByTestId('last-name');
    expect(lastNameInput).toHaveFocus();

    const emailAddressLink = getByRole('link', {
      name: 'Email address is a required field',
    });
    emailAddressLink.click();
    const emailAddressInput = getByTestId('email-address');
    expect(emailAddressInput).toHaveFocus();
  });
});
