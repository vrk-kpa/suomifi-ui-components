```js
import { FilterInput } from 'suomifi-ui-components';

const tools = [
  { name: 'Jackhammer', price: 230, tax: false },
  { name: 'Hammer', price: 15, tax: true },
  { name: 'Sledgehammer', price: 36, tax: false },
  { name: 'Spade', price: 50, tax: true },
  { name: 'Powersaw', price: 150, tax: false }
];
const [filteredItems, setFilteredItems] = React.useState(tools);

// to do the magic on the component's side
const filter = (tool, query) => {
  return tool.name.includes(query);
};

<>
  <FilterInput
    items={tools}
    onFiltering={(filtered) => setFilteredItems(filtered)}
    filterRule={filter}
  />

  <div>
    <ul>
      {filteredItems.map((item, index) => {
        if (item) {
          return <li>{item.name}</li>;
        } else {
          return { item };
        }
      })}
    </ul>
  </div>
</>;
```
