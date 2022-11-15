```js
import { Pagination, Block, Heading } from 'suomifi-ui-components';

const [current, setCurrent] = React.useState(2);
const lastPage = 8;

<>
  <div style={{ width: '600px' }}>
    <Block
      padding="xl"
      style={{ border: '1px solid rgb(200, 205, 208)' }}
    >
      <Heading variant="h3"> Page: {current}</Heading>
    </Block>
    <br />
    <Pagination
      currentPage={current}
      lastPage={lastPage}
      smallScreen={false}
      nextButtonAriaLabel="Next page"
      previousButtonAriaLabel="Previous page"
      pageInput={true}
      pageInputProps={{
        invalidValueErrorText: (value) => `"${value}" is not allowed`,
        inputPlaceholderText: 'Go to',
        buttonText: 'Jump to page',
        labelText: 'Page number'
      }}
      onChange={(page) => {
        setCurrent(page);
      }}
      pageIndicatorText={(currentPage, lastPage) => {
        return 'Page ' + currentPage + ' / ' + lastPage;
      }}
    />
  </div>
</>;
```

### Using internal state

```js
import { Pagination, Block, Heading } from 'suomifi-ui-components';

const arrLength = 100;
const step = 5;

const lastPage = arrLength / step;
const [posts] = React.useState(Array.from(Array(arrLength).keys()));
const [current, setCurrent] = React.useState(1);

const currentItems = posts.slice(
  (current - 1) * step,
  (current - 1) * step + step
);

<>
  <div style={{ width: '600px' }}>
    <Block
      padding="xl"
      style={{ border: '1px solid rgb(200, 205, 208)' }}
    >
      {currentItems.map((post, id) => (
        <div key={id}>Item: {post}</div>
      ))}
    </Block>
    <br />
    <Pagination
      lastPage={lastPage}
      smallScreen={false}
      nextButtonAriaLabel="Next page"
      previousButtonAriaLabel="Previous page"
      pageInput={true}
      pageInputProps={{
        invalidValueErrorText: (value) => `"${value}" is not allowed`,
        inputPlaceholderText: 'Go to',
        buttonText: 'Jump to page',
        labelText: 'Page number'
      }}
      onChange={(page) => {
        setCurrent(page);
      }}
      pageIndicatorText={(currentPage, lastPage) => {
        return 'Page ' + currentPage + ' / ' + lastPage;
      }}
    />
  </div>
</>;
```

### Without page input

```js
import { Pagination } from 'suomifi-ui-components';

const [current, setCurrent] = React.useState(2);
const lastPage = 8;

<>
  <div style={{ width: '600px' }}>
    <Pagination
      currentPage={current}
      lastPage={lastPage}
      nextButtonAriaLabel="Next page"
      previousButtonAriaLabel="Previous page"
      pageInput={false}
      onChange={(page) => {
        setCurrent(page);
      }}
      pageIndicatorText={(currentPage, lastPage) => {
        return 'Page ' + currentPage + ' / ' + lastPage;
      }}
    />
  </div>
</>;
```

### Small screen variant

```js
import { Pagination } from 'suomifi-ui-components';

const [current, setCurrent] = React.useState(2);
const lastPage = 8;

<>
  <div style={{ width: '600px' }}>
    <Pagination
      currentPage={current}
      lastPage={lastPage}
      smallScreen={true}
      nextButtonAriaLabel="Next page"
      previousButtonAriaLabel="Previous page"
      pageInput={true}
      pageInputProps={{
        invalidValueErrorText: (value) => `"${value}" is not allowed`,
        inputPlaceholderText: 'Go to',
        buttonText: 'Jump to page',
        labelText: 'Page number'
      }}
      onChange={(page) => {
        setCurrent(page);
      }}
      pageIndicatorText={(currentPage, lastPage) => {
        return 'Page ' + currentPage + ' / ' + lastPage;
      }}
    />
  </div>
</>;
```
