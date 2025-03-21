Use the `<Table>` component to display large amounts of well-structured data

Examples:

- [Basic use](./#/Components/Table?id=basic-use)
- [Sorting](./#/Components/Table?id=sorting)
- [Selecting rows](./#/Components/Table?id=selecting-rows)
- [Condensed table](./#/Components/Table?id=condensed-table)
- [Horizontal scroll (mobile)](./#/Components/Table?id=horizontal-scroll-mobile)
- [Paginated data](./#/Components/Table?id=paginated-data)
- [Loading state](./#/Components/Table?id=loading-state)

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
  // Whether users can sort the table by this column
  sortable?: boolean;
  // Icon to show when sorting. Defaults to 'alphabetical'
  sortIcon?: 'alphabetical' | 'generic';
  // CSS class to be applied to each cell in this column. Use e.g. for setting column width
  className?: string
}
```

- Define table data (rows) by providing an array of objects where each column key is present. Each row must also have a unique id. In case of empty cell, provide an empty string `''` for that column key

```jsx
import { Table, Link } from 'suomifi-ui-components';
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
    labelText: 'Country of Residence',
    className: 'my-custom-class'
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
    country: <Link href="https://suomi.fi">Germany</Link>
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

You can set `sortable: true` to any column you wish be able to sort the table with. You can either let the component handle the data sorting, or provide a `tableSortCallback()` prop to handle data sorting with a custom logic. The function receives the key of the sorted column and a string of `'asc' | 'desc'` as parameters.

Always use the `tableSortedAriaLiveText()` function as demonstrated below to give screen readers information about table sorting.

```jsx
import { Table, Link } from 'suomifi-ui-components';
import React, { useState } from 'react';

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
    sortable: true,
    sortIcon: 'generic'
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

const dataArr = [
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
    country: <Link href="https://suomi.fi">Germany</Link>
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

const [data, setData] = useState(dataArr);

const customDataSort = (key, dir) => {
  const sortedData = [...data].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    const getTextContent = (element) => {
      if (
        typeof element === 'string' ||
        typeof element === 'number'
      ) {
        return element.toString();
      }
      if (React.isValidElement(element)) {
        const { children } = element.props;
        if (Array.isArray(children)) {
          return children.map(getTextContent).join('');
        }
        return getTextContent(children);
      }
      return '';
    };

    const aValueText = getTextContent(aValue);
    const bValueText = getTextContent(bValue);

    const isNumeric =
      !isNaN(Number(aValueText)) && !isNaN(Number(bValueText));

    if (isNumeric) {
      return dir === 'asc'
        ? Number(aValueText) - Number(bValueText)
        : Number(bValueText) - Number(aValueText);
    }

    return dir === 'asc'
      ? aValueText.localeCompare(bValueText)
      : bValueText.localeCompare(aValueText);
  });
  setData(sortedData);
};

<div style={{ width: '900px' }}>
  <Table
    caption="People in the project"
    columns={columns}
    data={data}
    tableSortedAriaLiveText={(sortedColumn, direction) =>
      `Table is sorted by ${sortedColumn} ${
        direction === 'asc' ? 'ascdencing' : 'descending'
      }`
    }
    mb="xxl"
  />
  <Table
    caption="People in the project"
    columns={columns}
    data={data}
    tableSortedAriaLiveText={(sortedColumn, direction) =>
      `Table is sorted by ${sortedColumn} ${
        direction === 'asc' ? 'ascdencing' : 'descending'
      }`
    }
    mb="xxl"
    tableSortCallback={customDataSort}
  />
</div>;
```

### Selecting rows

Use the `enableRowSelection` to allow row selection via Checkboxes on the left hand side. Use the `onSelectedRowsChange()` prop to detect selection changes. The function returns the `id`s of selected rows.

Alternatively, you can use the `enableSingleRowSelection` prop to allow single row selection via RadioButton.

Also provide a `rowSelectionCheckboxLabel` to each row object to give an accessible label to the selection Checkbox/RadioButton.

You can control the selected rows programmatically by using the `controlledSelectedRowIds` prop as shown in the third example below.

```jsx
import { Table, Link, Button } from 'suomifi-ui-components';
import React, { useState } from 'react';

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
    country: 'United Kingdom',
    rowSelectionCheckboxLabel: 'Select row John Doe'
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Doe',
    hours_worked: 150,
    title: 'Architect',
    country: 'Norway',
    rowSelectionCheckboxLabel: 'Select row Jane Doe'
  },
  {
    id: '3',
    firstName: 'Bruce',
    lastName: 'Willis',
    hours_worked: 10,
    title: 'Project manager',
    country: 'United States of America',
    rowSelectionCheckboxLabel: 'Select row Bruce Willis'
  },
  {
    id: '4',
    firstName: 'Harriet',
    lastName: 'Ackermann',
    hours_worked: '',
    title: 'Security consultant',
    country: <Link href="https://suomi.fi">Germany</Link>,
    rowSelectionCheckboxLabel: 'Select row Harriet Ackermann'
  },
  {
    id: '5',
    firstName: 'Alexander',
    lastName: 'Stubb',
    hours_worked: 2543,
    title: 'President',
    country: 'Finland',
    rowSelectionCheckboxLabel: 'Select row Alexander Stubb'
  }
];

const [controlledSelectedRowIds, setControlledSelectedRowIds] =
  useState([]);

<div style={{ width: '1000px' }}>
  <Table
    caption="People in the project"
    columns={columns}
    data={data}
    enableRowSelection
    onSelectedRowsChange={(rowIds) => console.log(rowIds)}
    mb="xxxl"
  />

  <Table
    caption="People in the project"
    columns={columns}
    data={data}
    enableSingleRowSelection
    onSelectedRowsChange={(rowIds) => console.log(rowIds)}
    mb="xxxl"
  />

  <Button
    mr="l"
    onClick={() => setControlledSelectedRowIds(data.map((d) => d.id))}
  >
    Select all rows
  </Button>
  <Button onClick={() => setControlledSelectedRowIds([])}>
    Deselect all rows
  </Button>
  <Table
    caption="People in the project"
    columns={columns}
    data={data}
    enableRowSelection
    controlledSelectedRowIds={controlledSelectedRowIds}
    onSelectedRowsChange={(rowIds) =>
      setControlledSelectedRowIds(rowIds)
    }
    mt="xl"
  />
</div>;
```

### Condensed table

Use the `condensed` prop to decrease vertical padding in table cells

```jsx
import { Table, Link } from 'suomifi-ui-components';
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
    country: <Link href="https://suomi.fi">Germany</Link>
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
  />
</div>;
```

### Horizontal scroll (mobile)

By default, the `<Table>` component does not wrap its content to multiple rows but rather takes as much horizontal space as needed and scrolls horizontally. Below is an example how the component behaves on narrow screens. On narrow screen it also makes sense to have a separate heading for the table and use `aria-labelledby` to label the table.

It is important to set `overflow: auto` to the table's container element. On mobile screens it is also recommended to give the table's heading as a separate element instead of using the `caption` prop. This makes it so that only the table scrolls and the heading stays in place.

```jsx
import { Table, Link, Heading } from 'suomifi-ui-components';
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
    country: 'Germany'
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

<>
  <Heading variant="h3" id="table-heading">
    People in the project
  </Heading>
  <div style={{ width: '350px', overflowX: 'auto' }}>
    <Table
      columns={columns}
      data={data}
      condensed
      aria-labelledby="table-heading"
    />
  </div>
</>;
```

### Paginated data

You can use the `<Pagination>` component in conjunction with `<Table>` to paginate data. The Table component only deals with the array of `data` it is given at a time, and does not know about the full data set per se.

```jsx
import {
  Table,
  Link,
  Pagination,
  Block
} from 'suomifi-ui-components';
import React, { useState } from 'react';

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

const fullData = [
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
    country: 'Germany'
  },
  {
    id: '5',
    firstName: 'Alexander',
    lastName: 'Stubb',
    hours_worked: 2543,
    title: 'President',
    country: 'Finland'
  },
  {
    id: '6',
    firstName: 'Emily',
    lastName: 'Clark',
    hours_worked: 200,
    title: 'Designer',
    country: 'Canada'
  },
  {
    id: '7',
    firstName: 'Michael',
    lastName: 'Smith',
    hours_worked: 300,
    title: 'Engineer',
    country: 'Australia'
  },
  {
    id: '8',
    firstName: 'Sarah',
    lastName: 'Johnson',
    hours_worked: 400,
    title: 'Analyst',
    country: 'New Zealand'
  },
  {
    id: '9',
    firstName: 'David',
    lastName: 'Brown',
    hours_worked: 500,
    title: 'Consultant',
    country: 'Ireland'
  },
  {
    id: '10',
    firstName: 'Laura',
    lastName: 'Wilson',
    hours_worked: 600,
    title: 'Manager',
    country: 'Sweden'
  },
  {
    id: '11',
    firstName: 'James',
    lastName: 'Taylor',
    hours_worked: 700,
    title: 'Director',
    country: 'Denmark'
  },
  {
    id: '12',
    firstName: 'Olivia',
    lastName: 'Anderson',
    hours_worked: 800,
    title: 'Coordinator',
    country: 'Netherlands'
  },
  {
    id: '13',
    firstName: 'Daniel',
    lastName: 'Thomas',
    hours_worked: 900,
    title: 'Specialist',
    country: 'Belgium'
  },
  {
    id: '14',
    firstName: 'Sophia',
    lastName: 'Martinez',
    hours_worked: 1000,
    title: 'Advisor',
    country: 'Spain'
  },
  {
    id: '15',
    firstName: 'Matthew',
    lastName: 'Garcia',
    hours_worked: 1100,
    title: 'Officer',
    country: 'Portugal'
  }
];

const [data, setData] = useState(fullData.slice(0, 5));
const [currentPage, setCurrentPage] = React.useState(1);

<>
  <div style={{ width: '900px' }}>
    <Table
      caption="People in the project"
      columns={columns}
      data={data}
    />
    <Block mt="l">
      <Pagination
        pageInput={false}
        currentPage={currentPage}
        lastPage={3}
        nextButtonAriaLabel="Next table page"
        previousButtonAriaLabel="Previous table page"
        aria-label="Table pagination"
        onChange={(page) => {
          if (page === 1) {
            setData(fullData.slice(0, 5));
          } else if (page === 2) {
            setData(fullData.slice(5, 10));
          } else if (page === 3) {
            setData(fullData.slice(10, 15));
          }
          setCurrentPage(page);
        }}
        pageIndicatorText={(currentPage, lastPage) =>
          'Page ' + currentPage + ' / ' + lastPage
        }
        ariaPageIndicatorText={(currentPage, lastPage) =>
          'Showing page ' + currentPage + ' out of ' + lastPage
        }
        style={{ textAlign: 'center' }}
      />
    </Block>
  </div>
</>;
```

### Loading state

To visually indicate that the table is waiting to receive data, apply the `loading` prop. Be default, it renders 5 skeleton rows. To prevent layout shift, you can apply the `loadingRowAmount` prop to control the amount of skeleton rows.

<div style="border: 1px solid #c8cdd0; padding: 20px 20px 4px 20px; background: #eaf2fa; margin-bottom: 30px;">
##### IMPORTANT

To ensure accessibility when using the loading state, always use an additional text-based loading indicator inside an `aria-live` region as shown in the example below.

</div>

```jsx
import {
  Table,
  Link,
  Button,
  Heading,
  Block,
  Text
} from 'suomifi-ui-components';
import React, { useState } from 'react';

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
    country: <Link href="https://suomi.fi">Germany</Link>
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

const [loading, setLoading] = useState(false);

const simulateLoading = () => {
  setLoading(true);
  setTimeout(() => setLoading(false), 3000);
};

<div style={{ width: '900px' }}>
  <Button onClick={simulateLoading} disabled={loading} mb="l">
    Simulate loading
  </Button>
  <Heading variant="h3" id="table-heading" mb="m">
    People in the project
  </Heading>
  <Block mb="s" aria-live="polite">
    <Text variant="bold">
      {!loading ? `${data.length} people` : 'Loading data...'}
    </Text>
  </Block>
  <Table
    aria-labelledby="table-heading"
    columns={columns}
    data={data}
    enableRowSelection
    loading={loading}
  />
</div>;
```

### Props & methods
