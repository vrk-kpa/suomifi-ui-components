Use the `<Table>` component to display large amounts of well-structured data

Examples:

- [Basic use](./#/Components/Table?id=basic-use)
- [Sorting](./#/Components/Table?id=sorting)
- [Condensed table](./#/Components/Table?id=condensed-table)
- [Row count text](./#/Components/Table?id=row-count-text)

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
    id: '5',
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

### Sorting

You can set `sortable: true` to any column you wish be able to sort the table with

```jsx
import { Table, ExternalLink } from 'suomifi-ui-components';
import React from 'react';

const columns = [
  {
    key: 'firstName',
    labelText: 'First name',
    sortable: true
  },
  {
    key: 'lastName',
    labelText: 'Last name'
  },
  {
    key: 'hours_worked',
    labelText: 'Number of hours worked',
    textAlign: 'right',
    sortable: true
  },
  {
    key: 'title',
    labelText: 'Title'
  },
  {
    key: 'country',
    labelText: 'Country of Residence',
    sortable: true
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
    id: '5',
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

Use the `condensed` prop to decrease vertical padding in table cells

Use the `showCondenseButtons` prop to display buttons which allow the user to control whether the table is condensed or not. When these buttons are shown, `condenseButtonAriaLabel` and `expandButtonAriaLabel` props are also required

```jsx
import { Table, ExternalLink, Heading } from 'suomifi-ui-components';
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
    id: '5',
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
    mb="xxxl"
  />

  <Table
    caption="People in the project"
    columns={columns}
    data={data}
    showCondenseButtons
    condenseButtonAriaLabel="Condense table visually"
    expandButtonAriaLabel="Expand table visually"
    condensed
  />
</div>;
```

### Row count text

Use the `rowCounterTextFunction` to display a text indicating the number of rows in the table

```jsx
import { Table, ExternalLink, Heading } from 'suomifi-ui-components';
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
    id: '5',
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
    showCondenseButtons
    condenseButtonAriaLabel="Condense table visually"
    expandButtonAriaLabel="Expand table visually"
    rowCounterTextFunction={(amount) => `${amount} people`}
  />
</div>;
```

### Sorting

### Props & methods
