The `<SearchInput>` component is intended to be used as part of a traditional page search in the header of a website.

Examples:

- [Basic use](./#/Components/SearchInput?id=basic-use)
- [Inside a form](./#/Components/SearchInput?id=inside-a-form)
- [Default value](./#/Components/SearchInput?id=default-value)
- [Controlled value](./#/Components/SearchInput?id=controlled-value)
- [Error status](./#/Components/SearchInput?id=error-status)
- [Debounce](./#/Components/SearchInput?id=debounce)
- [Full width](./#/Components/SearchInput?id=full-width)
- [Hidden label](./#/Components/SearchInput?id=hidden-label)
- [Search suggestions](./#/Components/SearchInput?id=search-suggestions)

<div style="margin-bottom: 40px">
  [Props & methods](./#/Components/SearchInput?id=props--methods)
</div>

### Basic use

- Provide a visible `labelText` and accessible button texts with `searchButtonLabel` and `clearButtonLabel`
- The `visualPlaceholder` prop is used to apply a placeholder text to the input. For accessibility reasons, do not use placeholders for instructions
- Use the `onSearch()` function to run search logic
- Clear button and search button appear when text is inserted into the input

```jsx
import { SearchInput } from 'suomifi-ui-components';

<SearchInput
  labelText="Search the site"
  searchButtonLabel="Search"
  clearButtonLabel="Clear"
  visualPlaceholder="Write search terms..."
  onSearch={(value) => console.log(`Searching for ${value}...`)}
/>;
```

### Inside a form

SearchInput can easily be used inside a HTML form. In this use case, provide the `name` prop instead of `onSearch()`.

The example below takes you to the Suomi.fi page search.

```jsx
import { SearchInput } from 'suomifi-ui-components';

<form action="https://www.suomi.fi/haku?">
  <SearchInput
    labelText="Search the site"
    searchButtonLabel="Search"
    clearButtonLabel="Clear"
    visualPlaceholder="Write search terms..."
    name="q"
  />
</form>;
```

### Default value

Use the `defaultValue` prop to apply an initial value to the input.

```jsx
import { SearchInput } from 'suomifi-ui-components';

<SearchInput
  labelText="Search the site"
  searchButtonLabel="Search"
  clearButtonLabel="Clear"
  visualPlaceholder="Write search terms..."
  onSearch={(value) => console.log(`Searching for ${value}...`)}
  defaultValue="Contacts"
/>;
```

### Controlled value

The component's value can be accessed and controlled programmatically with the `value` prop.

A typical use case involves setting the state in the `onChange()` function.

```jsx
import { SearchInput } from 'suomifi-ui-components';
import { useState } from 'react';

const [controlledValue, setControlledValue] = useState('');

<SearchInput
  labelText="Search the site"
  searchButtonLabel="Search"
  clearButtonLabel="Clear"
  visualPlaceholder="Write search terms..."
  onSearch={(value) => console.log(`Searching for ${value}...`)}
  value={controlledValue}
  onChange={(newValue) => {
    setControlledValue(newValue);
  }}
/>;
```

### Error status

Control the error status of the component using the `status` and `statusText` props.

```jsx
import { SearchInput } from 'suomifi-ui-components';
import { useState } from 'react';

const [error, setError] = useState(true);

<SearchInput
  labelText="Search the site"
  searchButtonLabel="Search"
  clearButtonLabel="Clear"
  visualPlaceholder="Write search terms..."
  onSearch={(value) => console.log(`Searching for ${value}...`)}
  defaultValue="Co"
  onChange={(newValue) => setError(newValue.length < 3)}
  status={error ? 'error' : 'default'}
  statusText={
    error ? 'Search term must be at least 3 characters' : ''
  }
/>;
```

### Debounce

You can provide the input a debounce time so that the `onChange()` function only runs after the user stops typing.

```jsx
import { SearchInput } from 'suomifi-ui-components';

<SearchInput
  labelText="Search the site"
  searchButtonLabel="Search"
  clearButtonLabel="Clear"
  visualPlaceholder="Write search terms..."
  onSearch={(value) => console.log(`Searching for ${value}...`)}
  onChange={(value) => console.log(`Input value is ${value}`)}
  debounce={500}
/>;
```

### Full width

Use the `fullWidth` prop to make the component take all available horizontal space.

```jsx
import { SearchInput } from 'suomifi-ui-components';

<SearchInput
  labelText="Search the site"
  searchButtonLabel="Search"
  clearButtonLabel="Clear"
  visualPlaceholder="Write search terms..."
  onSearch={(value) => console.log(`Searching for ${value}...`)}
  fullWidth
/>;
```

### Hidden label

Apply `labelMode="hidden"` to visually hide the component's label.

```jsx
import { SearchInput } from 'suomifi-ui-components';

<SearchInput
  labelText="Search the site"
  searchButtonLabel="Search"
  clearButtonLabel="Clear"
  visualPlaceholder="Write search terms..."
  onSearch={(value) => console.log(`Searching for ${value}...`)}
  labelMode="hidden"
/>;
```

### Search suggestions

You can provide search suggestions for the user using the `autosuggest` and `suggestions` props. The suggestions are shown in a popover list under the input field. Provide a descriptive `suggestionHintText` to let screen reader users know there will be a suggestion list under the component, as the usual accessible pattern is not available for search input component. Also provide `ariaOptionsAvailableText` to inform screen reader users about the updating amount of suggestions.

When the user selects a suggestion from the list, the `onSuggestionSelected` callback gets called with the `uniqueId` of the element.

It's recommended to use debounce on fetching the suggestions to avoid unnecessary fetches. Do not use debounce prop of the component for this purpose.

```jsx
import { SearchInput } from 'suomifi-ui-components';
import { useState } from 'react';

const [controlledValue, setControlledValue] = useState('');
const [suggestions, setSuggestions] = useState([]);

const potentialSearches = [
  { uniqueId: 1, label: 'Football' },
  { uniqueId: 2, label: 'Badminton' },
  { uniqueId: 3, label: 'Tennis' },
  { uniqueId: 4, label: 'Basketball' },
  { uniqueId: 5, label: 'Ice hockey' },
  { uniqueId: 6, label: 'Ball' },
  { uniqueId: 7, label: 'Ice skating' },
  { uniqueId: 8, label: 'Figure skating' }
];

const filterSuggestions = (input, items) => {
  return items.filter((item) =>
    item.label.toLowerCase().includes(input.toLowerCase())
  );
};

const handleSuggestionSelection = (id) => {
  console.log(
    'Searching for',
    suggestions.find((element) => element.uniqueId === id).label
  );
};

<SearchInput
  labelText="Search the site"
  searchButtonLabel="Search"
  clearButtonLabel="Clear"
  visualPlaceholder="Write search terms..."
  onSearch={(value) => console.log(`Searching for ${value}...`)}
  value={controlledValue}
  onChange={(newValue) => {
    setControlledValue(newValue);
    setSuggestions(filterSuggestions(newValue, potentialSearches));
  }}
  autosuggest={controlledValue.length >= 3}
  suggestions={suggestions}
  onSuggestionSelected={(id) => handleSuggestionSelection(id)}
  suggestionHintText="Search suggestions open under the input"
  ariaOptionsAvailableText={`${suggestions.length} suggestions available`}
/>;
```

### Props & methods

SearchInput component supports [margin props](./#/Spacing/Margin%20props) for spacing.
