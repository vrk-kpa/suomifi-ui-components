Use the `<Table>` component to display large amounts of well-structured data

Examples:

- [Basic use](./#/Components/Table?id=basic-use)
- [Condensed table](./#/Components/Table?id=condensed-table)

<div style="margin-bottom: 40px">
  [Props & methods](./#/Components/Table?id=props--methods)
</div>

### Basic use

- Use a descriptive `caption` to give the table an accessible name
- Define table columns in an array of objects using the following schema

```jsx static
interface TableColumn {
  // Column identifier
  key: string;
  // Visible column title
  labelText: string;
  // Text alignment of cells in this column
  textAlign?: 'left' | 'center' | 'right';
}
```

- Define table data (rows) by providing an array of objects where each column key is present. Each row must also have a unique id. In case of empty cell, provide an empty string `''` for that column key

```jsx
import { Table, ExternalLink } from 'suomifi-ui-components';
import React from 'react';

const columns = [
  {
    key: 'firstName',
    labelText: 'First name'
  },
  {
    key: 'lastName',
    labelText: 'Last name'
  },
  {
    key: 'hours_worked',
    labelText: 'Number of hours worked',
    textAlign: 'right'
  },
  {
    key: 'title',
    labelText: 'Title'
  },
  {
    key: 'country',
    labelText: 'Country of Residence'
  }
];

const data = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    hours_worked: 125,
    title: 'Developer',
    country: 'United Kingdom'
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Doe',
    hours_worked: 150,
    title: 'Architect',
    country: 'Norway'
  },
  {
    id: '3',
    firstName: 'Bruce',
    lastName: 'Willis',
    hours_worked: 10,
    title: 'Project manager',
    country: 'United States of America'
  },
  {
    id: '4',
    firstName: 'Harriet',
    lastName: 'Ackermann',
    hours_worked: '',
    title: 'Security consultant',
    country: (
      <ExternalLink href="https://suomi.fi">Germany</ExternalLink>
    )
  },
  {
    id: '4',
    firstName: 'Alexander',
    lastName: 'Stubb',
    hours_worked: 2543,
    title: 'President',
    country: 'Finland'
  }
];

<div style={{ width: '900px' }}>
  <Table
    caption="People in the project"
    columns={columns}
    data={data}
  />
</div>;
```

### Condensed table

- Use the `condensed` prop to decrease cell vertical padding

```jsx
import { Table, ExternalLink } from 'suomifi-ui-components';
import React from 'react';

const columns = [
  {
    key: 'firstName',
    labelText: 'First name'
  },
  {
    key: 'lastName',
    labelText: 'Last name'
  },
  {
    key: 'hours_worked',
    labelText: 'Number of hours worked',
    textAlign: 'right'
  },
  {
    key: 'title',
    labelText: 'Title'
  },
  {
    key: 'country',
    labelText: 'Country of Residence'
  }
];

const data = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    hours_worked: 125,
    title: 'Developer',
    country: 'United Kingdom'
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Doe',
    hours_worked: 150,
    title: 'Architect',
    country: 'Norway'
  },
  {
    id: '3',
    firstName: 'Bruce',
    lastName: 'Willis',
    hours_worked: 10,
    title: 'Project manager',
    country: 'United States of America'
  },
  {
    id: '4',
    firstName: 'Harriet',
    lastName: 'Ackermann',
    hours_worked: '',
    title: 'Security consultant',
    country: (
      <ExternalLink href="https://suomi.fi">Germany</ExternalLink>
    )
  },
  {
    id: '4',
    firstName: 'Alexander',
    lastName: 'Stubb',
    hours_worked: 2543,
    title: 'President',
    country: 'Finland'
  }
];

<div style={{ width: '900px' }}>
  <Table
    caption="People in the project"
    columns={columns}
    data={data}
    condensed
  />
</div>;
```

### Props & methods
