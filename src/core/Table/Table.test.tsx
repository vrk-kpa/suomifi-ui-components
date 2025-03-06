import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Table, TableColumn, TableProps } from './Table';
import { axeTest } from '../../utils/test';

const columns: TableColumn[] = [
  { key: 'name', labelText: 'Name', sortable: true },
  {
    key: 'age',
    labelText: 'Age',
    sortable: true,
    textAlign: 'right',
    sortIcon: 'generic',
  },
];

const data = [
  {
    id: '1',
    name: 'John Doe',
    age: 28,
    rowSelectionCheckboxLabel: 'Select row John Doe',
  },
  {
    id: '2',
    name: 'Jane Smith',
    age: 34,
    rowSelectionCheckboxLabel: 'Select row Jane Doe',
  },
];

const renderTable = (props?: Partial<TableProps<typeof columns>>) => {
  const { caption, 'aria-labelledby': ariaLabelledBy, ...rest } = props || {};
  if (caption) {
    return render(
      <Table caption={caption} columns={columns} data={data} {...rest} />,
    );
  }
  if (ariaLabelledBy) {
    return render(
      <Table
        aria-labelledby={ariaLabelledBy}
        columns={columns}
        data={data}
        {...rest}
      />,
    );
  }
};

test(
  'should not have basic accessibility issues',
  axeTest(
    <Table caption="People in the project" columns={columns} data={data} />,
  ),
);

describe('Table functionalities', () => {
  it('matches snapshot', () => {
    const result = renderTable({ caption: 'People in the project' });
    if (result) {
      const { container } = result;
      expect(container).toMatchSnapshot();
    }
  });

  it('renders table with columns and data', () => {
    renderTable({ caption: 'People in the project' });
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('sorts data by column when header is clicked', () => {
    renderTable({ caption: 'People in the project' });
    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);
    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('Jane Smith');
    expect(rows[2]).toHaveTextContent('John Doe');
  });

  it('renders with condensed style when condensed prop is true', () => {
    renderTable({ caption: 'People in the project', condensed: true });
    const table = screen.getByRole('table');
    expect(table).toHaveClass('fi-table--condensed');
  });

  it('renders checkboxes for row selection when enableRowSelection is true', () => {
    renderTable({ caption: 'People in the project', enableRowSelection: true });
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(2);
    expect(checkboxes[0]).toHaveAccessibleName('Select row John Doe');
    expect(checkboxes[1]).toHaveAccessibleName('Select row Jane Doe');
  });

  it('calls onSelectedRowsChange when a row is selected', () => {
    const onSelectedRowsChange = jest.fn();
    renderTable({
      caption: 'People in the project',
      enableRowSelection: true,
      onSelectedRowsChange,
    });
    const checkbox = screen.getAllByRole('checkbox')[1];
    fireEvent.click(checkbox);
    expect(onSelectedRowsChange).toHaveBeenCalledWith(['2']);
  });

  it('renders caption when provided', () => {
    renderTable({ caption: 'Test Table' });
    expect(screen.getByText('Test Table')).toBeInTheDocument();
  });

  it('applies aria-labelledby when provided', () => {
    renderTable({ 'aria-labelledby': 'table-heading' });
    const table = screen.getByRole('table');
    expect(table).toHaveAttribute('aria-labelledby', 'table-heading');
  });

  it('renders skeleton rows when loading prop is true', () => {
    renderTable({ caption: 'People in the project', loading: true });
    const skeletonRows = screen.getAllByRole('row', { hidden: true }).slice(1);
    expect(skeletonRows).toHaveLength(5);
    skeletonRows.forEach((row) => {
      expect(row).toHaveClass('fi-table_skeleton-row');
    });
  });
});
