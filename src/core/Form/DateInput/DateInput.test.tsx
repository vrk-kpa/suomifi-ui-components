import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { DateInput } from './DateInput';

describe('snapshots match', () => {
  describe('date input', () => {
    test('minimal implementation', () => {
      const { baseElement } = render(<DateInput labelText="Date" />);
      expect(baseElement).toMatchSnapshot();
      cleanup();
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
      cleanup();
    });

    test('hint text', () => {
      const { baseElement } = render(
        <DateInput labelText="Date" hintText="User format D.M.YYYY" />,
      );
      expect(baseElement).toMatchSnapshot();
      cleanup();
    });

    test('optional text', () => {
      const { baseElement } = render(
        <DateInput labelText="Date" optionalText="optional" />,
      );
      expect(baseElement).toMatchSnapshot();
      cleanup();
    });

    test('success status with statustext', () => {
      const { baseElement } = render(
        <DateInput labelText="Date" statusText="Success" status="success" />,
      );
      expect(baseElement).toMatchSnapshot();
      cleanup();
    });

    test('error status with statustext', () => {
      const { baseElement } = render(
        <DateInput labelText="Date" statusText="Error" status="error" />,
      );
      expect(baseElement).toMatchSnapshot();
      cleanup();
    });
  });

  describe('date input with datepicker', () => {
    beforeAll(() => {
      jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    test('with smallScreen', () => {
      const { baseElement, getByRole } = render(
        <DateInput
          labelText="Date"
          visualPlaceholder="DateInput"
          smallScreen
          datePickerEnabled
          value="15.1.2020"
        />,
      );
      fireEvent.click(getByRole('button'));
      expect(baseElement).toMatchSnapshot();
      cleanup();
    });

    test('with controlled input value', () => {
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
      cleanup();
    });
  });
});

describe('keyboard events', () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2010-01-01'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('closes dialog with Escape', () => {
    const { baseElement, getByRole } = render(
      <DateInput labelText="Date" datePickerEnabled />,
    );
    fireEvent.click(getByRole('button'));
    expect(baseElement.querySelector('[role="dialog"]')).toBeVisible();
    fireEvent.keyDown(baseElement, {
      key: 'Escape',
    });
    expect(baseElement.querySelector('[role="dialog"]')).not.toBeVisible();
    cleanup();
  });
});

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
      cleanup();
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
      cleanup();
    });

    it('calls onChange when date is selected', () => {
      const mockOnChange = jest.fn();
      const { getByRole, getAllByText } = render(
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
      expect(mockOnChange).toBeCalledWith({
        value: '1.1.2020',
        date: new Date(2020, 0, 1),
      });
      cleanup();
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
      cleanup();
    });
  });

  describe('onBlur', () => {
    it('calls onBlur when input is blurred', () => {
      const mockOnBlur = jest.fn();
      const { getByRole } = render(
        <DateInput labelText="Date" onBlur={mockOnBlur} />,
      );
      fireEvent.click(getByRole('textbox'));
      fireEvent.blur(getByRole('textbox'));
      expect(mockOnBlur).toBeCalledTimes(1);
      cleanup();
    });
  });

  describe('onDatePickerButtonBlur', () => {
    it('calls onBlur when date picker button is blurred', () => {
      const mockOnBlur = jest.fn();
      const { getByRole } = render(
        <DateInput
          labelText="Date"
          datePickerEnabled
          onDatePickerButtonBlur={mockOnBlur}
        />,
      );
      fireEvent.focus(getByRole('button'));
      fireEvent.blur(getByRole('button'));
      expect(mockOnBlur).toBeCalledTimes(1);
      cleanup();
    });
  });
});

describe('props', () => {
  describe('labelText', () => {
    it('has text in label', () => {
      const { getByText } = render(<DateInput labelText="Start date" />);
      const label = getByText('Start date');
      expect(label.tagName).toBe('LABEL');
      cleanup();
    });
  });

  describe('labelMode', () => {
    it('has label visually hidden', () => {
      const { getByText } = render(
        <DateInput labelText="Start date" labelMode="hidden" />,
      );
      const label = getByText('Start date');
      expect(label).toHaveClass('fi-visually-hidden');
      cleanup();
    });
  });

  describe('hintText', () => {
    it('has hint text', () => {
      const { getByText } = render(
        <DateInput labelText="Date" hintText="Use format D.M.YYYY" />,
      );
      const span = getByText('Use format D.M.YYYY');
      expect(span).toBeDefined();
      cleanup();
    });
  });

  describe('optionlText', () => {
    it('has optional text', () => {
      const { getByText } = render(
        <DateInput labelText="Date" optionalText="optional" />,
      );
      const span = getByText('(optional)');
      expect(span).toBeDefined();
      cleanup();
    });
  });

  describe('className', () => {
    it('has user given className', () => {
      const { baseElement } = render(
        <DateInput labelText="Date" className="custom-class" />,
      );
      const div = baseElement.querySelector('.fi-date-input');
      expect(div).toHaveClass('custom-class');
      cleanup();
    });
  });

  describe('datePickerProps', () => {
    it('has user given className', () => {
      const { baseElement } = render(
        <DateInput
          labelText="Date"
          datePickerEnabled
          datePickerProps={{
            className: 'custom-datePicker-class',
            'aria-disabled': true,
          }}
        />,
      );
      const datePicker = baseElement.querySelector('.fi-date-picker');
      expect(datePicker).toHaveClass('custom-datePicker-class');
      expect(datePicker).toHaveAttribute('aria-disabled');
      cleanup();
    });

    describe('maxDate', () => {
      beforeAll(() => {
        jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
      });

      afterAll(() => {
        jest.useRealTimers();
      });

      it('has next date as table cell (instead of button)', () => {
        const { getByRole, getByText } = render(
          <DateInput
            labelText="Date"
            datePickerEnabled
            maxDate={new Date(2020, 0, 15)}
          />,
        );
        fireEvent.click(getByRole('button'));
        const dateCell = getByText('16');
        expect(dateCell.tagName).toBe('TD');
        cleanup();
      });

      it('has next years removed from dropdown', () => {
        const { baseElement, getByRole } = render(
          <DateInput
            labelText="Date"
            datePickerEnabled
            maxDate={new Date(2020, 0, 15)}
          />,
        );
        fireEvent.click(getByRole('button'));
        const dropdown = baseElement.querySelector(
          '.fi-date-selectors_year-select',
        );
        const dropdownButton = dropdown?.querySelector('.fi-dropdown_button');
        if (dropdownButton) {
          fireEvent.click(dropdownButton);
          const lis = dropdown?.querySelectorAll('li');
          expect(lis?.length).toBe(11);
          expect(lis?.[10]).toHaveTextContent('2020');
        }
        cleanup();
      });

      it('has next months removed from dropdown', () => {
        const { baseElement, getByRole } = render(
          <DateInput
            labelText="Date"
            datePickerEnabled
            maxDate={new Date(2020, 0, 15)}
          />,
        );
        fireEvent.click(getByRole('button'));
        const dropdown = baseElement.querySelector(
          '.fi-date-selectors_month-select',
        );
        const dropdownButton = dropdown?.querySelector('.fi-dropdown_button');
        if (dropdownButton) {
          fireEvent.click(dropdownButton);
          const lis = dropdown?.querySelectorAll('li');
          expect(lis?.[0]).toHaveTextContent('Tammikuu');
          expect(lis?.length).toBe(1);
        }
      });

      it('has next month button disabled', () => {
        const { baseElement, getByRole } = render(
          <DateInput
            labelText="Date"
            datePickerEnabled
            maxDate={new Date(2020, 0, 15)}
          />,
        );
        fireEvent.click(getByRole('button'));
        const button = baseElement.querySelectorAll(
          '.fi-date-selectors_month-button',
        )[1];
        expect(button).toBeDisabled();
        cleanup();
      });
    });

    describe('minDate', () => {
      beforeAll(() => {
        jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
      });

      afterAll(() => {
        jest.useRealTimers();
      });

      it('has previous date as table cell (instead of button)', () => {
        const { getByRole, getByText } = render(
          <DateInput
            labelText="Date"
            datePickerEnabled
            minDate={new Date(2020, 6, 15)}
          />,
        );
        fireEvent.click(getByRole('button'));
        const dateCell = getByText('14');
        expect(dateCell.tagName).toBe('TD');
        cleanup();
      });

      it('has previous years removed from dropdown', () => {
        const { baseElement, getByRole } = render(
          <DateInput
            labelText="Date"
            datePickerEnabled
            minDate={new Date(2020, 6, 15)}
          />,
        );
        fireEvent.click(getByRole('button'));
        const dropdown = baseElement.querySelector(
          '.fi-date-selectors_year-select',
        );
        const dropdownButton = dropdown?.querySelector('.fi-dropdown_button');
        if (dropdownButton) {
          fireEvent.click(dropdownButton);
          const lis = dropdown?.querySelectorAll('li');
          expect(lis?.[0]).toHaveTextContent('2020');
          expect(lis?.length).toBe(11);
        }
        cleanup();
      });

      it('has previous months removed from dropdown', () => {
        const { baseElement, getByRole } = render(
          <DateInput
            labelText="Date"
            datePickerEnabled
            minDate={new Date(2020, 6, 15)}
          />,
        );
        fireEvent.click(getByRole('button'));
        const dropdown = baseElement.querySelector(
          '.fi-date-selectors_month-select',
        );
        const dropdownButton = dropdown?.querySelector('.fi-dropdown_button');
        if (dropdownButton) {
          fireEvent.click(dropdownButton);
          const lis = dropdown?.querySelectorAll('li');
          expect(lis?.[0]).toHaveTextContent('Heinäkuu');
          expect(lis?.length).toBe(6);
        }
        cleanup();
      });

      it('has previous month button disabled', () => {
        const { baseElement, getByRole } = render(
          <DateInput
            labelText="Date"
            datePickerEnabled
            minDate={new Date(2020, 6, 15)}
          />,
        );
        fireEvent.click(getByRole('button'));
        const button = baseElement.querySelectorAll(
          '.fi-date-selectors_month-button',
        )[0];
        expect(button).toBeDisabled();
      });
      cleanup();
    });

    describe('initialDate', () => {
      beforeAll(() => {
        jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
      });

      afterAll(() => {
        jest.useRealTimers();
      });

      it('has correct date', () => {
        const { getByRole, getByText } = render(
          <DateInput
            labelText="Date"
            datePickerEnabled
            initialDate={new Date(2015, 5, 15)}
          />,
        );
        fireEvent.click(getByRole('button'));
        const dateButton = getByText('15').closest('button');
        expect(dateButton).toHaveAttribute(
          'aria-label',
          '15 maanantai Kesäkuu 2015',
        );
        cleanup();
      });

      it('has focus', () => {
        const { getByRole, getByText } = render(
          <DateInput
            labelText="Date"
            datePickerEnabled
            initialDate={new Date(2015, 5, 15)}
          />,
        );
        fireEvent.click(getByRole('button'));
        const dateButton = getByText('15').closest('button');
        expect(dateButton).toHaveFocus();
        cleanup();
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
        expect(dateButton).toHaveAttribute(
          'aria-label',
          '15 lauantai Elokuu 2020 Valittu päivä',
        );
        cleanup();
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
        const dateButton = getByText('16').closest(
          'button',
        ) as HTMLButtonElement;
        fireEvent.click(dateButton);
        expect(getByRole('textbox')).toHaveValue('2020-1-16');
        cleanup();
      });

      describe('datePickerEnabled', () => {
        it('has no datePicker wrapper div when false', () => {
          const { baseElement } = render(<DateInput labelText="Date" />);
          const div = baseElement.querySelector(
            '.fi-date-input_picker-element-container',
          );
          expect(div).toBeNull();
          cleanup();
        });

        it('has datePicker wrapper div when true', () => {
          const { baseElement } = render(
            <DateInput labelText="Date" datePickerEnabled />,
          );
          const div = baseElement.querySelector(
            '.fi-date-input_picker-element-container',
          );
          expect(div).not.toBeNull();
          cleanup();
        });
      });

      describe('language', () => {
        it('has Finnish language option', () => {
          const { getByRole } = render(
            <DateInput labelText="Date" datePickerEnabled language="fi" />,
          );
          expect(getByRole('button')).toHaveTextContent('Valitse päivämäärä');
          cleanup();
        });

        it('has English language option', () => {
          const { getByRole } = render(
            <DateInput labelText="Date" datePickerEnabled language="en" />,
          );
          expect(getByRole('button')).toHaveTextContent('Choose date');
          cleanup();
        });

        it('has Swedish language option', () => {
          const { getByRole } = render(
            <DateInput labelText="Date" datePickerEnabled language="sv" />,
          );
          expect(getByRole('button')).toHaveTextContent('Välj datum');
          cleanup();
        });
      });

      describe('datePickerTexts', () => {
        beforeAll(() => {
          jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
        });

        afterAll(() => {
          jest.useRealTimers();
        });

        it('overwrites text in open button', () => {
          const { getByRole } = render(
            <DateInput
              labelText="Date"
              datePickerEnabled
              datePickerTexts={{ openButtonLabel: 'Avaa kalenteri ' }}
            />,
          );
          expect(getByRole('button')).toHaveTextContent('Avaa kalenteri');
          cleanup();
        });

        it('overwrites texts in previous month button', () => {
          const { baseElement, getByRole } = render(
            <DateInput
              labelText="Date"
              datePickerEnabled
              datePickerTexts={{ prevMonthButtonLabel: 'vorheriger Monat' }}
            />,
          );
          fireEvent.click(getByRole('button'));
          const button = baseElement.querySelectorAll(
            '.fi-date-selectors_month-button',
          )[0];
          expect(button).toHaveAttribute(
            'aria-label',
            'vorheriger Monat Joulukuu',
          );
          cleanup();
        });
      });

      describe('debounce', () => {
        it('delays the running of onChange by the given time', () => {
          jest.useFakeTimers();
          const mockOnChange = jest.fn();
          const { getByRole } = render(
            <DateInput
              labelText="Date"
              debounce={1000}
              onChange={mockOnChange}
            />,
          );
          fireEvent.change(getByRole('textbox'), { target: { value: '1.1.' } });
          fireEvent.change(getByRole('textbox'), {
            target: { value: '1.1.2022' },
          });
          expect(getByRole('textbox')).toHaveValue('1.1.2022');
          expect(mockOnChange).not.toBeCalled();
          jest.advanceTimersByTime(1000);
          expect(mockOnChange).toBeCalledTimes(1);
          cleanup();
        });

        it('resolves right away when no debounce is given', () => {
          const mockOnChange = jest.fn();
          const { getByRole } = render(
            <DateInput labelText="Date" onChange={mockOnChange} />,
          );
          fireEvent.change(getByRole('textbox'), { target: { value: '1.1.' } });
          fireEvent.change(getByRole('textbox'), {
            target: { value: '1.1.2022' },
          });
          expect(mockOnChange).toBeCalledTimes(2);
          cleanup();
        });
      });

      describe('disabled', () => {
        it('has input field disabled', () => {
          const { getByRole } = render(<DateInput labelText="Date" disabled />);
          expect(getByRole('textbox')).toHaveAttribute('disabled');
          cleanup();
        });

        it('has date picker button disabled', () => {
          const { getByRole } = render(
            <DateInput labelText="Date" datePickerEnabled disabled />,
          );
          expect(getByRole('button')).toHaveAttribute('disabled');
          cleanup();
        });
      });

      describe('statusText', () => {
        it('has status text defined by prop', () => {
          const { getByText } = render(
            <DateInput labelText="Date" statusText="Test status" />,
          );
          expect(getByText('Test status')).toBeDefined();
          cleanup();
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
          cleanup();
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
          cleanup();
        });
      });

      describe('smallScreen', () => {
        beforeAll(() => {
          jest.useFakeTimers().setSystemTime(new Date('2020-01-15'));
        });

        afterAll(() => {
          jest.useRealTimers();
        });

        describe('not enabled', () => {
          it('has position fixed', () => {
            const { baseElement } = render(
              <DateInput labelText="Date" datePickerEnabled />,
            );
            const dialog = baseElement.querySelector('[role="dialog"]');
            expect(dialog).toHaveClass('fi-date-picker');
            expect(dialog).toHaveStyle('position: fixed');
            cleanup();
          });
        });

        describe('enabled', () => {
          it('does not have position fixed', () => {
            const { baseElement } = render(
              <DateInput labelText="Date" smallScreen datePickerEnabled />,
            );
            const dialog = baseElement.querySelector('.fi-date-picker');
            expect(dialog).toHaveClass('fi-date-picker--small-screen');
            expect(dialog).not.toHaveAttribute('style');
            cleanup();
          });

          it('has current date focused in smallScreen variant', () => {
            const { getByRole, getByText } = render(
              <DateInput labelText="Date" smallScreen datePickerEnabled />,
            );
            fireEvent.click(getByRole('button'));
            const dateButton = getByText('15').closest(
              'button',
            ) as HTMLButtonElement;
            expect(dateButton).toHaveAttribute(
              'aria-label',
              '15 keskiviikko Tammikuu 2020',
            );
            expect(dateButton).toHaveFocus();
            cleanup();
          });
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
          cleanup();
        });

        it('has user given value selected in calendar', () => {
          const { getByRole, baseElement } = render(
            <DateInput labelText="Date" datePickerEnabled value="1.5.2020" />,
          );
          fireEvent.click(getByRole('button'));
          const dateButton = baseElement.querySelector(
            '.fi-month-day_button--selected',
          );
          expect(dateButton).toHaveAttribute(
            'aria-label',
            '1 perjantai Toukokuu 2020 Valittu päivä',
          );
          cleanup();
        });

        it('has user given value focused in calendar', () => {
          const { getByRole, baseElement } = render(
            <DateInput labelText="Date" datePickerEnabled value="1.5.2020" />,
          );
          fireEvent.click(getByRole('button'));
          const dateButton = baseElement.querySelector(
            '.fi-month-day_button--selected',
          );
          expect(dateButton).toHaveAttribute(
            'aria-label',
            '1 perjantai Toukokuu 2020 Valittu päivä',
          );
          expect(dateButton).toHaveFocus();
          cleanup();
        });
      });

      describe('visualPlaceholder', () => {
        it('does not have placeholder by default', () => {
          const { getByRole } = render(<DateInput labelText="Date" />);
          expect(getByRole('textbox')).not.toHaveAttribute('placeholder');
          cleanup();
        });

        it('has given text', () => {
          const { getByRole } = render(
            <DateInput labelText="Date" visualPlaceholder="1.1.2022" />,
          );
          expect(getByRole('textbox')).toHaveAttribute(
            'placeholder',
            '1.1.2022',
          );
          cleanup();
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
            cleanup();
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
            expect(dateButton).toHaveAttribute(
              'aria-label',
              '31 perjantai Tammikuu 2020 Valittu päivä',
            );
            cleanup();
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
            expect(dateButton).toHaveAttribute(
              'aria-label',
              '31 perjantai Tammikuu 2020 Valittu päivä',
            );
            expect(dateButton).toHaveFocus();
            cleanup();
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
            cleanup();
          });
        });
      });

      describe('margin', () => {
        it('has margin style from margin prop', () => {
          const { baseElement } = render(
            <DateInput labelText="Date" margin="xs" />,
          );
          const div = baseElement.querySelector('.fi-date-input');
          expect(div).toHaveStyle('margin: 10px');
          cleanup();
        });

        it('has margin style overwritten by style prop', () => {
          const { baseElement } = render(
            <DateInput style={{ margin: 2 }} labelText="Date" margin="xs" />,
          );
          const div = baseElement.querySelector('.fi-date-input');
          expect(div).toHaveAttribute('style', 'margin: 2px;');
          cleanup();
        });
      });
    });
  });
});
