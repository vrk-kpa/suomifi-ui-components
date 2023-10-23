import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { axeTest } from '../../../utils/test';

import { Textarea } from './Textarea';

describe('snapshot', () => {
  test('default structure should match snapshot', () => {
    const { container } = render(
      <Textarea id="just-for-snapshot-to-be-same" labelText="Label text" />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('props', () => {
  describe('default structure, with default props', () => {
    const DefaultTextareaComponent = <Textarea labelText="Label here" />;

    it('should have baseClassName', () => {
      const { container } = render(DefaultTextareaComponent);
      expect(container.firstChild).toHaveClass('fi-textarea');
    });

    it('should have <textarea< HTML-element with correct class ', () => {
      const { getByRole } = render(DefaultTextareaComponent);
      const textarea = getByRole('textbox');
      expect(textarea).toHaveClass('fi-textarea_textarea');
    });

    it('should have label text with correct class', () => {
      const { getByText } = render(DefaultTextareaComponent);
      const label = getByText('Label here');
      expect(label).toHaveClass('fi-label_label-span');
    });

    it('has user given aria-describedby on textarea', () => {
      const { getByRole } = render(
        <Textarea
          labelText="Label here"
          aria-describedby="external-component-id"
        />,
      );
      expect(getByRole('textbox')).toHaveAttribute(
        'aria-describedby',
        'external-component-id',
      );
    });

    it(
      'should not have basic accessibility issues',
      axeTest(DefaultTextareaComponent),
    );
  });

  describe('className', () => {
    it('should have the given custom classname ', () => {
      const { container } = render(
        <Textarea labelText="label" className="custom-classname" />,
      );
      expect(container.firstChild).toHaveClass('custom-classname');
    });
  });

  describe('disabled', () => {
    it('should have disabled attribute and correct class', () => {
      const { container, getByRole } = render(
        <Textarea labelText="label" disabled />,
      );
      expect(container.firstChild).toHaveClass('fi-textarea--disabled');
      const textarea = getByRole('textbox');
      expect(textarea).toHaveAttribute('disabled');
    });
  });

  describe('onBlur', () => {
    test('should notice when leaving area', () => {
      const mockOnBlur = jest.fn();
      const { getByRole } = render(
        <Textarea labelText="label" onBlur={mockOnBlur} />,
      );
      const textarea = getByRole('textbox');
      fireEvent.blur(textarea);
      expect(mockOnBlur).toBeCalledTimes(1);
    });
  });

  describe('onClick', () => {
    it('should notice click', () => {
      const mockOnClick = jest.fn();
      const { getByRole } = render(
        <Textarea labelText="label" onClick={mockOnClick} />,
      );
      const textarea = getByRole('textbox');
      fireEvent.mouseDown(textarea);
      expect(mockOnClick).toBeCalledTimes(1);
    });
  });

  describe('onChange', () => {
    it('should notice change and have the given text', () => {
      const mockOnChange = jest.fn();
      const { getByRole } = render(
        <Textarea labelText="label" onChange={mockOnChange} />,
      );
      const textarea = getByRole('textbox') as HTMLTextAreaElement;
      fireEvent.change(textarea, { target: { value: 'abc' } });
      expect(mockOnChange).toBeCalledTimes(1);
      expect(textarea.value).toBe('abc');
    });
  });

  describe('labelText', () => {
    it('should have the given text on start and after changing to new', () => {
      const { rerender, queryByText } = render(
        <Textarea labelText="Summer time" />,
      );
      expect(queryByText('Summer time')).not.toBeNull();
      rerender(<Textarea labelText="Winter is coming" />);
      expect(queryByText('Winter is coming')).not.toBeNull();
    });
  });

  describe('labelMode', () => {
    it('hidden: should hide label; label to have visually-hidden classname', () => {
      const { getByText } = render(
        <Textarea labelText="To be hidden" labelMode="hidden" />,
      );
      const label = getByText('To be hidden');
      expect(label).toHaveClass('fi-visually-hidden');
    });
  });

  describe('visualPlaceholder', () => {
    it('should have the given text as attribute', () => {
      const { getByRole } = render(
        <Textarea
          labelText="To be hidden"
          visualPlaceholder="Enter text here"
        />,
      );
      const textarea = getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea).toHaveAttribute('placeholder', 'Enter text here');
    });
  });

  describe('children', () => {
    it('should have given children as content for textarea', () => {
      const { getByRole } = render(
        <Textarea labelText="label">Text written!</Textarea>,
      );
      const textarea = getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea).toHaveTextContent('Text written!');
    });
  });

  describe('hintText', () => {
    it('should have element and correct classname for it', () => {
      const { getByText } = render(
        <Textarea labelText="label" hintText="Example hint text" />,
      );
      const hintText = getByText('Example hint text');
      expect(hintText).toHaveClass('fi-hint-text');
    });

    it('will be added to input aria-describedby', () => {
      const { getByRole } = render(
        <Textarea id="123" labelText="label" hintText="Example hint text" />,
      );
      expect(getByRole('textbox')).toHaveAttribute(
        'aria-describedby',
        '123-hintText',
      );
    });
  });

  describe('statusText', () => {
    it('should have element and correct classname for it', () => {
      const { getByText } = render(
        <Textarea labelText="label" statusText="EROR EROR" />,
      );
      const statusText = getByText('EROR EROR');
      expect(statusText).toHaveClass('fi-status-text');
    });

    it('will be added to input aria-describedby', () => {
      const { getByRole } = render(
        <Textarea
          id="123"
          labelText="label"
          statusText="Example status text"
        />,
      );
      expect(getByRole('textbox')).toHaveAttribute(
        'aria-describedby',
        '123-statusText',
      );
    });
  });

  describe('status', () => {
    it('should have error classname', () => {
      const { container } = render(
        <Textarea labelText="label" status="error" statusText="EROR EROR" />,
      );
      expect(container.firstChild).toHaveClass('fi-textarea--error');
    });
  });

  describe('optionalText', () => {
    it('should have element and correct classname for it', () => {
      const { getByText } = render(
        <Textarea labelText="label" optionalText="Optional" />,
      );
      const optionalText = getByText('(Optional)');
      expect(optionalText).toHaveClass('fi-label_optional-text');
    });
  });

  describe('resize', () => {
    it('allows only vertical resizing', () => {
      const { getByRole } = render(
        <Textarea labelText="label" resize="vertical" />,
      );
      const textarea = getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea).toHaveStyle('resize: vertical');
    });

    it('allows only horizontal resizing', () => {
      const { getByRole } = render(
        <Textarea labelText="label" resize="horizontal" />,
      );
      const textarea = getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea).toHaveStyle('resize: horizontal');
    });

    it('allows horizontal and resizing', () => {
      const { getByRole } = render(
        <Textarea labelText="label" resize="both" />,
      );
      const textarea = getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea).toHaveStyle('resize: both');
    });

    it('does not allow resizing', () => {
      const { getByRole } = render(
        <Textarea labelText="label" resize="none" />,
      );
      const textarea = getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea).toHaveStyle('resize: none');
    });
  });

  describe('name', () => {
    it('has the given name attribute', () => {
      const { getByRole } = render(
        <Textarea labelText="label" resize="vertical" name="test-name" />,
      );
      const textarea = getByRole('textbox') as HTMLInputElement;
      expect(textarea.name).toBe('test-name');
    });
  });

  describe('id', () => {
    it('has the given id', () => {
      const { getByRole } = render(
        <Textarea labelText="label" id="custom-id" />,
      );
      expect(getByRole('textbox')).toHaveAttribute('id', 'custom-id');
    });
  });

  describe('fullWidth', () => {
    it('has the required classname', () => {
      const { container } = render(<Textarea labelText="label" fullWidth />);
      expect(container.firstChild).toHaveClass('fi-textarea--full-width');
    });
  });

  describe('margin', () => {
    it('should have margin style from margin prop', () => {
      const { container } = render(<Textarea labelText="" margin="xs" />);
      expect(container.firstChild).toHaveAttribute('style', 'margin: 10px;');
    });

    it('should have margin prop overwritten from containerProps', () => {
      const { container } = render(
        <Textarea labelText="" margin="xs" style={{ margin: 2 }} />,
      );
      expect(container.firstChild).toHaveAttribute('style', 'margin: 2px;');
    });
  });

  describe('containerProps', () => {
    it('has the given props on the container', () => {
      const { container } = render(
        <Textarea labelText="label" style={{ width: '100px' }} />,
      );
      expect(container.firstChild).toHaveAttribute('style', 'width: 100px;');
    });
  });

  describe('Character counter', () => {
    beforeAll(() => {
      jest.useFakeTimers();
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('should display character count', () => {
      const { container, getByRole } = render(
        <Textarea
          labelText="label"
          characterLimit={20}
          ariaCharactersRemainingText={(amount) =>
            `You have ${amount} characters remaining`
          }
          ariaCharactersExceededText={(amount) =>
            `You have ${amount} characters too many`
          }
        >
          Lorem ipsum
        </Textarea>,
      );
      expect(
        container.getElementsByClassName('fi-textarea_character-counter')
          .length,
      ).toBe(1);
      expect(
        container.getElementsByClassName('fi-textarea_character-counter')[0],
      ).toHaveTextContent('11/20');

      const textarea = getByRole('textbox') as HTMLTextAreaElement;
      fireEvent.change(textarea, {
        target: { value: 'Lorem ipsum dolor sit amet' },
      });

      expect(
        container.getElementsByClassName('fi-textarea_character-counter')[0],
      ).toHaveTextContent('26/20');
    });

    it('should have correct screen reader status text', () => {
      const { container, getByTestId } = render(
        <Textarea
          labelText="label"
          defaultValue="Lorem ipsum"
          data-testid="cc-textarea"
          characterLimit={20}
          ariaCharactersRemainingText={(amount) =>
            `You have ${amount} characters remaining`
          }
          ariaCharactersExceededText={(amount) =>
            `You have ${amount} characters too many`
          }
        />,
      );

      expect(
        container.getElementsByClassName('fi-status-text')[0].firstChild,
      ).toHaveTextContent('');

      const textInput = getByTestId('cc-textarea') as HTMLTextAreaElement;

      fireEvent.change(textInput, {
        target: { value: 'Lorem ipsum dolor sit amet' },
      });

      // Testing if the delayed update works as intended
      expect(
        container.getElementsByClassName('fi-status-text')[0].firstChild,
      ).toHaveTextContent('');

      act(() => {
        jest.advanceTimersByTime(2000);
      });

      expect(
        container.getElementsByClassName('fi-status-text')[0].firstChild,
      ).toHaveTextContent('You have 6 characters too many');
    });
  });
});
