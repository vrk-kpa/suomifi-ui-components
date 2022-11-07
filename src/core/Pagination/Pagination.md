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
      invalidValueErrorText="ei ole sallittu arvo"
      ariaNextButtonLabel="Seuraaava"
      ariaPreviousButtonLabel="Edellinen"
      pageInputButtonText="Siirry"
      onChange={(page) => {
        setCurrent(page);
        console.log('on change: ', page);
      }}
      textFunction={(currentPage, lastPage) => {
        return 'Sivu ' + currentPage + ' / ' + lastPage;
      }}
      aria-label="my component here"
    />
    <br />
    <br />
  </div>
</>;
```

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
      invalidValueErrorText="ei ole sallittu arvo"
      ariaNextButtonLabel="Seuraaava"
      ariaPreviousButtonLabel="Edellinen"
      pageInputButtonText="Siirry"
      onChange={(page) => {
        setCurrent(page);
        console.log('on change: ', page);
      }}
      textFunction={(currentPage, lastPage) => {
        return 'Sivu ' + currentPage + ' / ' + lastPage;
      }}
      aria-label="my component here"
    />
    <br />
    <br />
  </div>
</>;
```
