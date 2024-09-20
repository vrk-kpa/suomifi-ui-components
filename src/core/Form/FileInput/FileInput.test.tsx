import React from 'react';
import { render } from '@testing-library/react';
import { FileInput } from './FileInput';
import { axeTest } from '../../../utils/test';

const commonProps = {
  labelText: 'Resume',
  inputButtonText: 'Choose file',
  dragAreaText: 'Drag and drop files here',
  removeFileText: 'Remove',
  addedFileAriaText: 'Added file: ',
  'data-testid': 'file-input',
};

describe('snapshots match', () => {
  test('minimal implementation', () => {
    const inputRendered = render(<FileInput {...commonProps} />);
    const { container } = inputRendered;
    expect(container.firstChild).toMatchSnapshot();
  });

  test('hint text', () => {
    const { baseElement } = render(
      <FileInput {...commonProps} hintText="Maximum file size is 1 MB" />,
    );
    expect(baseElement).toMatchSnapshot();
  });

  test('hidden label', () => {
    const inputRendered = render(
      <FileInput {...commonProps} labelMode="hidden" />,
    );
    const { container } = inputRendered;
    expect(container.firstChild).toMatchSnapshot();
  });

  test('error status with statustext', () => {
    const inputRendered = render(
      <FileInput
        {...commonProps}
        statusText="This is a status text"
        status="error"
      />,
    );
    const { container } = inputRendered;
    expect(container.firstChild).toMatchSnapshot();
  });
});

test(
  'should not have basic accessibility issues',
  axeTest(<FileInput {...commonProps} />),
);

describe('props', () => {
  describe('with only minimum props', () => {
    it('has user given aria-describedby on input', () => {
      const { getByTestId } = render(
        <FileInput {...commonProps} aria-describedby="external-component-id" />,
      );
      expect(getByTestId('file-input')).toHaveAttribute(
        'aria-describedby',
        'external-component-id',
      );
    });
  });

  describe('className', () => {
    it('has the given custom className', () => {
      const { container } = render(
        <FileInput {...commonProps} className="custom-style" />,
      );
      expect(container.firstChild).toHaveClass('custom-style');
    });
  });

  describe('margin', () => {
    it('should have margin style from margin prop', () => {
      const { container } = render(<FileInput {...commonProps} margin="xs" />);
      expect(container.firstChild).toHaveStyle('margin: 10px');
    });

    it('should have margin prop overwritten by style prop', () => {
      const { container } = render(
        <FileInput {...commonProps} margin="xs" style={{ margin: 2 }} />,
      );
      expect(container.firstChild).toHaveAttribute('style', 'margin: 2px;');
    });
  });

  describe('hintText', () => {
    it('has the hint text element', () => {
      const { getByText } = render(
        <FileInput {...commonProps} hintText="Example hint text" />,
      );
      const hintText = getByText('Example hint text');
      expect(hintText).toHaveClass('fi-hint-text');
    });

    it('will be added to input aria-describedby', () => {
      const { getByTestId } = render(
        <FileInput {...commonProps} id="123" hintText="Example hint text" />,
      );
      expect(getByTestId('file-input')).toHaveAttribute(
        'aria-describedby',
        '123-hintText',
      );
    });
  });

  describe('statusText', () => {
    it('has the status text element', () => {
      const { getByText } = render(
        <FileInput {...commonProps} statusText="Example status text" />,
      );
      const statusText = getByText('Example status text');
      expect(statusText).toHaveClass('fi-status-text');
    });

    it('will be added to input aria-describedby', () => {
      const { getByTestId } = render(
        <FileInput
          {...commonProps}
          id="123"
          statusText="Example status text"
        />,
      );
      expect(getByTestId('file-input')).toHaveAttribute(
        'aria-describedby',
        '123-statusText',
      );
    });
  });

  describe('labelText', () => {
    it('should be found ', () => {
      const { getByText } = render(<FileInput {...commonProps} />);
      const label = getByText('Resume');
      expect(label).toHaveClass('fi-label_label-span');
    });
  });

  describe('optionalText', () => {
    it('should have element and correct classname for it', () => {
      const { getByText } = render(
        <FileInput {...commonProps} optionalText="Optional" />,
      );
      const optionalText = getByText('(Optional)');
      expect(optionalText).toHaveClass('fi-label_optional-text');
    });
  });

  describe('labelMode', () => {
    it('should be visible by default', () => {
      const { getByText } = render(<FileInput {...commonProps} />);
      const label = getByText('Resume');
      expect(label).toHaveClass('fi-label_label-span');
    });

    it('should be hidden', () => {
      const { getByText } = render(
        <FileInput {...commonProps} labelMode="hidden" />,
      );
      const label = getByText('Resume');
      expect(label).toHaveClass('fi-visually-hidden');
    });
  });

  describe('inputButtonText', () => {
    it('should be visible when no file is selected', () => {
      const { getByText } = render(<FileInput {...commonProps} />);
      const button = getByText('Choose file');
      expect(button).toBeInTheDocument();
    });
  });

  describe('dragAreaText', () => {
    it('should be visible when no file is selected', () => {
      const { getByText } = render(<FileInput {...commonProps} />);
      const dragArea = getByText('Drag and drop files here');
      expect(dragArea).toHaveClass('fi-file-input_drag-text-container');
    });
  });
});
