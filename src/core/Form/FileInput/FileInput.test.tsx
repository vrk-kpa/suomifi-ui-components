import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import { FileInput } from './FileInput';
import { axeTest, createFileList, DataTransferMock } from '../../../utils/test';

/** jsdom does not implement URL.createObjectURL, which FileItem uses for preview links */
beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => 'blob:preview-url');
});

/** File with a controllable size, since jsdom derives size from the content */
const createTestFile = (
  name: string,
  size: number,
  type = 'application/pdf',
) => {
  const file = new File(['test'], name, { type });
  Object.defineProperty(file, 'size', { value: size });
  return file;
};

/** Simulates dropping files onto the component's drag area */
const dropFiles = (view: RenderResult, files: File[]) => {
  const dataTransfer = new DataTransferMock();
  files.forEach((file) => dataTransfer.items.add(file));
  const dragArea = view.container.querySelector('.fi-file-input_drag-area');
  fireEvent.drop(dragArea as Element, { dataTransfer });
};

/**
 * Simulates picking files from the file dialog.
 * NOTE: userEvent.upload() cannot be used here. It redefines input.files as a
 * getter-only property, which breaks the component's `inputRef.current.files = ...`
 * assignments.
 */
const selectFiles = (view: RenderResult, files: File[]) => {
  fireEvent.change(view.getByTestId('file-input'), {
    target: { files: createFileList(files) },
  });
};

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

describe('drag and drop', () => {
  it('adds a dropped file to the input and calls onChange with it', () => {
    const onChange = jest.fn();
    const { container, getByText, getByTestId } = render(
      <FileInput {...commonProps} onChange={onChange} />,
    );

    const file = new File(['cv contents'], 'resume.pdf', {
      type: 'application/pdf',
    });
    const dataTransfer = new DataTransferMock();
    dataTransfer.items.add(file);

    const dragArea = container.querySelector('.fi-file-input_drag-area');
    fireEvent.drop(dragArea as Element, { dataTransfer });

    // The file is rendered as a file item
    expect(getByText('resume.pdf')).toBeInTheDocument();

    // ...and written to the underlying input element
    const input = getByTestId('file-input') as HTMLInputElement;
    expect(input.files).toHaveLength(1);
    expect(input.files?.[0]).toBe(file);

    // ...and reported to the consumer as a FileList
    expect(onChange).toHaveBeenCalledTimes(1);
    const changedFiles = onChange.mock.calls[0][0] as FileList;
    expect(changedFiles).toBeInstanceOf(FileList);
    expect(Array.from(changedFiles)).toEqual([file]);
  });
});

describe('selecting a single file', () => {
  it('renders the file name and a human readable file size', () => {
    const view = render(<FileInput {...commonProps} />);
    dropFiles(view, [createTestFile('resume.pdf', 2048)]);

    const fileItem = view.container.querySelector('.fi-file-input_file-item');
    expect(fileItem).toBeInTheDocument();
    expect(view.getByText('resume.pdf')).toHaveClass('fi-file-input_file-name');
    expect(view.getByText('2.0 KB')).toHaveClass('fi-file-input_file-size');
  });

  it('formats file sizes in B, KB and MB', () => {
    const cases: [number, string][] = [
      [512, '512 B'],
      [2048, '2.0 KB'],
      [5 * 1024 * 1024, '5.0 MB'],
    ];
    cases.forEach(([size, expected]) => {
      const view = render(<FileInput {...commonProps} />);
      dropFiles(view, [createTestFile('resume.pdf', size)]);
      expect(view.getByText(expected)).toBeInTheDocument();
      view.unmount();
    });
  });

  it('hides the file selection UI and takes the input out of tab order', () => {
    const view = render(<FileInput {...commonProps} />);
    const dragArea = view.container.querySelector('.fi-file-input_drag-area');
    const inputWrapper = view.container.querySelector(
      '.fi-file-input_input-wrapper',
    );

    expect(dragArea).not.toHaveClass('fi-file-input_drag-area--has-file');
    expect(inputWrapper).not.toHaveClass('fi-file-input_input-wrapper--hidden');
    expect(view.getByTestId('file-input')).toHaveAttribute('tabindex', '0');

    dropFiles(view, [createTestFile('resume.pdf', 2048)]);

    expect(dragArea).toHaveClass('fi-file-input_drag-area--has-file');
    expect(inputWrapper).toHaveClass('fi-file-input_input-wrapper--hidden');
    expect(view.getByTestId('file-input')).toHaveAttribute('tabindex', '-1');
  });

  it('describes the file for assistive technology', () => {
    const view = render(<FileInput {...commonProps} />);
    dropFiles(view, [createTestFile('resume.pdf', 2048)]);

    expect(view.getByText('resume.pdf')).toHaveAttribute(
      'aria-label',
      expect.stringContaining('Added file:'),
    );
    expect(
      view.getByRole('button', { name: 'Remove resume.pdf' }),
    ).toBeInTheDocument();
  });

  it('replaces the previous file when a new one is selected', () => {
    const view = render(<FileInput {...commonProps} />);
    dropFiles(view, [createTestFile('first.pdf', 2048)]);
    dropFiles(view, [createTestFile('second.pdf', 4096)]);

    expect(view.queryByText('first.pdf')).not.toBeInTheDocument();
    expect(view.getByText('second.pdf')).toBeInTheDocument();
    expect(
      view.container.querySelectorAll('.fi-file-input_file-item'),
    ).toHaveLength(1);
  });

  it('only accepts the first file when several are dropped at once', () => {
    const view = render(<FileInput {...commonProps} />);
    dropFiles(view, [
      createTestFile('first.pdf', 2048),
      createTestFile('second.pdf', 4096),
    ]);

    expect(view.getByText('first.pdf')).toBeInTheDocument();
    expect(view.queryByText('second.pdf')).not.toBeInTheDocument();
    expect(
      (view.getByTestId('file-input') as HTMLInputElement).files,
    ).toHaveLength(1);
  });

  it('renders files picked from the file dialog', () => {
    const view = render(<FileInput {...commonProps} />);
    selectFiles(view, [createTestFile('resume.pdf', 2048)]);

    expect(view.getByText('resume.pdf')).toBeInTheDocument();
    expect(view.getByText('2.0 KB')).toBeInTheDocument();
  });
});

describe('removing a file', () => {
  it('restores the file selection UI and empties the input', () => {
    const onChange = jest.fn();
    const view = render(<FileInput {...commonProps} onChange={onChange} />);
    dropFiles(view, [createTestFile('resume.pdf', 2048)]);

    fireEvent.click(view.getByRole('button', { name: 'Remove resume.pdf' }));

    expect(view.queryByText('resume.pdf')).not.toBeInTheDocument();
    expect(
      view.container.querySelector('.fi-file-input_file-item'),
    ).not.toBeInTheDocument();
    expect(
      view.container.querySelector('.fi-file-input_drag-area'),
    ).not.toHaveClass('fi-file-input_drag-area--has-file');
    expect(view.getByTestId('file-input')).toHaveAttribute('tabindex', '0');
    expect(
      (view.getByTestId('file-input') as HTMLInputElement).files,
    ).toHaveLength(0);
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ length: 0 }),
    );
  });
});

describe('multiFile mode', () => {
  const multiFileProps = {
    ...commonProps,
    multiFile: true as const,
    multiFileListHeadingText: 'Added files',
  };

  it('lists every file with the count in the heading', () => {
    const view = render(<FileInput {...multiFileProps} />);
    dropFiles(view, [
      createTestFile('first.pdf', 2048),
      createTestFile('second.pdf', 5 * 1024 * 1024),
    ]);

    expect(view.getByText('Added files (2)')).toBeInTheDocument();
    expect(view.getAllByRole('listitem')).toHaveLength(2);
    expect(view.getByText('first.pdf')).toBeInTheDocument();
    expect(view.getByText('2.0 KB')).toBeInTheDocument();
    expect(view.getByText('second.pdf')).toBeInTheDocument();
    expect(view.getByText('5.0 MB')).toBeInTheDocument();
  });

  it('keeps the file selection UI visible', () => {
    const view = render(<FileInput {...multiFileProps} />);
    dropFiles(view, [createTestFile('first.pdf', 2048)]);

    expect(
      view.container.querySelector('.fi-file-input_input-wrapper'),
    ).not.toHaveClass('fi-file-input_input-wrapper--hidden');
    expect(view.getByTestId('file-input')).toHaveAttribute('tabindex', '0');
  });

  it('appends new files to the previously selected ones', () => {
    const view = render(<FileInput {...multiFileProps} />);
    dropFiles(view, [createTestFile('first.pdf', 2048)]);
    dropFiles(view, [createTestFile('second.pdf', 2048)]);

    expect(view.getByText('Added files (2)')).toBeInTheDocument();
    expect(view.getByText('first.pdf')).toBeInTheDocument();
    expect(view.getByText('second.pdf')).toBeInTheDocument();
  });

  it('removes only the selected file from the list', () => {
    const view = render(<FileInput {...multiFileProps} />);
    dropFiles(view, [
      createTestFile('first.pdf', 2048),
      createTestFile('second.pdf', 2048),
    ]);

    fireEvent.click(view.getByRole('button', { name: 'Remove first.pdf' }));

    expect(view.queryByText('first.pdf')).not.toBeInTheDocument();
    expect(view.getByText('second.pdf')).toBeInTheDocument();
    expect(view.getByText('Added files (1)')).toBeInTheDocument();
    expect(view.getAllByRole('listitem')).toHaveLength(1);
  });
});

describe('filePreview', () => {
  it('renders the file name as a link to the file', () => {
    const view = render(<FileInput {...commonProps} filePreview />);
    dropFiles(view, [createTestFile('resume.pdf', 2048)]);

    const link = view.getByRole('link', { name: /resume\.pdf/ });
    expect(link).toHaveAttribute('href', 'blob:preview-url');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveTextContent('resume.pdf');
  });

  it('renders the file name as plain text when disabled', () => {
    const view = render(<FileInput {...commonProps} />);
    dropFiles(view, [createTestFile('resume.pdf', 2048)]);

    expect(view.queryByRole('link')).not.toBeInTheDocument();
  });
});

describe('controlled value', () => {
  it('renders files given as metadata without any user interaction', () => {
    const view = render(
      <FileInput
        {...commonProps}
        value={[
          {
            metadata: {
              fileName: 'contract.pdf',
              fileSize: 2048,
              fileType: 'application/pdf',
            },
          },
        ]}
      />,
    );

    expect(view.getByText('contract.pdf')).toBeInTheDocument();
    expect(view.getByText('2.0 KB')).toBeInTheDocument();
  });

  it('renders an error text and error icon for a failed file', () => {
    const view = render(
      <FileInput
        {...commonProps}
        value={[
          {
            file: createTestFile('contract.pdf', 2048),
            status: 'error',
            errorText: 'File is too large',
          },
        ]}
      />,
    );

    expect(view.getByText('File is too large')).toHaveClass(
      'fi-file-input_file-item-error-text',
    );
    expect(
      view.container.querySelector('.fi-file-input_error-icon'),
    ).toBeInTheDocument();
  });

  it('uses ariaLoadingText instead of addedFileAriaText while loading', () => {
    const view = render(
      <FileInput
        {...commonProps}
        value={[
          {
            file: createTestFile('contract.pdf', 2048),
            status: 'loading',
            ariaLoadingText: 'Uploading',
          },
        ]}
      />,
    );

    expect(view.getByText('contract.pdf')).toHaveAttribute(
      'aria-label',
      'Uploading contract.pdf',
    );
    expect(
      view.container.querySelector('.fi-file-input_loading-icon'),
    ).toBeInTheDocument();
  });

  it('does not change the rendered files by itself when controlled', () => {
    const onChange = jest.fn();
    const view = render(
      <FileInput
        {...commonProps}
        onChange={onChange}
        value={[{ file: createTestFile('contract.pdf', 2048) }]}
      />,
    );

    dropFiles(view, [createTestFile('other.pdf', 2048)]);

    expect(view.getByText('contract.pdf')).toBeInTheDocument();
    expect(view.queryByText('other.pdf')).not.toBeInTheDocument();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('lets the consumer replace the remove button', () => {
    const onChange = jest.fn();
    const buttonOnClick = jest.fn();
    const view = render(
      <FileInput
        {...commonProps}
        onChange={onChange}
        value={[
          {
            file: createTestFile('contract.pdf', 2048),
            buttonText: 'Cancel upload',
            buttonOnClick,
          },
        ]}
      />,
    );

    fireEvent.click(
      view.getByRole('button', { name: 'Cancel upload contract.pdf' }),
    );

    expect(buttonOnClick).toHaveBeenCalledTimes(1);
    // The override bypasses the component's own removal logic entirely,
    // so onChange must not fire
    expect(onChange).not.toHaveBeenCalled();
  });

  it('runs its own removal logic when the button is not overridden', () => {
    const onChange = jest.fn();
    const view = render(
      <FileInput
        {...commonProps}
        onChange={onChange}
        value={[{ file: createTestFile('contract.pdf', 2048) }]}
      />,
    );

    fireEvent.click(view.getByRole('button', { name: 'Remove contract.pdf' }));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ length: 0 }),
    );
    // In controlled mode the component reports the removal but does not apply
    // it. The file stays until the consumer updates `value`
    expect(view.getByText('contract.pdf')).toBeInTheDocument();
  });
});
