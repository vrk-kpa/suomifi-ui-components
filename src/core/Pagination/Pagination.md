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
      aria-label="Example A"
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
const firstShown = (current - 1) * step;
const lastShown = (current - 1) * step + step;
const currentItems = posts.slice(firstShown, lastShown);

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
      aria-label="Example B"
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
      ariaPageIndicatorText={(currentPage, lastPage) => {
        return (
          'Page ' +
          currentPage +
          ' out of ' +
          lastPage +
          '. Showing items ' +
          firstShown +
          ' to ' +
          lastShown
        );
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
      aria-label="Example C"
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
      aria-label="Example D"
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
