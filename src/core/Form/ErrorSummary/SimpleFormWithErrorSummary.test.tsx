import React, { useState, useRef, useEffect } from 'react';
import {
  ErrorSummary,
  TextInput,
  Button,
  Block,
  ErrorSummaryItemProps,
} from '../../../index';
import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

const SimpleFormWithErrorSummary: React.FC = () => {
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState('');
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState('');
  const [emailAddressErrorMessage, setEmailAddressErrorMessage] = useState('');

  const [errorSummaryItems, setErrorSummaryItems] = useState<
    Array<ErrorSummaryItemProps>
  >([]);

  const errorSummaryHeadingRef = useRef<HTMLHeadingElement>(null);
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const emailAddressInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const errorItems = [];
    if (firstNameErrorMessage !== '') {
      errorItems.push({
        text: firstNameErrorMessage,
        inputRef: firstNameInputRef,
      });
    }
    if (lastNameErrorMessage !== '') {
      errorItems.push({
        text: lastNameErrorMessage,
        inputRef: lastNameInputRef,
      });
    }
    if (emailAddressErrorMessage !== '') {
      errorItems.push({
        text: emailAddressErrorMessage,
        inputRef: emailAddressInputRef,
      });
    }
    setErrorSummaryItems(errorItems);
  }, [firstNameErrorMessage, lastNameErrorMessage, emailAddressErrorMessage]);

  const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    let firstNameError = '';
    let lastNameError = '';
    let emailAddressError = '';

    if (firstNameInputRef.current?.value === '') {
      firstNameError = 'First name is a required field';
    }
    if (lastNameInputRef.current?.value === '') {
      lastNameError = 'Last name is a required field';
    }
    if (emailAddressInputRef.current?.value === '') {
      emailAddressError = 'Email address is a required field';
    } else if (!emailRegex.test(emailAddressInputRef.current?.value || '')) {
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
      /* 
      Timeout is used to make sure ErrorSummary component 
      has had time to render before focusing on the heading 
      */
      setTimeout(() => {
        errorSummaryHeadingRef.current?.focus();
      }, 100);
    }
  };

  return (
    <Block>
      {errorSummaryItems.length > 0 && (
        <ErrorSummary
          headingText="The following problems were found in the form"
          headingVariant="h4"
          headingRef={errorSummaryHeadingRef}
          items={errorSummaryItems}
        />
      )}
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
    </Block>
  );
};

describe('funcionality', () => {
  it('should render ErrorSummary and focus on the heading when invalid inputs are submitted', async () => {
    const { getByText, getAllByText } = render(<SimpleFormWithErrorSummary />);
    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);
    expect(
      getByText('The following problems were found in the form'),
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(
        getByText('The following problems were found in the form'),
      ).toHaveFocus();
    });

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
    fireEvent.click(submitButton);

    const firstNameLink = getByRole('link', {
      name: 'First name is a required field',
    });
    fireEvent.click(firstNameLink);
    const firstNameInput = getByTestId('first-name');
    expect(firstNameInput).toHaveFocus();

    const lastNameLink = getByRole('link', {
      name: 'Last name is a required field',
    });
    fireEvent.click(lastNameLink);
    const lastNameInput = getByTestId('last-name');
    expect(lastNameInput).toHaveFocus();

    const emailAddressLink = getByRole('link', {
      name: 'Email address is a required field',
    });
    fireEvent.click(emailAddressLink);
    const emailAddressInput = getByTestId('email-address');
    expect(emailAddressInput).toHaveFocus();
  });
});
