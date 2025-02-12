The `<Pagination>` component can be used to navigate through paginated content, for example search results.

Examples:

- [Basic use](./#/Components/Pagination?id=basic-use)
- [Using internal state](./#/Components/Pagination?id=using-internal-state)
- [Slicing a dataset based on current page](./#/Components/Pagination?id=slicing-a-dataset-based-on-current-page)
- [Without page input](./#/Components/Pagination?id=without-page-input)
- [Page browsing using links](./#/Components/Pagination?id=page-browsing-using-links)
- [Small screen](./#/Components/Pagination?id=small-screen)

<div style="margin-bottom: 40px">
  [Props & methods](./#/Components/Pagination?id=props--methods)
</div>

### Basic use

- Provide the `currentPage` and `lastPage` props
- Provide the `nextButtonAriaLabel` and `previousButtonAriaLabel` props to label arrow buttons for screen readers
- Provide an `aria-label` to label the underlying `<nav>` component
- The prop `pageInput` enables an input field where users can type the number of the page they want to visit
- When using pageInput, provide `pageInputProps` as shown below to make the input functional and accessible
- The `onChange()` function runs both on arrow button press and pageInput submit
- The visible text shown between the arrow buttons is formed using the `pageIndicatorText()` prop
- Current page is indicated to screen readers using text formed in the `ariaPageIndicatorText()` prop
- After page change, move focus to a relevant element at the top of the paginated content, e.g. a heading or a focusable list element

```js
import {
  Pagination,
  Block,
  Heading,
  suomifiDesignTokens
} from 'suomifi-ui-components';
import { useRef } from 'react';

const [current, setCurrent] = React.useState(2);
const lastPage = 8;
const headingRef = useRef();

<Block style={{ width: '600px' }}>
  <Block
    padding="xl"
    mb="l"
    style={{
      border: `1px solid ${suomifiDesignTokens.colors.depthLight1}`
    }}
  >
    <Heading variant="h3" forwardedRef={headingRef} tabIndex="-1">
      {' '}
      Page: {current}
    </Heading>
  </Block>
  <Pagination
    currentPage={current}
    lastPage={lastPage}
    nextButtonAriaLabel="Next page"
    previousButtonAriaLabel="Previous page"
    aria-label="Pagination"
    pageInput
    pageInputProps={{
      invalidValueErrorText: (value) => `"${value}" is not allowed`,
      inputPlaceholderText: 'Go to',
      buttonText: 'Jump to page',
      labelText: 'Page number'
    }}
    onChange={(page) => {
      setCurrent(page);
      headingRef.current.focus();
    }}
    pageIndicatorText={(currentPage, lastPage) =>
      'Page ' + currentPage + ' / ' + lastPage
    }
    ariaPageIndicatorText={(currentPage, lastPage) =>
      'Showing page ' + currentPage + ' out of ' + lastPage
    }
  />
</Block>;
```

### Using internal state

If the `currentPage` prop is not provided, the component will keep track of the current page internally. Initial value for current page will be 1.

```js
import {
  Pagination,
  Block,
  Heading,
  suomifiDesignTokens
} from 'suomifi-ui-components';
import { useRef } from 'react';

const [current, setCurrent] = React.useState(1);
const lastPage = 8;
const headingRef = useRef();

const fakePageNode = (
  <Block
    padding="xl"
    mb="l"
    style={{
      border: `1px solid ${suomifiDesignTokens.colors.depthLight1}`
    }}
  >
    <Heading variant="h3" forwardedRef={headingRef} tabIndex="-1">
      Page: {current}
    </Heading>
  </Block>
);

<Block style={{ width: '600px' }}>
  {fakePageNode}
  <Pagination
    lastPage={lastPage}
    nextButtonAriaLabel="Next page"
    previousButtonAriaLabel="Previous page"
    aria-label="Pagination"
    pageInput
    pageInputProps={{
      invalidValueErrorText: (value) => `"${value}" is not allowed`,
      inputPlaceholderText: 'Go to',
      buttonText: 'Jump to page',
      labelText: 'Page number'
    }}
    onChange={(page) => {
      setCurrent(page);
      headingRef.current.focus();
    }}
    pageIndicatorText={(currentPage, lastPage) =>
      'Page ' + currentPage + ' / ' + lastPage
    }
    ariaPageIndicatorText={(currentPage, lastPage) =>
      'Showing page ' + currentPage + ' out of ' + lastPage
    }
  />
</Block>;
```

### Slicing a dataset based on current page

You can determine which chunk of a bigger dataset to render based on the number returned from the `onChange()` function.

```js
import {
  Pagination,
  Block,
  Heading,
  suomifiDesignTokens
} from 'suomifi-ui-components';
import { useRef } from 'react';

const arrLength = 100;
const amountOfConcurrentItems = 5;

const lastPage = arrLength / amountOfConcurrentItems;
const [items] = React.useState(Array.from(Array(arrLength).keys()));
const [chunk, setChunk] = React.useState(1);
const firstShown = (chunk - 1) * amountOfConcurrentItems;
const lastShown =
  (chunk - 1) * amountOfConcurrentItems + amountOfConcurrentItems;
const currentItems = items.slice(firstShown, lastShown);
const headingRef = useRef();

const fakePageNode = (
  <Block
    padding="xl"
    mb="l"
    style={{
      border: `1px solid ${suomifiDesignTokens.colors.depthLight1}`
    }}
  >
    <Heading variant="h3" forwardedRef={headingRef} tabIndex="-1">
      Page: {chunk}
    </Heading>
    {currentItems.map((item, id) => (
      <div key={id}>Item {item + 1}</div>
    ))}
  </Block>
);

<Block style={{ width: '600px' }}>
  {fakePageNode}
  <Pagination
    lastPage={lastPage}
    nextButtonAriaLabel="Next page"
    previousButtonAriaLabel="Previous page"
    aria-label="Pagination"
    pageInput
    pageInputProps={{
      invalidValueErrorText: (value) => `"${value}" is not allowed`,
      inputPlaceholderText: 'Go to',
      buttonText: 'Jump to page',
      labelText: 'Page number'
    }}
    onChange={(page) => {
      setChunk(page);
      headingRef.current.focus();
    }}
    pageIndicatorText={(currentPage, lastPage) =>
      'Page ' + currentPage + ' / ' + lastPage
    }
    ariaPageIndicatorText={(currentPage, lastPage) =>
      'Showing page ' + currentPage + ' out of ' + lastPage
    }
  />
</Block>;
```

### Without page input

Without `pageInput` navigation can only be done with the arrow buttons.

```js
import {
  Pagination,
  Block,
  Heading,
  suomifiDesignTokens
} from 'suomifi-ui-components';
import { useRef } from 'react';

const [current, setCurrent] = React.useState(2);
const lastPage = 8;
const headingRef = useRef();

const fakePageNode = (
  <Block
    padding="xl"
    mb="l"
    style={{
      border: `1px solid ${suomifiDesignTokens.colors.depthLight1}`
    }}
  >
    <Heading variant="h3" forwardedRef={headingRef} tabIndex="-1">
      Page: {current}
    </Heading>
  </Block>
);

<Block style={{ width: '600px' }}>
  {fakePageNode}
  <Pagination
    currentPage={current}
    lastPage={lastPage}
    nextButtonAriaLabel="Next page"
    previousButtonAriaLabel="Previous page"
    aria-label="Pagination"
    onChange={(page) => {
      setCurrent(page);
      headingRef.current.focus();
    }}
    pageIndicatorText={(currentPage, lastPage) =>
      'Page ' + currentPage + ' / ' + lastPage
    }
    ariaPageIndicatorText={(currentPage, lastPage) =>
      'Showing page ' + currentPage + ' out of ' + lastPage
    }
  />
</Block>;
```

### Page browsing using links

For search engine optimization or other such reasons, it is possible to give custom components to use instead of the regular arrow buttons for browsing. If you do decide to replace the buttons, make sure that the customized solution is accessible. When the first or last page is reach via clicking the links or other custom components, move focus to the other browse button.

```js
import {
  Pagination,
  Block,
  Heading,
  Link,
  Text,
  IconArrowRight,
  IconArrowLeft,
  suomifiDesignTokens
} from 'suomifi-ui-components';
import { useRef } from 'react';

const [current, setCurrent] = React.useState(2);
const lastPage = 8;
const prevPageLinkRef = useRef();
const nextPageLinkRef = useRef();
const headingRef = useRef();

const fakePageNode = (
  <Block
    padding="xl"
    mb="l"
    style={{
      border: `1px solid ${suomifiDesignTokens.colors.depthLight1}`
    }}
  >
    <Heading variant="h3" forwardedRef={headingRef} tabIndex="-1">
      Page: {current}
    </Heading>
  </Block>
);

const handlePageChange = (newPage) => {
  if (newPage <= 0 || newPage > lastPage) return;
  setCurrent(newPage);
  headingRef.current.focus();
};

<Block style={{ width: '600px' }}>
  {fakePageNode}
  <Pagination
    currentPage={current}
    lastPage={lastPage}
    customPreviousButton={
      current <= 1 ? (
        <Text style={{ color: suomifiDesignTokens.colors.depthBase }}>
          Previous page
        </Text>
      ) : (
        <Link
          forwardedRef={prevPageLinkRef}
          href="./#/Components/Pagination?id=page-browsing-using-links"
          rel="prev"
          onClick={() => handlePageChange(current - 1)}
        >
          Previous page
        </Link>
      )
    }
    customNextButton={
      current >= lastPage ? (
        <Text style={{ color: suomifiDesignTokens.colors.depthBase }}>
          Next page
        </Text>
      ) : (
        <Link
          forwardedRef={nextPageLinkRef}
          href="./#/Components/Pagination?id=page-browsing-using-links"
          rel="next"
          onClick={() => handlePageChange(current + 1)}
        >
          Next page
        </Link>
      )
    }
    aria-label="Pagination"
    pageInputProps={{
      invalidValueErrorText: (value) => `"${value}" is not allowed`,
      inputPlaceholderText: 'Go to',
      buttonText: 'Jump to page',
      labelText: 'Page number'
    }}
    onChange={(page) => {
      setCurrent(page);
      headingRef.current.focus();
    }}
    pageIndicatorText={(currentPage, lastPage) =>
      'Page ' + currentPage + ' / ' + lastPage
    }
    ariaPageIndicatorText={(currentPage, lastPage) =>
      'Showing page ' + currentPage + ' out of ' + lastPage
    }
  />
</Block>;
```

### Small screen

Apply the prop `smallScreen` on narrower screen sizes.

In this state, pageInput is rendered below the arrow buttons.

```js
import {
  Pagination,
  Block,
  Heading,
  suomifiDesignTokens
} from 'suomifi-ui-components';
import { useRef } from 'react';

const [current, setCurrent] = React.useState(2);
const lastPage = 8;
const headingRef = useRef();

const fakePageNode = (
  <Block
    padding="xl"
    mb="l"
    style={{
      border: `1px solid ${suomifiDesignTokens.colors.depthLight1}`
    }}
  >
    <Heading variant="h3" forwardedRef={headingRef} tabIndex="-1">
      Page: {current}
    </Heading>
  </Block>
);

<Block style={{ width: '320px' }}>
  {fakePageNode}
  <Pagination
    currentPage={current}
    lastPage={lastPage}
    nextButtonAriaLabel="Next page"
    previousButtonAriaLabel="Previous page"
    aria-label="Pagination"
    pageInput
    pageInputProps={{
      invalidValueErrorText: (value) => `"${value}" is not allowed`,
      inputPlaceholderText: 'Go to',
      buttonText: 'Jump to page',
      labelText: 'Page number'
    }}
    onChange={(page) => {
      setCurrent(page);
      headingRef.current.focus();
    }}
    pageIndicatorText={(currentPage, lastPage) =>
      'Page ' + currentPage + ' / ' + lastPage
    }
    ariaPageIndicatorText={(currentPage, lastPage) =>
      'Showing page ' + currentPage + ' out of ' + lastPage
    }
    smallScreen
  />
</Block>;
```

### Props & methods

Pagination component supports [margin props](./#/Spacing/Margin%20props) for spacing.
