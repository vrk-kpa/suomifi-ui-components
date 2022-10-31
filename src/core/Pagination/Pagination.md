```js
import { Pagination } from 'suomifi-ui-components';

const [current, setCurrent] = React.useState(2);
const lastPage = 8;

<>
  <div style={{ width: '600px' }}>
    <button>test</button>
    <br />
    <br />
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
      onLeftButtonClick={() => {
        console.log('left');
      }}
      onRightButtonClick={() => {
        console.log('right');
      }}
      onChange={(page) => {
        setCurrent(page);
        console.log('on change: ', page);
      }}
      textFunction={() => {
        return 'Sivu ' + current + ' / ' + lastPage;
      }}
      aria-label="my component here"
    />
    <br />
    <br />
    <button>test</button>
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
    <button>test</button>
    <br />
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
      onLeftButtonClick={() => {
        console.log('left');
      }}
      onRightButtonClick={() => {
        console.log('right');
      }}
      onChange={(page) => {
        setCurrent(page);
        console.log('on change: ', page);
      }}
      textFunction={() => {
        return 'Sivu ' + current + ' / ' + lastPage;
      }}
      aria-label="my component here"
    />
    <br />
    <br />
    <button>test</button>
    <br />
  </div>
</>;
```
