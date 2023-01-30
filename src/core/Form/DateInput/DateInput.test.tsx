import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { DateInput } from './DateInput';

describe('snapshots match', () => {
  describe('date input', () => {
    test('minimal implementation', () => {
      const { baseElement } = render(<DateInput labelText="Date" />);
      expect(baseElement).toMatchSnapshot();
    });

    test('hidden label with placeholder', () => {
      const { baseElement } = render(
        <DateInput
          labelText="Date"
          labelMode="hidden"
          visualPlaceholder="DateInput"
        />,
      );
      expect(baseElement).toMatchSnapshot();
    });

    test('hint text', () => {
      const { baseElement } = render(
        <DateInput labelText="Date" hintText="User format D.M.YYYY" />,
      );
      expect(baseElement).toMatchSnapshot();
    });

    test('optional text', () => {
      const { baseElement } = render(
        <DateInput labelText="Date" optionalText="optional" />,
      );
      expect(baseElement).toMatchSnapshot();
    });

    test('success status with statustext', () => {
      const { baseElement } = render(
        <DateInput labelText="Date" statusText="Success" status="success" />,
      );
      expect(baseElement).toMatchSnapshot();
    });

    test('error status with statustext', () => {
      const { baseElement } = render(
        <DateInput labelText="Date" statusText="Error" status="error" />,
      );
      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('date input with datepicker', () => {
    beforeAll(() => {
      jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    test('with controlled input value', async () => {
      const { baseElement, getByRole } = render(
        <DateInput
          labelText="Date"
          visualPlaceholder="DateInput"
          datePickerEnabled
          value="15.1.2020"
        />,
      );
      fireEvent.click(getByRole('button'));
      expect(baseElement).toMatchSnapshot();
    });
  });
});

// TBD:
// Keyboard event tests
// datePickerTexts
// labelText
// hintText
// labelMode
// optionalText
// onBlur
// minDate
// maxDate
// initialDate
// language

describe('callbacks', () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('shouldDisableDate', () => {
    it('has date disabled', () => {
      const { baseElement, getByRole } = render(
        <DateInput
          labelText="Date"
          datePickerEnabled
          shouldDisableDate={(date) => date.getDate() === 18}
        />,
      );
      fireEvent.click(getByRole('button'));
      const dateButton = baseElement.querySelector(
        '.fi-month-day_button--disabled',
      );
      expect(dateButton).toHaveAttribute('aria-disabled');
    });
  });

  describe('onChange', () => {
    it('calls onChange when input value is changed', () => {
      const mockOnChange = jest.fn();
      const { getByRole } = render(
        <DateInput labelText="Date" onChange={mockOnChange} />,
      );
      fireEvent.change(getByRole('textbox'), { target: { value: '1.1.2020' } });
      expect(mockOnChange).toBeCalledWith({
        value: '1.1.2020',
        date: new Date(2020, 0, 1),
      });
    });

    it('calls onChange when date is selected', () => {
      const mockOnChange = jest.fn();
      const { getByRole, getByText, getAllByText } = render(
        <DateInput
          labelText="Date"
          datePickerEnabled
          onChange={mockOnChange}
        />,
      );
      fireEvent.click(getByRole('button'));
      const dateButton = getAllByText('1')[0].closest(
        'button',
      ) as HTMLButtonElement;
      fireEvent.click(dateButton);
      const confirmButton = getByText('Valitse').closest(
        'button',
      ) as HTMLButtonElement;
      fireEvent.click(confirmButton);
      expect(mockOnChange).toBeCalledWith({
        value: '1.1.2020',
        date: new Date(2020, 0, 1),
      });
    });
  });

  describe('onClick', () => {
    it('calls onClick when input is clicked', () => {
      const mockOnClick = jest.fn();
      const { getByRole } = render(
        <DateInput labelText="Date" onClick={mockOnClick} />,
      );
      fireEvent.click(getByRole('textbox'));
      expect(mockOnClick).toBeCalledTimes(1);
    });
  });
});

describe('props', () => {
  describe('className', () => {
    it('has user given className', () => {
      const { baseElement } = render(
        <DateInput labelText="Date" className="custom-class" />,
      );
      const div = baseElement.querySelector('.fi-date-input');
      expect(div).toHaveClass('custom-class');
    });
  });

  describe('dateAdapter', () => {
    const dateAdapter = {
      format: (date: Date) =>
        `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
      parse: (value: string) => {
        const values = value.split('-');
        return new Date(
          Number(values[0]),
          Number(values[1]) - 1,
          Number(values[2]),
        );
      },
    };

    beforeAll(() => {
      jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('parses date from input field', () => {
      const { baseElement, getByRole } = render(
        <DateInput
          labelText="Date"
          datePickerEnabled
          dateAdapter={dateAdapter}
        />,
      );
      fireEvent.change(getByRole('textbox'), {
        target: { value: '2020-8-15' },
      });
      fireEvent.click(getByRole('button'));
      const dateButton = baseElement.querySelector(
        '.fi-month-day_button--selected',
      );
      expect(dateButton).toHaveTextContent('15 lauantai Elokuu 2020');
    });

    it('formats selected date to input field', () => {
      const { getByRole, getByText } = render(
        <DateInput
          labelText="Date"
          datePickerEnabled
          dateAdapter={dateAdapter}
        />,
      );
      fireEvent.click(getByRole('button'));
      const dateButton = getByText('16').closest('button') as HTMLButtonElement;
      fireEvent.click(dateButton);
      const confirmButton = getByText('Valitse').closest(
        'button',
      ) as HTMLButtonElement;
      fireEvent.click(confirmButton);
      expect(getByRole('textbox')).toHaveValue('2020-1-16');
    });
  });

  describe('datePickerEnabled', () => {
    it('has no datePicker wrapper div when false', () => {
      const { baseElement } = render(<DateInput labelText="Date" />);
      const div = baseElement.querySelector(
        '.fi-date-input_picker-element-container',
      );
      expect(div).toBeNull();
    });

    it('has datePicker wrapper div when true', () => {
      const { baseElement } = render(
        <DateInput labelText="Date" datePickerEnabled />,
      );
      const div = baseElement.querySelector(
        '.fi-date-input_picker-element-container',
      );
      expect(div).not.toBeNull();
    });
  });

  describe('debounce', () => {
    it('delays the running of onChange by the given time', () => {
      jest.useFakeTimers();
      const mockOnChange = jest.fn();
      const { getByRole } = render(
        <DateInput labelText="Date" debounce={1000} onChange={mockOnChange} />,
      );
      fireEvent.change(getByRole('textbox'), { target: { value: '1.1.' } });
      fireEvent.change(getByRole('textbox'), { target: { value: '1.1.2022' } });
      expect(getByRole('textbox')).toHaveValue('1.1.2022');
      expect(mockOnChange).not.toBeCalled();
      jest.advanceTimersByTime(1000);
      expect(mockOnChange).toBeCalledTimes(1);
    });
    it('resolves right away when no debounce is given', () => {
      const mockOnChange = jest.fn();
      const { getByRole } = render(
        <DateInput labelText="Date" onChange={mockOnChange} />,
      );
      fireEvent.change(getByRole('textbox'), { target: { value: '1.1.' } });
      fireEvent.change(getByRole('textbox'), { target: { value: '1.1.2022' } });
      expect(mockOnChange).toBeCalledTimes(2);
    });
  });

  describe('disabled', () => {
    it('has input field disabled', () => {
      const { getByRole } = render(<DateInput labelText="Date" disabled />);
      expect(getByRole('textbox')).toHaveAttribute('disabled');
    });

    it('has date picker button disabled', () => {
      const { getByRole } = render(
        <DateInput labelText="Date" datePickerEnabled disabled />,
      );
      expect(getByRole('button')).toHaveAttribute('disabled');
    });
  });

  describe('statusText', () => {
    it('has status text defined by prop', () => {
      const { getByText } = render(
        <DateInput labelText="Date" statusText="Test status" />,
      );
      expect(getByText('Test status')).toBeDefined();
    });
  });

  describe('statusTextAriaLiveMode', () => {
    it('has assertive aria-live by default', () => {
      const { getByText } = render(
        <DateInput labelText="Date" statusText="Test status" />,
      );
      expect(getByText('Test status')).toHaveAttribute(
        'aria-live',
        'assertive',
      );
    });
    it('has aria-live defined by prop', () => {
      const { getByText } = render(
        <DateInput
          labelText="Date"
          statusText="Test status"
          statusTextAriaLiveMode="off"
        />,
      );
      expect(getByText('Test status')).toHaveAttribute('aria-live', 'off');
    });
  });

  describe('value', () => {
    beforeAll(() => {
      jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('has user given value in input', () => {
      const { getByRole } = render(
        <DateInput labelText="Date" value="1.5.2020" />,
      );
      expect(getByRole('textbox')).toHaveValue('1.5.2020');
    });

    it('has user given value selected in calendar', () => {
      const { getByRole, baseElement } = render(
        <DateInput labelText="Date" datePickerEnabled value="1.5.2020" />,
      );
      fireEvent.click(getByRole('button'));
      const dateButton = baseElement.querySelector(
        '.fi-month-day_button--selected',
      );
      expect(dateButton).toHaveTextContent('1 perjantai Toukokuu 2020');
    });

    it('has user given value focused in calendar', () => {
      const { getByRole, baseElement } = render(
        <DateInput labelText="Date" datePickerEnabled value="1.5.2020" />,
      );
      fireEvent.click(getByRole('button'));
      const dateButton = baseElement.querySelector(
        '.fi-month-day_button--selected',
      );
      expect(dateButton).toHaveTextContent('1 perjantai Toukokuu 2020');
      expect(dateButton).toHaveFocus();
    });
  });

  describe('visualPlaceholder', () => {
    it('does not have placeholder by default', () => {
      const { getByRole } = render(<DateInput labelText="Date" />);
      expect(getByRole('textbox')).not.toHaveAttribute('placeholder');
    });

    it('has given text', () => {
      const { getByRole } = render(
        <DateInput labelText="Date" visualPlaceholder="1.1.2022" />,
      );
      expect(getByRole('textbox')).toHaveAttribute('placeholder', '1.1.2022');
    });
  });

  describe('passProps', () => {
    describe('defaultValue', () => {
      beforeAll(() => {
        jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
      });

      afterAll(() => {
        jest.useRealTimers();
      });

      it('has user given defaultValue in input', () => {
        const { getByRole } = render(
          <DateInput labelText="Date" defaultValue="31.1.2020" />,
        );
        expect(getByRole('textbox')).toHaveValue('31.1.2020');
      });

      it('has user given defaultValue selected in calendar', () => {
        const { getByRole, baseElement } = render(
          <DateInput
            labelText="Date"
            datePickerEnabled
            defaultValue="31.1.2020"
          />,
        );
        fireEvent.click(getByRole('button'));
        const dateButton = baseElement.querySelector(
          '.fi-month-day_button--selected',
        );
        expect(dateButton).toHaveTextContent('31 perjantai Tammikuu 2020');
      });

      it('has user given defaultValue focused in calendar', () => {
        const { getByRole, baseElement } = render(
          <DateInput
            labelText="Date"
            datePickerEnabled
            defaultValue="31.1.2020"
          />,
        );
        fireEvent.click(getByRole('button'));
        const dateButton = baseElement.querySelector(
          '.fi-month-day_button--selected',
        );
        expect(dateButton).toHaveTextContent('31 perjantai Tammikuu 2020');
        expect(dateButton).toHaveFocus();
      });
    });

    describe('aria-describedby', () => {
      it('has user given aria-describedby on input', () => {
        const { getByRole } = render(
          <DateInput labelText="Date" aria-describedby="something" />,
        );
        expect(getByRole('textbox')).toHaveAttribute(
          'aria-describedby',
          'something',
        );
      });
    });
  });
});
