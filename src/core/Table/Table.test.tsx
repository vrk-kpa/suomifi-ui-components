import React from 'react';
import { render } from '@testing-library/react';
import { Table } from './Table';

const columns = [
  {
    key: 'firstName',
    labelText: 'First name',
  },
  {
    key: 'lastName',
    labelText: 'Last name',
  },
  {
    key: 'hours_worked',
    labelText: 'Number of hours worked',
  },
  {
    key: 'title',
    labelText: 'Title',
  },
  {
    key: 'country',
    labelText: 'Country of Residence',
  },
];

const data = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    hours_worked: 30,
    title: 'Developer',
    country: 'United Kingdom',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Doe',
    hours_worked: 45,
    title: 'Architect',
    country: 'Norway',
  },
  {
    id: '3',
    firstName: 'Bruce',
    lastName: 'Willis',
    hours_worked: 69,
    title: 'CEO',
    country: 'United States of America',
  },
  {
    id: '4',
    firstName: 'Harriet',
    lastName: 'Ackermann',
    hours_worked: 20,
    title: 'Security consultant',
    country: <pre>Germany</pre>,
  },
  {
    id: '4',
    firstName: 'Alexander',
    lastName: 'Stubb',
    hours_worked: 56,
    title: 'President',
    country: 'Finland',
  },
];

describe('snapshots match', () => {
  test('minimal implementation', () => {
    const tableRendered = render(<Table columns={columns} data={data} />);
    const { container } = tableRendered;
    expect(container.firstChild).toMatchSnapshot();
  });
});
