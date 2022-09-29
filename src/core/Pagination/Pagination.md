```js
import { Pagination } from 'suomifi-ui-components';

const [current, setCurrent] = React.useState(2);
const lastPage = 8;

<>
  <div>
    <Pagination
      status="loading"
      variant="normal"
      textAlign="right"
      text="Loading"
      currentPage={current}
      lastPage={lastPage}
      invalidValueErrorText="ei ole sallittu arvo"
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
        return current + ' / ' + lastPage + ' pages';
      }}
    />
    <br />
  </div>
</>;
```
