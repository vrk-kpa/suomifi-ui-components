```js
import { Pagination, Block, Heading } from 'suomifi-ui-components';

const [current, setCurrent] = React.useState(2);
const lastPage = 8;

<>
  <div style={{ width: '600px' }}>
    <br />

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
      pageInput={true}
      smallScreen={false}
      nextButtonAriaLabel="Next"
      previousButtonAriaLabel="Previous"
      paginationInputProps={{
        invalidValueErrorText: ' is not allowed',
        inputPlaceholderText: 'Go to',
        buttonText: 'Jump to page',
        labelText: 'Page number'
      }}
      onChange={(page) => {
        setCurrent(page);
        console.log('on change: ', page);
      }}
      textFunction={(currentPage, lastPage) => {
        return 'Page ' + currentPage + ' / ' + lastPage;
      }}
      aria-label="Pagination component"
    />
    <br />
    <br />
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
    <br />
    <Pagination
      currentPage={current}
      lastPage={lastPage}
      pageInput={true}
      smallScreen={true}
      nextButtonAriaLabel="Next"
      previousButtonAriaLabel="Previous"
      paginationInputProps={{
        invalidValueErrorText: ' is not allowed',
        inputPlaceholderText: 'Go to',
        buttonText: 'Jump to page',
        labelText: 'Page number'
      }}
      onChange={(page) => {
        setCurrent(page);
        console.log('on change: ', page);
      }}
      textFunction={(currentPage, lastPage) => {
        return 'Page ' + currentPage + ' / ' + lastPage;
      }}
      aria-label="Pagination component"
    />
    <br />
    <br />
  </div>
</>;
```
